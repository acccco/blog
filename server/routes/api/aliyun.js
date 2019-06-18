const express = require('express');
const router = express.Router();
const {start, stop} = require('../../util/aliyun');
const {aliyun} = require('../../config');

router.get('/start', async (req, res) => {
  let key = req.query.key;
  if (key === aliyun.secretKey()) {
    try {
      let id = await start();
      console.log('http: ces start success');
      res.send({code: '0', id});
    } catch (error) {
      console.error(error);
      res.send({code: 'a-get-start'});
    }
  } else {
    console.log('http: ces start error key');
    res.send({code: 'a-get-start-error-key'});
  }
});

router.get('/stop', async (req, res) => {
  await stop();
  console.log('http: ces stop success');
  res.send({code: '0'});
});

module.exports = router;
