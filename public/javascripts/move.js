var app = document.getElementById('app');

// 创建矩阵运动对象
var move = mChange.makeMatrixChange(app, {
  images: [],
  row: 7,
  col: 9
});

// animate 下的入场动画的名称
var inAnimate = [
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
var outAnimate = [
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
var globalIntervalTimer = null;
var isAnimating = false;

// 预加载图片方法
function preLoadImg(src) {
  return new Promise(function(resolve, reject) {
    var img = new Image();
    img.src = src;
    img.onload = function() {
      resolve(src);
    };
    img.onerror = function() {
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
  var timer = setInterval(function() {
    letUsMove();
  }, time);
  return timer;
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
document.getElementById('change').addEventListener('click', function() {
  if (globalIntervalTimer) {
    clearInterval(globalIntervalTimer);
    globalIntervalTimer = null;
  }
  letUsMove();
  globalIntervalTimer = startInterval();
});

// 加载图片
axios.get('http://acohome.cn/indexBg?num=20').then(function(res) {
  var imgList = [];
  preLoadImg(res.data[0]).then(function(src) {
    imgList.push(src);
    move.changeImages(imgList);
    letUsMove();
    globalIntervalTimer = startInterval();
  });
  res.data.forEach(function(src) {
    preLoadImg(src).then(function(src) {
      imgList.push(src);
      move.changeImages(imgList);
    });
  });
});

// 获得浏览器窗口隐藏事件
function getHidden() {
  var hidden, state, visibilityChange;
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

var hiddenState = getHidden();

document.addEventListener(hiddenState.change, function() {
  if (globalIntervalTimer) {
    clearInterval(globalIntervalTimer);
  }
  if (document[hiddenState.state] !== hiddenState.hidden) {
    letUsMove();
    globalIntervalTimer = startInterval();
  }
});
