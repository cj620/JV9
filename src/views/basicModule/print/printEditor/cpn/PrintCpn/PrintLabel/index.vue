<!--
 * @Author: C.
 * @Date: 2021-08-02 10:49:38
 * @LastEditTime: 2022-01-14 14:36:59
 * @Description: file content
-->
<template>
  <div class="print-label" :style="contentStyle">
    <span v-if="!inputShow" @dblclick="dblclick(cdata.prop)">{{
      cdata.label
    }}</span>
    <el-input
      v-model="cdata.label"
      v-else
      @blur="inputShow = false"
      :ref="cdata.prop"
    ></el-input>
  </div>
</template>

<script>
import { handleStyle } from "../../../../utils";
export default {
  data() {
    return {
      inputShow: false,
    };
  },
  methods: {
    dblclick(e) {
      console.log("1111111111111");
      this.inputShow = true;
      this.$nextTick(() => {
        this.$refs[e].focus();
      });
    },
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    contentStyle() {
      return handleStyle(this.cdata.style, "only-style");
    },
  },
};
</script>

<style lang="scss">
@import "../../../../style/print-edit.scss";
</style>
