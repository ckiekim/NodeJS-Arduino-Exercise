package common;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebServlet("/common/FileImageServlet")
public class FileImageServlet extends HttpServlet {
	private static final Logger log = LoggerFactory.getLogger(FileImageServlet.class);

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		BufferedInputStream input = null;
        BufferedOutputStream output = null;
        try {
        	String fname = request.getParameter("file");
        	
        	File file = new File("C:/Workspace/Pictures/pictures/p" + fname + ".jpg");
        	int length = (int)file.length();
        	log.debug("File Length = " + length);
        	response.setContentType("image/jpeg");
            response.setContentLength(length);
            response.setHeader("Content-Disposition", "inline; filename=\"p" + fname + ".jpg\"");
            
        	FileInputStream fis = new FileInputStream(file);
        	input = new BufferedInputStream(fis);
            output = new BufferedOutputStream(response.getOutputStream());
            byte[] buffer = new byte[4096];
            while ((length = input.read(buffer)) > 0) {
                output.write(buffer, 0, length);
            }
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (output != null) output.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
			try {
				if (input != null) output.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
}
