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
router.put('/info/:userid', (req, res) => {
  query('updateUserPoint', [req.body, req.params.userid])
  .then(result => res.send(result))
})
router.post('/', (req, res) => {
  query('insertOrder', req.body)
  .then(result => res.send(result))
})
router.get('/detail/:userid', (req, res) => {
  query('getOrderNo', req.params.userid)
  .then(result => res.send(result))
})
router.post('/detail', (req, res) => {
  query('insertOrderDetail', req.body)
  .then(result => res.send(result))
})

module.exports = router;