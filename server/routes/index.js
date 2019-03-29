let express = require('express'),
  router = express.Router(),
  qiniuOss = require('../util/qiniuImageServer'),
  util = require('../util/util');

/**
 * 拦截所有的图片请求
 */
router.all('/picture/*', (res, req) => {
  // if (false) {
  //   req.sendFile(process.cwd() + '/resource/media/default/default1.jpg');
  // }
  req.sendFile(`${process.cwd()}/resource/media/${res.originalUrl}`);
});

router.get('/indexBg', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let num = req.query.num || 10;
  qiniuOss.getImages().then(function (result) {
    res.json(util.randomArr(result, num));
  });
});

router.get('');

module.exports = router;
