module.exports = {
    mypageUserInfo : `select * 
                    from user 
                    where user_id = ?`,
    mypageNoQnACount : `select count(q.qna_no) as ncnt 
                        from user u join qna q on u.user_id=q.user_id 
                        where u.user_id= ? and q.qna_reply is null`,
    mypageYesQnACount :`select count(q.qna_no) as ycnt 
                        from user u join qna q on u.user_id=q.user_id 
                        where u.user_id= ? and q.qna_reply is not null`,
    mypageYesReviewCount:`SELECT COUNT(*) as ycnt 
                        FROM orders o JOIN order_detail d ON o.order_no = d.order_no 
                        JOIN product p ON p.product_no = d.product_no 
                        LEFT JOIN review r ON r.order_no = d.order_no 
                        AND r.product_no = d.product_no 
                        WHERE o.user_id = ? 
                        AND r.review_no IS NULL`,
    mypageNoReviewCount:`SELECT COUNT(*) as ncnt 
                        FROM orders o JOIN order_detail d ON o.order_no = d.order_no 
                        JOIN product p ON p.product_no = d.product_no 
                        JOIN review r ON r.order_no = d.order_no 
                        AND r.product_no = d.product_no 
                        WHERE o.user_id = ?`,
    mypageLastOrder : `select o.order_date,o.order_status,p.product_name,count(d.product_no) as prodcnt
                        from orders o join order_detail d on o.order_no=d.order_no 
                        join product p on p.product_no=d.product_no 
                        where o.user_id= ? 
                        group by o.order_date,o.order_status,p.product_name 
                        order by order_date`,

    mypageOrderList : `SELECT o.order_no,o.user_id,o.order_date,o.order_status,IFNULL(COUNT(d.product_no), 0) AS product_count,GROUP_CONCAT(p.product_name SEPARATOR ', ') AS product_names,GROUP_CONCAT(p.product_img SEPARATOR ', ') AS product_images FROM orders o LEFT JOIN order_detail d ON o.order_no = d.order_no LEFT JOIN product p ON p.product_no = d.product_no WHERE o.user_id = ? GROUP BY o.order_no order by o.order_no desc limit ?,?`,
    mypageOrderListCount : `select count(*) as cnt from orders where user_id= ? `,
    mypageCancelList:`SELECT c.cancel_no,c.cancel_date,c.cancel_state,d.product_no,o.pay_price FROM cancel c JOIN order_detail d ON c.order_no = d.order_no JOIN orders o ON o.order_no = d.order_no WHERE o.user_id = ? order by o.order_no desc limit ?,?`,
    mypageCancelCount:`SELECT COUNT(*) as cnt FROM cancel WHERE order_no IN (SELECT order_no FROM orders WHERE user_id = ? )`,

    mypageWishList:`select wish_no,product_name,product_price,product_img from wish w join product p on w.product_no=p.product_no where user_id = ? order by p.product_no desc limit ?,?`,
    mypageWishListCount:`select count(*) as cnt from wish where user_id = ?`,

    mypageQnAList:`select * from qna where user_id = ? order by qna_date desc limit ?,?`,
    mypageQnAListCount:`select count(*) as cnt from qna where user_id=?`,
    //작성가능리뷰
    mypageYesReviewList: `SELECT d.order_no, d.product_no, p.product_name, p.product_img, p.product_price,order_date FROM orders o JOIN order_detail d ON o.order_no = d.order_no JOIN product p ON p.product_no = d.product_no LEFT JOIN review r ON r.order_no = d.order_no AND r.product_no = d.product_no WHERE o.user_id = ? AND r.review_no IS NULL order by review_no desc limit ?,?`,
    mypageYesReviewListCount:`SELECT COUNT(*) as ycnt FROM orders o JOIN order_detail d ON o.order_no = d.order_no JOIN product p ON p.product_no = d.product_no LEFT JOIN review r ON r.order_no = d.order_no AND r.product_no = d.product_no WHERE o.user_id = ? AND r.review_no IS NULL`,
    //작성한 리뷰
    mypageNoReviewList: `SELECT d.order_no, d.product_no, p.product_name, p.product_img, p.product_price,review_date FROM orders o JOIN order_detail d ON o.order_no = d.order_no JOIN product p ON p.product_no = d.product_no JOIN review r ON r.order_no = d.order_no AND r.product_no = d.product_no WHERE o.user_id = ? order by review_no desc limit ?,?`,
    mypageNoReviewListCount:`SELECT COUNT(*) as ncnt FROM orders o JOIN order_detail d ON o.order_no = d.order_no JOIN product p ON p.product_no = d.product_no JOIN review r ON r.order_no = d.order_no AND r.product_no = d.product_no WHERE o.user_id = ?`,
}