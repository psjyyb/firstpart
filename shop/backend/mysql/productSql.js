module.exports = {
    getCategoryBest : `SELECT product_no,product_name,product_price,product_img 
                            FROM product WHERE category_no = ?
                            ORDER BY (storage_cnt - stock_cnt) DESC
                            LIMIT 8`,
    getAllBest : `SELECT product_no,product_name,product_price,product_img  FROM product
                        ORDER BY (storage_cnt - stock_cnt) DESC
                        LIMIT 8`,
    getCategory : `SELECT category_no,category_name 
                        FROM category`,
    scrollProduct : `SELECT product_no,product_name,product_price,product_img , storage_cnt,stock_cnt
                        FROM product 
                        WHERE category_no =?
                        LIMIT ?, ?`,
    categoryProduct : `SELECT product_no,product_name,product_price,product_img
                        FROM product 
                        WHERE category_no =?`,
    productCnt : `SELECT count(*) as count 
                        FROM product WHERE category_no=?`,
    productDetail : `SELECT product_no,product_name,product_price,product_img,product_detail_img,product_point, product_mfd,product_exp, stock_cnt, category_no
                        FROM product 
                        WHERE product_no = ?`,
    productSearch: `SELECT  product_no, product_name, product_price, product_img, stock_cnt,storage_cnt
                    FROM product
                    WHERE product_name like concat('%',?,'%') `,
    SearchCnt : `SELECT count(*) as count 
                    FROM product 
                    WHERE product_name LIKE '%' ? '%'`,
    categoryBest : `SELECT product_no,product_name,product_price,product_img 
                    FROM product 
                    WHERE category_no = ? 
                    ORDER BY (storage_cnt - stock_cnt) DESC
                    LIMIT 8`,
    MainAllBest : `SELECT product_no,product_name,product_price,product_img 
                    FROM product  
                    ORDER BY (storage_cnt - stock_cnt) DESC
                    LIMIT 8`,
                   
    
}

