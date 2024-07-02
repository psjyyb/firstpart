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

router.get("/:no", async (req, res) => {
  let { no } = req.params;
  // let { page = 1, perPage = 12 } = req.query;

  // let categoryProducts = await ("scrollProduct",no, page, perPage);
  let productsAll = await query("categoryProduct", req.params.no);
  let productTotal = await query("productCnt", req.params.no); // 쿼리 이름으로 참조
  res.json({
    total: productTotal[0].count,
    productsall : productsAll
    // products: categoryProducts,
    // page,
    // perPage,
    // hasNextPage: categoryProducts.length === perPage,
  });
  console.log("category_no : " , no)
  console.log("total : ", productTotal[0].count)
  // console.log('page :' , page)
  // console.log('perPage : ', perPage)
  // console.log("categoryProducts : ", productsall)

});

router.get("/detail/:no", async (req, res) => {
  let result = await query("productDetail", req.params.no);
  console.log('result : ' , result)
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

  