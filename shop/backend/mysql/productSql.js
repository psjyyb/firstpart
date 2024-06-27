module.exports = {
    getCategoryBest : `SELECT product_no,product_name,product_price,product_img 
                            FROM product WHERE category_no = ?
                            ORDER BY (storage_cnt - stock_cnt) DESC
                            LIMIT 8`,
    getAllBest : `SELECT product_no,product_name,product_price,product_img  FROM product
                        ORDER BY (storage_cnt - stock_cnt) DESC
                        LIMIT 8`,
    getCategory : `SELECT category_no,category_name 
                        FROM category;`,
    categoryProduct : `SELECT product_no,product_name,product_price,product_img 
                        FROM product 
                        WHERE category_no =?`,
    productTotal : `SELECT count(*) as count 
                        FROM product WHERE category_no=?`,
    productDetail : `SELECT product_no,product_name,product_price,product_img,product_detail_img,product_point
                        FROM product 
                        WHERE product_no = ?`,
    productSearch: `SELECT  product_no, product_name, product_price, product_img
                    FROM product
                    WHERE product_name LIKE '%' ? '%' `,
    
}

