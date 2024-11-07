DELIMITER $$
CREATE PROCEDURE single_add(o_id INT, p_id INT, o_item CHAR(10), o_add CHAR(45), o_quantity INT, o_price INT)
BEGIN
	DECLARE order_exists INT;
    SELECT COUNT(*) INTO order_exists FROM order_detail WHERE order_id = o_id AND product_id = p_id;
    IF order_exists > 0 THEN
		UPDATE order_detail 
        SET order_item = o_item, order_add = o_add, order_quantity = o_quantity, price = o_price
        WHERE order_id = o_id AND product_id = p_id;
	ELSE
		INSERT INTO order_detail VALUES(o_id, p_id, o_item, o_add, o_quantity, o_price);
	END IF;
END$$
DELIMITER ;