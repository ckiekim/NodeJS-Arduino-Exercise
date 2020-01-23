const sqlite3 = require('sqlite3').verbose(); 

module.exports = {
    getAllDepts: function(callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let searchSql = `SELECT * FROM dept`;
        db.all(searchSql, function(err, rows) {
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
        let registerSql = `INSERT INTO user(uid, password, name, deptId, tel) VALUES(?, ?, ?, ?, ?)`;
        let stmt = db.prepare(registerSql);
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
        let searchUserSql = `SELECT uid, password, name, deptId, tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user where uid=?`;
        let stmt = db.prepare(searchUserSql);
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
        let searchSql = `SELECT l.uid, l.name, r.name deptName, l.tel, strftime('%Y-%m-%d', regDate, 'localtime') ts FROM user l join dept r on l.deptId = r.did`;
        db.all(searchSql, function(err, rows) {
            if (err) {
                console.error('getAllUsers DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();
    },

    listItems: function(callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let listSql = `SELECT b.id, b.title, u.name, strftime('%Y-%m-%d %H:%M', b.timestamp, 'localtime') ts, b.content, b.hit FROM bbs b join user u on b.userId=u.uid`;
        db.all(listSql, function(err, rows) {
            if (err) {
                console.error('listItems DB 오류', err);
                return;
            }
            callback(rows);
        });
        db.close();      
    },
    incHit: function(idVal, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let incHitSql = `UPDATE bbs SET hit=(SELECT hit FROM bbs WHERE id=?)+1 WHERE id=?`;
        let stmt = db.prepare(incHitSql);
        stmt.run(idVal, idVal, function(err) {
            if (err) {
                console.error('incHit DB 에러', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    insertItem: function(title, userId, content, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let insertSql = `INSERT INTO bbs(title, userId, content) VALUES(?, ?, ?)`;
        let stmt = db.prepare(insertSql);
        stmt.run(title, userId, content, function(err) {
            if (err) {
                console.error('insertItem DB 에러', err);
                return;          
            }
            callback();
        });
        stmt.finalize();  
        db.close();
    },
    updateItem: function(title, userId, content, idVal, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let updateSql = `UPDATE bbs SET title=?, userId=?, timestamp=datetime('now'), content=? WHERE id=?`;
        let stmt = db.prepare(updateSql);
        stmt.run(title, userId, content, idVal, function(err) {
            if (err) {
                console.error('updateItem DB 오류', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    },
    deleteItem: function(idVal, callback) {
        let db = new sqlite3.Database("db/smartfarm.db");
        let deleteSql = `DELETE FROM bbs WHERE id=?`;
        let stmt = db.prepare(deleteSql);
        stmt.run(idVal, function(err) {
            if (err) {
                console.error('deleteItem DB 오류', err);
                return;
            }
            callback();
        });
        stmt.finalize();
        db.close();
    }  
}
