const app = document.getElementById('app');

// 创建矩阵运动对象
const move = mChange.makeMatrixChange(app, {
  images: [],
  row: 7,
  col: 9
});

// animate 下的入场动画的名称
const inAnimate = [
  'flash',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'flipInX',
  'flipInY',
  'lightSpeedIn',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rollIn',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp'
];

// animate 下的出场动画的名称
const outAnimate = [
  'flash',
  'bounceOut',
  'bounceOutDown',
  'bounceOutLeft',
  'bounceOutRight',
  'bounceOutUp',
  'fadeOut',
  'fadeOutDown',
  'fadeOutDownBig',
  'fadeOutLeft',
  'fadeOutLeftBig',
  'fadeOutRight',
  'fadeOutRightBig',
  'fadeOutUp',
  'fadeOutUpBig',
  'flipOutX',
  'flipOutY',
  'lightSpeedOut',
  'rotateOut',
  'rotateOutDownLeft',
  'rotateOutDownRight',
  'rotateOutUpLeft',
  'rotateOutUpRight',
  'hinge',
  'rollOut',
  'zoomOut',
  'zoomOutDown',
  'zoomOutLeft',
  'zoomOutRight',
  'zoomOutUp',
  'slideOutDown',
  'slideOutLeft',
  'slideOutRight',
  'slideOutUp'
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
  move.movePoint(mChange.mode[getRandom(0, mChange.mode.length - 1)], {
    animate: true,
    // 可以改成其他 animate.css 的动画
    classNameIn: 'animated ' + inAnimate[getRandom(0, inAnimate.length - 1)],
    classNameOut: 'animated ' + outAnimate[getRandom(0, outAnimate.length - 1)]
  });
}

// 点击切换动画
document.getElementById('change').addEventListener('click', () => {
  if (globalIntervalTimer) {
    clearInterval(globalIntervalTimer);
    globalIntervalTimer = null;
  }
  letUsMove();
  globalIntervalTimer = startInterval();
});

// 加载图片
axios.get('/indexBg?num=20').then(res => {
  let imgList = [];
  preLoadImg(res.data[0]).then(src => {
    imgList.push(src);
    move.changeImages(imgList);
    letUsMove();
    globalIntervalTimer = startInterval();
  });
  res.data.forEach(src => {
    preLoadImg(src).then(src => {
      imgList.push(src);
      move.changeImages(imgList);
    });
  });
});

// 获得浏览器窗口隐藏事件
function getHidden() {
  let hidden, state, visibilityChange;
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
    state = 'visibilityState';
  } else if (typeof document.mozHidden !== 'undefined') {
    hidden = 'mozHidden';
    visibilityChange = 'mozvisibilitychange';
    state = 'mozVisibilityState';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
    state = 'msVisibilityState';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
    state = 'webkitVisibilityState';
  }
  return {
    hidden: hidden,
    state: state,
    change: visibilityChange
  };
}

const hiddenState = getHidden();

document.addEventListener(hiddenState.change, () => {
  if (globalIntervalTimer) {
    clearInterval(globalIntervalTimer);
  }
  if (document[hiddenState.state] !== hiddenState.hidden) {
    letUsMove();
    globalIntervalTimer = startInterval();
  }
});
