let express = require('express');
let md5 = require('blueimp-md5');
let router = express.Router();
let util = require('../util/util');
let qiniuOss = require('../util/qiniuImageServer');

router.get('/authCode', (req, res) => {
  let date = new Date();
  date.setHours(4, 25, 00, 000);
  res.json({
    code: md5(date.valueOf())
  });
});

router.get('/indexBg', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let num = req.query.num || 10;
  qiniuOss.getImages().then(function(result) {
    res.json(util.randomArr(result, num));
  });
});

module.exports = router;
