const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const template = require('./view/template');
const alert = require('./view/alertMsg');
const dbModule = require('./db-module');
const wm = require('./weather-module');

const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.redirect('/user/list');
});
router.get('/register', function(req, res) {
    dbModule.getAllDepts(function(rows) {
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);        
            let view = require('./view/registerUser');
            let html = view.registerUser(navBar, rows);
            res.send(html);
        });
    });
});
router.post('/register', function(req, res) {
    let uid = req.body.uid;
    let password = req.body.password;
    let password2 = req.body.password2;
    let name = req.body.name;
    let deptId = parseInt(req.body.deptId);
    let tel = req.body.tel;

    dbModule.getUserInfo(uid, function(row) {
        if (row === undefined) {        // unique uid
            if (password.length < 4) {
                let html = alert.alertMsg('비밀번호를 4글자 이상 입력하세요.', '/user/register');
                res.send(html);
            } else if (password != password2) {
                console.log('비밀번호가 다릅니다.');
                let html = alert.alertMsg('비밀번호가 다릅니다.', '/user/register');
                res.send(html);               
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, null, function(err, hash) {
                        dbModule.registerUser(uid, hash, name, deptId, tel, function() {
                            //console.log('사용자 등록 완료');
                            res.redirect('/user/list');
                        });
                    });
                });
            }
        } else {
            console.log('중복된 ID 입니다.');
            let html = alert.alertMsg('중복된 ID 입니다.', '/user/register');
            res.send(html);
        }
    });
});
router.get('/list', function(req, res) {
    dbModule.getAllUsers(function(rows) {
        wm.getWeather(function(weather) {
            let navBar = template.navBar(false, weather, req.session.userName);        
            let view = require('./view/listUser');
            let html = view.listUser(navBar, rows);
            res.send(html);
        });
    })
});
router.get('/update/uid/:uid', function(req, res) {
    let uid = req.params.uid;
    dbModule.getAllDepts(function(rows) {
        dbModule.getUserInfo(uid, function(row) {
            wm.getWeather(function(weather) {
                let navBar = template.navBar(false, weather, req.session.userName);        
                let view = require('./view/updateUser');
                let html = view.updateUser(navBar, rows, row);  // navBar, dept, user
                res.send(html);
            });
        });
    });
});
router.post('/update', function(req, res) {
    let uid = req.body.uid;
    let name = req.body.name;
    let deptId = req.body.deptId;
    let tel = req.body.tel;
    let changePswd = req.body.changePswd;
    let oldPswd = req.body.oldPswd;
    let password = req.body.password;
    let password2 = req.body.password2;
    //console.log(changePswd, oldPswd, password, password2);
    dbModule.getUserInfo(uid, function(row) {
        if (changePswd === undefined) {         // 패스워드 변경 체크박스가 공란일 때
            dbModule.updateUser(uid, row.password, name, deptId, tel, function() {
                res.redirect('/user/list');
            });
        } else {            // 패스워드 변경 체크박스가 체크되어 있을 때
            bcrypt.compare(oldPswd, row.password, function(err, result) {   // 입력한 현재 패스워드와 DB에 있는 패스워드 비교
                if (result) {
                    if (password.length < 4) {
                        let html = alert.alertMsg('비밀번호를 4글자 이상 입력하세요.', `/user/update/uid/${uid}`);
                        res.send(html);
                    } else if (password != password2) {
                        let html = alert.alertMsg('신규 비밀번호가 다릅니다.', `/user/update/uid/${uid}`);
                        res.send(html);               
                    } else {
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(password, salt, null, function(err, hash) {
                                dbModule.updateUser(uid, hash, name, deptId, tel, function() {
                                    res.redirect('/user/list');
                                });
                            });
                        });
                    }
                } else {
                    let html = alert.alertMsg('현재 패스워드가 틀립니다.', `/user/update/uid/${uid}`);
                    res.send(html);
                }
            });
        }
    });
});
router.get('/delete/uid/:uid', function(req, res) {
    let uid = req.params.uid;
    wm.getWeather(function(weather) {
        let navBar = template.navBar(false, weather, req.session.userName);        
        let view = require('./view/deleteUser');
        let html = view.deleteUser(navBar, uid); 
        res.send(html);
    });
});
router.post('/delete', function(req, res) {
    let uid = req.body.uid;
    dbModule.deleteUser(uid, function() {
        res.redirect('/user/list');
    });
});
router.get('/password/uid/:uid', function(req, res) {
    let uid = req.params.uid;
    wm.getWeather(function(weather) {
        let navBar = template.navBar(false, weather, req.session.userName);        
        let view = require('./view/changePassword');
        let html = view.changePassword(navBar, uid); 
        res.send(html);
    });
});
router.post('/password', function(req, res) {
    let uid = req.body.uid;
    let password = req.body.password;
    let password2 = req.body.password2;

    dbModule.getUserInfo(uid, function(row) {
        if (password.length < 4) {
            let html = alert.alertMsg('비밀번호를 4글자 이상 입력하세요.', `/user/password/uid/${uid}`);
            res.send(html);
        } else if (password != password2) {
            console.log('비밀번호가 다릅니다.');
            let html = alert.alertMsg('비밀번호가 다릅니다.', `/user/password/uid/${uid}`);
            res.send(html);               
        } else {
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, null, function(err, hash) {
                    dbModule.changePassword(uid, hash, function() {
                        //console.log('패스워드 변경 완료');
                        res.redirect('/user/list');
                    });
                });
            });
        }
    });
});

router.get('/login', function(req, res) {
    let view = require('./view/login');
    let html = view.login();
    res.send(html);
});
router.post('/login', function(req, res) {
    let uid = req.body.uid;
    let password = req.body.password;

    dbModule.getUserInfo(uid, function(row) {
        if (row === undefined) {        // unique uid
            console.log('등록된 ID가 아닙니다.');
            let html = alert.alertMsg('등록된 ID가 아닙니다.', '/user/login');
            res.send(html);
        } else {
            bcrypt.compare(password, row.password, function(err, result) {
                if (result) {
                    req.session.userId = uid;
                    req.session.userName = row.name;
                    console.log(`${uid}, ${row.name} 로그인 성공`);
                    let html = alert.alertMsg(`${row.name} 님 환영합니다.`, '/');
                    res.send(html);
                } else {
                    console.log("패스워드 불일치");
                    let html = alert.alertMsg('패스워드가 틀립니다.', '/user/login');
                    res.send(html);
                }
            });            
        }
    });
});
router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/user/login');    
});
module.exports = router;
