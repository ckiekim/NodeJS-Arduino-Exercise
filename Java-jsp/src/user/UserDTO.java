package user;

public class UserDTO {
	private String uid;
	private String name;
	private String password;
	private String authority;
	private String telno;
	
	public UserDTO() {
	}
	public UserDTO(String uid, String name, String password, String authority, String telno) {
		super();
		this.uid = uid;
		this.name = name;
		this.password = password;
		this.authority = authority;
		this.telno = telno;
	}

	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	public String getTelno() {
		return telno;
	}
	public void setTelno(String telno) {
		this.telno = telno;
	}
	@Override
	public String toString() {
		return "UserDTO [uid=" + uid + ", name=" + name + ", authority=" + authority + ", telno=" + telno + "]";
	}
}
