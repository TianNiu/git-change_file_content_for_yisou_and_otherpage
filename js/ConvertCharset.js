/****************************************************
 * 改变文件编码,从utf-8到gbk
 * @type {[type]}
 ****************************************************/
var fs = require('fs-extra');
var util = require('util');
var cheerio = require('cheerio');
var findit = require('findit');
var iconv = require('iconv-lite');


var _has_converted = false;

exports.main = function(file_path) {

    if (file_path && !_has_converted) {
        console.log("file_path is: " + file_path);

        var new_path = file_path.replace(/index.htm/, "new_new_new_index.htm");
        console.log("new_path is: " + new_path);
        //debugger;
        // Convert encoding streaming example
        var write_stream = fs.createWriteStream(new_path);
        write_stream.on('close', function() {
            //console.log("now it finish");
            fs.rename(new_path, file_path, function(err) {
                console.log("文件已被转码至gbk.");
                _has_converted = true;
            });
        });
        fs.createReadStream(file_path)
            .pipe(iconv.decodeStream('utf-8'))
            .pipe(iconv.encodeStream('gbk'))
            .pipe(write_stream);
    } else {
        console.log("no file_path");
    }


};
