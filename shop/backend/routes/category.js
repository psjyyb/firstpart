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
  res.send(category8)
});

router.get("/detail/:no", async (req, res) => {
  let result = await query("productDetail", req.params.no);
  console.log('result : ' , result)
  res.send(result);
});

router.get("/search", async (req, res) => {
  let key = req.query.keyword;
  console.log("검색어",key);
  let result = await query("productSearch", key);
  let searchCnt = await query("SearchCnt", key);
  res.json({
      products : result,
      total: searchCnt[0].count
  })
});

router.get("/:no", async (req, res) => {
  let { no } = req.params;
  let { pno = 1} = req.query;
  const perPage = 12;
  let startIdx = (Number(pno) - 1)  * perPage;
  let categoryProducts = await query("scrollProduct",[no, startIdx, perPage]);
  let productTotal = await query("productCnt", req.params.no); // 쿼리 이름으로 참조
  console.log("category_no : " , no)
  console.log("total : ", productTotal[0].count)
  console.log("data : ", categoryProducts)
  console.log('page :' , pno)
  console.log('perPage : ', perPage)
  console.log('현재 : ' , (startIdx + perPage - 1));
  console.log('전체수량 : ', categoryProducts)
  res.json({
    total: productTotal[0].count,
    products: categoryProducts,
    pno,
    perPage,
    hasNextPage: !((startIdx + perPage - 1) >= productTotal[0].count),
  });
});

  module.exports = router;

  