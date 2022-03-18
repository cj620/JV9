<!--
 * @Author: your name
 * @Date: 2021-11-24 10:40:46
 * @LastEditTime: 2022-01-21 15:28:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\design\designTask\List\cpns\TaskBox.vue
-->
<template>
  <div class="task-box">
    <!-- 555 -->
    <TaskCard
      v-for="item in cdata"
      :key="item.Id"
      style="margin-bottom: 10px"
      :cdata="item"
      @command="dropCommand"
    ></TaskCard>
  </div>
</template>

<script>
import TaskCard from "./TaskCard.vue";
export default {
  props: {
    cdata: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TaskCard,
  },
  methods: {
    dropCommand(e) {
      this.$emit("command", e);
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.task-box {
  width: 100%;
  min-height: 600px;
  // display: inline-block;
  @include flexBox($ai: center, $jc: flex-start, $ff: column);
}
</style>
