const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");

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


module.exports =router ;