/************************************************
 *
 ************************************************/
//文件模块
var fs = require('fs-extra');
var util = require('util');
var cheerio = require('cheerio');
var findit = require('findit');

var project_path = "projects/wap";
/**
 * 找到项目文件夹中的index.html文件，交给下一步
 * @param  {[type]}   project_path [description]
 * @param  {Function} next         [description]
 * @return {[type]}                [description]
 */
function findIndexFile(project_path, next) {
    var finder = findit(project_path);
    finder.on('file', function(file, stat) {
        if (/index.htm/.test(file)) {
            //console.log(file);
            next(file);
        }
    });
};


function function_name(filepath) {

};
exports.main = function() {
    //console.log("i am superman!");
    //console.log("i get the file path"+findIndexFile(project_path));
    findIndexFile(project_path, exports.ModifyContentsOfIndex);


    //var html = fs.readFileSync('projects/aewdlc/index.html').toString();
};
/* 待添加的各个文件内容路径*/
var _modified_part_path = {
    "head": "config/modified_files/modified-head.html",
    "foot": "config/modified_files/modified-foot.html",
    "custom_service": "config/modified_files/modified-custom_service.html",
    "message_board": "config/modified_files/modified-message_board.html",
};
/**
 * getter,获得不同路径的部分文件的内容
 * @param  {[type]} which_part [description]
 * @return {[type]}            [description]
 */
function getModifiedPartContent(which_part) {
    return fs.readFileSync(_modified_part_path[which_part]).toString();
};
/**
 * 一步步地处理
 * @param  {[type]} prev_html [description]
 * @return {[type]}           [description]
 */
function stepsForModified(prev_html) {
    var prev_html = prev_html;
    /* some steps function*/
    var steps_for_modified = {
        step1: function() {
            var the_head_html = getModifiedPartContent("head");
            //var source = html.match(/<!--.*include.*header.html.*-->/i)[0];
            prev_html = prev_html.replace(/<!--.*include.*header.html.*-->/i, the_head_html);
            //var source = html.match(/wrapper/gi);
            //$("head").append(the_head_html);
            //console.log(prev_html);
            //console.log("i am the 1");
            //console.log(source);
            return this;
        },
        step2: function() {
            var the_foot_html = getModifiedPartContent("foot");
            //debugger;
            //var source = html.match(/<!--.*include.*footer.html.*-->/i)[0];
            prev_html = prev_html.replace(/<!--.*include.*footer.html.*-->/i, the_foot_html);
            //$("body").append(the_foot_html);
            //console.log("i am the 2");
            //console.log(prev_html);
            //console.log(source);
            return this;
        },
        step3: function() {
            /* 留言板内容*/
            var the_message_board = getModifiedPartContent("message_board");
            //$("message_board").append(the_head_html);
            prev_html = prev_html.replace(/document.*?800\.91jmw.*?<\/script>/, '</script>' + the_message_board);
            //console.log("i am the 3");
            //console.log(prev_html);
            return this;
        },
        step4: function() {
            var the_custom_service = getModifiedPartContent("custom_service");
            prev_html = prev_html.replace(/<\/body>/, the_custom_service+"</body>");
            //console.log("i am the 4");
            //console.log(prev_html);
            return prev_html;
        }
    };
    /* 返回步骤执行之后的结果*/
    return steps_for_modified.step1().step2().step3().step4();
};
/**
 * 修改index文件的内容
 * @param {[type]} filepath [description]
 */
exports.ModifyContentsOfIndex = function(filepath) {
    var html = fs.readFileSync(filepath).toString();
    /*var $ = cheerio.load(html, {
        decodeEntities: false
    });*/
    //steps_for_modified.step1($).step2($);
    //steps_for_modified.step2(steps_for_modified.step1(html));
    /* use $ to save the modified content*/
    var the_result_html = stepsForModified(html);
    console.log("最终幻想是:"+the_result_html);
    fs.writeFile(filepath, the_result_html, "utf-8", function(err) {
        if (err) {
            throw err;
        } else {
            console.log("write over");
        }
    });

    //console.log(html);
    //console.log("so you soyou soyou soyou ");
    //console.log(the_head_html);
};
