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

  //검색
  router.get("/productList/seach",async(req,res )=> {
    let seachcatecory=req.query.seachcatecory;
    let seachname ='%'+req.query.seachname+'%';
    console.log(seachcatecory);
    console.log(seachname);

    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }

    let offset = (page-1)*pageUnit;

    console.log(offset);
    console.log(pageUnit);
   let list = await query("AdminproductSeachList",[seachcatecory,seachname,offset,pageUnit])
   let count = await query("AdminproductSeachListCount",[seachcatecory,seachname])
   console.log(list);
    res.send({list,count})
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
   console.log(list);
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
    let result =	await query("AdminproductInsert",[req.body.product_name,req.body.product_price,req.files.product_img[0].filename,req.files.product_detail_img[0].filename,req.body.product_mfd,req.body.product_exp,req.body.category_no,req.body.storage_cnt,req.body.storage_cnt,300])
    res.send(result);
});

//단건조회
router.get("/productInfo/:no",async(req,res )=> {
  let result =	await query("productInfo",	req.params.no );
 	res.send(result);
});

//수정
router.put("/updateproduct/:no",product_img_upload.fields([{ name: 'c_product_img' }, { name: 'c_product_detail_img' }]),	async (req ,	res )	=> {

  console.log(req.params.no);
  console.log((req.body));
  
   if(req.body.c_product_img===undefined){
   //파일삭제
   try {

    //동기 방식으로 파일 삭제
      fs.unlinkSync(`upload/productimg/${req.body.product_img}`)
  
  } catch (error) {
  
      if(err.code == 'ENOENT'){
          console.log("파일 삭제 Error 발생");
      }
  }
   //
   req.body.product_img=req.files.c_product_img[0].filename;
   
   let product_img='productimg';
   moveFile(req.files.c_product_img[0].filename,product_img);

   }
   
   if(req.body.c_product_detail_img===undefined){
    //파일삭제
   try {

    //동기 방식으로 파일 삭제
      fs.unlinkSync(`upload/productdetailimg/${req.body.product_detail_img}`)
  
  } catch (error) {
  
      if(err.code == 'ENOENT'){
          console.log("파일 삭제 Error 발생");
      }
  }
   //
    req.body.product_detail_img=req.files.c_product_detail_img[0].filename;

    let product_detail_img='productdetailimg';
   moveFile(req.files.c_product_detail_img[0].filename,product_detail_img);

    }
    
    let update={
      product_name: req.body.product_name,
      product_price: req.body.product_price,
      product_mfd: req.body.product_mfd,
      product_exp: req.body.product_exp,
      category_no: req.body.category_no,
      product_img: req.body.product_img,
      product_detail_img: req.body.product_detail_img
    };

  console.log(update);
   let result =	await query("productUpdate",[update,	req.params.no]);
   res.send(result);
});

//삭제
router.delete("/deleteproduct/:no",async(req,res )=> {
  let result =	await query("productDelete",	req.params.no );
 	res.send(result);
});

router.put("/outproductstock/:product_no",	async (req ,	res )	=> {
    
    let result =	await query("ProductstockOut",	[req.body.out,	req.params.product_no]);
    res.send(result);
});

router.put("/inproductstock/:product_no",	async (req ,	res )	=> {
    
    let result =	await query("ProductstockIn",	[req.body.in, req.body.in,	req.params.product_no]);
    res.send(result);
});

module.exports =router ;