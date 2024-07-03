const express = require('express');
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const iconv = require('iconv-lite');
const mysql = require('mysql2');

// const connection = mysql.createConnection({

// });

connection.connect();

const getHtml = async () => {
  try {
    const response = await axios.get("https://www.dogpang.com/shop/goods/goods_list.php?category=002001"
      , { responseType: 'arraybuffer' });

    const decodedHtml = iconv.decode(response.data, 'euc-kr');

    const $ = cheerio.load(decodedHtml);
    const bodyList = $("div.flex-root");

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

const saveToDatabase = (data) => {
  const sql = 'INSERT INTO product (product_name, product_price, product_img, category_no) VALUES ? ';
  const values = data.map(item => [item.product_name, item.product_price, item.product_img, 1]);

  connection.query(sql, [values], (err, result) => {
    if (err) {
      console.error('데이터베이스 저장 오류: ', err);
      return;
    }
    console.log('데이터 저장 성공: ', result.affectedRows, '행이 추가되었습니다.');
    connection.end(); 
  });
};

getHtml();
