DELIMITER $$
CREATE TRIGGER insert_into_check AFTER INSERT ON order_od
FOR EACH ROW
BEGIN
    INSERT INTO order_check (order_id) VALUES (NEW.order_id);
END $$
DELIMITER ;