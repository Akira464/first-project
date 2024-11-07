
import java.io.IOException;

import javax.naming.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.json.*;
import java.sql.*;

@WebServlet("/doSearch")
public class OrderServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String phone = request.getParameter("customer_phone");
		String id = request.getParameter("order_id");	
		String name = request.getParameter("product_name");
		String sql = "";

		if (phone == null && id == null) {
			sql = "CALL show_order();"; // 顯示全部的訂單
		} else if (phone != null && id == null) {
			sql = "CALL search_order('" + phone + "');"; // 查詢單筆訂單
		} else if (name != null) {
			sql = "CALL single_delete(" + id + ",'" + name + "','" + phone + "');"; // 刪除單筆訂單的單筆資料
		} else {
			sql = "CALL checkout(" + id + ",'" + phone + "');"; // 結帳
		}

		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;

		try {
			InitialContext initContext = new InitialContext();
			Context context = (Context) initContext.lookup("java:comp/env");
			DataSource ds = (DataSource) context.lookup("jdbc/project");
			conn = ds.getConnection();
			stmt = conn.createStatement();
			rs = stmt.executeQuery(sql);

			JSONArray jsonAry = new JSONArray();
			while (rs.next()) {
				JSONObject jsonObj = new JSONObject();

				jsonObj.put("order_id", rs.getInt("order_id"));
				jsonObj.put("customer_name", rs.getString("customer_name"));
				jsonObj.put("customer_phone", rs.getString("customer_phone"));
				jsonObj.put("product_name", rs.getString("product_name"));
				jsonObj.put("order_item", rs.getString("order_item"));
				jsonObj.put("order_add", rs.getString("order_add"));
				jsonObj.put("order_quantity", rs.getString("order_quantity"));
				jsonObj.put("order_way", rs.getString("order_way"));
				jsonObj.put("order_date", rs.getString("order_date"));
				jsonObj.put("order_time", rs.getString("order_time"));
				jsonObj.put("customer_address", rs.getString("customer_address"));
				jsonObj.put("price", rs.getInt("price"));
				jsonObj.put("order_state", rs.getString("order_state"));

				jsonAry.put(jsonObj);
			}

			response.setContentType("application/json");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(jsonAry.toString());
			stmt.close();
			rs.close();
			conn.close();

		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
