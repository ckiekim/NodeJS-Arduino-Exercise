package weather;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet("/weather/*")
public class WeatherController extends HttpServlet {
	private static final Logger log = LoggerFactory.getLogger(WeatherController.class);

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uri = request.getRequestURI();
		log.debug("WeatherController : uri = " + uri);	
		
		if (uri.indexOf("forecast.do") != -1) {
			ForecastTownParser parser = new ForecastTownParser();
			parser.getTownForecastFromJSON();
			
			response.sendRedirect("../view/forecastView.jsp");
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
