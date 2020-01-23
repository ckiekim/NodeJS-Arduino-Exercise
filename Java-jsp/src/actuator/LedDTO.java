package actuator;

import common.*;

public class LedDTO {
	private int id;
	private String write_date;
	private int red;
	private int green;
	private int blue;
	private String remark;
	
	public LedDTO() {
	}
	public LedDTO(int red, int green, int blue, String remark) {
		this.write_date = Utilities.getCurrentTime();
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.remark = remark;
	}
	@Override
	public String toString() {
		return "LedDTO [id=" + id + ", write_date=" + write_date + ", red=" + red + ", green=" + green + ", blue="
				+ blue + ", remark=" + remark + "]";
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getWrite_date() {
		return write_date;
	}
	public void setWrite_date(String write_date) {
		this.write_date = write_date;
	}
	public int getRed() {
		return red;
	}
	public void setRed(int red) {
		this.red = red;
	}
	public int getGreen() {
		return green;
	}
	public void setGreen(int green) {
		this.green = green;
	}
	public int getBlue() {
		return blue;
	}
	public void setBlue(int blue) {
		this.blue = blue;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
}
