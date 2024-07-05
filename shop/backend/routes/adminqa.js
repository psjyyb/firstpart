const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");

//목록
router.get("/qnaList/",async(req,res )=> {
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("AdminqnaList",[offset,pageUnit])
   let count = await query("AdminqnaListCount")
    res.send({list,count})
});

router.get("/qnaList/:no",async(req,res )=> {
    let result =	await query("qnaInfo",	req.params.no );
       res.send(result);
  });

  router.put("/insertqna/:no",	async (req ,	res )	=> {
    let result =	await query("qnaInsert",	[req.body.qna_reply,	req.params.no]);
    res.send(result);
});

module.exports =router ;