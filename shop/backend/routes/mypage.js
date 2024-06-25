const express = require('express');
const router = express.Router();
const query = require('../mysql/index.js');

router.get("/orderList", async (req,res)=>{
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("mypageOrderList",[req.query.id,offset,pageUnit])
   let count = await query("mypageOrderListCount",req.query.id)
    res.send({list,count})
})

router.get("/:id", async (req,res)=>{
    let userInfo = await query("mypageUserInfo",req.params.id);
    let qnaNoCount = await query("mypageNoQnACount",req.params.id);
    let qnaYesCount = await query("mypageYesQnACount",req.params.id);
    let revieYesCount = await query("mypageYesReviewCount",req.params.id)
    let revieNoCount = await query("mypageNoReviewCount",req.params.id)
    let lastOrder = await query("mypageLastOrder",req.params.id)
    res.send({userInfo,qnaNoCount,qnaYesCount,revieYesCount,revieNoCount,lastOrder}) 
})

module.exports = router;