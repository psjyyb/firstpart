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
    mypageLastOrder : `select o.order_date,o.order_no,o.order_status,p.product_name,count(d.product_no) as prodcnt
                        from orders o join order_detail d on o.order_no=d.order_no 
                        join product p on p.product_no=d.product_no 
                        where o.user_id= ? 
                        group by o.order_date,o.order_status,p.product_name,o.order_no 
                        order by order_date`,

    mypageOrderList : `SELECT
                            o.order_no,
                            o.user_id,
                            o.order_date,
                            o.order_status,
                            COUNT(d.product_no) AS product_count,
                            SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT p.product_name ORDER BY d.product_no ASC SEPARATOR ', '), ',', 1) AS product_name,
                            SUBSTRING_INDEX(GROUP_CONCAT(DISTINCT p.product_img ORDER BY d.product_no ASC SEPARATOR ', '), ',', 1) AS product_image
                        FROM
                            orders o
                        LEFT JOIN
                            order_detail d ON o.order_no = d.order_no
                        LEFT JOIN
                            product p ON p.product_no = d.product_no
                        WHERE
                            o.user_id = ?
                        GROUP BY
                            o.order_no, o.user_id, o.order_date, o.order_status
                        ORDER BY
                            o.order_no DESC
                        LIMIT ?, ?`,
    mypageOrderListCount : `select count(*) as cnt 
                            from orders where user_id= ?`,
    mypageCancelList:`     SELECT 
                            c.cancel_no,
                            c.cancel_date,
                            c.cancel_state,
                            MAX(d.product_no) AS product_no,
                            c.order_no,
                            c.order_date,
                            MAX(p.product_name) AS product_name,
	                        MAX(p.product_img) AS product_img
                        FROM 
                            cancel c 
                        LEFT JOIN 
                            order_detail d ON c.order_no = d.order_no 
                        JOIN 
                            product p ON p.product_no = d.product_no
                        WHERE 
                            c.user_id = ?
                        GROUP BY 
                            c.cancel_no, c.cancel_date, c.cancel_state, c.order_no, c.order_date
                        ORDER BY 
                            c.order_no DESC
                         LIMIT ?,?`,
    mypageCancelCount:`select count(*) as cnt
                        from cancel 
                        where user_id=?`,

    mypageWishList:`select wish_no,product_name,product_price,product_img,w.product_no 
                    from wish w left join product p on w.product_no=p.product_no 
                    where user_id = ? order by p.product_no desc limit ?,?`,
    mypageWishListCount:`select count(*) as cnt 
                        from wish where user_id = ?`,

    mypageQnAList:`select * from qna where user_id = ? 
                    order by qna_date desc limit ?,?`,
    mypageQnAListCount:`select count(*) as cnt 
                        from qna where user_id=?`,
    //작성가능리뷰
    mypageYesReviewList: `SELECT d.order_no, d.product_no, p.product_name,
                            p.product_img, p.product_price,order_date
                            FROM orders o JOIN order_detail d ON o.order_no = d.order_no 
                            JOIN product p ON p.product_no = d.product_no 
                            LEFT JOIN review r ON r.order_no = d.order_no 
                            AND r.product_no = d.product_no WHERE o.user_id = ?
                            AND r.review_no IS NULL order by review_no desc limit ?,?`,
    mypageYesReviewListCount:`SELECT COUNT(*) as ycnt 
                            FROM orders o JOIN order_detail d ON o.order_no = d.order_no 
                            JOIN product p ON p.product_no = d.product_no
                            LEFT JOIN review r ON r.order_no = d.order_no 
                            AND r.product_no = d.product_no 
                            WHERE o.user_id = ? AND r.review_no IS NULL`,
    //작성한 리뷰
    mypageNoReviewList: `SELECT 
                                d.order_no,
                                d.product_no,
                                p.product_name,
                                p.product_img,
                                p.product_price,
                                review_date,
                                review_score,
                                review_no,
                                review_content
                            FROM orders o JOIN order_detail d
                            ON o.order_no = d.order_no 
                            JOIN product p 
                            ON p.product_no = d.product_no 
                            JOIN review r
                            ON r.order_no = d.order_no
                            AND r.product_no = d.product_no
                            WHERE o.user_id = ? 
                            order by review_no desc limit ?,?`,
    mypageNoReviewListCount:`SELECT COUNT(*) as ncnt 
                            FROM orders o JOIN order_detail d ON o.order_no = d.order_no 
                            JOIN product p ON p.product_no = d.product_no 
                            JOIN review r ON r.order_no = d.order_no 
                            AND r.product_no = d.product_no 
                            WHERE o.user_id = ?`,
    noticeList : `select notice_no,notice_title,notice_date 
                  from notice order by notice_no desc limit ?,?`,
    noticeListCount : `select count(*) as cnt from notice`,
    noticeInfo: `select
                        notice_no,
                        notice_title,
                        notice_date,
                        notice_content,
                        notice_picture 
               from notice 
               where notice_no= ? `,
    mypageCartList: `SELECT cart_no, product_name, product_price, product_img,cart_cnt
                    FROM cart c
                    JOIN product p ON c.product_no = p.product_no
                    WHERE user_id = ?
                    ORDER BY p.product_no DESC
                    LIMIT ?,?`,
    mypageCartListCount:`SELECT COUNT(*) as cnt
                         FROM cart c
                         JOIN product p ON c.product_no = p.product_no
                         WHERE user_id = ? `,

    mypageOrderInfo:`SELECT DISTINCT
                        d.order_no,
                        order_status,
                        order_date,
                        delivery_name,
                        delivery_addr,
                        delivery_detail_addr,
                        delivery_phone,
                        delivery_post,
                        pay_price,
                        pay_point
                    FROM orders o
                    JOIN order_detail d ON o.order_no = d.order_no
                    WHERE  o.order_no = ?`,
    mypageOrderDetailInfo:`select 
                                order_cnt,
                                p.product_price,
                                product_name,
                                product_img
                            from order_detail d left join product p
                            on d.product_no=p.product_no
                            where d.order_no= ? `,
    mypageCancelInfo:`SELECT 
                        c.cancel_no,
                        c.cancel_state,
                        c.cancel_date,
                        c.order_no,
                        d.order_cnt,
                        p.product_name,
                        p.product_price,
                        p.product_img,
                        o.pay_price,
                        o.pay_point,
                        c.order_date
                    FROM 
                        cancel c 
                    LEFT JOIN 
                        orders o ON c.order_no = o.order_no
                    LEFT JOIN 
                        order_detail d ON c.order_no = d.order_no
                    LEFT JOIN 
                        product p ON d.product_no = p.product_no
                    WHERE 
                        c.cancel_no = ?`,
    mypageWishSelectDelete:`delete from wish 
                            where wish_no = ?`,
    mypageOrderDelete:`update orders 
                        set order_status = 6
                        where order_no = ? `,
    // mypageOrderDelete:`delete from orders 
    //                     where order_no = ?`,
    mypageCancelInsert:`insert into cancel(order_no,user_id,order_date)
                        values(?,?,?)`,

    mypageReviewInsertInfo:`select
                                product_name,
                                p.product_price,
                                product_img,
                                order_cnt,
                                order_no
                            from product p join order_detail d
                            on p.product_no=d.product_no
                            where d.product_no= ?`,
    mypageReviewInsert:`insert into review(
                                            order_no,
                                            review_content,
                                            review_score,
                                            product_no,
                                            user_id
                                            )
                                            values (?,?,?,?,?)`,
    // mypageReviewNo:`select 
    //                     review_no
    //                 from review where order_no= ? 
    //                 and review_content= ? 
    //                 and review_score= ? 
    //                 and product_no = ? 
    //                 and user_id= ?`,
    mypageReviewImg:`insert into addFile(
                                        add_name,
                                        table_class,
                                        table_no,
                                        turn,
                                        temName
                                        )
                     values(?,?,?,?,?)`,
    mypageReviewDelete:`delete from review where review_no = ?`,
    mypageReviewImgDelete:`delete from addFile where table_no= ?`,
    mypageQnAInfo:`select 
                        qna_title,
                        qna_content,
                        qna_date,
                        qna_reply,
                        product_no,
                        qna_no
                    from qna 
                    where qna_no=?`,
    
    mypageQnAinsert:`insert into qna(
                                    qna_title,
                                    qna_content,
                                    user_id)
                     values(?,?,?)`,
    mypageQnADelete:`delete from qna 
                     where qna_no=?`,
    mypageQnAImgDelete:`DELETE FROM addFile
                        WHERE add_no IN (
                        SELECT add_no FROM (
                                SELECT add_no FROM addFile WHERE table_no = ?
                                    ) AS subquery
                            )`,
    mypageSelectImg:`select 
                        add_name,
                        temName
                    from addFile 
                    where table_no= ? 
                    and table_class = ?
                    order by turn`,
    mypageWishGetCart:`insert into cart (user_id,product_no)
                        values(?,?)`,

    mypageReviewUpdate:`update review 
                        set review_content= ?
                        where review_no= ? `,
                        
    mypageQnAupdate:`update qna 
                    set
                     qna_title = ?, 
                    qna_content = ?
                    where qna_no= ?`,
    mypageUpdateImg:`delete from addFile 
                        where table_class= ?
                        and table_no= ? `,
    mypageProductReview:`SELECT 
                            r.review_no,
                            r.review_content,
                            r.review_score,
                            r.review_date,
                            r.user_id,
                            GROUP_CONCAT(a.add_name SEPARATOR ', ') AS add_names
                        FROM 
                            review r
                        LEFT JOIN 
                            addFile a
                        ON 
                            r.review_no = a.table_no AND a.table_class = 'review'
                        WHERE 
                            r.product_no = ?
                        GROUP BY 
                            r.review_no, r.review_content, r.review_score, r.review_date, r.user_id`

}