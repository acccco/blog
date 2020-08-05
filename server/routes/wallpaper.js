const express = require("express");
const router = express.Router();
const {
  queryById,
  getAllNum,
  queryByPage,
  queryByBefore
} = require("./wallpaper-sql");
const { query } = require("../../util/mysql");
const prefix = "http://wallpapercdn.acohome.cn/";

router.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.get("/", async (req, res) => {
  let pageNum = 1;
  let pageSize = 10;

  if (!Number.isNaN(parseInt(req.query.pageNum))) {
    pageNum = parseInt(req.query.pageNum);
  }

  if (!Number.isNaN(parseInt(req.query.pageSize))) {
    pageSize = parseInt(req.query.pageSize);
  }

  try {
    let total = await query("wallpaper", getAllNum());
    let result = await query("wallpaper", queryByPage(pageNum, pageSize));
    result.forEach((item) => (item.uri = prefix + item.filename));
    res.json({
      code: 0,
      data: {
        pageNum,
        pageSize,
        total: total[0].total,
        length: result.length,
        hasNext: pageNum * pageSize < total[0].total,
        list: result
      }
    });
  } catch (err) {
    console.error(err);
    res.json({
      code: "w-get-page"
    });
  }
});

router.get("/latest", async (req, res) => {
  try {
    let result = await query("wallpaper", queryByBefore(0));
    let data = result[0];
    data.uri = prefix + data.filename;
    res.json({
      code: 0,
      data: data
    });
  } catch (err) {
    console.error(err);
    res.json({
      code: "w-get-latest"
    });
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let result = await query("wallpaper", queryById(id));
    let data = result[0];
    data.uri = prefix + data.filename;
    res.json({
      code: 0,
      data: data
    });
  } catch (err) {
    console.error(err);
    res.json({
      code: "w-get-id"
    });
  }
});

router.get("/before/:day", async (req, res) => {
  let day = req.params.day;
  try {
    let total = (await query("wallpaper", getAllNum()))[0].total;
    if (day >= total) {
      day = total - 1;
    }
    let result = await query("wallpaper", queryByBefore(day));
    let data = result[0];
    data.uri = prefix + data.filename;
    res.json({
      code: 0,
      data: data
    });
  } catch (err) {
    console.error(err);
    res.json({
      code: "w-get-before"
    });
  }
});

router.get("/download/:filename", async (req, res) => {
  res.redirect(
    prefix + req.params.filename + "?attname=" + req.params.filename
  );
});

module.exports = router;
