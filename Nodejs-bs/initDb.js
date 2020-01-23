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
        did INTEGER PRIMARY,
        name TEXT NOT NULL)
`;
var createUserSql = `
    create table user (
        uid text PRIMARY KEY,
        password text not null,
        name text not null,
        deptId int not null,
        tel text,
        regDate datetime default CURRENT_TIMESTAMP)
`;
var insertSql = "INSERT INTO dept VALUES(?, ?)";
var selectSql = "SELECT * FROM dept";
var records = [
    {did: 101, name: '경영지원팀'},
    {did: 102, name: '영업팀'},
    {did: 103, name: '생산팀'},
    {did: 104, name: '연구개발팀'}
];

db.serialize(function() {
    db.run(createDeptSql);
    db.run(createUserSql);

    var stmt = db.prepare(insertSql);
    for (let record of records) {
        stmt.run(record.did, record.name);
    }
    stmt.finalize();

    db.each(selectSql, function(err, row) {
        console.log(row);
    });
});

db.close();