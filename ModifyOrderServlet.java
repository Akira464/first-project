
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.*;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.json.*;

@WebServlet("/doModify")
public class ModifyOrderServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		BufferedReader reader = request.getReader();
		StringBuilder sb = new StringBuilder();
		String line;
		String sql;
		Connection conn = null;

		while ((line = reader.readLine()) != null) {
			sb.append(line);
		}
		reader.close();
		if (sb.length() != 0) {
			CallableStatement cstmt = null;

			try {
				JSONObject jobj = new JSONObject(sb.toString());

				try {
					InitialContext initContext = new InitialContext();
					Context context = (Context) initContext.lookup("java:comp/env");
					DataSource ds = (DataSource) context.lookup("jdbc/project");
					conn = ds.getConnection();
					cstmt = conn.prepareCall("{CALL single_add(?, ?, ?, ?, ?, ?)}");
					cstmt.setInt(1, jobj.getInt("id"));
					cstmt.setInt(2, jobj.getInt("name"));
					cstmt.setString(3, jobj.getString("item"));
					cstmt.setString(4, jobj.getString("add"));
					cstmt.setInt(5, jobj.getInt("quantity"));
					cstmt.setInt(6, jobj.getInt("price"));
					cstmt.executeUpdate();

					cstmt.close();
					conn.close();
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			} catch (JSONException e) {

				System.out.println(e.getMessage());
			}
		} else {
			sql = "SELECT product_id, product_name, product_price FROM menu;";

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
					jsonObj.put("product_id", rs.getInt("product_id"));
					jsonObj.put("product_name", rs.getString("product_name"));
					jsonObj.put("product_price", rs.getInt("product_price"));

					jsonAry.put(jsonObj);
				}
//				System.out.println(jsonAry);
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

	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request, response);
	}

}
