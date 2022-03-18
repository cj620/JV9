<!--
 * @Author: C.
 * @Date: 2021-07-22 13:33:51
 * @LastEditTime: 2022-01-04 09:09:28
 * @Description: file content
-->
<template>
  <el-image :src="qrUrl" :style="contentStyle" class="insert-iamge"></el-image>
</template>

<script>
import { toDataURL } from "qrcode";
import { handleStyle } from "../../../../../utils";
export default {
  components: {},
  data() {
    return {
      qrUrl: "",
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.crateQrcode();
  },
  methods: {
    // 生成二维码
    async crateQrcode() {
      // this.qrUrl = await toDataURL(this.data[this.cdata.prop]);
      let barData = this.data[this.cdata.prop];
      if (this.cdata.options && this.cdata.options.prefix) {
        barData = this.cdata.options.prefix + barData;
      }
      this.qrUrl = await toDataURL(barData);
    },
  },
  computed: {
    contentStyle() {
      return handleStyle(this.cdata.style);
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>
