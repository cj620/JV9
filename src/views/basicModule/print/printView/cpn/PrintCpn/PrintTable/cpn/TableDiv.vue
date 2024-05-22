<!--
 * @Author: C.
 * @Date: 2021-08-02 10:49:38
 * @LastEditTime: 2024-05-22 14:55:23
 * @Description: file content
-->
<template>
  <div class="item-wrapper" :style="contentStyle">
    <!-- ['\\Image\\1492042449571282945.png'] -->
    <span v-if="cdata.filter !== 'image'">{{
      dataFilter(data[cdata.prop], cdata.filterOptions)
    }}</span>
    <div v-else>
      <el-image
        v-for="item in dataFilter(data[cdata.prop], cdata.filterOptions)"
        :key="item"
        :src="item"
        :style="{
          width: cdata.filterOptions ? cdata.filterOptions + 'px' : undefined,
          margin: '5px',
        }"
      >
      </el-image>
    </div>
  </div>
</template>

<script>
import { handleStyle } from "../../../../../utils";
import { filterEnums } from "../../../../../enums";
export default {
  name: "TableDiv",
  data() {
    return {};
  },
  methods: {},
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    contentStyle() {
      return handleStyle(this.cdata.style, "only-style");
    },
    dataFilter() {
      return filterEnums[this.cdata.filter].func;
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>
import { repeat } from "core-js/core/string";
