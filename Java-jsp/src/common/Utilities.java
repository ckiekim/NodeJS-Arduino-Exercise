package common;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Utilities {
	private static final Logger log = LoggerFactory.getLogger(Utilities.class);
	
	public static String getCurrentTime() {	
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String currTime = sdf.format(cal.getTime());
		log.debug(currTime);
		return currTime;
	}
	public static String makeDate(String name) {
		String date = name.substring(0,4) + "-" + name.substring(4,6) + "-" + name.substring(6,8) + " " + 
					name.substring(8,10) + ":" + name.substring(10,12) + ":" + name.substring(12);	
		return date;
	}
}
