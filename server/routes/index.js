let express = require('express'),
  router = express.Router(),
  qiniuOss = require('../util/qiniuImageServer'),
  util = require('../util/util');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/indexBg', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  let num = req.query.num || 10;
  qiniuOss.getImages().then(function(result) {
    res.json(util.randomArr(result, num));
  });
});

router.get('')

module.exports = router;
