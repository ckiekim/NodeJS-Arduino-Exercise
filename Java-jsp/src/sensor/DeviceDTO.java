package sensor;

import common.*;

public class DeviceDTO {
	private int id;
	private String timestamp;
	private float temperature;
	private float humidity;
	private int photocell;
	private int distance;
	
	public DeviceDTO() {
	}
	
	public DeviceDTO(float temperature, float humidity, int photocell, int distance) {
		this.timestamp = Utilities.getCurrentTime();
		this.temperature = temperature;
		this.humidity = humidity;
		this.photocell = photocell;
		this.distance = distance;
	}

	@Override
	public String toString() {
		return "DeviceDTO [id=" + id + ", timestamp=" + timestamp + ", temperature=" + temperature + ", humidity="
				+ humidity + ", photocell=" + photocell + ", distance=" + distance + "]";
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public float getTemperature() {
		return temperature;
	}
	public void setTemperature(float temperature) {
		this.temperature = temperature;
	}
	public float getHumidity() {
		return humidity;
	}
	public void setHumidity(float humidity) {
		this.humidity = humidity;
	}
	public int getPhotocell() {
		return photocell;
	}
	public void setPhotocell(int photocell) {
		this.photocell = photocell;
	}
	public int getDistance() {
		return distance;
	}
	public void setDistance(int distance) {
		this.distance = distance;
	}
}
