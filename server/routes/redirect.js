const express = require('express');
const router = express.Router();

router.get(/\/static\/wallpaper4web/, (req, res, next) => {
  if (req.hostname !== 'wallpaper.acohome.cn') {
    res.redirect('https://wallpaper.acohome.cn');
  }
  next();
});

module.exports = router;
