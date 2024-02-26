<template>
  <div @mousemove="testMove" @mouseleave="testMend" style="height: 100%">
    <div :id="id" ref="roll" :style="{ height: height, overflow: 'hidden' }">
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
      num1: 0,
    };
  },
  props: {
    id: {
      type: String,
      default: 'roll'
    },
    step: {
      type: Number,
      default: 50,
    },
    num: {
      type: Number,
      default: 6,
    },
    height: {
      type: String,
      default: "100%",
    },
  },
  created() {
  },
  mounted() {
    this.roll = document.querySelector("#" + this.id);
    this.$nextTick(() => {
      this.start();
    });
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
    reduceHeight() {
      let total = 0;
      this.roll.childNodes.forEach(item => {
        total += item.clientHeight;
      })
      return total < this.roll.clientHeight
    },
    MarqueeTest() {
      let test1 = this.roll;
      //判断组件是否渲染完成
      if (test1.offsetHeight === 0) {
        test1 = this.roll;
      } else {
        //如果列表数量过少不进行滚动
        if (test1.childNodes.length < this.num || this.reduceHeight()) {
          clearTimeout(this.timer);
          return;
        }
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
  },
};
</script>
