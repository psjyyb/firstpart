const express = require('express');
const router = express.Router();
const query = require('../mysql');

//카테고리
router.get("/", async (req, res) => {
  let result = await query("getCategory");
  res.send(result);
});

//상품목록
router.get("/:no", async (req, res) => {
      let categoryProducts = await query("categoryProduct", req.params.no);
      let productTotal = await query("productCnt", req.params.no);
      res.json({
          products: categoryProducts,
          //첫 번째 배열 요소의 count 속성
          total: productTotal[0].count 
      });
});

//단건조회
router.get("/detail/:no", async (req, res) => {
  let result = await query("productDetail", req.params.no);
  res.send(result);
});

//검색목록
router.get("/search/:keyword", async (req, res) => {
  let result = await query("productSearch", req.params.keyword);
  let searchCnt = await query("SearchCnt", req.params.keyword);
  res.json({
      products : result,
      total: searchCnt[0].count
  })
});




  module.exports = router;

  