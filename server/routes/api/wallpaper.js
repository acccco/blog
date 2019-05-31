const express = require('express');
const router = express.Router();
const {wallpaperQuery} = require('../../util/mysql');
const {queryById, getAllNum, queryByPage} = require('./wallpaperSql');
let prefix = 'http://wallpapercdn.acohome.cn/';

router.get('/', async (req, res) => {
  let pageNum = 1;
  let pageSize = 10;

  if (!Number.isNaN(parseInt(req.query.pageNum))) {
    pageNum = parseInt(req.query.pageNum);
  }

  if (!Number.isNaN(parseInt(req.query.pageSize))) {
    pageSize = parseInt(req.query.pageSize);
  }
  try {
    let total = await wallpaperQuery(getAllNum());
    let result = await wallpaperQuery(queryByPage(pageNum, pageSize));
    result.forEach(item => item.uri = prefix + item.filename);
    res.json({
      code: '0',
      data: {
        pageNum,
        pageSize,
        total: total[0].total,
        length: result.length,
        hasNext: pageNum * pageSize < total[0].total,
        list: result,
      }
    });
  } catch (err) {
    res.json({
      code: 'w-get-page',
      err
    });
  }

});

router.get('/:id', async (req, res) => {
  let id = req.params.id;
  let sql = queryById(id);
  try {
    let result = await wallpaperQuery(sql);
    let data = result[0];
    if (data) {
      data.uri = prefix + data.filename;
    }
    res.json({
      code: '0',
      data: data
    });
  } catch (err) {
    res.json({
      code: 'w-get-id',
      err
    });
  }
});

module.exports = router;
