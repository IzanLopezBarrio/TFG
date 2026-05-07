-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 06-05-2026 a las 12:46:09
-- Versión del servidor: 8.0.44
-- Versión de PHP: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `altas`
--

CREATE TABLE `altas` (
  `Usuario` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `Idioma` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `altas`
--

INSERT INTO `altas` (`Usuario`, `Idioma`) VALUES
('izanlopez256.3@gmail.com', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `idiomas`
--

CREATE TABLE `idiomas` (
  `ID` int NOT NULL,
  `Nombre` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `Nivel` varchar(3) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `idiomas`
--

INSERT INTO `idiomas` (`ID`, `Nombre`, `Nivel`) VALUES
(1, 'Inglés', 'B1'),
(2, 'Inglés', 'B2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE `resultados` (
  `Usuario` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `Test` int NOT NULL,
  `Categoria` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `Nota` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`Usuario`, `Test`, `Categoria`, `Nota`) VALUES
('izanlopez256.3@gmail.com', 1, 'Test', 10),
('izanlopez256.3@gmail.com', 2, 'Grammar', 6.67);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `test`
--

CREATE TABLE `test` (
  `ID` int NOT NULL,
  `Idioma` int NOT NULL,
  `Tipo` varchar(25) COLLATE utf8mb4_general_ci NOT NULL,
  `Titulo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Ruta` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `test`
--

INSERT INTO `test` (`ID`, `Idioma`, `Tipo`, `Titulo`, `Ruta`) VALUES
(1, 1, 'Test', 'Complete the sentences using the words and phrases in the box.', 'test/ejercicioA.json'),
(2, 1, 'Grammar', 'Put the words in the correct order to make quiestions.', 'test/ejercicioB.json'),
(25, 2, 'Nada', 'No say nada', './test/empty.json');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `UserName` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Contraseña` varchar(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `UserName`, `Contraseña`) VALUES
('izanlopez256.2@gmail.com', 'Izan', '123'),
('izanlopez256.3@gmail.com', 'Izan López Barrio', 'ejemplo123#'),
('izanlopez256@gmail.com', 'Izan', '123123123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `altas`
--
ALTER TABLE `altas`
  ADD PRIMARY KEY (`Usuario`,`Idioma`),
  ADD KEY `fk_idioma_alta` (`Idioma`);

--
-- Indices de la tabla `idiomas`
--
ALTER TABLE `idiomas`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Nivel-Idioma` (`Nombre`,`Nivel`);

--
-- Indices de la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`Usuario`,`Test`) USING BTREE,
  ADD KEY `FK_RT` (`Test`);

--
-- Indices de la tabla `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`ID`) USING BTREE,
  ADD KEY `Idioma` (`Idioma`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `idiomas`
--
ALTER TABLE `idiomas`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `altas`
--
ALTER TABLE `altas`
  ADD CONSTRAINT `fk_idioma_alta` FOREIGN KEY (`Idioma`) REFERENCES `idiomas` (`ID`),
  ADD CONSTRAINT `fk_user_alta` FOREIGN KEY (`Usuario`) REFERENCES `usuarios` (`email`);

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `FK_RT` FOREIGN KEY (`Test`) REFERENCES `test` (`ID`),
  ADD CONSTRAINT `FK_RU` FOREIGN KEY (`Usuario`) REFERENCES `usuarios` (`email`),
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`Usuario`) REFERENCES `usuarios` (`email`);

--
-- Filtros para la tabla `test`
--
ALTER TABLE `test`
  ADD CONSTRAINT `test_ibfk_1` FOREIGN KEY (`Idioma`) REFERENCES `idiomas` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
