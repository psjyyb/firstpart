module.exports = {
    getCategory : `SELECT category_no,category_name 
                        FROM category;`,
    productCategory : `SELECT product_no,product_name,product_price,product_img 
                        FROM product 
                        WHERE category_no =?`,
    productDetail : `SELECT product_no,product_name,product_price,product_img,product_detail_img 
                        FROM product 
                        WHERE product_no = ?`,
                        
    
}
