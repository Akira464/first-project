CREATE TABLE `order_check` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_state` char(10) DEFAULT '未結帳',
  PRIMARY KEY (`order_id`),
  CONSTRAINT `order_check_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_od` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE
)


INSERT INTO `` (`order_id`,`order_state`) VALUES (1,'未結帳');
INSERT INTO `` (`order_id`,`order_state`) VALUES (2,'未結帳');
INSERT INTO `` (`order_id`,`order_state`) VALUES (3,'未結帳');