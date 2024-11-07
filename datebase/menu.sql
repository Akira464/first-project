CREATE TABLE `menu` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) NOT NULL,
  `product_price` int NOT NULL,
  `block` varchar(45) NOT NULL,
  PRIMARY KEY (`product_id`)
)

INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (1,'奶油鮭魚(魚卵)',160,'A');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (2,'奶油鮮蝦(魚卵)',150,'A');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (3,'奶油南瓜雞肉',145,'A');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (4,'奶油野菇雞肉',135,'A');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (5,'奶油蛤蜊',120,'A');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (6,'番茄鮮蝦',150,'B');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (7,'番茄海鮮',145,'B');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (8,'番茄奶油鮪魚',115,'B');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (9,'青醬海鮮',145,'C');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (10,'青醬蛤蜊',140,'C');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (11,'青醬雞肉',120,'C');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (12,'蒜辣鮮蝦',145,'D');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (13,'蒜辣蛤蜊',120,'D');
INSERT INTO `menu` (`product_id`,`product_name`,`product_price`,`block`) VALUES (14,'蒜辣雞肉',120,'D');