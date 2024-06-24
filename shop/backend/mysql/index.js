// DB 와 연결해준다.
const mysql = require('mysql2'); // npm i mysql2 해서 다운받고 import
const sql = require('./sql.js');// sql.js 파일 import
require('dotenv').config({path:'mysql/.env'});//npm i dotenv 다운 path설정 . env 파일참고
const conn = { // mysql 접속 설정
    connectionLimit:process.env.MYSQL_LIMIT,
    host:process.env.MYSQL_HOST,
    port:process.env.MYSQL_PORT,
    user:process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE
};
const pool = mysql.createPool(conn);//pool 방법으로 mysql 에연결
function query(alias, values ){// DB에 쿼리문을 보내는 부분
    return new Promise((resolve,reject)=>  
        pool.query(sql[alias],values,(err,result)=>{
        if(err){
            console.log(err);
            reject({err});
        }else{
        resolve(result);
        
        }
    }))
}

module.exports = query; 