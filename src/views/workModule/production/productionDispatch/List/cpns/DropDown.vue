<!--
 * @Author: C.
 * @Date: 2022-01-21 14:31:12
 * @LastEditTime: 2022-01-21 17:29:05
 * @Description: file content
-->
<template>
  <el-dropdown @command="command">
    <span class="el-dropdown-link">
      <i class="el-icon-more"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="top" :disabled="!funcOpt.top">{{
        $t("production.Pr_Top")
      }}</el-dropdown-item>
      <el-dropdown-item command="toggle" :disabled="!funcOpt.switchDevice">{{
        $t("Generality.Ge_Edit")
      }}</el-dropdown-item>
      <el-dropdown-item command="lock">{{
        $t("Generality.Ge_lock")
      }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
    funcOpt: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    command(e) {
      console.log(this.cdata);
      this.$emit("command", {
        Type: e,
        PlanStart: this.cdata.PlanStart,
        PlanEnd: this.cdata.PlanEnd,
        TaskProcessId: this.cdata.Id,
        Resource: this.cdata.Resource,
        PlanDevice: this.cdata.PlanDevice,
      });
    },
  },
};
</script>

<style lang="scss">
.el-dropdown-link {
  cursor: pointer;
  color: #000;
  font-size: 17px;
}
</style>
