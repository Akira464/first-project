DELIMITER $$
CREATE PROCEDURE search_order(IN c_phone CHAR(10))
BEGIN
	SELECT po.order_id, pc.customer_name, pc.customer_phone, pm.product_name, 
		   pd.order_item, pd.order_add, pd.order_quantity, po.order_way, po.order_date, po.order_time, pc.customer_address, pd.price, oc.order_state
	FROM project.order_od po 
		 JOIN project.order_detail pd ON po.order_id=pd.order_id 
		 JOIN project.customers pc ON po.customer_id=pc.customer_id 
		 JOIN project.menu pm ON pd.product_id=pm.product_id
         JOIN project.order_check oc ON po.order_id=oc.order_id
	WHERE pc.customer_phone = (SELECT customer_phone 
							   FROM project.customers 
							   WHERE customer_phone=c_phone);
END$$
DELIMITER ;