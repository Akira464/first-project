

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/doLogin")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String filename = "login.txt";
		request.setCharacterEncoding("utf-8");
		String username = request.getParameter("username");
		String passwd = request.getParameter("password");
		
		BufferedReader input = new BufferedReader(new FileReader(filename));
		String str = input.readLine();
		String[] user = str.split(" ");
		String usr = user[0];
		String pwd = user[1];
		input.close();
		
		if(username.equals(usr) && passwd.equals(pwd))
		{
			response.sendRedirect("ordermanage.html");
		}
		else
			response.sendRedirect("backlogin.html");
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
		
	}

}
