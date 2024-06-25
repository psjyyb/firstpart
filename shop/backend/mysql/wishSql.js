module.exports = {
  wishList: "select * from product where product_no in (select product_no from wish where user_id = ?)",
  insertWish: "insert into wish set ?",
  deleteWish: "delete from wish where wish_no = ?"
}