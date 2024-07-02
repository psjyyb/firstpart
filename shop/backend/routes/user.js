const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");
const crypto = require('crypto');

// 비밀번호 해싱 함수
async function hashPassword(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
            if (err) reject(err);
            resolve(derivedKey.toString('hex'));
        });
    });
}
// salt 생성 함수
async function generateSalt() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, salt) => {
            if (err) reject(err);
            resolve(salt.toString('hex')); // Buffer를 hex 문자열로 변환하여 반환
        });
    });
}
// 회원가입
router.post('/insert', async (req, res) => {
    const { user_id, user_pw, user_name, user_post, user_address, user_detail_addr, user_phone, user_email } = req.body;
    try {
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(user_pw, salt);
        // 사용자 정보를 객체로 생성
        const user = {
            user_id: user_id,
            user_pw: hashedPassword,
            user_name: user_name,
            user_post: user_post,
            user_address: user_address,
            user_detail_addr: user_detail_addr,
            user_phone: user_phone,
            user_email: user_email,
            salt: salt 
        };
        const result = await query('userInsert', user);
        res.status(201).send('회원가입 완료');
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.status(500).send('회원가입 중 오류 발생');
    }
});
// 아이디 중복 체크
router.post('/checkId', async (req, res) => {
	const { user_id } = req.body;
	try {
	  let result = await query('checkId', [user_id]);
	  const exists = result[0].count > 0;
	  res.send({ exists });
	} catch (error) {
	  console.error('아이디 중복 체크 실패:', error);
	  res.status(500).send('아이디 중복 체크 중 오류가 발생했습니다.');
	}
  });
// 로그인 정보 확인
router.get('/account', (req, res) => {
	if (req.session.is_logined && req.session.user_id) {
	  const userid = req.session.user_id;
	  // 예시로 사용자의 ID를 이용하여 사용자 정보를 DB에서 조회
	  query('userInfo', [userid])
	    .then(result => {
	      if (result.length > 0) {
	        const userInfo = result[0];
	        res.send(userInfo);
	      } else {
	        res.sendStatus(404);
	      }
	    })
	    .catch(error => {
	      console.error('Error fetching user info:', error);
	      res.status(500).send('Error fetching user info');
	    });
	} else {
	  res.sendStatus(401); 
	}
});
// 로그인
router.post('/login', async (req, res) => {
    const userid = req.body.user_id;
    const userpw = req.body.user_pw;
    
    try {
        // 사용자의 비밀번호를 입력받아 해싱
        const saltResult = await query('getSalt', [userid]);
        if (!saltResult || saltResult.length === 0) {
            res.sendStatus(401); 
            return;
        }     
        // salt 값 추출
        const salt = saltResult[0].salt;
        const hashedPassword = await hashPassword(userpw, salt);
        //DB에서 사용자 조회
        const result = await query('userLogin', [userid, hashedPassword]);
        const user = result.find(m => m.user_id === userid && m.user_pw === hashedPassword);
        
        if (user) {
            // 사용자 정보를 DB에서 모두 가져오기
            const userInfo = await query('userInfo', [userid]);
            if (userInfo.length > 0) {
                const fullUser = userInfo[0]; // 여기서 userInfo는 사용자의 모든 정보를 포함하는 객체여야 함
                req.session.user_id = userid;
                req.session.is_logined = true;
                req.session.save(err => {
                    if (err) throw err;
                    res.send(fullUser);
                });
            } else {
                res.sendStatus(404);
				console.log('정보없음') 
            }
        } else {
            res.sendStatus(401); 
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.sendStatus(500);
    }
});
  // 로그아웃
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


