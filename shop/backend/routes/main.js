const express = require('express');
const router = express.Router();
const query = require('../mysql');

//메인 & 베스트메뉴 클릭시
// router.get("/", async (req, res) => {
//   let result = await query("getCategory");
//   res.send(result);
// });

router.get("/best/:no", async (req, res) => {
    let allbest = await query("MainAllBest")
    let best = await query("MainBest", req.params.no)
    console.log('All Best:', allbest);
    console.log('Category Best:', best);

    res.json({
        best8 : allbest,
        category8: best,
    });
  });
  
  


module.exports = router;

  