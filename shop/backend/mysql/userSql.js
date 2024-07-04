module .exports =	{
  userList:	`SELECT	* FROM	user`,
  userInfo: `SELECT * FROM user WHERE user_id =?`,
 	userInsert:`INSERT	INTO user SET ?`,
  userCount :`SELECT count(*) cnt 
              FROM user`,
  checkId: `SELECT COUNT(*) AS count 
              FROM user 
              WHERE user_id = ?`,
  userLogin :`SELECT user_id, user_pw 
              FROM user 
              WHERE user_id = ? 
              AND user_pw = ?`,
 	getSalt :  `SELECT salt 
              FROM user 
              WHERE user_id = ?`,
  userCheck :`SELECT user_pw 
              FROM user 
              WHERE user_pw = ?`,
  updateUser:`UPDATE user 
              SET user_name = ?, 
                  user_post = ?, 
                  user_address = ?, 
                  user_detail_addr = ?, 
                  user_phone = ?, 
                  user_email = ?
              WHERE user_id = ?`,
  userFindId:`SELECT user_id 
              FROM user 
              WHERE user_name = ? 
              AND user_phone =?`,
  deleteUser:`DELETE FROM	user	
              WHERE	user_id	= ?`,
  userFindPw : `SELECT * FROM user
                WHERE user_name = ? 
                AND user_phone =? 
                AND user_id = ?`,
  changePw : `UPDATE user 
              SET user_pw = ? 
              WHERE user_id = ?`,
  kakaoUserInsert : `INSERT INTO user user_id,user_email,is_kakao_user,user_point,user_resp
                    VALUES (?, ?, ?,?,?) 
                    ON DUPLICATE KEY UPDATE email = VALUES(user_email)`,
  checkKakaoUser : `SELECT is_kakao_user 
                    FROM user
                    WHERE user_id = ?`,
  updateUserPassword : `UPDATE user
                        SET user_pw = ?, salt = ?
                        WHERE user_id = ?`,
  getUserPassword : `SELECT user_pw 
                     FROM user 
                     WHERE user_id = userId`
};
