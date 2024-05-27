const doms = {
  carouselList: document.querySelector('.carousel-list'),
  arrowLeft: document.querySelector('.carousel-arrow-left'),
  arrowRight: document.querySelector('.carousel-arrow-right'),
  indicators: document.querySelectorAll('.carousel-indicators span'),
}

const count = doms.indicators.length; // 获取指示器个数 == 轮播数量
let currentIndex = 0;

function init() {
  const firstCloned = doms.carouselList.firstElementChild.cloneNode(true);
  const lastCloned = doms.carouselList.lastElementChild.cloneNode(true);
  lastCloned.style.marginLeft = '-100%';

  doms.carouselList.appendChild(firstCloned);
  doms.carouselList.insertBefore(lastCloned, doms.carouselList.firstElementChild);
}

init();

// 滚动函数
function moveTo(index) {
  doms.carouselList.style.transform = `translateX(${-index * 100}%)`;
  doms.carouselList.style.transition = 'transform 0.5s';
  // 设置指示器
  doms.indicators.forEach((item, i) => {
    item.className = i === index ? 'active' : '';
  })
  currentIndex = index;
}

// 指示器点击
doms.indicators.forEach((item, i) => {
  item.onclick = () => {
    currentIndex = i;
    moveTo(currentIndex);
  }
})

function moveLeft(){
  if(currentIndex === 0){
    // 快速切换位置 禁用动画
    doms.carouselList.style.transition = 'none';
    doms.carouselList.style.transform = `translateX(${-count * 100}%)`;
    // 获取元素位置 用于回流 重会渲染 ！！！！
    doms.carouselList.getBoundingClientRect()
    // 渲染之后 滚动才能正常
    moveTo(count - 1)
  }else{
    moveTo(currentIndex - 1);
  }
}

function moveRight(){
  if(currentIndex === count - 1){
    // 快速切换位置 禁用动画
    doms.carouselList.style.transition = 'none';
    doms.carouselList.style.transform = `translateX(${100}%)`;
    // 获取元素位置 用于回流 重会渲染 ！！！！
    doms.carouselList.getBoundingClientRect();
    // 渲染之后 滚动才能正常
    moveTo(0)
  }else{
    moveTo(currentIndex + 1);
  }
}

doms.arrowRight.onclick = moveRight;
doms.arrowLeft.onclick = moveLeft;