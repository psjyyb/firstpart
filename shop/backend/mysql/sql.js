
const mypageSql = require('./mypageSql.js')
//const wishSql = require('./wishSql.js')
const userSql = require('./userSql.js')

module.exports =	{
 	...mypageSql,...userSql
	 //...wishSql, 

}