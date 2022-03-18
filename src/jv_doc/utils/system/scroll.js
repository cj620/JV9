/*
 * @Author: C.
 * @Date: 2021-09-29 09:20:56
 * @LastEditTime: 2021-09-29 09:36:15
 * @Description: 滚动条控制
 */
const cubic = value => Math.pow(value, 3);
// 快进快出
const easeInOutCubic = value => value < 0.5
  ? cubic(value * 2) / 2
  : 1 - cubic((1 - value) * 2) / 2;
/**
 * @description: 
 * @param {*} el 页面元素 ref
 * @param {*} endValue 目标距离
 * @return {*}
 */
export function scrollTo(el,endValue,option={time:500}){
      const beginTime = Date.now();
      const beginValue = el.scrollTop;
      const distance = endValue - beginValue
      const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16));

      const frameFunc = () => {
        // 设定默认动画 500ms
        const progress = (Date.now() - beginTime) / (option?.time??500);
        if (progress < 1) {
          if (distance > 0) {
            el.scrollTop = beginValue + Math.abs(distance * (easeInOutCubic(progress)))
          } else {
            el.scrollTop = beginValue - Math.abs(distance * (easeInOutCubic(progress)))
          }
          rAF(frameFunc);
        } else {
          el.scrollTop = endValue;
        }
      };
      rAF(frameFunc)
      
}