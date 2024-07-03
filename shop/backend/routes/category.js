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
    let result = await query("productCategory",req.params.no);
    res.send(result);
  });



  module.exports = router;

  