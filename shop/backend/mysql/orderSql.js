module.exports = {
  orderList: `select c.cart_cnt, p.product_no, p.product_name, p.product_price, p.product_img, p.product_point
  from cart c join product p
  on c.product_no = p.product_no
  where c.cart_no = ?`,
  getUserInfo: `select user_name, user_post, user_address, user_detail_addr, user_phone, user_point
  from user
  where user_id = ?`,
  insertOrder: `insert into orders set ?`,
  getOrderNo: `select order_no from orders
  where user_id = ?
  order by order_date desc
  limit 1`,
  insertOrderDetail: `insert into order_detail set ?`,
  updateUserPoint: `update user set ? where user_id = ?`,
}