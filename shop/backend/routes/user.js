const express =	require("express");
const router =	express.Router();
const query =	require("../mysql");
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 자릿수를 결정하는 값

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
  const { user_id, user_pw } = req.body;
  try {
    const saltResult = await query('getSalt', [user_id]);
    if (!saltResult || saltResult.length === 0) {
      res.sendStatus(401);
      return;
    }
    const salt = saltResult[0].salt;
    //db랑비교
    const hashedPassword = await hashPassword(user_pw, salt);
    const result = await query('userLogin', [user_id, hashedPassword]);
    const user = result.find(m => m.user_id === user_id && m.user_pw === hashedPassword);
    if (user) {
      const userInfo = await query('userInfo', [user_id]);
      if (userInfo.length > 0) {
        const fullUser = userInfo[0];
        req.session.user_id = user_id;
        req.session.is_logined = true;
        req.session.save(err => {
          if (err) throw err;
          res.send(fullUser);
        });
      } else {
        res.sendStatus(404);
        console.log('정보없음');
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: '서버 오류: 로그인을 처리할 수 없습니다.' });
  }
});
  // 로그아웃
  router.post('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.sendStatus(200);
    });
  });

// 비밀번호 확인
router.post('/pwCheck', async (req, res) => {
  const { user_pw } = req.body;
  const userId = req.session.user_id;

  if (!userId) {
    res.sendStatus(401); 
    return;
  }
  try {
    const saltResult = await query('getSalt', [userId]);
    if (!saltResult || saltResult.length === 0) {
      res.sendStatus(401);
      return;
    }
    const salt = saltResult[0].salt;
    const hashedPassword = await hashPassword(user_pw, salt);

    const result = await query('userLogin', [userId, hashedPassword]);
    const user = result.find(m => m.user_id === userId && m.user_pw === hashedPassword);

    if (user) {
      res.sendStatus(200); 
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error('비밀번호 확인 중 오류 발생:', error);
    res.sendStatus(500); 
  }
});

// 카카오 로그인 시 비밀번호 확인 필요 없음을 의미하는 수정된 코드
router.post('/pwCheck', async (req, res) => {
  res.sendStatus(200); // 항상 인증 성공으로 응답
});

//아이디 찾기
router.post("/FindId",async (req, res) =>{
	const username = req.body.user_name;
	const userphone = req.body.user_phone;
	console.log(username);
	console.log(userphone);
	let result = await query("userFindId",[username,userphone]);
  console.log(result)

	res.send(result[0]);
})

//비밀번호 찾기 
router.post("/FindPw",async (req, res) =>{
	const username = req.body.user_name;
	const userphone = req.body.user_phone;
  const userid = req.body.user_id;
	console.log(username);
	console.log(userphone);
  console.log(userid);
	let result = await query("userFindPw",[username,userphone,userid]);
	user = result.find(m=>m.user_name === username && m.user_phone ===userphone&& m.user_id ===userid)
	console.log('user:',user);
	res.send(user);
})

//비밀번호수정
router.put('/changePassword/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { new_password } = req.body;
  
  try {
    // 사용자의 salt 가져오기
    const saltResult = await query('getSalt', [userId]);
    if (!saltResult || saltResult.length === 0 || !saltResult[0].salt) {
      // salt를 가져오지 못한 경우
      console.error('사용자의 salt를 찾을 수 없습니다.');
      res.status(500).send('사용자의 salt를 찾을 수 없습니다.');
      return;
    }

    const salt = saltResult[0].salt;
    const hashedPassword = await hashPassword(new_password, salt);
    console.log('++++++++', new_password);
    console.log(hashedPassword);
  
    // 비밀번호 업데이트
    const updateResult = await query('changePw', [hashedPassword, userId]);
    if (updateResult.affectedRows > 0) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.error('비밀번호 변경 중 오류 발생:', error);
    res.sendStatus(500);
  }
});

//개인정보수정
router.put('/updateUser', async (req, res) => {
  const { user_id, user_name, user_post, user_address, user_detail_addr, user_phone, user_email } = req.body;
  
  try {
    const userInfo = {
      user_name: user_name,
      user_post: user_post,
      user_address: user_address,
      user_detail_addr: user_detail_addr,
      user_phone: user_phone,
      user_email: user_email
    };
    
    const result = await query('updateUser', [user_name, user_post, user_address, user_detail_addr, user_phone, user_email, user_id.toString()]);
    
    res.status(200).send('사용자 정보가 업데이트되었습니다.');
  } catch (error) {
    console.error('사용자 정보 업데이트 오류:', error);
    res.status(500).send('사용자 정보 업데이트 중 오류 발생');
  }
});


//회원탈퇴
router.post('/delete', async (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
  }
  try {
    const result = await query('deleteUser', [userId]);
    if (result.affectedRows > 0) {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ success: false, message: '회원 탈퇴 중 오류가 발생했습니다.' });
        }
        res.status(200).json({ success: true, message: '회원 탈퇴가 완료되었습니다.' });
      });
    } else {
      res.status(404).json({ success: false, message: '회원을 찾을 수 없습니다.' });
    }
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ success: false, message: '서버 오류로 회원 탈퇴를 진행할 수 없습니다.' });
  }
});

// 카카오 로그인 회원가입 및 세션 처리
router.post('/kakao-register', async (req, res) => {
  const { kakao_id, user_email } = req.body;

  try {
    let result = await query('checkId', [kakao_id.toString()]);
    const exists = result[0].count > 0;

    if (exists) {
      req.session.user_id = kakao_id.toString();
      req.session.is_logined = true;
      req.session.save(err => {
        if (err) throw err;
        res.send({ success: true, message: "이미 가입된 사용자입니다." });
      });
    } else {
      const user = {
        user_id: kakao_id.toString(),
        user_name: "카카오 사용자",
        user_email: user_email,
        user_point: 0,
        is_kakao_user: true, // 카카오 사용자일 경우 TRUE로 설정
        user_post:'',
        user_address:'',
        user_detail_addr:'',
        user_phone:'',
      };

      result = await query('userInsert', user);
      req.session.user_id = kakao_id.toString();
      req.session.is_logined = true;
      req.session.save(err => {
        if (err) throw err;
        res.status(201).send({ success: true, message: '회원가입 완료' });
      });
    }
  } catch (error) {
    console.error('카카오 로그인 오류:', error);
    res.status(500).send({ success: false, message: '카카오 로그인 중 오류 발생' });
  }
});


//카카오사용자 정보 등록
router.post('/insertKakaoUser', async (req, res) => {
  const { user_id, user_email } = req.body;
  try {
    const user = {
      user_id: user_id.toString(), // user_id는 문자열로 저장
      user_name: '',
      user_email: user_email,
      is_kakao_user: true, // 카카오 사용자일 경우 TRUE로 설정
      user_post:'',
      user_address:'',
      user_detail_addr:'',
      user_phone:'',
    };

    let result = await query('checkId', [user.user_id]);
    const exists = result[0].count > 0;

    if (exists) {
      req.session.user_id = user.user_id;
      req.session.is_logined = true;
      req.session.save(err => {
        if (err) throw err;
        res.send({ success: true, message: "이미 가입된 사용자입니다." });
      });
    } else {
      result = await query('userInsert', user);
      req.session.user_id = user.user_id;
      req.session.is_logined = true;
      req.session.save(err => {
        if (err) throw err;
        res.status(201).send({ success: true, message: '회원가입 완료' });
      });
    }
  } catch (error) {
    console.error('카카오 로그인 오류:', error);
    res.status(500).send({ success: false, message: '카카오 로그인 중 오류 발생' });
  }
});

module.exports =router ;


