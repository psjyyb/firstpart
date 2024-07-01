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


router.get("/:no", async (req, res) => {
      let categoryProducts = await query("categoryProduct", req.params.no);
      let productTotal = await query("productCnt", req.params.no);
      res.json({
          products: categoryProducts,
          //첫 번째 배열 요소의 count 속성
          total: productTotal[0].count 
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

  