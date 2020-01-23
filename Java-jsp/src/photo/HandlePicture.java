package photo;

import java.awt.image.BufferedImage;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mortennobel.imagescaling.AdvancedResizeOp;
import com.mortennobel.imagescaling.ResampleOp;

public class HandlePicture {
	private static final Logger log = LoggerFactory.getLogger(HandlePicture.class);
	static final String picPre = "C:/Workspace/Pictures/pictures/p";
	static final String thumbPre = "C:/Workspace/Pictures/thumbs/t";
	static final String fileType = "jpg";
	static final String fileExt = ".jpg";
	static final int thumbWidth = 96;
	
	public String getRemoteFile(String building, String story, String bedNo) {
		log.debug("getRemoteFile() is called: " + building + ", " + story + ", " + bedNo);
		try {
			byte[] buffer = new byte[1024];
			Socket client = new Socket("192.168.0.36", 7521);
			InputStream is = client.getInputStream();
			OutputStream os = client.getOutputStream();
			byte[] receiveBuffer = new byte[24];

			String sendDataString = "GPIC    ";
			os.write(sendDataString.getBytes());

			is.read(receiveBuffer);
			String line = new String(receiveBuffer);
			String fname = line.substring(0, 14).trim();
			String flen = line.substring(15, 23).trim();
			int dlen = Integer.parseInt(flen);
			System.out.println(fname + ", " + dlen);
			
			FileOutputStream fos = new FileOutputStream(new File(picPre + fname + fileExt));

			int len;
			int total_read = 0;
			while ((len = is.read(buffer)) != -1) {
				fos.write(buffer, 0, len);
				total_read += len;
			}
			log.debug("Total read = " + total_read);
			fos.flush();
			fos.close();
			is.close();
			os.close();
			client.close();
			makeThumbnail(fname);		
			return fname;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public static void makeThumbnail(String srcName) {		 
		File srcFile = new File(picPre + srcName + fileExt);
		try {
			BufferedImage srcFileBuffer = ImageIO.read(srcFile) ;			
			int srcWidth = srcFileBuffer.getWidth();
			int srcHeight = srcFileBuffer.getHeight();
			int thumbHeight = srcHeight * thumbWidth / srcWidth;

			ResampleOp resampleOp = new ResampleOp(thumbWidth, thumbHeight) ;
			resampleOp.setUnsharpenMask(AdvancedResizeOp.UnsharpenMask.Soft);
			BufferedImage rescaledImage = resampleOp.filter(srcFileBuffer, null);

			File thumbFile =  new File(thumbPre + srcName + fileExt);
			ImageIO.write(rescaledImage, fileType, thumbFile);		
			log.debug(thumbFile.getName() + " thumbnail file is created!!!");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
