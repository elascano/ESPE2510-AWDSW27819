-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-10-2025 a las 14:43:55
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `farmer`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chicken`
--

CREATE TABLE `chicken` (
  `id` int(11) NOT NULL,
  `coop_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `color` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `is_molting` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chicken_coop`
--

CREATE TABLE `chicken_coop` (
  `id` int(11) NOT NULL,
  `farmer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chicken_farmer`
--

CREATE TABLE `chicken_farmer` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egg`
--

CREATE TABLE `egg` (
  `id` int(11) NOT NULL,
  `chicken_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chicken`
--
ALTER TABLE `chicken`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coop_id` (`coop_id`);

--
-- Indices de la tabla `chicken_coop`
--
ALTER TABLE `chicken_coop`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farmer_id` (`farmer_id`);

--
-- Indices de la tabla `chicken_farmer`
--
ALTER TABLE `chicken_farmer`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `egg`
--
ALTER TABLE `egg`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chicken_id` (`chicken_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chicken`
--
ALTER TABLE `chicken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `chicken_coop`
--
ALTER TABLE `chicken_coop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `chicken_farmer`
--
ALTER TABLE `chicken_farmer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `egg`
--
ALTER TABLE `egg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chicken`
--
ALTER TABLE `chicken`
  ADD CONSTRAINT `chicken_ibfk_1` FOREIGN KEY (`coop_id`) REFERENCES `chicken_coop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `chicken_coop`
--
ALTER TABLE `chicken_coop`
  ADD CONSTRAINT `chicken_coop_ibfk_1` FOREIGN KEY (`farmer_id`) REFERENCES `chicken_farmer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `egg`
--
ALTER TABLE `egg`
  ADD CONSTRAINT `egg_ibfk_1` FOREIGN KEY (`chicken_id`) REFERENCES `chicken` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
