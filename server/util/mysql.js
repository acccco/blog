const mysql = require('mysql');

const {mysql: mysqlInfo} = require('../config');

const wallpaper = mysql.createConnection(Object.assign({
  database: 'wallpaper'
}, mysqlInfo));

exports.wallpaperQuery = (sql, params) => new Promise((resolve, reject) => {
  wallpaper.query(sql, params, (err, result) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(result);
  });
});
