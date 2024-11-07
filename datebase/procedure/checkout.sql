DELIMITER $$
CREATE PROCEDURE checkout(o_id INT, c_phone CHAR(10))
BEGIN
	UPDATE order_check SET order_state="已結帳" WHERE order_id=o_id;
    CALL search_order(c_phone);
END $$
DELIMITER ;