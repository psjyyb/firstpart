const express	=require('express')
const app	=express()
const port	=3000
//JSON	형태의	요청	body	파싱	미들웨어
app.use(express.json({	 limit:'50mb'	}));
//Query	String	형태의	요청	body	파싱	미들웨어
app.use(express.urlencoded({	extended:false }));
app.get('/',(req , res )=>{
		res.send('Hello	World!')
})
app.listen(port ,()=>{
		console.log(`Example	app	listening	on	http://localhost:${port }`)
})