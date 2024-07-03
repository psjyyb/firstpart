const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const mysql = require('mysql2');

// MySQL 연결 설정
const connection = mysql.createConnection({
host: '3.36.49.13',
user: 'shop',
port: '3306',
password: 'Yedam#2024',
database: 'shopdb'
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
    const bodyList = $("div.flex-root");

    // 데이터 저장 배열
    let ulList = [];
    
    let regex = /[^0-9]/g;
    
    
    bodyList.each((i, element) => {
      productPrice = $(element).find("strong.price").text()
      // productImg = $(element).find("div.flex-media img").attr("src")
      productImg = $(element).find("div.list-m-container img")
        ulList.push({
          product_no: i + 1,
          product_name: $(element).find("span.two-line").text(),
          product_price: productPrice.replace(regex,''),
          product_img: $(element).find("img").attr("src")
          // product_img: $(element).find("img.list-m-container").find("img").attr("src")
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
  const sql = 'INSERT INTO product (product_name, product_price, product_img, category_no) VALUES ? ';
  const values = data.map(item => [item.product_name, item.product_price, item.product_img, 1]);

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
