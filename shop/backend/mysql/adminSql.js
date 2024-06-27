module .exports =	{
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
   AdminuserOrderList:`select d.order_detail_No , p.product_img,p.product_name,  d.order_cnt,d.product_price,o.order_status
   from order_detail d 
   LEFT JOIN product p ON d.product_no = p.product_no 
   LEFT JOIN orders o ON d.order_no = o.order_no
   order by d.order_detail_No desc 
   limit ?,?`
   ,
   AdminuserOrderListCount:`select count(*) as cnt 
   from order_detail`,
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
};