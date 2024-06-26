
const mypageSql = require('./mypageSql.js')
const userSql = require('./userSql.js')
const cartSql = require('./cartSql.js')

module.exports =	{
 	...mypageSql,...userSql, ...cartSql,
}