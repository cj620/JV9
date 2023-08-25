<script>
export default {
  name: "icon-tooltip",
  props: {
    icon: {
      type: String,
      default: "el-icon-setting",
    },
    text: {
      type: String,
      default: "",
    },
    tip: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <div style="display: flex; align-items: center; width: 100%">
    <el-tooltip
      :enterable="false"
      class="item"
      effect="dark"
      :content="tip"
      placement="top"
    >
      <i :class="icon"></i>
    </el-tooltip>
    <div
      style="
        line-height: 1;
        width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      "
    >
      {{ text }}
    </div>
  </div>
</template>

<style scoped lang="scss">
i {
  font-size: 16px;
  margin-right: 4px;
}
</style>
