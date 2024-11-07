DELIMITER $$
CREATE PROCEDURE show_order()
BEGIN
	SELECT po.order_id, pc.customer_name, pc.customer_phone, pm.product_name, 
		   pd.order_item, pd.order_add, pd.order_quantity, po.order_way, po.order_date, po.order_time, pc.customer_address, pd.price, oc.order_state
	FROM project.customers pc LEFT JOIN project.order_od po ON po.customer_id=pc.customer_id
							  LEFT JOIN project.order_detail pd ON po.order_id=pd.order_id
							  LEFT JOIN project.menu pm ON pd.product_id=pm.product_id
							  LEFT JOIN project.order_check oc ON po.order_id=oc.order_id;
END$$
DELIMITER ;