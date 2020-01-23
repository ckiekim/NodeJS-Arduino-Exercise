package actuator;

import java.sql.*;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import common.*;

public class LedDAO {
	private static final Logger log = LoggerFactory.getLogger(LedDAO.class);
	
	public LedDTO ledGetValue() {
		LedDTO dto = new LedDTO();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			conn = DB.dbConn();
			String sql = "select * from led_table order by id desc limit 1";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				dto.setWrite_date(rs.getString("write_date"));
				dto.setRed(rs.getInt("red"));
				dto.setGreen(rs.getInt("green"));
				dto.setBlue(rs.getInt("blue"));
				dto.setRemark(rs.getString("remark"));
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
	public ArrayList<LedDTO> ledGetValueList() {
		ArrayList<LedDTO> al = new ArrayList<LedDTO>();	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int recordCount = 0;
		
		try {
			conn = DB.dbConn();
			String sql = "select count(*) from led_table";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				recordCount = rs.getInt(1);
			}
			log.debug("ledGetValueList(): recordCount = " + recordCount);
			
			sql = "select * from led_table order by id desc";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				LedDTO dto = new LedDTO();
				dto.setId(rs.getInt("id"));
				dto.setWrite_date(rs.getString("write_date"));
				dto.setRed(rs.getInt("red"));
				dto.setGreen(rs.getInt("green"));
				dto.setBlue(rs.getInt("blue"));
				dto.setRemark(rs.getString("remark"));
				al.add(dto);
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
		return al;
	}
	public void ledSetValue(LedDTO dto) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = DB.dbConn();
			String sql = "insert into led_table (write_date, red, green, blue, remark) values (?,?,?,?,?)";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, dto.getWrite_date());
			pstmt.setInt(2, dto.getRed());
			pstmt.setInt(3, dto.getGreen());
			pstmt.setInt(4, dto.getBlue());
			pstmt.setString(5, dto.getRemark());
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
