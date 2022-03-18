<!--
 * @Author: C.
 * @Date: 2022-02-16 15:07:38
 * @LastEditTime: 2022-02-22 15:51:23
 * @Description: file content
-->
<template>
  <div class="icon-value" style="">
    <!-- <svg-icon :icon-class="icon" /> -->
    {{ content }}
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "tag",
    },
    width: {
      type: Number,
      default: 80,
    },
    content: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.icon-value {
  font-size: 14px;
  // margin: 0 8px;
  // @include ellipsis;
  margin: 0 15px 0 2px;
}
</style>
