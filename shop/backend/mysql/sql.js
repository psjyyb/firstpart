
const mypageSql = require('./mypageSql.js')
//const wishSql = require('./wishSql.js')
const userSql = require('./userSql.js')
const adminSql = require('./adminSql.js')
module.exports =	{
 	...mypageSql,
	...userSql,
	...adminSql
	 //...wishSql, 

}