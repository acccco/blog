const qiniu = require('qiniu');
const {qiniu: qiniuConfig} = require('../config/');

const prefix = 'http://bgcdn.acohome.cn/';

let mac = new qiniu.auth.digest.Mac(qiniuConfig.accessKey, qiniuConfig.secretKey);

let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
let bucketManager = new qiniu.rs.BucketManager(mac, config);

exports.getImages = () => new Promise((resolve, reject) => {
  let option = {};
  bucketManager.listPrefix(qiniuConfig.scope, option, (err, respBody) => {
    err && reject(err);
    let imagesList = [];
    for (let item of respBody.items) {
      imagesList.push(prefix + item.key);
    }
    resolve(imagesList);
  });
});

