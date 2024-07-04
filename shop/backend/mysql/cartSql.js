module.exports = {
  cartList: `select c.cart_no, c.cart_cnt, p.product_name, p.product_price, p.product_img, p.product_point
  from cart c join product p 
  on c.product_no = p.product_no 
  where user_id = ?`,
  updateCart: `update cart 
  set ? 
  where cart_no = ?`,
  deleteCart: `delete from cart
  where cart_no = ?`,
  insertCart: `insert into cart set ?`,
  checkCart:  `select count(*) cnt from cart where user_id = ? and product_no = ?`,
}