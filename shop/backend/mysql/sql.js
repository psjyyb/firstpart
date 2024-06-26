const mypageSql = require('./mypageSql.js')
const productSql = require('./productSql.js')
const userSql = require('./userSql.js')

module.exports =	{
 	 ...mypageSql,
	  ...productSql,
	  ...userSql,
 }


