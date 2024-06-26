const express = require('express');
const router = express.Router();
const query = require('../mysql/index.js');

router.get("/NoticeInfo/:no", async (req,res)=>{
    await query("noticeInfo",req.params.no)
    .then(result=>res.send(result))
})

router.get("/NoticeList/", async (req,res)=>{
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("noticeList",[offset,pageUnit])
   let count = await query("noticeListCount")
    res.send({list,count})
})
router.get("/orderList/", async (req,res)=>{
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("mypageOrderList",[req.query.id,offset,pageUnit])
   let count = await query("mypageOrderListCount",req.query.id)
    res.send({list,count})
})

router.get("/cancelList/", async (req,res)=>{ // 경로 수정: "/cancelList/"로 변경
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("mypageCancelList",[req.query.id,offset,pageUnit])
   let count = await query("mypageCancelCount",req.query.id)
    res.send({list,count})
})
router.get("/QnAList/", async (req,res)=>{
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   console.log(offset,pageUnit)
   let list = await query("mypageQnAList",[req.query.id,offset,pageUnit])
   let count = await query("mypageQnAListCount",req.query.id)
    res.send({list,count})
})

router.get("/WishList/", async (req,res)=>{
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("mypageWishList",[req.query.id,offset,pageUnit])
   let count = await query("mypageWishListCount",req.query.id)
    res.send({list,count})
})
router.get("/CartList/", async (req,res)=>{
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("mypageCartList",[req.query.id,offset,pageUnit])
   let count = await query("mypageCartListCount",req.query.id)
    res.send({list,count})
})

router.get("/YesReviewList/", async (req,res)=>{
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("mypageYesReviewList",[req.query.id,offset,pageUnit])
   let count = await query("mypageYesReviewListCount",req.query.id)
    res.send({list,count})
})
router.get("/NoReviewList/", async (req,res)=>{
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("mypageNoReviewList",[req.query.id,offset,pageUnit])
   let count = await query("mypageNoReviewListCount",req.query.id)
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
