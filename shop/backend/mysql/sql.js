const mypageSql = require('./mypageSql.js')
const productSql = require('./productSql.js')
const userSql = require('./userSql.js')
const cartSql = require('./cartSql.js')

module.exports =	{
 ...cartSql,
 	 ...mypageSql,
	  ...productSql,
	  ...userSql,
 }


