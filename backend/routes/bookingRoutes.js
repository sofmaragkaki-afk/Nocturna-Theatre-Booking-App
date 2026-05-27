const express = require("express");
const db = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, async (req, res) => {
  const connection = await db.getConnection();

  try {
    const { show_id, seat_ids } = req.body;

    if (!show_id || !Array.isArray(seat_ids) || seat_ids.length === 0) {
      return res.status(400).json({
        message: "show_id and seat_ids are required.",
      });
    }

    await connection.beginTransaction();

    const [[show]] = await connection.query(
      "SELECT id, price FROM shows WHERE id = ?",
      [show_id]
    );

    if (!show) {
      await connection.rollback();
      return res.status(404).json({ message: "Show not found." });
    }

    const [alreadyBooked] = await connection.query(
      `
      SELECT bs.seat_id
      FROM booking_seats bs
      JOIN bookings b ON b.id = bs.booking_id
      WHERE b.show_id = ?
      AND b.status = 'confirmed'
      AND bs.seat_id IN (?)
      FOR UPDATE
      `,
      [show_id, seat_ids]
    );

    if (alreadyBooked.length > 0) {
      await connection.rollback();
      return res.status(409).json({
        message: "One or more selected seats are already reserved.",
      });
    }

    const totalPrice = Number(show.price) * seat_ids.length;

    const [bookingResult] = await connection.query(
      `
      INSERT INTO bookings (user_id, show_id, total_price, status)
      VALUES (?, ?, ?, 'confirmed')
      `,
      [req.user.id, show_id, totalPrice]
    );

    const bookingId = bookingResult.insertId;
    const bookingSeatsValues = seat_ids.map((seatId) => [bookingId, seatId]);

    await connection.query(
      "INSERT INTO booking_seats (booking_id, seat_id) VALUES ?",
      [bookingSeatsValues]
    );

    await connection.commit();

    res.status(201).json({
      message: "Reservation confirmed successfully.",
      booking_id: bookingId,
      total_price: totalPrice,
    });
  } catch (error) {
    await connection.rollback();

    console.error("BOOKING ERROR:", error);

    res.status(500).json({
      message: "Could not create reservation.",
      error: error.message,
    });
  } finally {
    connection.release();
  }
});

router.get("/my", authenticateToken, async (req, res) => {
  try {
    const [bookings] = await db.query(
      `
      SELECT 
        b.id,
        b.status,
        b.total_price,
        b.created_at,
        s.title,
        s.show_date,
        s.show_time,
        t.name AS theatre,
        GROUP_CONCAT(CONCAT(se.row_label, se.seat_number) ORDER BY se.row_label, se.seat_number SEPARATOR ', ') AS seats
      FROM bookings b
      JOIN shows s ON s.id = b.show_id
      LEFT JOIN theatres t ON t.id = s.theatre_id
      JOIN booking_seats bs ON bs.booking_id = b.id
      JOIN seats se ON se.id = bs.seat_id
      WHERE b.user_id = ?
      GROUP BY b.id
      ORDER BY b.created_at DESC
      `,
      [req.user.id]
    );

    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch bookings." });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const bookingId = req.params.id;

    const [result] = await db.query(
      "UPDATE bookings SET status = 'cancelled' WHERE id = ? AND user_id = ?",
      [bookingId, req.user.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Booking not found." });
    }

    res.json({ message: "Booking cancelled successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not cancel booking." });
  }
});

module.exports = router;