<!--
 * @Author: C.
 * @Date: 2022-02-16 15:25:25
 * @LastEditTime: 2022-02-24 14:57:41
 * @Description: file content
-->
<template>
  <div class="craft-list">
    <div class="craft-tag" v-for="item in cdata" :key="item">
      {{ item.Process }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cdata: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.craft-list {
  // display: flex;
  @include ellipsis;
  width: 600px;
  .craft-tag {
    display: inline-block;
    text-align: center;
    font-size: 14px;

    border: 1px solid #eee;

    padding: 3px 5px;
    margin-right: 5px;
    border-radius: 15px;
  }
}
</style>
