const express = require('express');
const router = express.Router();
const query = require('../mysql/index.js');

router.get('/:userid', (req, res) => {
  query('wishList', req.params.userid)
  .then(result => res.send(result))
})

module.exports = router;