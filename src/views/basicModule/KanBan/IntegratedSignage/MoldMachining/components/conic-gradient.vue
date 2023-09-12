<template>
  <div  class="chart-box" :style="styObj">
    <div class="process-wrapper">
      <div class="process-box1"></div>
      <div class="process-box"></div>
      <div class="pointer-box"></div>
      <div class="pointer-box1"></div>
      <div class="pointer-box2">
        <!-- 插槽内容 -->
        <span  class="pointer-box2-value">
          {{rate }}
        </span>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  props: {
    rate: {
      type: Number,
      default: 0,
    },
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    styObj() {
      let rate = 0;
      if (this.rate <= 0) {
        rate = 0;
      } else if (this.rate >= 100) {
        rate = 10;
      } else {
        rate = this.rate;
      }
      let endPos = `${rate }%`;
      let obj = Object.assign({}, this.defaultConfig, this.config);
      let rotate = `rotate(${3.60 * rate}deg)`;
      let chartRotate = obj.clockwise ? "rotateY(0deg)" : "rotateY(180deg)";
      let showEyes = obj.showEyes ? 1 : 0;
      return {
        "--background-image": `conic-gradient(${obj.CircleColor} 0%, ${obj.CircleColor} ${endPos}, transparent ${endPos})`,
        "--border-width": obj.borderWidth,
        "--dot-width": obj.circleSize,
        "--pointer-rotate": rotate,
        "--background-color": obj.BorderBackground,
        "--circle-color": obj.CircleColor,
        "--clockwise-wise": chartRotate,
        "--show-eyes": showEyes,
        "--eyes-size": obj.eyesSize,
        "--start-color": obj.CircleColor,
      };
    },
  },
  data() {
    return {
      /* 此配置下所有属性均可在config中进行覆盖，实现个性化配置 */
      defaultConfig: {
        borderWidth: "20px", // 描边宽度
        BorderBackground: "#2ec4a7", // 描边背景颜色
        circleSize: "20px", // 结尾处圆点直径
        CircleColor: "#2ec4a7", // 结尾处圆点颜色
        startColor: "#2ec4a7", // 进度条起始颜色
        endColor: "#2ec4a7", // 进度条结束颜色
        clockwise: true, // 是否顺时针
        showEyes: true, // 是否显示结尾处小眼睛
        eyesSize: "20px", // 结尾处小眼睛大小
      },
    };
  },
};
</script>

<style  scoped>
.chart-box {
  position: relative;
  width: 100%;
  height: 100%;
}
/* 开始处增加一个圆形端点，模拟圆角效果 */
.process-wrapper::after {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
  background: var(--start-color);
  z-index: 1;
}
.process-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotateY(0deg);
  text-align: center;

}
/* 指示针的头部（进度条结尾处）添加一个小圆点 */
.pointer-box::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--start-color);
  transform: translate(-42%, -275%);
  z-index: 1;
  opacity: var(--show-eyes);
}
.process-box1{
  position: absolute;
  left: 0px;
  top:0px;
  width: 100%;
  height: 100%;
  border: 15px solid #172342;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: var(--background-color);

}
.process-box{
  position: absolute;
  left: 10px;
  top: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: var(--background-color);
  background-image: var(--background-image);
}
.pointer-box {
  position: absolute;
  left: 50%;
  top: calc(20px + var(--border-width) / 2);
  bottom: calc(20px + var(--border-width) / 2);
  z-index: 1;
  transform: var(--pointer-rotate);
}

.pointer-box1{
  position: absolute;
  left: 17px;
  top: 17px;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: var(--background-color);

}
.pointer-box2{
  position: absolute;
  left: 20px;
  top: 20px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: #1B223D;
  display: flex;
  align-items: center;
  justify-content: center;


}
.pointer-box2-value{
  color: var(--start-color);
  font-size: 24px;
  font-weight: 400;
}
</style>
