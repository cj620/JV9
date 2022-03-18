<!--
 * @Author: H.
 * @Date: 2021-12-22 13:06:29
 * @LastEditTime: 2022-01-05 15:33:18
 * @Description:
-->
<template>
  <div class="base-echart" ref="echartDivRef" :style="{ width, height }"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "400px",
    },
  },
  data() {
    return {
      echartInstance: "",
      Listener: "",
    };
  },
  methods: {
    setOptions(options) {
      this.echartInstance.setOption(options);
    },
  },
  created() {},

  mounted() {
    this.echartInstance = echarts.init(this.$refs.echartDivRef);
    this.Listener = window.addEventListener("resize", () => {
      this.echartInstance.resize();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.Listener);
  },
  watch: {
    options: {
      handler(newVal) {
        this.$nextTick(() => {
          this.setOptions(newVal);
        });
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
