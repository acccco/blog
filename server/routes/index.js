const express = require("express");
const md5 = require("blueimp-md5");
const router = express.Router();

router.get("/authCode", (req, res) => {
  let date = new Date();
  date.setHours(4, 25, 0, 0);
  res.json({
    code: md5(date.valueOf())
  });
});

module.exports = router;
