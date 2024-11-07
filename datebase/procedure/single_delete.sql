DELIMITER $$
CREATE PROCEDURE single_delete(o_id INT, p_name CHAR(20), c_phone CHAR(10))
BEGIN
	DELETE FROM order_detail WHERE order_id=o_id AND product_id=(SELECT product_id
																 FROM menu
																 WHERE product_name=p_name);
	CALL search_order(c_phone);
END$$
DELIMITER ;