const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");

//목록
router.get("/orderList/",async(req,res )=> {
    let page = Number(req.query.page);
    let pageUnit =Number(req.query.pageUnit);
  
    if(!page){page = 1; }
    if(!pageUnit){ pageUnit = 5; }
     
   let offset = (page-1)*pageUnit;
   let list = await query("AdminuserOrderList",[offset,pageUnit])
   let count = await query("AdminuserOrderListCount")
    res.send({list,count})
});

router.put("/orderstate/",	async (req ,	res )	=> {
    
    let result =	await query("AdminstateUpdate",	[req.body.state,req.body.no]);
    res.send(result);
});


module.exports =router ;