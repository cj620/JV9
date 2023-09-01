<template>
  <div>
    <el-progress :percentage="state"></el-progress>
  </div>
</template>

<script>
export default {
  props: {
    state: {
      type: [String, Number],
      default: "0",
    },
  },
};
</script>

<style lang="scss">
</style>
