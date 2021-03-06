const express = require("express");
const router = express.Router();
const { insert } = require("../util/mysql");

router.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});

router.post("/api/error-collection", async (req, res) => {
  await insert("zebra", "error_collect", {
    error_stack: req.body.stack,
    error_message: req.body.errorMessage,
    user_message: req.body.message,
    email: req.body.email
  });
  res.json({
    code: 0,
    data: {}
  });
});

module.exports = router;
