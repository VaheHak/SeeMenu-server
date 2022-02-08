-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 15 2021 г., 13:02
-- Версия сервера: 10.4.18-MariaDB
-- Версия PHP: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `see_menu`
--

-- --------------------------------------------------------

--
-- Структура таблицы `available`
--

CREATE TABLE `available` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `restaurant` int(11) NOT NULL,
  `category` int(11) DEFAULT NULL,
  `menu` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `available`
--

INSERT INTO `available` (`id`, `restaurant`, `category`, `menu`, `available`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 0, '2021-05-24 11:00:38', '2021-05-24 11:00:38');

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `restaurantId` bigint(20) UNSIGNED NOT NULL,
  `lang` varchar(255) NOT NULL DEFAULT 'en',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sourceId` bigint(20) UNSIGNED DEFAULT NULL,
  `restBranchId` bigint(20) UNSIGNED DEFAULT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `restaurantId`, `lang`, `createdAt`, `updatedAt`, `sourceId`, `restBranchId`, `available`) VALUES
(156, 'Das', 'fdsadsadsads', 129, 'en', '2021-06-05 00:22:20', '2021-06-05 00:22:20', NULL, NULL, 1),
(157, 'asda', 'http://localhost:5000/images/categories/157/image-1623093354094.jpg', 130, 'en', '2021-06-07 19:15:54', '2021-06-07 19:15:54', 157, NULL, 1),
(158, 'zcvzxcvz', 'http://localhost:5000/images/categories/158/image-1623094194858.jpg', 131, 'en', '2021-06-07 19:29:54', '2021-06-07 19:29:54', 158, NULL, 1),
(159, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 19:32:01', '2021-06-07 19:32:01', 159, 130, 1),
(160, 'asda', 'http://localhost:5000/images/categories/157/image-1623093354094.jpg', 130, 'en', '2021-06-07 20:20:22', '2021-06-07 20:20:22', 157, NULL, 0),
(161, 'asda', 'http://localhost:5000/images/categories/157/image-1623093354094.jpg', 130, 'en', '2021-06-07 20:20:25', '2021-06-07 20:20:25', 157, NULL, 0),
(162, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:23', '2021-06-07 20:21:23', 159, NULL, 0),
(163, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:25', '2021-06-07 20:21:25', 159, NULL, 0),
(164, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:25', '2021-06-07 20:21:25', 159, NULL, 0),
(165, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:26', '2021-06-07 20:21:26', 159, NULL, 0),
(166, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:27', '2021-06-07 20:21:27', 159, NULL, 0),
(167, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:27', '2021-06-07 20:21:27', 159, NULL, 0),
(168, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:27', '2021-06-07 20:21:27', 159, NULL, 0),
(169, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:29', '2021-06-07 20:21:29', 159, NULL, 0),
(170, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:40', '2021-06-07 20:21:40', 159, NULL, 0),
(171, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:41', '2021-06-07 20:21:41', 159, NULL, 0),
(172, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:21:44', '2021-06-07 20:21:44', 159, NULL, 1),
(173, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:22:02', '2021-06-07 20:22:02', 159, NULL, 0),
(174, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:22:02', '2021-06-07 20:22:02', 159, NULL, 0),
(175, 'zcvzxcvz', 'http://localhost:5000/images/categories/158/image-1623094194858.jpg', 131, 'en', '2021-06-07 20:22:03', '2021-06-07 20:22:03', 158, NULL, 0),
(176, 'klljkl', 'http://localhost:5000/images/categories/159/image-1623094321394.jpg', 130, 'en', '2021-06-07 20:22:04', '2021-06-07 20:22:04', 159, NULL, 0),
(177, 'zcvzxcvz', 'http://localhost:5000/images/categories/158/image-1623094194858.jpg', 131, 'en', '2021-06-07 20:22:06', '2021-06-07 20:22:06', 158, NULL, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `menus`
--

CREATE TABLE `menus` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `rate` varchar(255) NOT NULL,
  `vegan` tinyint(1) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `restaurantId` bigint(20) UNSIGNED NOT NULL,
  `categoryId` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `lang` varchar(255) NOT NULL DEFAULT 'en',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `sourceId` bigint(20) UNSIGNED DEFAULT NULL,
  `restaurantBranchId` bigint(20) UNSIGNED DEFAULT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `menus`
--

INSERT INTO `menus` (`id`, `name`, `price`, `rate`, `vegan`, `description`, `restaurantId`, `categoryId`, `image`, `lang`, `createdAt`, `updatedAt`, `sourceId`, `restaurantBranchId`, `available`) VALUES
(146, 'asdasd', 150000, 'amd', 0, 'dfgdfgd', 129, 156, 'fdfgddfgdf', 'en', '2021-06-05 00:23:59', '2021-06-05 00:23:59', NULL, NULL, 1),
(147, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/147/image-1623093395900.jpg', 'en', '2021-06-07 19:16:35', '2021-06-07 19:16:35', 147, NULL, 1),
(148, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/148/image-1623093455933.jpg', 'en', '2021-06-07 19:17:35', '2021-06-07 19:17:35', 148, NULL, 1),
(149, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/149/image-1623093466990.jpg', 'en', '2021-06-07 19:17:46', '2021-06-07 19:17:46', 149, NULL, 1),
(150, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/150/image-1623093477729.jpg', 'en', '2021-06-07 19:17:57', '2021-06-07 19:17:57', 150, NULL, 1),
(151, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/151/image-1623093484783.jpg', 'en', '2021-06-07 19:18:04', '2021-06-07 19:18:04', 151, NULL, 1),
(152, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/152/image-1623093485705.jpg', 'en', '2021-06-07 19:18:05', '2021-06-07 19:18:05', 152, NULL, 1),
(153, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/153/image-1623093485873.jpg', 'en', '2021-06-07 19:18:05', '2021-06-07 19:18:05', 153, NULL, 1),
(154, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/154/image-1623093486038.jpg', 'en', '2021-06-07 19:18:06', '2021-06-07 19:28:36', 154, NULL, 0),
(155, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/155/image-1623093486192.jpg', 'en', '2021-06-07 19:18:06', '2021-06-07 19:28:35', 155, NULL, 0),
(156, 'asda', 2000, 'amd', 1, 'asdasda', 130, 157, 'http://localhost:5000/images/menus/156/image-1623093486367.jpg', 'en', '2021-06-07 19:18:06', '2021-06-07 19:28:32', 156, NULL, 0),
(157, 'cvbcvb', 453645634, 'amd', 1, 'cfgbcfb', 131, 158, 'http://localhost:5000/images/menus/157/image-1623094213216.jpg', 'en', '2021-06-07 19:30:13', '2021-06-07 19:30:13', 157, 130, 1),
(158, 'cvbcvb', 453645634, 'amd', 1, 'cfgbcfb', 131, 158, 'http://localhost:5000/images/menus/158/image-1623094216046.jpg', 'en', '2021-06-07 19:30:16', '2021-06-07 19:30:16', 157, 130, 1),
(159, 'cvbcvb', 453645634, 'amd', 1, 'cfgbcfb', 131, 158, 'http://localhost:5000/images/menus/159/image-1623094219002.jpg', 'en', '2021-06-07 19:30:18', '2021-06-07 19:30:19', 157, 130, 1),
(160, 'cvbcvb', 453645634, 'amd', 1, 'cfgbcfb', 131, 158, 'http://localhost:5000/images/menus/160/image-1623094219168.jpg', 'en', '2021-06-07 19:30:19', '2021-06-07 19:30:19', 157, 130, 1),
(161, 'cvbcvb', 453645634, 'amd', 1, 'cfgbcfb', 131, 158, 'http://localhost:5000/images/menus/161/image-1623094221949.jpg', 'en', '2021-06-07 19:30:21', '2021-06-07 19:30:21', 157, 130, 1),
(162, 'zcvzxcvz', 7897897, 'amd', 1, 'ghjgh', 130, 157, 'http://localhost:5000/images/menus/162/image-1623094291199.jpg', 'en', '2021-06-07 19:31:31', '2021-06-07 19:31:31', 162, 130, 1),
(163, 'rt', 123, 'amd', 1, 'erte', 130, 159, 'http://localhost:5000/images/menus/163/image-1623094348553.jpg', 'en', '2021-06-07 19:32:28', '2021-06-07 19:32:28', 163, 130, 1),
(164, 'rt', 123, 'amd', 1, 'erte', 131, 159, 'http://localhost:5000/images/menus/163/image-1623094348553.jpg', 'en', '2021-06-07 19:32:39', '2021-06-07 19:33:27', 163, NULL, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `qr_order`
--

CREATE TABLE `qr_order` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `restaurantId` bigint(20) UNSIGNED DEFAULT NULL,
  `tables` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`tables`)),
  `template` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Структура таблицы `restaurant`
--

CREATE TABLE `restaurant` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `subName` varchar(255) DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `timing` varchar(255) DEFAULT NULL,
  `userId` bigint(20) UNSIGNED NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `branchId` bigint(20) UNSIGNED DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `restManagerId` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(255) NOT NULL DEFAULT '0.0.0.0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `restaurant`
--

INSERT INTO `restaurant` (`id`, `name`, `subName`, `link`, `phone`, `address`, `timing`, `userId`, `logo`, `cover`, `createdAt`, `updatedAt`, `branchId`, `status`, `restManagerId`, `ip_address`) VALUES
(129, 'asda', 'asdas', 'https://app.slack.com/client/T23L8G084/D01V40U1PMF', '094555777', 'dasdasdasd', '123', 14, 'asdasfdasffa', 'asfasdasfasdfafd', '2021-06-03 17:08:58', '2021-06-14 13:07:45', NULL, 1, 14, '192.168.31.57'),
(130, 'asda', 'sdasdas', 'https://www.vivarobet.am/#/', '094999777', 'asdas', '12312', 14, 'http://localhost:5000/images/restaurants/130/logo-1623093339355.jpg', 'http://localhost:5000/images/restaurants/130/cover-1623093339356.jpg', '2021-06-07 19:15:39', '2021-06-08 12:29:24', 130, 1, NULL, '192.168.31.54'),
(131, 'qwerqwrq', 'ertqewtqwetr', 'https://seemenu.am/https://www.vivarobet.am/#/', '094999777', 'qewrqwertwqetqw', '12312', 14, 'http://localhost:5000/images/restaurants/130/logo-1623093339355.jpg', 'http://localhost:5000/images/restaurants/130/cover-1623093339356.jpg', '2021-06-07 19:29:15', '2021-06-07 20:22:11', 130, 1, NULL, '192.168.100.32'),
(132, 'werwqe', 'sdasdas', 'https://seemenu.am/https://www.vivarobet.am/#/', '094999777', 'qwrqw', '12312', 14, 'http://localhost:5000/images/restaurants/130/logo-1623093339355.jpg', 'http://localhost:5000/images/restaurants/130/cover-1623093339356.jpg', '2021-06-07 20:20:02', '2021-06-07 20:22:16', 130, 1, NULL, '192.168.100.32'),
(133, 'werwqe', 'sdasdas', 'https://seemenu.am/https://seemenu.am/https://www.vivarobet.am/#/', '094999777', 'qwrqw', '12312', 14, 'http://localhost:5000/images/restaurants/130/logo-1623093339355.jpg', 'http://localhost:5000/images/restaurants/130/cover-1623093339356.jpg', '2021-06-07 20:20:04', '2021-06-07 20:21:38', 130, 1, NULL, '192.168.100.32');

-- --------------------------------------------------------

--
-- Структура таблицы `restbelongshidden`
--

CREATE TABLE `restbelongshidden` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `branch` int(11) DEFAULT NULL,
  `category` int(11) DEFAULT NULL,
  `menu` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `restbelongshidden`
--

INSERT INTO `restbelongshidden` (`id`, `branch`, `category`, `menu`, `createdAt`, `updatedAt`) VALUES
(4, 1, 1, 1, '2021-05-24 14:48:38', '2021-05-24 14:48:38'),
(5, 1, 1, 1, '2021-05-26 07:22:22', '2021-05-26 07:22:22'),
(6, NULL, 1, 4, '2021-05-26 07:22:22', '2021-05-26 07:22:22'),
(7, 1, 1, 1, '2021-05-26 07:23:15', '2021-05-26 07:23:15'),
(8, NULL, 1, 4, '2021-05-26 07:23:15', '2021-05-26 07:23:15'),
(9, NULL, 1, 5, '2021-05-26 07:23:15', '2021-05-26 07:23:15'),
(10, NULL, 1, 6, '2021-05-26 07:23:15', '2021-05-26 07:23:15'),
(11, 1, 1, 1, '2021-05-26 07:26:02', '2021-05-26 07:26:02'),
(12, NULL, 1, 4, '2021-05-26 07:26:02', '2021-05-26 07:26:02'),
(13, NULL, 1, 9, '2021-05-26 07:26:02', '2021-05-26 07:26:02'),
(14, NULL, 1, 5, '2021-05-26 07:26:02', '2021-05-26 07:26:02'),
(15, NULL, 1, 6, '2021-05-26 07:26:02', '2021-05-26 07:26:02'),
(16, NULL, 1, 7, '2021-05-26 07:26:02', '2021-05-26 07:26:02'),
(17, NULL, 1, 10, '2021-05-26 07:26:02', '2021-05-26 07:26:02'),
(18, NULL, 1, 8, '2021-05-26 07:26:02', '2021-05-26 07:26:02'),
(19, 1, 1, 1, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(20, NULL, 1, 4, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(21, NULL, 1, 8, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(22, NULL, 1, 7, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(23, NULL, 1, 5, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(24, NULL, 1, 6, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(25, NULL, 1, 9, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(26, NULL, 1, 10, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(27, NULL, 1, 11, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(28, NULL, 1, 12, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(29, NULL, 1, 13, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(30, NULL, 1, 14, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(31, NULL, 1, 15, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(32, NULL, 1, 16, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(33, NULL, 1, 17, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(34, NULL, 1, 18, '2021-05-26 07:27:32', '2021-05-26 07:27:32'),
(35, 1, 1, 1, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(36, NULL, 1, 4, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(37, NULL, 1, 8, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(38, NULL, 1, 7, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(39, NULL, 1, 5, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(40, NULL, 1, 6, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(41, NULL, 1, 10, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(42, NULL, 1, 9, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(43, NULL, 1, 11, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(44, NULL, 1, 12, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(45, NULL, 1, 13, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(46, NULL, 1, 14, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(47, NULL, 1, 15, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(48, NULL, 1, 16, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(49, NULL, 1, 17, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(50, NULL, 1, 18, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(51, NULL, 1, 19, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(52, NULL, 1, 20, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(53, NULL, 1, 21, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(54, NULL, 1, 22, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(55, NULL, 1, 23, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(56, NULL, 1, 24, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(57, NULL, 1, 25, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(58, NULL, 1, 26, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(59, NULL, 1, 27, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(60, NULL, 1, 28, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(61, NULL, 1, 29, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(62, NULL, 1, 30, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(63, NULL, 1, 31, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(64, NULL, 1, 32, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(65, NULL, 1, 33, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(66, NULL, 1, 34, '2021-05-26 07:28:19', '2021-05-26 07:28:19'),
(67, 1, 1, 1, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(68, NULL, 1, 5, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(69, NULL, 1, 10, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(70, NULL, 1, 6, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(71, NULL, 1, 7, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(72, NULL, 1, 8, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(73, NULL, 1, 9, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(74, NULL, 1, 11, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(75, NULL, 1, 12, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(76, NULL, 1, 13, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(77, NULL, 1, 14, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(78, NULL, 1, 15, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(79, NULL, 1, 16, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(80, NULL, 1, 17, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(81, NULL, 1, 18, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(82, NULL, 1, 19, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(83, NULL, 1, 20, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(84, NULL, 1, 21, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(85, NULL, 1, 22, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(86, NULL, 1, 23, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(87, NULL, 1, 24, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(88, NULL, 1, 25, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(89, NULL, 1, 26, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(90, NULL, 1, 27, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(91, NULL, 1, 28, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(92, NULL, 1, 29, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(93, NULL, 1, 30, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(94, NULL, 1, 31, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(95, NULL, 1, 32, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(96, NULL, 1, 33, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(97, NULL, 1, 34, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(98, NULL, 1, 35, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(99, NULL, 1, 36, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(100, NULL, 1, 37, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(101, NULL, 1, 38, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(102, NULL, 1, 39, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(103, NULL, 1, 40, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(104, NULL, 1, 41, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(105, NULL, 1, 42, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(106, NULL, 1, 43, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(107, NULL, 1, 44, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(108, NULL, 1, 45, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(109, NULL, 1, 46, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(110, NULL, 1, 47, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(111, NULL, 1, 48, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(112, NULL, 1, 49, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(113, NULL, 1, 50, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(114, NULL, 1, 51, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(115, NULL, 1, 52, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(116, NULL, 1, 53, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(117, NULL, 1, 54, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(118, NULL, 1, 55, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(119, NULL, 1, 56, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(120, NULL, 1, 57, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(121, NULL, 1, 58, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(122, NULL, 1, 59, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(123, NULL, 1, 60, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(124, NULL, 1, 61, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(125, NULL, 1, 62, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(126, NULL, 1, 63, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(127, NULL, 1, 64, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(128, NULL, 1, 65, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(129, NULL, 1, 66, '2021-05-26 07:34:10', '2021-05-26 07:34:10'),
(130, 1, 1, 1, '2021-05-26 07:37:11', '2021-05-26 07:37:11'),
(131, 1, 1, 1, '2021-05-26 07:37:38', '2021-05-26 07:37:38'),
(132, NULL, 1, 130, '2021-05-26 07:37:38', '2021-05-26 07:37:38'),
(133, 1, 1, 1, '2021-05-27 08:29:36', '2021-05-27 08:29:36'),
(134, 1, 1, 1, '2021-05-27 08:29:48', '2021-05-27 08:29:48'),
(135, 1, 1, 1, '2021-05-27 08:30:04', '2021-05-27 08:30:04'),
(136, 1, 1, 1, '2021-05-27 08:31:12', '2021-05-27 08:31:12'),
(137, NULL, 1, 136, '2021-05-27 08:32:42', '2021-05-27 08:32:42'),
(138, NULL, 1, 136, '2021-05-27 08:39:06', '2021-05-27 08:39:06'),
(139, NULL, 1, 136, '2021-05-27 08:50:51', '2021-05-27 08:50:51'),
(140, NULL, 1, 139, '2021-05-27 08:51:20', '2021-05-27 08:51:20'),
(141, NULL, 1, 140, '2021-05-27 08:52:35', '2021-05-27 08:52:35'),
(142, NULL, 1, 141, '2021-05-27 08:53:29', '2021-05-27 08:53:29'),
(143, NULL, 1, 141, '2021-05-27 08:54:49', '2021-05-27 08:54:49'),
(144, NULL, 1, 143, '2021-05-27 08:55:04', '2021-05-27 08:55:04'),
(145, 130, 159, 163, '2021-06-07 19:32:39', '2021-06-07 19:32:39'),
(146, NULL, 157, NULL, '2021-06-07 20:20:22', '2021-06-07 20:20:22'),
(147, NULL, 157, NULL, '2021-06-07 20:20:25', '2021-06-07 20:20:25'),
(148, NULL, 159, NULL, '2021-06-07 20:21:23', '2021-06-07 20:21:23'),
(149, NULL, 159, NULL, '2021-06-07 20:21:25', '2021-06-07 20:21:25'),
(150, NULL, 159, NULL, '2021-06-07 20:21:25', '2021-06-07 20:21:25'),
(151, NULL, 159, NULL, '2021-06-07 20:21:26', '2021-06-07 20:21:26'),
(152, NULL, 159, NULL, '2021-06-07 20:21:27', '2021-06-07 20:21:27'),
(153, NULL, 159, NULL, '2021-06-07 20:21:27', '2021-06-07 20:21:27'),
(154, NULL, 159, NULL, '2021-06-07 20:21:27', '2021-06-07 20:21:27'),
(155, NULL, 159, NULL, '2021-06-07 20:21:29', '2021-06-07 20:21:29'),
(156, NULL, 159, NULL, '2021-06-07 20:21:40', '2021-06-07 20:21:40'),
(157, NULL, 159, NULL, '2021-06-07 20:21:40', '2021-06-07 20:21:40'),
(158, NULL, 171, NULL, '2021-06-07 20:21:44', '2021-06-07 20:21:44'),
(159, 130, 171, NULL, '2021-06-07 20:21:54', '2021-06-07 20:21:54'),
(160, NULL, 159, NULL, '2021-06-07 20:22:02', '2021-06-07 20:22:02'),
(161, NULL, 159, NULL, '2021-06-07 20:22:02', '2021-06-07 20:22:02'),
(162, NULL, 158, NULL, '2021-06-07 20:22:03', '2021-06-07 20:22:03'),
(163, NULL, 159, NULL, '2021-06-07 20:22:04', '2021-06-07 20:22:04'),
(164, NULL, 158, NULL, '2021-06-07 20:22:06', '2021-06-07 20:22:06');

-- --------------------------------------------------------

--
-- Структура таблицы `table`
--

CREATE TABLE `table` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `number` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `restaurantId` bigint(20) UNSIGNED NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `table`
--

INSERT INTO `table` (`id`, `number`, `link`, `restaurantId`, `createdAt`, `updatedAt`) VALUES
(9, 'zcvzxcvz', 'https://www.vivarobet.am/#//130/9', 130, '2021-06-07 20:19:02', '2021-06-07 20:19:02');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'admin',
  `activation_code` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `managerId` bigint(20) UNSIGNED DEFAULT NULL,
  `user_status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `phone`, `role`, `activation_code`, `status`, `email`, `password`, `createdAt`, `updatedAt`, `managerId`, `user_status`) VALUES
(1, 'Vahe', 'Hakobyan', '098777999', 'admin', '262781cb-50fd-4a59-84ea-cb6c116ffd5f', 'pending', 'vahehakobyan@ghost-.com', 'b53840c841d92788cc42a77b16a36497', '2021-05-06 13:49:27', '2021-05-06 13:50:05', NULL, 1),
(2, 'Vahe', 'Hakob', '098777999', 'admin', 'e5134da3-2f5c-46db-b82a-b25e733cee3d', 'pending', 'vahehakobyan@ghost-services.co', 'b53840c841d92788cc42a77b16a36497', '2021-05-06 13:52:46', '2021-05-06 13:53:14', NULL, 1),
(3, 'Vahe', 'Hakob', '098777999', 'admin', '881ebd3a-eae7-49a5-9c46-e63f068d9e45', 'pending', 'vahekobyan@ghost-services.co', 'b53840c841d92788cc42a77b16a36497', '2021-05-06 13:55:25', '2021-05-06 13:55:45', NULL, 1),
(4, 'Vahe', 'Hakob', '098777999', 'admin', 'fa529662-7a69-454c-a558-59e1b07c5843', 'pending', 'vahekobyan@ghost-servics.co', 'b53840c841d92788cc42a77b16a36497', '2021-05-06 14:03:33', '2021-05-06 14:03:33', NULL, 1),
(5, 'Vahe', 'Hakob', '098777999', 'admin', '49055c5d-86a9-44d4-9524-94ebc216b37f', 'pending', 'vahekobyan@ghost-sevics.co', 'b53840c841d92788cc42a77b16a36497', '2021-05-06 14:07:16', '2021-05-06 14:07:16', NULL, 1),
(6, 'Vahe', 'Hakob', '098777999', 'admin', 'b058c85f-0df2-4787-ad75-bb2ffd1a21df', 'pending', 'vahehakobyan@ghos.com', 'b53840c841d92788cc42a77b16a36497', '2021-05-06 15:21:29', '2021-05-06 15:21:29', NULL, 1),
(7, 'Vahe', 'Hakob', '098777999', 'admin', '71b09aac-5b7a-4bb8-99fe-c33434b0c322', 'pending', '@ghost-services.com', 'b53840c841d92788cc42a77b16a36497', '2021-05-06 15:23:35', '2021-05-06 15:23:35', NULL, 1),
(8, 'Vahe', 'Hakob', '098777999', 'admin', '9a5df46d-467f-4ee6-b263-8bae3fbf272e', 'pending', '@ghostservices.com', 'b53840c841d92788cc42a77b16a36497', '2021-05-06 16:26:49', '2021-05-06 16:26:49', NULL, 1),
(12, 'Vahe', 'Hakob', '098777999', 'admin', '1ef6c8bf-d30c-4dac-8887-e2b0f87098e9', 'pending', 'vahehakobyan@ghost-services.com', 'b53840c841d92788cc42a77b16a36497', '2021-05-07 08:25:32', '2021-05-07 08:25:32', NULL, 1),
(14, 'Vahe', 'Hakob', '098777999', 'admin', '38576067-1553-4f28-a3f2-f23d7c6624bc', 'activated', 'vahe.hakobyan.1997@mail.ru', 'b53840c841d92788cc42a77b16a36497', '2021-05-09 09:40:49', '2021-06-04 10:52:21', NULL, 1),
(45, 'Name', 'Poxosyan', '0', 'manager', '29f0bad4-64f8-408b-95c5-bcdbd4144f71', 'pending', 'vahehakobyan@ghost-servces.com', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:05:45', '2021-06-03 15:05:45', 14, 1),
(46, 'Name', 'Poxosyan', '0', 'manager', '2768dbbb-4616-416c-8dbf-034f9ca69b2b', 'pending', 'ahehakobyan@ghost-servces.com', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:06:27', '2021-06-03 15:06:27', 14, 1),
(47, 'Name', 'Poxosyan', '0', 'manager', '567abc3f-9783-4c7e-b5f0-441fa3994cc4', 'pending', 'hehakobyan@ghost-servces.com', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:08:29', '2021-06-03 15:08:29', 14, 1),
(48, 'Name', 'Poxosyan', '0', 'manager', 'e3c4eb5f-9c1c-40fb-9b7d-da17bdeb7008', 'pending', 'ehakobyan@ghost-servces.com', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:10:50', '2021-06-03 15:10:50', 14, 1),
(49, 'Name', 'Poxosyan', '0', 'manager', '94b21a61-cf9c-432e-94e1-39aa9dfbbaea', 'pending', 'hakobyan@ghost-servces.com', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:12:05', '2021-06-03 15:12:05', 14, 1),
(50, 'Name', 'Poxosyan', '0', 'manager', '14ceea77-55ab-4342-9bee-fe030cad30d5', 'pending', 'hakobyan@ghost-servces.co', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:14:01', '2021-06-03 15:14:01', 14, 1),
(51, 'Name', 'Poxosyan', '0', 'manager', '7937f142-51d0-4d5b-9600-aac8e3fd8d42', 'pending', 'akobyan@ghost-servces.co', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:15:39', '2021-06-03 15:15:39', 14, 1),
(52, 'Name', 'Poxosyan', '0', 'manager', '84c20a81-5e96-49ae-870d-26333bf0723f', 'pending', 'kobyan@ghost-servces.co', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:16:02', '2021-06-03 15:16:02', 14, 1),
(53, 'Name', 'Poxosyan', '094555777', 'manager', 'ceac9c48-68a9-47a0-bdef-1d5a589a534b', 'pending', 'obyan@ghost-servces.co', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:17:44', '2021-06-03 15:17:44', 14, 1),
(54, 'Name', 'Poxosyan', '094555777', 'manager', 'a585d3f8-048a-4d51-9cdf-80e58fa6d37f', 'pending', 'byan@ghost-servces.co', 'b74128fd8cafafe94f4da6a23d7dad69', '2021-06-03 15:19:21', '2021-06-03 15:19:21', 14, 1),
(55, 'sdasdas', 'wasdasda', '094555777', 'admin', '59b74b05-3fc4-4b85-bf67-c2c0b99ea0cd', 'pending', 'asda@mail.ru', '5d9264755c2c8a781b67115ad48e5383', '2021-06-10 13:34:19', '2021-06-10 13:34:19', NULL, 1),
(56, 'Rob', 'Robert', '094888999', 'admin', 'c0a923d3-6ea4-4451-bc61-830d85dbc9de', 'activated', 'rob@mail.ru', 'adf0e52b7f76a486ad864b8896bf8e4a', '2021-06-10 13:36:06', '2021-06-10 14:21:58', NULL, 1),
(57, 'asd', 'asda', '097888999', 'admin', 'd9ce879b-da97-4d7c-ad37-d9e8604dbd8b', 'pending', 'asd@asd.ru', 'adf0e52b7f76a486ad864b8896bf8e4a', '2021-06-10 13:36:46', '2021-06-10 13:36:46', NULL, 1),
(58, 'zcvzxcvz', 'asda', '098888999', 'admin', '60702351-fcb7-47fa-b52d-4647bd9e3c0c', 'pending', 'vahe14@mail.ru', 'adf0e52b7f76a486ad864b8896bf8e4a', '2021-06-10 14:16:26', '2021-06-10 14:16:26', NULL, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `available`
--
ALTER TABLE `available`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurantId` (`restaurantId`),
  ADD KEY `sourceId` (`sourceId`),
  ADD KEY `restBranchId` (`restBranchId`);

--
-- Индексы таблицы `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurantId` (`restaurantId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `sourceId` (`sourceId`),
  ADD KEY `restaurantBranchId` (`restaurantBranchId`);

--
-- Индексы таблицы `qr_order`
--
ALTER TABLE `qr_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurantId` (`restaurantId`);

--
-- Индексы таблицы `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `branchId` (`branchId`),
  ADD KEY `restManagerId` (`restManagerId`);

--
-- Индексы таблицы `restbelongshidden`
--
ALTER TABLE `restbelongshidden`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `table`
--
ALTER TABLE `table`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurantId` (`restaurantId`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `email_19` (`email`),
  ADD UNIQUE KEY `email_20` (`email`),
  ADD UNIQUE KEY `email_21` (`email`),
  ADD UNIQUE KEY `email_22` (`email`),
  ADD UNIQUE KEY `email_23` (`email`),
  ADD UNIQUE KEY `email_24` (`email`),
  ADD UNIQUE KEY `email_25` (`email`),
  ADD UNIQUE KEY `email_26` (`email`),
  ADD UNIQUE KEY `email_27` (`email`),
  ADD UNIQUE KEY `email_28` (`email`),
  ADD UNIQUE KEY `email_29` (`email`),
  ADD UNIQUE KEY `email_30` (`email`),
  ADD UNIQUE KEY `email_31` (`email`),
  ADD UNIQUE KEY `email_32` (`email`),
  ADD UNIQUE KEY `email_33` (`email`),
  ADD UNIQUE KEY `email_34` (`email`),
  ADD UNIQUE KEY `email_35` (`email`),
  ADD UNIQUE KEY `email_36` (`email`),
  ADD UNIQUE KEY `email_37` (`email`),
  ADD UNIQUE KEY `email_38` (`email`),
  ADD UNIQUE KEY `email_39` (`email`),
  ADD UNIQUE KEY `email_40` (`email`),
  ADD UNIQUE KEY `email_41` (`email`),
  ADD UNIQUE KEY `email_42` (`email`),
  ADD UNIQUE KEY `email_43` (`email`),
  ADD UNIQUE KEY `active_code` (`activation_code`),
  ADD KEY `managerId` (`managerId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `available`
--
ALTER TABLE `available`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;

--
-- AUTO_INCREMENT для таблицы `menus`
--
ALTER TABLE `menus`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT для таблицы `qr_order`
--
ALTER TABLE `qr_order`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT для таблицы `restbelongshidden`
--
ALTER TABLE `restbelongshidden`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT для таблицы `table`
--
ALTER TABLE `table`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_74` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_75` FOREIGN KEY (`sourceId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `categories_ibfk_76` FOREIGN KEY (`restBranchId`) REFERENCES `restaurant` (`branchId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `menus`
--
ALTER TABLE `menus`
  ADD CONSTRAINT `menus_ibfk_123` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `menus_ibfk_124` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `menus_ibfk_125` FOREIGN KEY (`sourceId`) REFERENCES `menus` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `menus_ibfk_126` FOREIGN KEY (`restaurantBranchId`) REFERENCES `restaurant` (`branchId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `qr_order`
--
ALTER TABLE `qr_order`
  ADD CONSTRAINT `qr_order_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `restaurant_ibfk_61` FOREIGN KEY (`restManagerId`) REFERENCES `users` (`managerId`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurant_ibfk_62` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurant_ibfk_63` FOREIGN KEY (`branchId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `restaurant_ibfk_64` FOREIGN KEY (`restManagerId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `table`
--
ALTER TABLE `table`
  ADD CONSTRAINT `table_ibfk_1` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`managerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
