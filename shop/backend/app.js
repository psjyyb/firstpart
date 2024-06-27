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

const userRouter =	require("./routes/user.js");
// const logRouter = require("./routes/logcontrol.js")

var path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Hello World!~~");
});

app.use("/mypage/",mypageRouter)
//app.use('/api/upload', express.static('d:/upload'));


//app.use('/wish', wishRouter)


app.use("/user",userRouter)
// app.use("/",logRouter);

//admin
app.use("/adminmember",adminmemberRouter)
app.use("/adminnotice",adminnoticeRouter)
app.use("/adminorder",adminorderRouter)
app.use("/adminproduct",adminproductRouter)
app.use("/adminqa",adminqaRouter)
//
app.use(function(req, res, next) {
	next(createError(404));
  });


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = app;