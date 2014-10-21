var express = require('express');
var app = express();
var path = require('path');
//var index = require('./routes/index');
var changeContent = require('./js/changeContent');

app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').renderFile);
/* routes*/
/*app.get("/", index.main);
app.get("/index", index.main);
app.get('/', function(req, res) {
    res.send('hello world');
});
app.post("/uploadfile", uploadhandler.main);*/

/**
 * resourceful 路由方式 暂时禁用路由功能
 */
//require('./router').main(app);

/**
 * node启动执行模块changeContent.main()
 */
changeContent.main();

app.listen(3000);
