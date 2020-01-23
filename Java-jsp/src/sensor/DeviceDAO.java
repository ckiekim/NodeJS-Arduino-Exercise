package sensor;

import java.sql.*;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import common.*;

public class DeviceDAO {
	private static final Logger log = LoggerFactory.getLogger(DeviceDAO.class);
	
	public DeviceDTO deviceGetValue() {
		DeviceDTO dto = new DeviceDTO();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			conn = DB.dbConn();
			String sql = "select * from device_table order by id desc limit 1";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				dto.setTimestamp(rs.getString("timestamp"));
				dto.setTemperature(rs.getFloat("temperature"));
				dto.setHumidity(rs.getFloat("humidity"));
				dto.setPhotocell(rs.getInt("photocell"));
				dto.setDistance(rs.getInt("distance"));
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
	
	public ArrayList<DeviceDTO> deviceGetValueList() {
		ArrayList<DeviceDTO> al = new ArrayList<DeviceDTO>();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int recordCount = 0;
		
		try {
			conn = DB.dbConn();
			String sql = "select count(*) from device_table";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				recordCount = rs.getInt(1);
			}
			log.debug("deviceGetValueList(): recordCount = " + recordCount);
			
			sql = "select * from device_table order by id desc";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				DeviceDTO dto = new DeviceDTO();
				dto.setId(rs.getInt("id"));
				dto.setTimestamp(rs.getString("timestamp"));
				dto.setTemperature(rs.getFloat("temperature"));
				dto.setHumidity(rs.getFloat("humidity"));
				dto.setPhotocell(rs.getInt("photocell"));
				dto.setDistance(rs.getInt("distance"));
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
	
	public void deviceSetValue(DeviceDTO dto) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = DB.dbConn();
			String sql = "insert into device_table (timestamp, temperature, humidity, photocell, distance) values (?,?,?,?,?)";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, dto.getTimestamp());
			pstmt.setFloat(2, dto.getTemperature());
			pstmt.setFloat(3, dto.getHumidity());
			pstmt.setInt(4, dto.getPhotocell());
			pstmt.setInt(5, dto.getDistance());
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
