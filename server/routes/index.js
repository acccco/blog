const express = require('express');
const md5 = require('blueimp-md5');
const router = express.Router();
const {randomArr} = require('../util/util');
const {getImages} = require('../util/qiniu');

router.all('/static/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

router.get('/authCode', (req, res) => {
  let date = new Date();
  date.setHours(4, 25, 0, 0);
  res.json({
    code: md5(date.valueOf())
  });
});

router.get('/indexBg', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let num = req.query.num || 10;
  getImages().then(function (result) {
    res.json(randomArr(result, num));
  });
});

module.exports = router;
