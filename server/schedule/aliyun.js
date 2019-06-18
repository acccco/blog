const schedule = require('node-schedule');
const {stop} = require('../util/aliyun');

exports.close = () => {
  schedule.scheduleJob('00 20 * * *', async () => {
    try {
      await stop();
      console.log('scheduleJob: ces stop success');
    } catch (e) {
      console.error(e);
    }
  });
};
