const qiniu = require('qiniu');

const bucket = 'indexbg';
const qiniuAdd = 'http://bgcdn.acohome.cn/';

let mac = new qiniu.auth.digest.Mac(
  'i2tskxsPQU6WGlE97r8Vjmze_b8icDVCrLtu-ZzD',
  'FTQ4ut_WWnZ7Ts3JprtM9zENfmGWODusRihKL8wb'
);

let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
let bucketManager = new qiniu.rs.BucketManager(mac, config);

module.exports = {
  getImages() {
    return new Promise((resolve, reject) => {
      let option = {};
      bucketManager.listPrefix(bucket, option, (err, respBody) => {
        err && reject(err);
        let imagesList = [];
        for (let item of respBody.items) {
          imagesList.push(qiniuAdd + item.key);
        }
        resolve(imagesList);
      });
    });
  }
};
