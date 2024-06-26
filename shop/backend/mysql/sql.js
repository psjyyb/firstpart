const mypageSql = require('./mypageSql.js')
const cartSql = require('./cartSql.js')

module.exports =	{
 	...mypageSql, ...cartSql,
}