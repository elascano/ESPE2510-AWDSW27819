-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 04-11-2025 a las 04:37:27
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `chicken_farm_simulator`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chicken`
--

CREATE TABLE `chicken` (
  `chicken_id` int(11) NOT NULL,
  `coop_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `color` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `age` int(11) NOT NULL,
  `is_molting` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coop`
--

CREATE TABLE `coop` (
  `coop_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `coop`
--

INSERT INTO `coop` (`coop_id`, `name`) VALUES
(1, 'Coop A-01'),
(2, 'Coop B-02'),
(3, 'Coop C-03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coop_assignment`
--

CREATE TABLE `coop_assignment` (
  `assignment_id` int(11) NOT NULL,
  `farmer_id` int(11) NOT NULL,
  `coop_id` int(11) NOT NULL,
  `assignment_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egg`
--

CREATE TABLE `egg` (
  `egg_id` int(11) NOT NULL,
  `chicken_id` int(11) NOT NULL,
  `date_laid` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `farmer`
--

CREATE TABLE `farmer` (
  `farmer_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `chicken`
--
ALTER TABLE `chicken`
  ADD PRIMARY KEY (`chicken_id`),
  ADD KEY `coop_id` (`coop_id`);

--
-- Indices de la tabla `coop`
--
ALTER TABLE `coop`
  ADD PRIMARY KEY (`coop_id`);

--
-- Indices de la tabla `coop_assignment`
--
ALTER TABLE `coop_assignment`
  ADD PRIMARY KEY (`assignment_id`),
  ADD UNIQUE KEY `unique_coop_assignment` (`coop_id`),
  ADD KEY `farmer_id` (`farmer_id`);

--
-- Indices de la tabla `egg`
--
ALTER TABLE `egg`
  ADD PRIMARY KEY (`egg_id`),
  ADD KEY `chicken_id` (`chicken_id`);

--
-- Indices de la tabla `farmer`
--
ALTER TABLE `farmer`
  ADD PRIMARY KEY (`farmer_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `chicken`
--
ALTER TABLE `chicken`
  MODIFY `chicken_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `coop`
--
ALTER TABLE `coop`
  MODIFY `coop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `coop_assignment`
--
ALTER TABLE `coop_assignment`
  MODIFY `assignment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `egg`
--
ALTER TABLE `egg`
  MODIFY `egg_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `farmer`
--
ALTER TABLE `farmer`
  MODIFY `farmer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `chicken`
--
ALTER TABLE `chicken`
  ADD CONSTRAINT `chicken_ibfk_1` FOREIGN KEY (`coop_id`) REFERENCES `coop` (`coop_id`);

--
-- Filtros para la tabla `coop_assignment`
--
ALTER TABLE `coop_assignment`
  ADD CONSTRAINT `coop_assignment_ibfk_1` FOREIGN KEY (`farmer_id`) REFERENCES `farmer` (`farmer_id`),
  ADD CONSTRAINT `coop_assignment_ibfk_2` FOREIGN KEY (`coop_id`) REFERENCES `coop` (`coop_id`);

--
-- Filtros para la tabla `egg`
--
ALTER TABLE `egg`
  ADD CONSTRAINT `egg_ibfk_1` FOREIGN KEY (`chicken_id`) REFERENCES `chicken` (`chicken_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
