const express = require('express');
const router = express.Router();
const query = require('../mysql');

router.get("/", async (req, res) => {
  let result = await query("getCategory");
  let allbest = await query("MainAllBest");
  res.json({
    resultCategory: result,
    best8 : allbest,
});
});

router.get("/best/:no", async (req, res) => {
  let category8 = await query("categoryBest", req.params.no)
  console.log('Category Best:', category8, 'params :',req.params.no);
  res.send(category8)
});


// router.get("/:no", async (req, res) => {
//       const { no } = req.params.no;
//       const { page = 1, perPage = 12 } = req.query; // 기본값 설정
//       let categoryProducts = await query("categoryProduct", no, (page - 1) * perPage, perPage);
//       let productTotal = await query("productCnt", no);
//       res.json({
//         products: categoryProducts,
//         total: productTotal[0].count,
//         page, // 현재 페이지 번호 추가
//         perPage, // 한 페이지당 상품 개수 추가
//         hasNextPage: categoryProducts.length === perPage, // 마지막 페이지 여부 추가
//       });
// });

router.get("/:no", async (req, res) => {
  const { no } = req.params;
  const { page = 1, perPage = 12 } = req.query;

  const categoryProducts = await ("categoryProduct",no, page, perPage);
  const productTotal = await query("productCnt", no); // 쿼리 이름으로 참조
  res.json({
    products: categoryProducts,
    total: productTotal[0].count,
    page,
    perPage,
    hasNextPage: categoryProducts.length === perPage,
  });
});


router.get("/detail/:no", async (req, res) => {
  let result = await query("productDetail", req.params.no);
  res.send(result);
});

router.get("/search/:keyword", async (req, res) => {
  let result = await query("productSearch", req.params.keyword);
  let searchCnt = await query("SearchCnt", req.params.keyword);
  res.json({
      products : result,
      total: searchCnt[0].count
  })
});




  module.exports = router;

  