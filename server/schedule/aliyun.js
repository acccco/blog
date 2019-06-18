const schedule = require('node-schedule');
const {stop} = require('../util/aliyun');

exports.close = () => {
  schedule.scheduleJob('00 20 * * *', () => {
    stop().catch(console.error);
  });
};
