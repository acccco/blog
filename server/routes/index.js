let express = require('express');
let fs = require('fs');
let router = express.Router();
let util = require('../util/util');
let qiniuOss = require('../util/qiniuImageServer');

let pictureNumber = 229;

/**
 * 拦截所有的图片请求
 */
router.all('/picture/*', (res, req) => {
  req.sendFile(`${process.cwd()}/resource/media/default/default.jpg`);
  return;
  try {
    let match = res.originalUrl.match(/^\/picture\/photo(\d*)/);
    let pictureIndex = match[1];
    if (pictureIndex >= pictureNumber) {
      pictureIndex %= pictureNumber;
      pictureIndex += 1;
    }
    req.sendFile(
      `${process.cwd()}/resource/media/picture/photo${pictureIndex}.jpg`
    );
  } catch (e) {
    req.sendFile(`${process.cwd()}/resource/media/default/default.jpg`);
  }
});

router.get('/indexBg', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let num = req.query.num || 10;
  qiniuOss.getImages().then(function(result) {
    res.json(util.randomArr(result, num));
  });
});

module.exports = router;
