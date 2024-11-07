CREATE TABLE `order_detail` (
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `order_item` varchar(10) NOT NULL,
  `order_add` varchar(10) DEFAULT NULL,
  `order_quantity` int NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  CONSTRAINT `fk_order_detail` FOREIGN KEY (`order_id`) REFERENCES `order_od` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
)

INSERT INTO `order_detail` (`order_id`,`product_id`,`order_item`,`order_add`,`order_quantity`,`price`) VALUES (1,1,'0','0',1,160);
INSERT INTO `order_detail` (`order_id`,`product_id`,`order_item`,`order_add`,`order_quantity`,`price`) VALUES (1,3,'0','0',1,145);
INSERT INTO `order_detail` (`order_id`,`product_id`,`order_item`,`order_add`,`order_quantity`,`price`) VALUES (2,13,'0','0',1,120);
INSERT INTO `order_detail` (`order_id`,`product_id`,`order_item`,`order_add`,`order_quantity`,`price`) VALUES (2,14,'0','0',1,120);