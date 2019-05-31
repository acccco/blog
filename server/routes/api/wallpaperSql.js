exports.queryById = (id) =>
  `SELECT * FROM wallpaper WHERE id = ${id}`;

exports.queryByPage = (pageNum, pageSize) =>
  `SELECT * FROM wallpaper ORDER BY date DESC LIMIT ${pageNum * pageSize - pageSize},${pageSize};`;

exports.getAllNum = () =>
  'SELECT Count(*) AS total FROM wallpaper';

