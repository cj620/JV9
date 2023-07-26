<!--
 * @Author: C.
 * @Date: 2022-08-31 09:59:45
-->
<template>
  <jv-block title="机床运行状态">
    <div class="state-bar">
      <el-tooltip
        v-for="(item, index) in machineData.Data"
        :key="index"
        :style="{ background: item.state, width: item.time / 14.4 + '%' }"
        class="state-item"
        effect="dark"
        :content="item.time"
        placement="top-start"
      >
        <div>{{ item.time }}</div>
      </el-tooltip>
    </div>
  </jv-block>
</template>
<script>
import { getBarData } from "./utils";
export default {
  name: "Home",

  data() {
    return {
      machineData: null,
    };
  },
  created() {
    this.machineData = getBarData();
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.state-bar {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  background-color: #ccc;
  display: flex;
  justify-content: start;
  .state-item {
    height: 100%;
    &:hover {
      filter: brightness(1.2);
    }
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
