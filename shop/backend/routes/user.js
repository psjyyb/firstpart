const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");

//로그인정보확인
router.get("/account", (req, res) => {
    if (req.session.is_logined) {
      const user = JSON.parse({user_id : req.session.user_id});
      return res.send(user);
    }
    res.send(401);
  });

//로그인 
router.post("/login", async(req,res)=>{
	const userid = req.body.user_id;
	const userpw = req.body.user_pw;
	console.log(userid);
	console.log(userpw);
	let result = await query("userLogin",[userid,userpw]);
	//  res.send(result);
	user = result.find(m=>m.user_id === userid && m.user_pw === userpw)
 	console.log('user:',user);
	if(user) {
	  req.session.user_id = userid; // 세션에 사용자 이메일 정보 저장
	  req.session.is_logined = true; // 세션에 로그인 여부 저장
	  req.session.save(err => { // 세션 저장
		if(err) throw err;
		res.send(user)
	  });
	}
	else{
		res.send(401);
	}
});

//로그아웃 
router.post("/logout",(req, res) => {
    req.session.destroy();
    res.send(200);
  });

//아이디 찾기
router.post("/FindId",async (req, res) =>{
	const username = req.body.user_name;
	const userphone = req.body.user_phone;
	console.log(username);
	console.log(userphone);
	let result = await query("userFindId",[username,userphone]);
	user = result.find(m=>m.user_name === username && m.user_phone ===userphone)
	console.log('user:',user);
	res.send(user);
})

//목록
router.get("/list",async(req,res )=> {
	 let result =await query("userList");
	 res.send(result);
});

//등록
router.post("/insert",async (req ,res )=> {
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


