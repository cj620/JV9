<!--
 * @Author: C.
 * @Date: 2021-07-22 13:33:51
 * @LastEditTime: 2021-12-20 17:08:36
 * @Description: file content
-->
<template>
  <div class="insert-iamge">
    <el-image :src="cdata.url" :style="contentStyle"></el-image>
  </div>
</template>

<script>
import { handleStyle } from "../../../../../utils";
export default {
  components: {},
  data() {
    return {};
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
    form: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {},
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
