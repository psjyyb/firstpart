const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");
const multer = require("multer");
const fs = require('fs');

const productImgstorage = multer.diskStorage({
    destination: function (req, file, cb) { //파일이 저장 될 위치 지정
      cb(null, 'upload'); 
    },
    filename: function (req, file, cb) {
      const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
      //const temName=(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
      cb(null, Date.now() + '-' + originalname);
    }
  });

const product_img_upload  = multer({ storage: productImgstorage });

const moveFile = async (filename,destfilename) => {
    let sourceFileFullPath = `upload/${filename}`;
    let destinationFileFullPath = `upload/${destfilename}/${filename}`;
    // Check if folder exists before writing files there
    
  
    fs.rename(sourceFileFullPath, destinationFileFullPath, (err) => {
        if (err) {
          console.log(err);
          return false;
        }
      });
    return true;
  }




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
router.post("/insertproduct",product_img_upload.fields([{ name: 'product_img' }, { name: 'product_detail_img' }]),	async (req ,	res )	=> {
    // let result =	await query("productInsert",	req.body );
    // res.send(result);
    try {
        fs.readdirSync('upload/productImg'); // 폴더 확인
        console.log('productImg폴더 확인');
       
        
    } catch(err) {
        console.error('productImg 폴더가 없습니다. 폴더를 생성합니다.');
        fs.mkdirSync('upload/productImg'); // 폴더 생성
        
    }
    
    try {
        fs.readdirSync('upload/productdetailimg'); // 폴더 확인
        console.log('productdetailimg폴더 확인');
       
        
    } catch(err) {
        console.error('productdetailimg 폴더가 없습니다. 폴더를 생성합니다.');
        fs.mkdirSync('upload/productdetailimg'); // 폴더 생성
        
    }

    let product_img='productimg';
    let product_detail_img= 'productdetailimg';
    console.log(req.files.product_img[0].filename);
    console.log(req.files.product_detail_img[0].filename);
    moveFile(req.files.product_img[0].filename,product_img);
    moveFile(req.files.product_detail_img[0].filename,product_detail_img);
    console.log(req.body) 


});

module.exports =router ;