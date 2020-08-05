exports.queryById = (id) =>
  `SELECT * FROM wallpaper WHERE id = ${id}`;

exports.queryByBefore = (pass) =>
  `SELECT * FROM wallpaper ORDER BY date DESC LIMIT ${pass},1`;

exports.queryByPage = (pageNum, pageSize) =>
  `SELECT * FROM wallpaper ORDER BY date DESC LIMIT ${pageNum * pageSize - pageSize},${pageSize}`;

exports.getAllNum = () =>
  'SELECT Count(*) AS total FROM wallpaper';

exports.getLatest = () =>
  'SELECT * FROM wallpaper ORDER BY date DESC LIMIT 0,1';

