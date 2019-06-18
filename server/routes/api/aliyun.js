const express = require('express');
const router = express.Router();
const {start, stop} = require('../../util/aliyun');
const {aliyun} = require('../../config');

router.get('/start', async (req, res) => {
  let key = req.query.key;
  if (key === aliyun.secretKey()) {
    try {
      let id = await start();
      res.send({code: '0', id});
    } catch (error) {
      res.send({code: 'a-get-start'});
    }
  } else {
    res.send({code: 'a-get-start-error-key'});
  }
});

router.get('/stop', async (req, res) => {
  await stop();
  res.send({code: '0'});
});

module.exports = router;
