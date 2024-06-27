const express = require('express');
const router = express.Router();
const query = require('../mysql/index.js');

router.get('/:userid', (req, res) => {
  query('cartList', req.params.userid)
  .then(result => res.send(result))
})
router.put('/:no', (req, res) => {
  query('updateCart', [req.body, req.params.no])
  .then(result => res.send(result))
})
router.delete('/:no', (req, res) => {
  query('deleteCart', req.params.no)
  .then(result => res.send(result))
})

module.exports = router;