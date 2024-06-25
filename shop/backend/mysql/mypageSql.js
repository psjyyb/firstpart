module.exports = {
    mypageUserInfo : 'select * from user where user_id = ?',
    mypageNoQnACount : 'select count(q.qna_no) as ncnt from user u join qna q on u.user_id=q.user_id where u.user_id= ? and q.qna_reply is null',
    mypageYesQnACount :'select count(q.qna_no) as ycnt from user u join qna q on u.user_id=q.user_id where u.user_id= ? and q.qna_reply is not null',
    mypageYesReviewCount:'select count(d.product_no) as rcnt from review r join orders o on o.order_no=r.order_no join order_detail d on d.order_no=o.order_no where o.user_id= ? and r.review_no is not null',
    mypageNoReviewCount:'select count(d.product_no) as rcnt from review r join orders o on o.order_no=r.order_no join order_detail d on d.order_no=o.order_no where o.user_id= ? and r.review_no is null',
    mypageLastOrder : 'select o.order_date,o.order_status,p.product_name,count(d.product_no) as prodcnt  from orders o join order_detail d on o.order_no=d.order_no join product p on p.product_no=d.product_no where o.user_id= ? group by o.order_date,o.order_status,p.product_name order by order_date',

    mypageOrderList : `SELECT o.order_no,o.user_id,o.order_date,o.order_status,IFNULL(COUNT(d.product_no), 0) AS product_count,GROUP_CONCAT(p.product_name SEPARATOR ', ') AS product_names,GROUP_CONCAT(p.product_img SEPARATOR ', ') AS product_images FROM orders o LEFT JOIN order_detail d ON o.order_no = d.order_no LEFT JOIN product p ON p.product_no = d.product_no WHERE o.user_id = ? GROUP BY o.order_no  order by o.order_no desc limit ?,?`,
    mypageOrderListCount : 'select count(*) as cnt from orders where user_id= ? '

}