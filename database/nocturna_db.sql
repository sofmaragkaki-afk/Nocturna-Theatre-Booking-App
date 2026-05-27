-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 27 Μάη 2026 στις 23:09:01
-- Έκδοση διακομιστή: 10.4.32-MariaDB
-- Έκδοση PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `nocturna_db`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `show_id` int(11) NOT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('confirmed','cancelled') DEFAULT 'confirmed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `show_id`, `total_price`, `status`, `created_at`) VALUES
(1, 1, 1, 36.00, 'confirmed', '2026-05-26 19:15:11'),
(2, 1, 1, 18.00, 'cancelled', '2026-05-26 19:39:08'),
(8, 2, 1, 18.00, 'cancelled', '2026-05-27 17:02:01'),
(9, 1, 2, 40.00, 'confirmed', '2026-05-27 19:40:03');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `booking_seats`
--

CREATE TABLE `booking_seats` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `seat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `booking_seats`
--

INSERT INTO `booking_seats` (`id`, `booking_id`, `seat_id`) VALUES
(1, 1, 121),
(2, 1, 136),
(3, 2, 124),
(13, 8, 126),
(14, 9, 122),
(15, 9, 206);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `seats`
--

CREATE TABLE `seats` (
  `id` int(11) NOT NULL,
  `show_id` int(11) NOT NULL,
  `row_label` varchar(5) DEFAULT NULL,
  `seat_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `seats`
--

INSERT INTO `seats` (`id`, `show_id`, `row_label`, `seat_number`) VALUES
(121, 1, 'A', 1),
(122, 2, 'A', 1),
(123, 3, 'A', 1),
(124, 1, 'B', 1),
(125, 2, 'B', 1),
(126, 3, 'B', 1),
(127, 1, 'C', 1),
(128, 2, 'C', 1),
(129, 3, 'C', 1),
(130, 1, 'D', 1),
(131, 2, 'D', 1),
(132, 3, 'D', 1),
(133, 1, 'E', 1),
(134, 2, 'E', 1),
(135, 3, 'E', 1),
(136, 1, 'A', 2),
(137, 2, 'A', 2),
(138, 3, 'A', 2),
(139, 1, 'B', 2),
(140, 2, 'B', 2),
(141, 3, 'B', 2),
(142, 1, 'C', 2),
(143, 2, 'C', 2),
(144, 3, 'C', 2),
(145, 1, 'D', 2),
(146, 2, 'D', 2),
(147, 3, 'D', 2),
(148, 1, 'E', 2),
(149, 2, 'E', 2),
(150, 3, 'E', 2),
(151, 1, 'A', 3),
(152, 2, 'A', 3),
(153, 3, 'A', 3),
(154, 1, 'B', 3),
(155, 2, 'B', 3),
(156, 3, 'B', 3),
(157, 1, 'C', 3),
(158, 2, 'C', 3),
(159, 3, 'C', 3),
(160, 1, 'D', 3),
(161, 2, 'D', 3),
(162, 3, 'D', 3),
(163, 1, 'E', 3),
(164, 2, 'E', 3),
(165, 3, 'E', 3),
(166, 1, 'A', 4),
(167, 2, 'A', 4),
(168, 3, 'A', 4),
(169, 1, 'B', 4),
(170, 2, 'B', 4),
(171, 3, 'B', 4),
(172, 1, 'C', 4),
(173, 2, 'C', 4),
(174, 3, 'C', 4),
(175, 1, 'D', 4),
(176, 2, 'D', 4),
(177, 3, 'D', 4),
(178, 1, 'E', 4),
(179, 2, 'E', 4),
(180, 3, 'E', 4),
(181, 1, 'A', 5),
(182, 2, 'A', 5),
(183, 3, 'A', 5),
(184, 1, 'B', 5),
(185, 2, 'B', 5),
(186, 3, 'B', 5),
(187, 1, 'C', 5),
(188, 2, 'C', 5),
(189, 3, 'C', 5),
(190, 1, 'D', 5),
(191, 2, 'D', 5),
(192, 3, 'D', 5),
(193, 1, 'E', 5),
(194, 2, 'E', 5),
(195, 3, 'E', 5),
(196, 1, 'A', 6),
(197, 2, 'A', 6),
(198, 3, 'A', 6),
(199, 1, 'B', 6),
(200, 2, 'B', 6),
(201, 3, 'B', 6),
(202, 1, 'C', 6),
(203, 2, 'C', 6),
(204, 3, 'C', 6),
(205, 1, 'D', 6),
(206, 2, 'D', 6),
(207, 3, 'D', 6),
(208, 1, 'E', 6),
(209, 2, 'E', 6),
(210, 3, 'E', 6),
(211, 1, 'A', 7),
(212, 2, 'A', 7),
(213, 3, 'A', 7),
(214, 1, 'B', 7),
(215, 2, 'B', 7),
(216, 3, 'B', 7),
(217, 1, 'C', 7),
(218, 2, 'C', 7),
(219, 3, 'C', 7),
(220, 1, 'D', 7),
(221, 2, 'D', 7),
(222, 3, 'D', 7),
(223, 1, 'E', 7),
(224, 2, 'E', 7),
(225, 3, 'E', 7),
(226, 1, 'A', 8),
(227, 2, 'A', 8),
(228, 3, 'A', 8),
(229, 1, 'B', 8),
(230, 2, 'B', 8),
(231, 3, 'B', 8),
(232, 1, 'C', 8),
(233, 2, 'C', 8),
(234, 3, 'C', 8),
(235, 1, 'D', 8),
(236, 2, 'D', 8),
(237, 3, 'D', 8),
(238, 1, 'E', 8),
(239, 2, 'E', 8),
(240, 3, 'E', 8);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `shows`
--

CREATE TABLE `shows` (
  `id` int(11) NOT NULL,
  `theatre_id` int(11) DEFAULT NULL,
  `title` varchar(150) NOT NULL,
  `description` text DEFAULT NULL,
  `genre` varchar(50) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `venue` varchar(150) DEFAULT NULL,
  `show_date` date DEFAULT NULL,
  `show_time` time DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `total_seats` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `shows`
--

INSERT INTO `shows` (`id`, `theatre_id`, `title`, `description`, `genre`, `duration`, `venue`, `show_date`, `show_time`, `price`, `total_seats`, `created_at`) VALUES
(1, 1, 'The Phantom Waltz', 'A dark romantic theatre performance with mystery and music.', 'Drama', 120, 'Main Stage', '2026-06-20', '20:30:00', 18.00, 40, '2026-05-15 17:38:44'),
(2, 1, 'Crimson Masquerade', 'A gothic masquerade story full of secrets.', 'Mystery', 100, 'Main Stage', '2026-06-25', '21:00:00', 20.00, 40, '2026-05-15 17:38:44'),
(3, 2, 'Moonlit Tragedy', 'A dramatic play under the atmosphere of moonlight.', 'Tragedy', 110, 'Velvet Room', '2026-07-02', '19:30:00', 16.00, 40, '2026-05-15 17:38:44');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `theatres`
--

CREATE TABLE `theatres` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `theatres`
--

INSERT INTO `theatres` (`id`, `name`, `location`, `description`, `created_at`) VALUES
(1, 'Nocturna Grand Theatre', 'Athens Center', 'A gothic-inspired theatre for dramatic performances.', '2026-05-15 17:38:44'),
(2, 'Velvet Hall', 'Piraeus', 'An elegant venue with crimson interior and classic stage design.', '2026-05-15 17:38:44');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `role`, `created_at`) VALUES
(1, 'Sof', 'a@gmail.com', '$2b$10$0dCGVKQGbNkpFTfOxb/BEOFo36enIWpfeZhr9GxG5nzQuKhuYyybq', 'user', '2026-05-26 16:19:09'),
(2, 'Test User', 'testuser@test.com', '$2b$10$nExQuNa9ADeX99al1sMPvuswAieO9DaLHcr0P2J7YO662skWcJZ7y', 'user', '2026-05-27 00:20:40'),
(3, 'Sofia', 'b@gmail.com', '$2b$10$tpy0R4pQLu.FghrBjLOLMOfKIRlNXym9B/YHlMwv46nqaFyqa5Jb.', 'user', '2026-05-27 19:31:46');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `show_id` (`show_id`);

--
-- Ευρετήρια για πίνακα `booking_seats`
--
ALTER TABLE `booking_seats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`),
  ADD KEY `seat_id` (`seat_id`);

--
-- Ευρετήρια για πίνακα `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `show_id` (`show_id`);

--
-- Ευρετήρια για πίνακα `shows`
--
ALTER TABLE `shows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `theatre_id` (`theatre_id`);

--
-- Ευρετήρια για πίνακα `theatres`
--
ALTER TABLE `theatres`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT για πίνακα `booking_seats`
--
ALTER TABLE `booking_seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT για πίνακα `seats`
--
ALTER TABLE `seats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;

--
-- AUTO_INCREMENT για πίνακα `shows`
--
ALTER TABLE `shows`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT για πίνακα `theatres`
--
ALTER TABLE `theatres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT για πίνακα `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`show_id`) REFERENCES `shows` (`id`) ON DELETE CASCADE;

--
-- Περιορισμοί για πίνακα `booking_seats`
--
ALTER TABLE `booking_seats`
  ADD CONSTRAINT `booking_seats_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `booking_seats_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`id`) ON DELETE CASCADE;

--
-- Περιορισμοί για πίνακα `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`show_id`) REFERENCES `shows` (`id`) ON DELETE CASCADE;

--
-- Περιορισμοί για πίνακα `shows`
--
ALTER TABLE `shows`
  ADD CONSTRAINT `shows_ibfk_1` FOREIGN KEY (`theatre_id`) REFERENCES `theatres` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
