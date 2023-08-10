<!--
 * @Author: C.
 * @Date: 2021-06-10 08:58:35
 * @LastEditTime: 2022-01-24 09:24:30
 * @Description: file content
-->
<template>
  <div class="jv-pagination">
    <div>
      <slot></slot>
    </div>
    <el-pagination v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: "JvPagination",
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";
.jv-pagination {
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  // @include flexBox($jc: flex-end);
  // padding-bottom: 10px;
}
</style>
