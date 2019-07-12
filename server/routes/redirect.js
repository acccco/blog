const express = require('express');
const router = express.Router();

router.get('wallpaper', (req, res) => {
  res.redirect('https://wallpaper.acohome.cn');
});

module.exports = router;
