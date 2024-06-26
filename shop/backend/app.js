const express = require("express");
const port = 3000;
const mypageRouter = require('./routes/mypage.js')

const userRouter =	require("./routes/user.js");
// const logRouter = require("./routes/logcontrol.js")
const cartRouter = require('./routes/cart.js')

var path = require('path');
const categoryRouter = require('./routes/category.js')

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



app.use('/upload', express.static('d:/upload'));
app.use("/user",userRouter)
// app.use("/",logRouter);
app.use('/cart', cartRouter)

// app.use(function(req, res, next) {
// 	next(createError(404));
//   });


app.use("/category",categoryRouter)




app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = app;
