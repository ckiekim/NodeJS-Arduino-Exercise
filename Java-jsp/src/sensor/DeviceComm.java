package sensor;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class DeviceComm {
	private float temp;
	private float humid;
	private int photo;
	private int dist;
	
	public DeviceComm() {
	}
	public float getTemp() {
		return temp;
	}
	public float getHumid() {
		return humid;
	}
	public int getPhoto() {
		return photo;
	}
	public int getDist() {
		return dist;
	}

	public void setTemp(float temp) {
		this.temp = temp;
	}
	public void setHumid(float humid) {
		this.humid = humid;
	}
	public void setPhoto(int photo) {
		this.photo = photo;
	}
	public void setDist(int dist) {
		this.dist = dist;
	}
	
	@Override
	public String toString() {
		return "DeviceComm [temp=" + temp + ", humid=" + humid + ", photo=" + photo + ", dist=" + dist + "]";
	}
	
	public Boolean getRawData() {
		Boolean result = false;
		try {
			Socket client = new Socket("192.168.0.36", 7521);
			InputStream is = client.getInputStream();
			OutputStream os = client.getOutputStream();
			byte[] receiveBuffer = new byte[40];
			ArrayList<String> al = new ArrayList<String>();
			
			String sendDataString = "GALL    ";
			os.write(sendDataString.getBytes());
			
			is.read(receiveBuffer);
			String line = new String(receiveBuffer);
			System.out.println(line);
			if (line.indexOf("NOT") != -1) {
				client.close();
				return false;
			}
			StringTokenizer st = new StringTokenizer(line);
	        while (st.hasMoreTokens()) {
	            al.add(st.nextToken());
	        }
	        System.out.println(al);
            setTemp(Float.parseFloat(al.get(0)));
            setHumid(Float.parseFloat(al.get(1)));
            setPhoto(Integer.parseInt(al.get(2)));
            setDist(Integer.parseInt(al.get(3).trim()));
            result = true;
			client.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}
}
