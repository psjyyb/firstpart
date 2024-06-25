// const axios = require("axios");
// const cheerio = require("cheerio");
// const iconv = require('iconv-lite');

// const getHtml = async () => {
//   try {
//     // axios 요청 설정에서 responseType을 'arraybuffer'로 지정
//     const response = await axios.get("https://www.dogpang.com/shop/goods/goods_list.php?category=002001",
//        { responseType: 'arraybuffer' });
    
//     // 응답 데이터를 변환
//     const decodedHtml = iconv.decode(response.data, 'euc-kr');
    
//     let ulList = [];
//     const $ = cheerio.load(decodedHtml);
//     const bodyList = $("div.flex-root");

//     bodyList.each((i, element) => {
//       ulList.push({
//         product_no: i + 1,
//         product_name: $(element).find("span.two-line").text().trim(),
//         product_price: $(element).find("strong.price").text().trim(),
//         product_img: $(element).find("div.thumb_gray img").attr("src").trim()
//       });
//     });

//     console.log("bodyList : ", ulList);
//   } catch (error) {
//     console.error(error);
//   }
// };

// getHtml();





const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
// const mysql = require('mysql2');
const query = require('../mysql')

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: 'password',
  database: 'your_database'
});

connection.connect();


// 웹 스크래핑 함수
const getHtml = async () => {
  try {
    // 웹사이트로부터 HTML 가져오기
    const response = await axios.get("https://www.dogpang.com/shop/goods/goods_list.php?category=002001"
      , { responseType: 'arraybuffer' });

    // 응답 데이터를 euc-kr에서 utf-8로 변환
    const decodedHtml = iconv.decode(response.data, 'euc-kr');

    // Cheerio로 HTML 파싱
    const $ = cheerio.load(decodedHtml);
    const bodyList = $("div.flex-contents");

    // 데이터 저장 배열
    let ulList = [];

    bodyList.each((i, element) => {
      ulList.push({
        product_no: i + 1,
        product_name: $(element).find("span.two-line").text(),
        product_price: $(element).find("strong.price").text(),
        product_img: $(element).find("div.thumb_gray img").attr("src")
      });
    });

    // 데이터 저장
    saveToDatabase(ulList);

  } catch (error) {
    console.error('웹 스크래핑 오류: ', error);
  }
};

// 데이터베이스에 데이터 저장 함수
const saveToDatabase = (data) => {
  const sql = 'INSERT INTO product (product_name, product_price, product_img) VALUES ? ';
  const values = data.map(item => [item.product_name, item.product_price, item.product_img]);

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error('데이터베이스 저장 오류: ', err);
      return;
    }
    console.log('데이터 저장 성공: ', result.affectedRows, '행이 추가되었습니다.');
    connection.end(); // 연결 종료
  });
};

// 웹 스크래핑 실행
getHtml();
