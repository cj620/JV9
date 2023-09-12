<!--
 * @Author: 勿忘 208760845@qq.com
 * @Date: 2023-04-26 21:00:56
 * @LastEditors: 勿忘 208760845@qq.com
 * @LastEditTime: 2023-05-09 09:53:23
 * @FilePath: \jvmmsv9-1front\src\views\dashboard\dataV\components\HelloWord.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div @mousemove="testMove" @mouseleave="testMend" style="height: 100%">
    <div id="roll" ref="roll" :style="{height: height, overflow: 'hidden'}">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null,
      roll: null,
      speed: null,
      num1: 0
    }
  },
  props: {
    step: {
      type: Number,
      default: 50
    },
    num: {
      type: Number,
      default: 6
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  created() {
    // this.start();
    this.$nextTick(() => {
      this.start();
    })
  },
  mounted() {
    this.roll = document.querySelector('#roll')
  },
  methods: {
    testMove() {
      clearTimeout(this.timer);
    },
    /**
     * @Description: 鼠标离开事件
     * @Author: admin
     */
    testMend() {
      this.start();
    },
    //开启定时器方法
    start() {
      //清除定时器
      clearTimeout(this.timer);
      //定时器触发周期
      this.speed = this.step;

      this.timer = setInterval(this.MarqueeTest, this.speed);
    },
    MarqueeTest() {
      let test1 = this.roll;

      //判断组件是否渲染完成
      if (test1.offsetHeight == 0) {
        test1 = this.roll;
      } else {
        //如果列表数量过少不进行滚动
        if (test1.childNodes.length < this.num) {
          clearTimeout(this.timer);
          return;
        }
        //组件进行滚动
        const ratio = parseFloat((1 / window.devicePixelRatio).toFixed(2)) + 0.01;
        test1.scrollTop = test1.scrollTop + ratio;
        //判断滚动条是否滚动到底部
        if (test1.scrollTop >= test1.scrollHeight - test1.clientHeight) {
          //获取组件第一个节点
          let a = test1.childNodes[0];
          //删除节点
          test1.removeChild(a);
          //将该节点拼接到组件最后
          test1.append(a);
        }
      }
    },

  },
  beforeDestroy() {
    //清除定时器
    clearTimeout(this.timer);
  },
  destroyed() {
    //清除定时器
    clearTimeout(this.timer);
  }
}
</script>
