var fs = require('fs-extra');

// 去掉charset=utf-8
// 页头
// 页脚
// 留言板

souyilyb = '<script src="http://588.sooe.cn/gbook/glist.js"></script> \
<div class="counter"><a href="#book"></a><script src="/counter.htm"></script></div>';

html = fs.readFileSync('aewdlc/index.html').toString();

var match = html.replace(/document.*?800\.91jmw.*?<\/script>/, '</script>' + souyilyb);

console.log(match);