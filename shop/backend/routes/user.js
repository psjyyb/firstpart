const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");
// const crypto = require('crypto');

// // 비밀번호 해싱 함수
// function hashPassword(password, salt) {
//   return new Promise((resolve, reject) => {
//     crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
//       if (err) reject(err);
//       resolve(derivedKey.toString('hex'));
//     });
//   });
// }
//비밀번호 확인
// router.post("/checkPw", async(req, res)=>{
// 	const userpw = req.body.user_pw;
// 	console.log(userpw);
// 	let result = await query("chceckPw",[userpw]);
// } ;

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
//로그인2..
// router.post('/api/user/login', async (req, res) => {
// 	const { user_id, user_pw } = req.body;
// 	try {
// 	  const result = await query("userLogin", [user_id, user_pw]);
// 	  const user = result.find(m => m.user_id === user_id && m.user_pw === user_pw);
// 	  if (user) {
// 		req.session.user_id = user_id; // 세션에 사용자 아이디 저장
// 		req.session.is_logged_in = true; // 세션에 로그인 여부 저장
// 		req.session.save(err => { // 세션 저장
// 		  if (err) throw err;
// 		  res.status(200).json(user); // 사용자 정보 전송
// 		});
// 	  } else {
// 		res.status(401).json({ message: 'Unauthorized' }); 
// 	  }
// 	} catch (error) {
// 	  console.error('Error logging in:', error);
// 	  res.status(500).json({ message: 'Internal server error' }); 
// 	}
//   });

//로그아웃 
router.post('/logout', (req, res) => {
	req.session.destroy(err => {
	  if (err) {
		console.error('Error destroying session:', err);
		res.status(500).send('Error destroying session');
	  } else {
		res.sendStatus(200);
	  }
	});
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


