<!--
 * @Author: C.
 * @Date: 2021-07-27 14:25:22
 * @LastEditTime: 2021-08-23 15:21:53
 * @Description: file content
-->
<template>
  <div :style="contentStyle"
       class="item-wrapper">
    {{cdata.label}}
  </div>
</template>

<script>
import { handleStyle } from "../../../../../utils";
export default {
  props: {
    cdata: {
      type: Object,
      default: () => { }
    }
  },
  computed: {
    contentStyle () {
      return handleStyle(this.cdata.style)
    },

  }

}
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>
