const express = require('express');
const router = express.Router();
const query = require('../mysql/index.js');

router.get('/:no', (req, res) => {
  query('orderList', req.params.no)
  .then(result => res.send(result))
})
router.get('/info/:userid', (req, res) => {
  query('getUserInfo', req.params.userid)
  .then(result => res.send(result))
})

module.exports = router;