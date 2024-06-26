const express = require('express');
const router = express.Router();
const query = require('../mysql');


//단건조회
router.get("/:no", async (req, res) => {
  let result = await query("productDetail", req.params.no);
  res.send(result);
});




  module.exports = router;

  