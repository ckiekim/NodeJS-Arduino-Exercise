package sensor;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet("/sensor/*")
public class SensorController extends HttpServlet {
	private static final Logger log = LoggerFactory.getLogger(SensorController.class);
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uri = request.getRequestURI();
		log.debug("SensorController : uri = " + uri);
		
		if (uri.indexOf("get.do") != -1) {	
			DeviceComm dc = new DeviceComm();
			if (dc.getRawData()) {
				log.debug(dc.toString());
			 	DeviceDAO dao = new DeviceDAO();
				DeviceDTO dto = new DeviceDTO(dc.getTemp(), dc.getHumid(), dc.getPhoto(), dc.getDist());
				dao.deviceSetValue(dto);
			}
			log.debug("센서값이 기준 범위를 벗어났습니다.");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			out.println("<script type='text/javascript'>");
			out.println("alertify.alert('센서값이 기준 범위를 벗어났습니다.\\n센서값을 확인하세요.');");
			out.println("history.back()");
			out.println("</script>");
			out.flush();
			return;
			//response.sendRedirect("../view/main.jsp");
		}	
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
