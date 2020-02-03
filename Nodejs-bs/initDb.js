var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

try {
    if(fs.accessSync('./db')) {
        console.log('DB 폴더가 이미 존재합니다.');
    }
} catch(err) {
    console.log('DB 폴더가 없어서 새로 생성합니다.');
    fs.mkdirSync('./db');
    //console.log(err);
};

var db = new sqlite3.Database("db/smartfarm.db");

var createDeptSql = `
    CREATE TABLE IF NOT EXISTS dept (
        did INTEGER PRIMARY KEY,
        name TEXT NOT NULL)
`;
var createUserSql = `
    CREATE TABLE user (
        uid TEXT PRIMARY KEY,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        deptId INTEGER NOT NULL,
        tel TEXT,
        regDate DATETIME DEFAULT CURRENT_TIMESTAMP)
`;
var createActuatorSql = `
    CREATE TABLE actuator (
        aid INTEGER PRIMARY KEY AUTOINCREMENT,
        redLED INTEGER DEFAULT 200,
        greenLED INTEGER DEFAULT 128,
        blueLED INTEGER DEFAULT 80,
        relay INTEGER DEFAULT 0,
        actionTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        reason TEXT,
        uid TEXT)
`;
var createSensorSql = `
    CREATE TABLE sensor (
        sid INTEGER PRIMARY KEY AUTOINCREMENT,
        temperature INTEGER DEFAULT 20,
        humidity INTEGER DEFAULT 25,
        cds INTEGER DEFAULT 50,
        distance REAL DEFAULT 10.0,
        sensingTime DATETIME DEFAULT CURRENT_TIMESTAMP,
        uid TEXT);
`;
var insertDeptSql = "INSERT INTO dept VALUES(?, ?)";
var insertUserSql = "INSERT INTO(uid, password, name, deptId, tel) user VALUES('admin', '$2a$10$NQYnfoHwqIagmb3hU1ck7ubNVnSHDboXQ9ctdBkmmZzk5SlTpfSPW', '관리자', 101, '010-2345-6789'";
var selectDeptSql = "SELECT * FROM dept";
var insertActuatorSql = "INSERT INTO actuator(reason, uid) VALUES('Initial value', 'admin')";
var insertSensorSql = "INSERT INTO sensor(uid) VALUES('admin')";
var records = [
    {did: 101, name: '경영지원팀'},
    {did: 102, name: '영업팀'},
    {did: 103, name: '생산팀'},
    {did: 104, name: '연구개발팀'}
];

db.serialize(function() {
    db.run(createDeptSql);
    db.run(createUserSql);
    db.run(createActuatorSql);
    db.run(createSensorSql);

    db.run(insertUserSql);
    db.run(insertActuatorSql);
    db.run(insertSensorSql);
    var stmt = db.prepare(insertDeptSql);
    for (let record of records) {
        stmt.run(record.did, record.name);
    }
    stmt.finalize();

    db.each(selectDeptSql, function(err, row) {
        console.log(row);
    });
});

db.close();