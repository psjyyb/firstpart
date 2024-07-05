const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");
const multer = require("multer");
const fs = require('fs');

const noticeImgstorage = multer.diskStorage({
    destination: function (req, file, cb) { //파일이 저장 될 위치 지정
      cb(null, 'upload'); 
    },
    filename: function (req, file, cb) {
      const originalname = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
      //const temName=(file.originalname, 'latin1').toString('utf8'); // 파일 utf-8로 변환
      cb(null, Date.now() + '-' + originalname);
    }
  });

const notice_img_upload  = multer({ storage: noticeImgstorage });

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
router.get("/noticeList/",async(req,res )=> {
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("AdminnoticeList",[offset,pageUnit])
   let count = await query("AdminnoticeListCount")
    res.send({list,count})
});

router.post("/insertnotice",notice_img_upload.single('notice_picture'),	async (req ,	res )	=> {
    try {
        fs.readdirSync('upload/noticeImg'); // 폴더 확인
        console.log('noticeImg폴더 확인');
       
        
    } catch(err) {
        console.error('noticeImg 폴더가 없습니다. 폴더를 생성합니다.');
        fs.mkdirSync('upload/noticeImg'); // 폴더 생성
        
    }
    
    let noticet_img='noticeimg';
    moveFile(req.file.filename,noticet_img);
    let result = await query("noticeInsert",[req.body.notice_title,req.body.notice_content,req.file.filename])
    res.send(result);

});

module.exports =router ;