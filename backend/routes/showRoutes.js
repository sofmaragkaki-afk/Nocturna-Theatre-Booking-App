const express = require("express");
const db = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  try {
    const [shows] = await db.query(`
      SELECT 
        s.id,
        s.title,
        s.description,
        s.genre,
        s.duration,
        s.venue,
        s.show_date,
        s.show_time,
        s.price,
        s.total_seats,
        t.name AS theatre,
        t.location,
        (
          s.total_seats - COALESCE(
            (
              SELECT COUNT(*)
              FROM booking_seats bs
              JOIN bookings b ON b.id = bs.booking_id
              WHERE b.show_id = s.id AND b.status = 'confirmed'
            ), 0
          )
        ) AS available_seats
      FROM shows s
      LEFT JOIN theatres t ON t.id = s.theatre_id
      ORDER BY s.show_date, s.show_time
    `);

    res.json(shows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch shows." });
  }
});

router.get("/:id/seats", authenticateToken, async (req, res) => {
  try {
    const showId = req.params.id;

    const [seats] = await db.query(
      `
      SELECT 
        se.id,
        se.row_label,
        se.seat_number,
        CASE 
          WHEN bs.id IS NULL THEN 'available'
          ELSE 'reserved'
        END AS status
      FROM seats se
      LEFT JOIN booking_seats bs 
        ON bs.seat_id = se.id
        AND bs.booking_id IN (
          SELECT id FROM bookings 
          WHERE show_id = ? AND status = 'confirmed'
        )
      WHERE se.show_id = ?
      ORDER BY se.row_label, se.seat_number
      `,
      [showId, showId]
    );

    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not fetch seats." });
  }
});

module.exports = router;