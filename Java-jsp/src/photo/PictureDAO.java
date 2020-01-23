package photo;

import java.sql.*;
import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import common.*;

public class PictureDAO {
	private static final Logger log = LoggerFactory.getLogger(PictureDAO.class);
	
	public PictureDTO pictureGetValue(int id) {
		PictureDTO dto = new PictureDTO();
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			conn = DB.dbConn();
			String sql = "select name, description from pict_table where id = " + id;
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				dto.setName(rs.getString("name"));
				dto.setDescription(rs.getString("description"));
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
	
	public ArrayList<PictureDTO> pictureGetValueList() {
		ArrayList<PictureDTO> al = new ArrayList<PictureDTO>();	
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			conn = DB.dbConn();
			String sql = "select id, name, description from pict_table order by id desc";
			pstmt = conn.prepareStatement(sql);
			rs = pstmt.executeQuery();
			while(rs.next()) {
				PictureDTO dto = new PictureDTO();
				dto.setId(rs.getInt("id"));
				dto.setName(rs.getString("name"));
				dto.setDescription(rs.getString("description"));
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
	
	public void pictureSetValue(PictureDTO dto) {
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = DB.dbConn();
			String sql = "insert into pict_table (name, description) values (?,?)";
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, dto.getName());
			pstmt.setString(2, dto.getDescription());
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
