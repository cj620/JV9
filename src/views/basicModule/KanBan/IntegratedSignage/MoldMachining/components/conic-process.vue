<!-- demo2 -->
<template>
  <div class="chart-box" :style="styObj">
    <!-- 进度条部分 -->
    <div class="process-wrapper">
      <div class="process-box"></div>
      <div class="pointer-box"></div>
    </div>
    <!-- 插槽内容 -->
    <div class="slot-content">
      <slot></slot>
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
        rate = 99;
      } else {
        rate = this.rate;
      }
      let endPos = `${rate}%`;
      let obj = Object.assign({}, this.defaultConfig, this.config);
      let rotate = `rotate(${3.6 * rate}deg)`;
      let chartRotate = obj.clockwise ? "rotateY(0deg)" : "rotateY(180deg)";
      let showEyes = obj.showEyes ? 1 : 0;
      return {
        "--background-image": `conic-gradient(${obj.startColor} 0%, ${obj.endColor} ${endPos}, transparent ${endPos})`,
        "--border-width": obj.borderWidth,
        "--dot-width": obj.circleSize,
        "--pointer-rotate": rotate,
        "--background-color": obj.borderBackground,
        "--circle-color": obj.circleColor,
        "--clockwise-wise": chartRotate,
        "--show-eyes": showEyes,
        "--eyes-size": obj.eyesSize,
        "--start-color": obj.startColor,
      };
    },
  },
  data() {
    return {
      /* 此配置下所有属性均可在config中进行覆盖，实现个性化配置 */
      defaultConfig: {
        borderWidth: "14px", // 描边宽度
        borderBackground: "#313956", // 描边背景颜色
        circleSize: "8px", // 结尾处圆点直径
        circleColor: "#2ec4a7", // 结尾处圆点颜色
        startColor: "#d5f4ee", // 进度条起始颜色
        endColor: "#2ec4a7", // 进度条结束颜色
        clockwise: true, // 是否顺时针
        showEyes: false, // 是否显示结尾处小眼睛
        eyesSize: "14px", // 结尾处小眼睛大小
      },
    };
  },
};
</script>
<style scoped>
.chart-box {
  position: relative;
  width: 100%;
  height: 100%;
}
/* 将图表和插槽内容分开，便于控制进度条顺时针亦或是逆时针 */
.process-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transform: var(--clockwise-wise);
}
/* 开始处增加一个圆形端点，模拟圆角效果 */
.process-wrapper::after {
  content: "";
  width: var(--border-width);
  height: var(--border-width);
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  background: var(--start-color);
}
/* 核心代码、控制进度条样式及进度 */
.process-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-sizing: border-box;
  background-color: var(--background-color);
  background-image: var(--background-image);
  -webkit-mask: radial-gradient(
    closest-side at center center,
    transparent calc(100% - var(--border-width)),
    #fff calc(100% - var(--border-width))
  );
  mask: radial-gradient(
    closest-side at center center,
    transparent calc(100% - var(--border-width)),
    #fff calc(100% - var(--border-width))
  );
}
/* 指示针 */
.pointer-box {
  position: absolute;
  left: 50%;
  top: calc(0px + var(--border-width) / 2);
  bottom: calc(0px + var(--border-width) / 2);
  z-index: 1;
  transform: var(--pointer-rotate);
}
/* 指示针的头部（进度条结尾处）添加一个小圆点 */
.pointer-box::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: var(--dot-width);
  height: var(--dot-width);
  border-radius: 50%;
  background: var(--circle-color);
  transform: translate(-50%, -50%);
}
/* 进度条结尾处添加一个小眼睛，背景白色 */
.pointer-box::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  width: var(--eyes-size);
  height: var(--eyes-size);
  border-radius: 50%;
  background: var(--circle-color);
  transform: translate(-50%, -50%);
  z-index: 1;
  opacity: var(--show-eyes);
}
/* 插槽内容样式 */
.slot-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>
