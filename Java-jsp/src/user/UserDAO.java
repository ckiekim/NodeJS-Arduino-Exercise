package user;

import java.sql.*;

import org.mindrot.jbcrypt.BCrypt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import common.*;

public class UserDAO {
	private static final Logger log = LoggerFactory.getLogger(UserDAO.class);

	public UserDTO userGetValue(String uid) {
		UserDTO dto = new UserDTO();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			conn = DB.dbConn();
			String sql = "select * from user_table where uid = ?";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, uid);
			rs = pstmt.executeQuery();
			if (rs.next()) {
				dto.setUid(rs.getString("uid"));
				dto.setName(rs.getString("name"));
				dto.setPassword(rs.getString("password"));
				dto.setAuthority(rs.getString("authority"));
				dto.setTelno(rs.getString("telno"));
			} else {
				dto.setUid("");
			}
		} catch (Exception e) {
			log.error("Exception occurred.");
			e.printStackTrace();
		} finally {
			try {
				if (rs != null) rs.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
			try {
				if (pstmt != null) pstmt.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
			try {
				if (conn != null) conn.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
		return dto;
	}
	
	public void userChangePassword(String uid, String password) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		BCrypt bc = new BCrypt();
		
		try {
			conn = DB.dbConn();
			String sql = "update user_table set password = ? where uid = ?";
			String hashedPassword = bc.hashpw(password, bc.gensalt(12));
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, hashedPassword);
			pstmt.setString(2, uid);
			pstmt.executeUpdate();
		} catch (Exception e) {
			log.error("Exception occurred.");
			e.printStackTrace();
		} finally {
			try {
				if (pstmt != null) pstmt.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
			try {
				if (conn != null) conn.close();
			} catch (Exception e2) {
				e2.printStackTrace();
			}
		}
	}
}
