const express = require('express');
const router = express.Router();
const query = require('../mysql/index.js');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //파일이 저장 될 위치 지정
      cb(null, 'd:/upload'); 
    },
    filename: function (req, file, cb) {
      const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
      //const temName=(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
      cb(null, Date.now() + '-' + originalname);
    }
  });
const upload = multer({ storage: storage });


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

router.get("/OrderInfo/", async (req,res) =>{
    let order = await query("mypageOrderInfo",req.query.no);
    let orderDetail = await query("mypageOrderDetailInfo",req.query.no);
    res.send({order,orderDetail})
})
router.get("/CancelInfo/", async (req,res) =>{
    await query("mypageCancelInfo",req.query.no)
    .then(result=>res.send(result))
    
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

router.delete("/wishDelete/:no", async (req,res)=>{
    await query("mypageWishSelectDelete",req.params.no)
    .then(result=>res.send(result))
})
router.delete("/orderDelete/:no", async (req,res)=>{
    console.log('1번들어옴')
    console.log(req.params.no)
    await query("mypageOrderDelete",req.params.no)
    .then(result=>console.log('2번들어옴'))
    .catch(err=>console.log(err))
   
})
router.post("/cancelInsert/",async (req,res)=>{
    console.log(req.query.no,req.query.id)
    await query("mypageCancelInsert",[req.query.no,req.query.id])
    .then(result=>{console.log('3번들어옴'),res.send(result)})
    .catch(err=>console.log(err))
})

router.get("/ReviewInsertInfo/:no",async (req,res)=>{
    await query("mypageReviewInsertInfo",req.params.no)
    .then(result=>res.send(result))
})

router.post("/ReviewInsert/",upload.array("files"), async (req, res) => {
    let data = { ...req.body };
    console.log(data)
    console.log(req.files)
    console.log(req.files.length)
    let review = 'review';
    await query("mypageReviewInsert",[data.orderNo,data.content,data.score,data.productNo,data.userId])
    .then(result=>{
        for(let i=1; i<req.files.length+1; i++){
            query("mypageReviewImg",[req.files[i-1].filename,review,result.insertId,i,req.files[i-1].originalname])
            .then(result=>res.send(result))
            .catch(err=>{console.log(err)})
        }
        
    })
    .catch(err=>console.log(err))
});

router.delete("/ReviewDelete/:no",async (req,res)=>{
    await query("mypageReviewDelete",req.params.no)
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
    await query("mypageQnAImgDelete",req.params.no)
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
})

router.get("/QnAInfo/:no", async (req,res)=>{
   let info = await query("mypageQnAInfo",req.params.no)
   let img = await query("mypageSelectImg",req.params.no)
    res.send({info,img})
    
})

router.post("/QnAInsert/",upload.array("files"), async (req, res) => {
    let data = { ...req.body };
    console.log(data)
    console.log(req.files)
    console.log(req.files.length)
    //const originalname = Buffer.from(req.files.originalname, 'latin1').toString('utf8');
    let qna = 'qna';
    await query("mypageQnAinsert",[data.title,data.content,data.userId])
    .then(result=>{console.log(result)
        for(let i=1; i<req.files.length+1; i++){
            query("mypageReviewImg",[req.files[i-1].filename,qna,result.insertId,i,req.files[i-1].originalname])
            .then(result=>{console.log(result)})
            .catch(err=>{console.log(err)})
        }
        
    })
    .catch(err=>console.log(err))
});

router.delete("/QnADelete/:no", async (req,res)=>{
    await query("mypageQnADelete",req.params.no)
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
    await query("mypageQnAImgDelete",req.params.no)
    .then(result=>console.log(result))
    .catch(err=>console.log(err))
})

router.get("/reviewImg/:no", async (req,res)=>{
    console.log('여기는.,.?')
    await query("mypageSelectImg",req.params.no)
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
})

module.exports = router;



















// const express = require('express');
// const router = express.Router();
// const query = require('../mysql/index.js');
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) { //파일이 저장 될 위치 지정
//       cb(null, 'd:/upload'); 
//     },
//     filename: function (req, file, cb) {
//       const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
//       cb(null, Date.now() + '-' + originalname);
//     }
//   });
// const upload = multer({ storage: storage });


// router.get("/NoticeInfo/:no", async (req,res)=>{
//     await query("noticeInfo",req.params.no)
//     .then(result=>res.send(result))
// })

// router.get("/NoticeList/", async (req,res)=>{
//     let page = Number(req.query.page);
//     let pageUnit =Number(req.query.pageUnit);
  
//     if(!page){page = 1; }
//     if(!pageUnit){ pageUnit = 5; }
     
//    let offset = (page-1)*pageUnit;
//    let list = await query("noticeList",[offset,pageUnit])
//    let count = await query("noticeListCount")
//     res.send({list,count})
// })
// router.get("/orderList/", async (req,res)=>{
//     let page = Number(req.query.page);
//     let pageUnit =Number(req.query.pageUnit);
  
//     if(!page){page = 1; }
//     if(!pageUnit){ pageUnit = 5; }
     
//    let offset = (page-1)*pageUnit;
//    let list = await query("mypageOrderList",[req.query.id,offset,pageUnit])
//    let count = await query("mypageOrderListCount",req.query.id)
//     res.send({list,count})
// })

// router.get("/OrderInfo/", async (req,res) =>{
//     let order = await query("mypageOrderInfo",req.query.no);
//     let orderDetail = await query("mypageOrderDetailInfo",req.query.no);
//     res.send({order,orderDetail})
// })
// router.get("/CancelInfo/", async (req,res) =>{
//     await query("mypageCancelInfo",req.query.no)
//     .then(result=>res.send(result))
    
// })

// router.get("/cancelList/", async (req,res)=>{ // 경로 수정: "/cancelList/"로 변경
//     let page = Number(req.query.page);
//     let pageUnit =Number(req.query.pageUnit);
  
//     if(!page){page = 1; }
//     if(!pageUnit){ pageUnit = 5; }
     
//    let offset = (page-1)*pageUnit;
//    let list = await query("mypageCancelList",[req.query.id,offset,pageUnit])
//    let count = await query("mypageCancelCount",req.query.id)
//     res.send({list,count})
// })
// router.get("/QnAList/", async (req,res)=>{
//     let page = Number(req.query.page);
//     let pageUnit =Number(req.query.pageUnit);
  
//     if(!page){page = 1; }
//     if(!pageUnit){ pageUnit = 5; }
     
//    let offset = (page-1)*pageUnit;
//    console.log(offset,pageUnit)
//    let list = await query("mypageQnAList",[req.query.id,offset,pageUnit])
//    let count = await query("mypageQnAListCount",req.query.id)
//     res.send({list,count})
// })

// router.get("/WishList/", async (req,res)=>{
//     let page = Number(req.query.page);
//     let pageUnit =Number(req.query.pageUnit);
  
//     if(!page){page = 1; }
//     if(!pageUnit){ pageUnit = 5; }
     
//    let offset = (page-1)*pageUnit;
//    let list = await query("mypageWishList",[req.query.id,offset,pageUnit])
//    let count = await query("mypageWishListCount",req.query.id)
//     res.send({list,count})
// })
// router.get("/CartList/", async (req,res)=>{
//     let page = Number(req.query.page);
//     let pageUnit =Number(req.query.pageUnit);
  
//     if(!page){page = 1; }
//     if(!pageUnit){ pageUnit = 5; }
     
//    let offset = (page-1)*pageUnit;
//    let list = await query("mypageCartList",[req.query.id,offset,pageUnit])
//    let count = await query("mypageCartListCount",req.query.id)
//     res.send({list,count})
// })

// router.get("/YesReviewList/", async (req,res)=>{
//     let page = Number(req.query.page);
//     let pageUnit =Number(req.query.pageUnit);
  
//     if(!page){page = 1; }
//     if(!pageUnit){ pageUnit = 5; }
     
//    let offset = (page-1)*pageUnit;
//    let list = await query("mypageYesReviewList",[req.query.id,offset,pageUnit])
//    let count = await query("mypageYesReviewListCount",req.query.id)
//     res.send({list,count})
// })
// router.get("/NoReviewList/", async (req,res)=>{
//     let page = Number(req.query.page);
//     let pageUnit =Number(req.query.pageUnit);
  
//     if(!page){page = 1; }
//     if(!pageUnit){ pageUnit = 5; }
     
//    let offset = (page-1)*pageUnit;
//    let list = await query("mypageNoReviewList",[req.query.id,offset,pageUnit])
//    let count = await query("mypageNoReviewListCount",req.query.id)
//     res.send({list,count})
// })

// router.get("/:id", async (req,res)=>{
//     let userInfo = await query("mypageUserInfo",req.params.id);
//     let qnaNoCount = await query("mypageNoQnACount",req.params.id);
//     let qnaYesCount = await query("mypageYesQnACount",req.params.id);
//     let revieYesCount = await query("mypageYesReviewCount",req.params.id)
//     let revieNoCount = await query("mypageNoReviewCount",req.params.id)
//     let lastOrder = await query("mypageLastOrder",req.params.id)
//     res.send({userInfo,qnaNoCount,qnaYesCount,revieYesCount,revieNoCount,lastOrder}) 
// })

// router.delete("/wishDelete/:no", async (req,res)=>{
//     await query("mypageWishSelectDelete",req.params.no)
//     .then(result=>res.send(result))
// })
// router.delete("/orderDelete/:no", async (req,res)=>{
//     await query("mypageOrderDelete",req.params.no)
//     .then(result=>res.send(result))
// })

// router.get("/ReviewInsertInfo/:no",async (req,res)=>{
//     await query("mypageReviewInsertInfo",req.params.no)
//     .then(result=>res.send(result))
// })

// router.post("/ReviewInsert/", async (req, res) => {
//     let data = { ...req.body };
//     //console.log(req.body)
//     await query("mypageReviewInsert",[data.order_no,data.content,data.star,data.product_no,data.id])
//     .then(result=>res.send(result))
  
// });

// router.post("/ReviewImgInsert/",upload.array("files"), async (req, res) => {
//     console.log('이쪽으로 안들어옴???');
//     let data = { ...req.body };
//     console.log('ㄴㅇㄹㄴㅁㅇㄻㄴ',data);
//     console.log('ㅁㅇㄻㄴㅇ',req.files);
// });
// // router.get("/ReviewNoSelect/",async (req,res)=>{
// //     let data = { ...req.body };
// //     await query("mypageReviewNo",[data.order_no,data.content,data.star,data.product_no,data.id])
// //     .then(result=>res.send(result))
// //     .catch(err=>console.log(err))
// // })

// module.exports = router;

