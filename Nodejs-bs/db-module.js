const sqlite3 = require('sqlite3').verbose(); 

module.exports = {
    getAllDepts: function(callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT * FROM dept`;
        db.all(sql, function(err, rows) {
            if (err) {
                console.error('getAllDepts DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();
    },
    registerUser: function(uid, hash, name, deptId, tel, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `INSERT INTO user(uid, password, name, deptId, tel) VALUES(?, ?, ?, ?, ?)`;
        let stmt = db.prepare(sql);
        stmt.run(uid, hash, name, deptId, tel, function(err) {
            if (err) {
                console.error('registerUser DB 에러', err);
                return;          
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    getUserInfo: function(uid, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT uid, password, name, deptId, tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user where uid=?`;
        let stmt = db.prepare(sql);
        stmt.get(uid, function(err, row) {
            if (err) {
                console.error('getUserInfo DB 에러', err);
                return;          
            }
            callback(row);            
        });
        stmt.finalize();
        db.close();        
    },
    getAllUsers: function(callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT l.uid, l.name, r.name deptName, l.tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user l join dept r on l.deptId = r.did`;
        db.all(sql, function(err, rows) {
            if (err) {
                console.error('getAllUsers DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();
    },
    updateUser: function(uid, name, deptId, tel, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `UPDATE user SET name=?, deptId=?, tel=? WHERE uid=?`;
        let stmt = db.prepare(sql);
        stmt.run(name, deptId, tel, uid, function(err) {
            if (err) {
                console.error('registerUser DB 에러', err);
                return;          
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    deleteUser: function(uid, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `DELETE FROM user WHERE uid=?`;
        let stmt = db.prepare(sql);
        stmt.run(uid, function(err) {
            if (err) {
                console.error('registerUser DB 에러', err);
                return;          
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    getCurrentActuator: function(callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `SELECT aid, redLED, greenLED, blueLED, relay, datetime(actionTime, 'localtime') ts, reason, uid FROM actuator ORDER BY aid DESC LIMIT 1`;
        db.each(sql, function(err, result) {
            if (err) {
                console.error('getCurrentActuator DB 에러', err);
                return;          
            }
            callback(result);
        });
        db.close();
    },
    changeActuator: function(redLED, greenLED, blueLED, relay, reason, uid, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let sql = `INSERT INTO actuator(redLED, greenLED, blueLED, relay, reason, uid) VALUES(?, ?, ?, ?, ?, ?)`;
        let stmt = db.prepare(sql);
        stmt.run(redLED, greenLED, blueLED, relay, reason, uid, function(err) {
            if (err) {
                console.error('changeActuator DB 에러', err);
                return;          
            }
            callback();
        });
        stmt.finalize();
        db.close();
    }

}
