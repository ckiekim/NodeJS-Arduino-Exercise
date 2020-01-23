const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const template = require('./view/template');
const favicon = require('express-favicon');
const wm = require('./weather-module');

const app = express();
const userRouter = require('./userRouter');
//app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
//app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist'));
//app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
//app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect jQuery
app.use('/fontawesome', express.static(__dirname + '/fontawesome-free-5.12.0-web/js'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.use(favicon('favicon.ico'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore({logFn: function(){}})     // [session-file-store] will retry, error on last attempt: Error: ENOENT 출력 방지
}));
app.use('/user', userRouter);

app.get('/', function(req, res) {
    let view = require('./view/main');
    wm.getWeather(function(weather) {
        let navBar = template.navBar(weather);
        let html = view.main(navBar);
        res.send(html);
    });
});

app.get('*', function(req, res) {
    res.status(404).send('File not found');
});
app.listen(3000);