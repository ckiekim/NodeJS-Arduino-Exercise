package photo;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet("/photo/*")
public class PhotoController extends HttpServlet {
	private static final Logger log = LoggerFactory.getLogger(PhotoController.class);
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uri = request.getRequestURI();
		log.debug("PhotoController : uri = " + uri);
		
		response.sendRedirect("../view/photoList.jsp");
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String uri = request.getRequestURI();
		log.debug("PhotoController : uri = " + uri);		
		
		if (uri.indexOf("proc.do") != -1) {
			request.setCharacterEncoding("utf-8");
			String building = request.getParameter("building");
			String story = request.getParameter("story");
			String bedNo = request.getParameter("bedNo");
			String description = building + "동, " + story + "층, " + bedNo;
	
			HandlePicture hp = new HandlePicture();
			String fname = hp.getRemoteFile(building, story, bedNo);
			
			if (fname != null) {
				PictureDAO pdao = new PictureDAO();
				PictureDTO pdto = new PictureDTO(fname, description);
				pdao.pictureSetValue(pdto);
			}
			response.sendRedirect("../view/photoList.jsp");
		}
	}
}
