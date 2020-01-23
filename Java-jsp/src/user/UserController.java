package user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import sun.print.PrinterJobWrapper;

@WebServlet("/user/*")
public class UserController extends HttpServlet {
	private static final Logger log = LoggerFactory.getLogger(UserController.class);
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uri = request.getRequestURI();
		log.debug("UserController : uri = " + uri);
		HttpSession session = request.getSession();
		UserDAO dao = new UserDAO();
		BCrypt bc = new BCrypt();
		ServletContext context = this.getServletContext();
		
		if (uri.indexOf("logout.do") != -1) {	// logout 처리
			session.removeAttribute("uid");
			session.removeAttribute("name");			
			response.sendRedirect("../view/loginForm.jsp");
		} else if (uri.indexOf("login.do") != -1) {			// login 처리
			String uid = request.getParameter("uid");
			String password = request.getParameter("password");
			log.debug("id = " + uid);
			
			UserDTO dto = dao.userGetValue(uid);
			if (uid.equals(dto.getUid())) {
				if (bc.checkpw(password, dto.getPassword())) {
					log.debug("Password check result is true!");  
					session.setAttribute("uid", uid);
					session.setAttribute("name", dto.getName());
/*					RequestDispatcher view = context.getRequestDispatcher("/view/mainView.jsp");
					view.forward(request, response);*/
					response.sendRedirect("../view/mainView.jsp");
					return;
				}
			}
			log.debug("UID is wrong or Password check result is false!");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			out.println("<script type='text/javascript'>");
			out.println("alert('로그인에 실패하였습니다.\\n아이디와 비밀번호를 확인하세요.');");
			out.println("history.back()");
			out.println("</script>");
			out.flush();
			return;
		} else if (uri.indexOf("password.do") != -1) {		// password 변경 처리
			String uid = request.getParameter("uid");
			Boolean firstTime = false;
			log.debug("id = " + uid);
			UserDTO dto = dao.userGetValue(uid);
			if (dto.getUid().length() < 6) {
				log.debug("Changing password is failed! uid is wrong.");
				response.setCharacterEncoding("UTF-8");
				PrintWriter out = response.getWriter();
				out.println("<script type='text/javascript'>");
				out.println("alert('패스워드 변경에 실패하였습니다.\\n아이디를 확인하세요.');");
				out.println("history.back()");
				out.println("</script>");
				out.flush();
				return;
			}
			String oldPassword = request.getParameter("oldPassword");
			String password = request.getParameter("password");
			String password2 = request.getParameter("password2");
			if (oldPassword.equals(" ") && dto.getPassword().equals(" ")) {
				firstTime = true;
				log.debug("Set firstTime true.");
			}
			if (firstTime && password.equals(password2)) {
				dao.userChangePassword(uid, password);
				response.sendRedirect("../view/loginForm.jsp");			
			} else if (bc.checkpw(oldPassword, dto.getPassword()) && password.equals(password2)) {
				dao.userChangePassword(uid, password);
				response.sendRedirect("../view/loginForm.jsp");
			} else {
				log.debug("Changing password is failed! One of the Passwords is wrong.");
				response.setCharacterEncoding("UTF-8");
				PrintWriter out = response.getWriter();
				out.println("<script type='text/javascript'>");
				out.println("alert('패스워드 변경에 실패하였습니다.\\n패스워드를 확인하세요.');");
				out.println("history.back()");
				out.println("</script>");
				out.flush();
				return;
			}
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
