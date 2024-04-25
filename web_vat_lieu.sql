-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 25, 2024 lúc 05:39 PM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `web_vat_lieu`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `CategoryParentId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `CategoryParentId`, `createdAt`, `updatedAt`) VALUES
(1, 'Gạch Lát Nền', 1, '2024-04-24 17:14:18', '2024-04-24 17:14:18'),
(2, 'Gạch Ốp Tường', 1, '2024-04-24 17:14:18', '2024-04-24 17:14:18'),
(3, 'Gương Dây Treo', 2, '2024-04-24 17:15:27', '2024-04-24 17:15:27'),
(4, 'Gương Gắn Tường', 2, '2024-04-24 17:15:27', '2024-04-24 17:15:27'),
(5, 'Gương Led', 2, '2024-04-24 17:17:06', '2024-04-24 17:17:06'),
(6, 'Sàn Gỗ Công Nghiệp', 3, '2024-04-24 17:19:25', '2024-04-24 17:19:25');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category_parents`
--

CREATE TABLE `category_parents` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category_parents`
--

INSERT INTO `category_parents` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Gạch Ốp Lát', '2024-04-24 17:11:27', '2024-04-24 17:11:27'),
(2, 'Gương', '2024-04-24 17:11:27', '2024-04-24 17:11:27'),
(3, 'Sàn Gỗ', '2024-04-24 17:13:29', '2024-04-24 17:13:29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `payment` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `total` float DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `payment`, `status`, `name`, `address`, `phone`, `total`, `UserId`, `createdAt`, `updatedAt`) VALUES
(3, 'Thanh toán Online', 0, 'Phan Tiến Huy', 'Hà Nội', '0986538387', 240000, 2, '2024-04-25 15:37:01', '2024-04-25 15:37:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_products`
--

CREATE TABLE `order_products` (
  `id` int(11) NOT NULL,
  `OrderId` int(11) DEFAULT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `order_products`
--

INSERT INTO `order_products` (`id`, `OrderId`, `ProductId`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, 3, 1, '2024-04-25 14:59:08', '2024-04-25 14:59:08'),
(2, 2, 2, 1, '2024-04-25 15:16:43', '2024-04-25 15:16:43'),
(3, 3, 2, 1, '2024-04-25 15:37:01', '2024-04-25 15:37:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `description` text DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `image`, `price`, `description`, `quantity`, `CategoryId`, `createdAt`, `updatedAt`) VALUES
(1, 'GẠCH BÓNG KÍNH ĐỒNG TÂM 6060DB028-NANO', '/images/products/gach_lat_nen1.png', 276660, 'Gạch Đồng Tâm 6060DB028-NANO là loại gạch pocerlain phủ bột hai lần với vân đá trang trí bề mặt tạo bởi các loại bột màu trộn trong xương gạch không qua phủ men hoặc in ấn nên chịu mài mòn rất tốt, hoàn toàn không bị bong tróc mất màu do ma sát. Kích thước: 600×600 mm', 100, 1, '2024-04-24 17:24:27', '2024-04-24 17:24:27'),
(2, 'GẠCH ĐỒNG CHẤT TAICERA G63025', '/images/products/gach_op_tuong1.png', 240000, 'Mẫu gạch Taicera G63025 là mẫu gạch đồng chất nổi bật trong BST gạch Park Way. Gạch sở hữu gam màu trắng kem rất nhã nhặn. Nó sẽ hoàn thiện không gian vừa sang trọng lại rất thanh lịch. Ngoài ra chất lượng gạch tuyệt vời cũng bảo đảm công trình thi công thật vững chắc.', 100, 2, '2024-04-24 17:27:47', '2024-04-24 17:27:47'),
(3, 'GƯƠNG LED TRÒN DÂY TREO LD', '/images/products/guong_day_treo1.png', 1620000, 'Quy cách: 600×600 mm Gương led hình tròn có dây treo tượng tường tiện lợi. Khung viền đen chắc chắn. Gương sử dụng nguyên liệu thân thiện an toàn với con người, môi trường. Được gia công sản xuất theo công nghệ tiên tiến, đảm bảo tuân thủ theo các tiêu chuẩn Quốc tế', 10, 3, '2024-04-24 17:30:47', '2024-04-24 17:30:47'),
(4, 'GƯƠNG TRÒN GẮN TƯỜNG G12', '/images/products/guong_gan_tuong1.png', 630000, 'Quy cách: 220x110x200x310 mm. Thân gương có thể kéo di chuyển tiện lợi. Gương tròn gắn tường. Gương sử dụng nguyên liệu thân thiện an toàn với con người, môi trường. Được gia công sản xuất theo công nghệ tiên tiến, đảm bảo tuân thủ theo các tiêu chuẩn Quốc tế', 100, 4, '2024-04-24 17:34:43', '2024-04-24 17:34:43'),
(5, 'GƯƠNG LED BODY ÁNH SÁNG NGOÀI GLASSO M35R74', '/images/products/guong_led1.png', 4090000, 'Quy cách: 600×1600 mm. LED: 3 màu, CCT Warm White (2700K) – Cool White (6500K) – Natural White (4000K).Góc chiếu 120 độ\r\nThời gian chiếu sáng lên đến 36.000 giờ\r\nNguồn: 60W, Input Voltage: 100V – 240V, Output Voltage: 12V .Khung LED: nhôm cao cấp mạ Anode độc quyền.Thành phần gương không chứa đồng và hàm lượng chì được giảm đáng kể (< 5%).Tính năng: Cảm ứng không chạm tắt mở, đổi màu led và tăng giảm độ sáng.', 100, 5, '2024-04-24 17:37:32', '2024-04-25 15:29:09'),
(6, 'SÀN GỖ TARKETT ELEGENT WALNUT NON EIR', '/images/products/san_go1.png', 495000, '- Collection: Pure 832\r\n- Kích Thước: 1207x192x8 mm\r\n- Độ dày: 8 mm\r\n- Tiêu chuẩn: Super E0-Class 32\r\n- Quy cách đóng gói: 10 tấm/ Thùng\r\n- Không vát cạnh (0V)', 100, 6, '2024-04-24 17:41:16', '2024-04-24 17:41:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `rates`
--

CREATE TABLE `rates` (
  `id` int(11) NOT NULL,
  `ProductId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  `OrderId` int(11) DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'Full Roles', '2024-04-25 16:09:03', '2024-04-25 16:09:03'),
(2, 'Customer', 'No Roles', '2024-04-25 16:09:03', '2024-04-25 16:09:03');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230908053145-create-user.js'),
('20230908054238-create-role.js'),
('20230909134515-create-product.js'),
('20230909135346-create-category.js'),
('20230915134636-create-order.js'),
('20230915141039-create-order-product.js'),
('20230922131308-create-rate.js'),
('20230924141132-create-order.js'),
('20231214142913-create-category-parent.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `username`, `password`, `phone`, `RoleId`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', 'admin@gmail.com', 'admin', '$2b$10$KJLeL4PiLrAZXUApew3WwuB.XkTccY9RWYBhraryt.t17SN1.xxmq', '0986538387', 1, '2024-04-25 14:35:46', '2024-04-25 14:35:46'),
(2, 'Phan Tiến Huy', 'huyphan1232002@gmail.com', 'phantienhuy', '$2b$10$WE6TZ1/Jm0POzZa.hrjhTeWFu7fKVso8GDPztTO6Wkk2hSlsUR3uC', '0986538388', 2, '2024-04-25 14:58:30', '2024-04-25 14:58:30');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `category_parents`
--
ALTER TABLE `category_parents`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `rates`
--
ALTER TABLE `rates`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `category_parents`
--
ALTER TABLE `category_parents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `rates`
--
ALTER TABLE `rates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
