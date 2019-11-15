const app = document.getElementById('app');

// 创建矩阵运动对象
const move = mChange.makeMatrixChange(app, {
  images: [],
  row: 7,
  col: 9
});

// animate 下的入场动画的名称
const inAnimate = [
  'bounceIn',
  'bounceInUp',
  'bounceInDown',
  'fadeIn',
  'fadeInUp',
  'fadeInDown',
  'fadeInLeft',
  'fadeInRight',
  'flipInX',
  'flipInY',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rollIn',
  'zoomIn',
  'zoomInUp',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
];

// animate 下的出场动画的名称
const outAnimate = [
  'bounceOut',
  'bounceOutDown',
  'bounceOutUp',
  'fadeOut',
  'fadeOutDown',
  'fadeOutUp',
  'fadeOutRight',
  'fadeOutLeft',
  'flipOutX',
  'flipOutY',
  'rotateOut',
  'rotateOutUpRight',
  'rotateOutUpLeft',
  'rotateOutDownRight',
  'rotateOutDownLeft',
  'rollOut',
  'zoomOut',
  'zoomOutDown',
  'zoomOutUp',
  'zoomOutRight',
  'zoomOutLeft',
];
let globalIntervalTimer = null;
let isAnimating = false;

// 预加载图片方法
function preLoadImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(src);
    };
    img.onerror = () => {
      reject(src);
    };
  });
}

// 获取随机数
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

// 开启背景自动切换
function startInterval(time) {
  if (!time) time = 15000;
  return setInterval(() => {
    letUsMove();
  }, time);
}

// 动画
function letUsMove() {
  let animateIndex = getRandom(0, inAnimate.length - 1)
  move.movePoint(mChange.mode[getRandom(0, mChange.mode.length - 1)], {
    animate: true,
    // 可以改成其他 animate.css 的动画
    classNameIn: 'animated ' + inAnimate[animateIndex],
    classNameOut: 'animated ' + outAnimate[animateIndex]
  });
}

// 加载图片
axios.get('/api/wallpaper?pageNum=1&pageSize=10').then(res => {
  let imgList = [];
  console.log(res)
  preLoadImg(res.data.data.list[0].uri).then(src => {
    imgList.push(src);
    move.changeImages(imgList);
    letUsMove();
    globalIntervalTimer = startInterval();
  });
  res.data.data.list.forEach(src => {
    preLoadImg(src.uri).then(src => {
      imgList.push(src);
      move.changeImages(imgList);
    });
  });
});

// 点击切换动画
document.getElementById('change').addEventListener('click', () => {
  if (globalIntervalTimer) {
    clearInterval(globalIntervalTimer);
    globalIntervalTimer = null;
  }
  letUsMove();
  globalIntervalTimer = startInterval();
});

// 窗口隐藏后清除定时器，显示后开启定时器
document.addEventListener('visibilitychange', () => {
  if (globalIntervalTimer) {
    clearInterval(globalIntervalTimer);
  }
  if (document.hidden !== 'hidden') {
    letUsMove();
    globalIntervalTimer = startInterval();
  }
});
