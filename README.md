git-change_file_content_for_yisou_and_otherpage
===============================================

##目的
* 本地修改index文件中的内容。

##概述
* 项目使用express基本结构，目前未使用路由，以后可能会用到web界面，所以保留express文件结构。

##文件夹及文件
####文件夹
* config/modified_files:
将要修改的内容(这里是首部，尾部，留言板，客服代码)分至不同的文件, 程序会读取文件路径，如需修改文件路径，到程序代码中修改路径配置。
* config/示例项目:
示例项目代码，包含文件结构，示例文件必须包含index.html文件。
* js/:
主要模块文件。
* projects/:
具体项目放到该目录下，程序运行只针对某一个项目。加入新项目后，需要到程序中修改一下项目文件路径。
* express默认文件夹:
public/,routes/,views。
* tasks/:
原始任务文件夹。
####文件
* start_with_supervisor_here.bat:
使用supervisor启动node，未安装则手动敲打node app.js。
* app.js:
应用入口。
* router.js:
路由，暂未用到。
