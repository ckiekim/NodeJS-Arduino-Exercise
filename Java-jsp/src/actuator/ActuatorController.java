package actuator;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet("/actuator/*")
public class ActuatorController extends HttpServlet {
	private static final Logger log = LoggerFactory.getLogger(ActuatorController.class);
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uri = request.getRequestURI();
		log.debug("ActuatorController : uri = " + uri);
		
		if (uri.indexOf("led.do") != -1) {
			request.setCharacterEncoding("utf-8");
			String red = request.getParameter("redColor");
			String green = request.getParameter("greenColor");
			String blue = request.getParameter("blueColor");
			String remark = request.getParameter("remark");

			int redVal = Integer.parseInt(red);
			int greenVal = Integer.parseInt(green);
			int blueVal = Integer.parseInt(blue);
			
			ControlLED cl = new ControlLED();
			cl.sendRawData(red, green, blue);
			
			LedDAO dao = new LedDAO();
			LedDTO dto = new LedDTO(redVal, greenVal, blueVal, remark);
			dao.ledSetValue(dto);
			log.debug(dto.toString());
			response.sendRedirect("../view/main.jsp");
		}
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		super.doPost(request, response);
	}
}
