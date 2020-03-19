/*
 * @Author: your name
 * @Date: 2020-03-19 09:21:57
 * @LastEditTime: 2020-03-19 09:31:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \git-exercise\node\index.js
 */

//  引入模块
 var http = require('http');
 var fs = require('fs');
// 创建服务
 var server  = http.createServer();
// 监听请求
 server.on('request',function(req,res){
    console.log("请求路径"+req.url)
 })
// 监听端口
 server.listen(3000,function(){
     console.log('45456456')
 })