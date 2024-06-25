const express = require('express');
const router = express.Router();
const query = require('../mysql');

//목록
router.get("/", async (req, res) => {
    let result = await query("productCategory");
    res.send(result);
  });


  module.exports = router;
