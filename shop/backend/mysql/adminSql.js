module.exports =	{
   AdminproductList:`select p.product_no,p.product_name,p.product_price,p.product_img,p.product_mfd,p.product_exp,c.category_name,p.storage_cnt,p.stock_cnt,p.product_point
   from product p 
   LEFT JOIN category c ON p.category_no = c.category_no
   order by p.product_no desc 
   limit ?,?`,
   AdminproductListCount:`select count(*) as cnt 
   from product`,
   AdminuserList:`select user_id,user_pw,user_name,user_post,user_address,user_detail_addr,user_phone,user_email,user_point
   from user
   order by user_id desc 
   limit ?,?`,
   AdminuserListCount:`select count(*) as cnt 
   from user`,
   AdminuserOrderList:`select order_no,order_date,user_id,pay_price,order_status
   from orders
   order by order_no desc 
   limit ?,?`
   ,
   AdminuserOrderListCount:`select count(*) as cnt 
   from orders`,
   AdminnoticeList:`select notice_no,notice_title,notice_date 
   from notice
   order by notice_no desc 
   limit ?,?`,
   AdminnoticeListCount:`select count(*) as cnt 
   from notice`,
   AdminqnaList:`select qna_no,qna_title,qna_date,qna_reply,user_id
   from qna
   order by qna_no desc 
   limit ?,?
   `,
   AdminqnaListCount:`select count(*) as cnt 
   from qna`,
   AdminOrderstateUpdate:`UPDATE orders
   SET order_status =	?	
   WHERE	order_no	=	 ?
   `,
   AdmincancelstateUpdate:`UPDATE cancel
   SET cancel_state =	?	
   WHERE	order_no	=	 ?
   `,
   AdminproductInsert:`insert into product
   (product_name,product_price,product_img,product_detail_img, product_mfd,product_exp,category_no,storage_cnt,stock_cnt,product_point )
   values(?,?,?,?,?,?,?,?,?,?)
   `,
   ProductstockOut : `UPDATE product 
   SET stock_cnt = stock_cnt - ?
   WHERE product_no = ?
   `,
   ProductstockIn : `UPDATE product 
   SET stock_cnt = stock_cnt + ? , storage_cnt = storage_cnt +?
   WHERE product_no = ?
   `,
   AdminuserDelete : `DELETE FROM user
   WHERE user_id = ? 
   `,
   productInfo : `SELECT product_no,product_name,product_price,product_img,product_detail_img, product_mfd,product_exp,category_no 
                        FROM product 
                        WHERE product_no = ?
   `,
   productDelete:`DELETE FROM product 
   WHERE product_no = ? 
   `,
   productUpdate:`UPDATE product SET ?
   WHERE	product_no	=	?
   `,
   qnaInfo:`SELECT q.qna_no,q.qna_title,q.qna_content,q.qna_date,q.qna_reply,p.product_name,q.user_id
   FROM qna q left join product p 
   on q.product_no = p.product_no 
   WHERE qna_no = ?
   `,
   qnaInsert:`UPDATE qna 
   SET qna_reply = ?
   WHERE	qna_no	=	?
   `,
   noticeInsert:`insert into notice
   (notice_title,notice_content,notice_picture)
   values(?,?,?)
   `,
   AdminproductSeachList:`select p.product_no,p.product_name,p.product_price,p.product_img,p.product_mfd,p.product_exp,c.category_name,p.storage_cnt,p.stock_cnt,p.product_point
   from product p 
   LEFT JOIN category c ON p.category_no = c.category_no
   WHERE	??	=	?
   order by p.product_no desc 
   limit ?,?
   `,
   AdminproductSeachListCount:`select count(*) as cnt 
   from product p 
   LEFT JOIN category c ON p.category_no = c.category_no
   WHERE	?	=	?
   `,
    
};