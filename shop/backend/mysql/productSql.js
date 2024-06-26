module.exports = {
    productCategory : `SELECT product_no,product_name,product_price,product_img 
                        FROM product 
                        WHERE category_no =1`,
    productDetail : `SELECT product_no,product_name,product_price,product_img,product_detail_img 
                        FROM product 
                        WHERE product_no = ?`
    
}
