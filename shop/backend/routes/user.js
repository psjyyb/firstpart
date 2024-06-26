const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");

//목록
router.get("/",async(req,res )=> {
 	let result =await query("userList");
 	res.send(result);
});
//등록
router.post("/",async (req ,res )=> {
 	let result =await query("userInsert",	req.body );
 	res.send(result);
});
//개인정보조회
router.get("/:id",async (req ,res )=>{
 	let result =await query("userInfo",	req.params.id );
 	res.send(result);
});
// //수정
// router.put("/:id)",	async (req ,res )=> {
//  	let result =await query("userUpdate",[req.body,	req.params.id]);
//  	res.send(result);
// });
//삭제
// router.delete("/:id)",	async (req ,	res )	=> {
//  	let result =	await query("userDelete",	req.params.id );
//  	res.send(result);
// });

module.exports =router ;