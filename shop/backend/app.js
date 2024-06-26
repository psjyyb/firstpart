const express = require("express");
const port = 3000;
const mypageRouter = require('./routes/mypage.js')
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

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

module.exports = app;