const mypageSql = require('./mypageSql.js')
const wishSql = require('./wishSql.js')

module.exports =	{
 	...mypageSql, ...wishSql
}