CREATE TABLE `order_od` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `order_way` varchar(10) NOT NULL,
  `order_date` varchar(20) NOT NULL,
  `order_time` varchar(20) NOT NULL,
  PRIMARY KEY (`order_id`,`customer_id`),
  KEY `fk_customer_id` (`customer_id`),
  CONSTRAINT `fk_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE
) 


INSERT INTO `order_od` (`order_id`,`customer_id`,`order_way`,`order_date`,`order_time`) VALUES (1,1,'0','2024-06-18','13:15');
INSERT INTO `order_od` (`order_id`,`customer_id`,`order_way`,`order_date`,`order_time`) VALUES (2,2,'0','2024-06-18','15:30');