-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 23, 2020 at 11:55 AM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutech`
--

-- --------------------------------------------------------

--
-- Table structure for table `goods`
--

CREATE TABLE `goods` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `picture` varchar(60) DEFAULT NULL,
  `purchase_price` varchar(30) NOT NULL,
  `selling_price` varchar(30) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `goods`
--

INSERT INTO `goods` (`id`, `name`, `picture`, `purchase_price`, `selling_price`, `stock`) VALUES
(1, 'Mobil Biasa Aja', 'picture/GOODS_800b225593cd3ab4aef5629fbe953062.png', '30000000', '25000000', 0),
(2, 'Sofa biasa', 'picture/GOODS_dd6d22ac5b023f4797ace27bc318eacf.png', '3899000', '4199000', 0),
(3, 'Lemari kayu jati', 'picture/GOODS_64bb6637fcb938a4bdf7426730e89671.png', '899000', '1999000', 0),
(4, 'Jaket anti katro', 'picture/GOODS_6bbc30bacf15373ea760f528c7a7cfcd.jpg', '40000', '95000', 0),
(5, 'Masker penting', 'picture/GOODS_b3b66825cb073c1886eebe44cfad43a3.png', '10000', '14000', 0),
(6, 'Motor', 'picture/GOODS_2bfd70b7e12037c28eba346c12a6a127.png', '9000000', '15000000', 0),
(7, 'Playstation 5-1', 'picture/GOODS_cfaeb1d5f6e2359b82f89997e5d3b69e.png', '9000000', '15000000', 0),
(9, 'Seperti Kaos', 'picture/GOODS_32695082545635f9bae50d9a1db130a6.jpg', '75000', '125000', 800);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
