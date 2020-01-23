package actuator;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ControlLED {
	private static final Logger log = LoggerFactory.getLogger(ControlLED.class);
	
	public void sendRawData(String red, String green, String blue) {
		try {
			Socket client = new Socket("192.168.0.36", 7521);
			InputStream is = client.getInputStream();
			OutputStream os = client.getOutputStream();
			byte[] receiveBuffer = new byte[20];
			
			String sendDataString = "SLED" + make4Chars(red) + make4Chars(green) + make4Chars(blue);
			log.debug(sendDataString);
			os.write(sendDataString.getBytes());			
			is.read(receiveBuffer);
			String line = new String(receiveBuffer);
			log.debug(line);
			
			client.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private String make4Chars(String s) {
		String command = null;
		switch (s.length()) {
		case 1:
			command = new String("   " + s);
			break;
		case 2:
			command = new String("  " + s);
			break;
		case 3:
			command = new String(" " + s);
			break;
		}
		return command;
	}
}
