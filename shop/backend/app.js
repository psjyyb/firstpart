const express = require("express");
const port = 3000;
const mypageRouter = require('./routes/mypage.js')
//admin
const adminmemberRouter = require('./routes/adminmember.js')
const adminnoticeRouter = require('./routes/adminnotice.js')
const adminorderRouter = require('./routes/adminorder.js')
const adminproductRouter = require('./routes/adminproduct.js')
const adminqaRouter = require('./routes/adminqa.js')


//const wishRouter = require('./routes/wish.js')
const session = require('express-session'); 
const fileStore = require('session-file-store')(session);
const crypto = require('crypto'); // crypto 모듈 추가
const userRouter =	require("./routes/user.js");

const cartRouter = require('./routes/cart.js')
const orderRouter = require('./routes/order.js')

const mainRouter = require('./routes/main.js')
const categoryRouter = require('./routes/category.js')
// const productRouter = require('./routes/product.js')

//
var path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'secret key', //암호화하는 데 쓰일 키
    resave: false, // 세션에 변경사항이 없어도 항상 다시 저장할지 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 스토어(저장소)에 강제로 저장할지 여부
    cookie: { // 세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
      httpOnly: true, // true 이면 클라이언트 자바스크립트에서 document.cookie로 쿠키 정보를 볼 수 없음
      secure: false, // true 이면 https 환경에서만 쿠키 정보를 주고 받도록 처리,
      maxAge: 60000 // 쿠키가 유지되는 시간 (밀리세컨드 단위)
    },
    store: new fileStore() // 세션 저장소로 fileStore 사용
  }
  ));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!~~");
});

// app.use("/",mainRouter)
// app.use("/category",categoryRouter,mainRouter)
app.use("/category",categoryRouter)
// app.use("/detail",productRouter)

app.use("/mypage/",mypageRouter)
//app.use('/api/upload', express.static('d:/upload'));

app.use('/upload', express.static('d:/upload'));
app.use('/user', (req, res, next) => {
  // 여기에 crypto 모듈을 사용하는 코드 추가
  next();
}, userRouter);

// app.use('/upload', express.static('upload/productImg'));
// app.use('/upload', express.static('upload'));
// app.use('/image', express.static('upload'));
app.use('/user',userRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)

// app.use(function(req, res, next) {
// 	next(createError(404));
//   });

//admin
app.use("/adminmember",adminmemberRouter)
app.use("/adminnotice",adminnoticeRouter)
app.use("/adminorder",adminorderRouter)
app.use("/adminproduct",adminproductRouter)
app.use("/adminqa",adminqaRouter)
// app.use('/adminupload', express.static('d:/upload'));
//
// app.use(function(req, res, next) {
// 	next(createError(404));
//   });

app.use('/readproductImg', express.static('upload/productImg'));
app.use('/readproductdetailimg', express.static('upload/productdetailimg'));

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = app;
