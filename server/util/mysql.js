const mysql = require("mysql");
const { mysql: mysqlInfo } = require("../config");

const execute = (connect, sql, params) =>
  new Promise((resolve, reject) => {
    connect.query(sql, params, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });

exports.insert = async (database, tableName, params) => {
  let keys = [];
  let value = [];
  for (let key in params) {
    keys.push("`" + key + "`");
    value.push(params[key]);
  }
  let sql = `INSERT INTO ${tableName} (${keys.join(",")}) VALUES (${new Array(
    keys.length
  )
    .fill("?")
    .join(",")})`;

  let mysqlConnect = mysql.createConnection({
    database,
    ...mysqlInfo
  });

  mysqlConnect.connect();

  let res = await execute(mysqlConnect, sql, value);
  mysqlConnect.end();
  return res;
};

exports.query = async (database, sql) => {
  let mysqlConnect = mysql.createConnection({
    database,
    ...mysqlInfo
  });

  mysqlConnect.connect();

  let res = await execute(mysqlConnect, sql);
  mysqlConnect.end();
  return res;
};
