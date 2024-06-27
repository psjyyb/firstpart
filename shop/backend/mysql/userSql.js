module .exports =	{
    userList:	`SELECT	*  FROM	user`,
    userInfo: `SELECT * FROM user WHERE user_id =?`,
 	userInsert:	`INSERT	INTO user SET ?`,
    userCount : "SELECT count(*) cnt FROM user",
    userLogin : `SELECT user_id , user_pw FROM user WHERE user_id = ? AND user_pw = ?`,
 	userCheck : `SELECT user_pw FROM user WHERE user_pw = ?`,
   //  userUpdate:	`UPDATE	user	SET	?	WHERE	user_id = ? AND user_pw	=	?`,
 	// userDelete:	`DELETE	FROM	user	WHERE	user_id	= ? AND user_pw = ? AND user_name = ?`,
    userFindId :`SELECT * FROM user WHERE user_name = ? AND user_phone =?`
    // userFindPw : `SELECT * FROM user WHERE user_id = ? AND user_phone =? AND user_email = ?`
};