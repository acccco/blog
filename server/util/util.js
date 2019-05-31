const _ = require('lodash');

exports.randomArr = (arr, num) => {
  num = num || arr.length;
  let sendArr = new Array(arr)[0];
  let len = sendArr.length;
  // 打乱所有的图片
  if (sendArr.length >= num) {
    for (let i = 0; i < len; i++) {
      let random1 = _.random(0, len - 1);
      let random2 = _.random(0, len - 1);
      let tmp = sendArr[random1];
      sendArr[random1] = sendArr[random2];
      sendArr[random2] = tmp;
    }
  }
  return sendArr.slice(0, num);
};
