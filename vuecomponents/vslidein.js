const DISTANCE = 100;
const DURATION = 500
const map = new WeakMap();// 应设置一个map，存储动画对象
// 元素出现在视口内启动动画 IntersectionObserver
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      map.get(entry.target)?.animation.play();
      // 移除观察
      observer.unobserve(entry.target)
    }
  })
})
const isBelowViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return rect.top > window.innerHeight;
}
export default {
  mounted(el){
    if(!isBelowViewport(el)){
      return;
    }
    const animation = el.animate([{
      transform: `translateY(${DISTANCE}px)`,
      opacity: 0.5
    },{
      transform: 'translateY(0px)',
      opacity: 1
    }],{
      duration: DURATION,
      ease: 'ease-out',
      fill: 'forwards'
    })

    animation.pause();
    map.set(el, animation)
    observer.observe(el)
  }

}