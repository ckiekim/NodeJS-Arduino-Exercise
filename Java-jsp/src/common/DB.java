package common;

import java.sql.Connection;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

public class DB {
	public static Connection dbConn() {
		DataSource ds = null;
		Connection conn = null;
		try {
			Context ctx = new InitialContext();
			ds = (DataSource)ctx.lookup("java:comp/env/myDB");
			conn = ds.getConnection();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return conn;
	}
}
