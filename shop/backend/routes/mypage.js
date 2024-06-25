const express = require('express');
const router = express.Router();
const query = require('../mysql/index.js');

router.get("/",(req,res)=>{
    query("test")
    .then(result=>res.send(result))
})
module.exports = router;