module.exports = {
  getRandom(min, max) {
    return Math.floor(Math.random() * Math.abs(max - min) + min);
  },
  randomArr(arr, num) {
    num = num || arr.length;
    let sendArr = new Array(arr)[0];
    let len = sendArr.length;
    if (sendArr.length >= num) {
      for (let i = 0; i < len; i++) {
        let random1 = this.getRandom(0, len);
        let random2 = this.getRandom(0, len);
        let tmp = sendArr[random1];
        sendArr[random1] = sendArr[random2];
        sendArr[random2] = tmp;
      }
    }
    return sendArr.slice(0, num);
  }
};
