const mysql = require('mysql');

var pool = mysql.createPool({
    //本地的数据库连接
    // host: "127.0.0.1",
    // port: "3306",
    // user: "root",
    // password:"",
    // database:"cake",

    // 新浪云上的配置参数
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.ACCESSKEY,
    password : process.env.SECRETKEY,
    database : 'app_' + process.env.APPNAME,

    connectionLimit: 5
});

// 导出模块
module.exports = pool;
