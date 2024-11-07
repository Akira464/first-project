CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `customer_phone` varchar(10) NOT NULL,
  `customer_name` varchar(35) NOT NULL,
  `customer_address` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`customer_id`)
)

INSERT INTO `customers` (`customer_id`,`customer_phone`,`customer_name`,`customer_address`) VALUES (1,'0911333555','Tom','台北市');
INSERT INTO `customers` (`customer_id`,`customer_phone`,`customer_name`,`customer_address`) VALUES (2,'0922123456','David','桃園市');
