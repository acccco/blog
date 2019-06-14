const express = require('express');
const router = express.Router();

router.get('/static/wallpaper4web/*', (req, res) => {
  res.redirect('https://wallpaper.acohome.cn');
});

module.exports = router;
