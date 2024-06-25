const mypageSql = require('./mypageSql.js')
const productSql = require('./productSql.js')

module.exports =	{
 	 ...mypageSql,
	  ...productSql,
 }
