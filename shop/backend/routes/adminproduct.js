const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");
const multer = require("multer");
const fs = require('fs');

const upload = multer({
    dest:'upload/'
});

//목록
router.get("/productList/",async(req,res )=> {
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("AdminproductList",[offset,pageUnit])
   let count = await query("AdminproductListCount")
    res.send({list,count})
});

//등록
router.post("/productImg",upload.array('product_img'),	async (req ,	res )	=> {
    // let result =	await query("productInsert",	req.body );
    // res.send(result);
    try {
        fs.readdirSync('upload'); // 폴더 확인
        console.log('폴더 확인');
       
        
    } catch(err) {
        console.error('upload 폴더가 없습니다. 폴더를 생성합니다.');
        fs.mkdirSync('uploads'); // 폴더 생성
        
    }
    




});

module.exports =router ;