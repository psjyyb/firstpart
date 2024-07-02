const mypageSql = require('./mypageSql.js')
const productSql = require('./productSql.js')
const userSql = require('./userSql.js')
const adminSql = require('./adminSql.js')
const cartSql = require('./cartSql.js')
const orderSql = require('./orderSql.js')

module.exports = {
  ...cartSql,
 	...mypageSql,
	...productSql,
	...userSql,
	...orderSql,
	...adminSql,
}

