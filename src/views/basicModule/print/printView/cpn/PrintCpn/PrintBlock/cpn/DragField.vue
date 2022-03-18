<!--
 * @Author: C.
 * @Date: 2021-07-22 13:33:51
 * @LastEditTime: 2021-09-29 16:21:09
 * @Description: file content
-->
<template>
  <div class="content-wrapper"
       :style="contentStyle">

    <span v-if="cdata.role=='label'">
      {{cdata.label}}
    </span>
    <span v-else-if="cdata.role=='value'">
      {{dataFilter(data[cdata.prop],cdata.filterOptions)}}
    </span>
  </div>

</template>

<script>
import { handleStyle } from "../../../../../utils";
import { filterEnums } from "../../../../../enums";
export default {
  props: {
    data: {
      type: Object,
      default: () => { }
    },
    cdata: {
      type: Object,
      default: () => { }
    },
  },
  computed: {
    contentStyle () {
      return handleStyle(this.cdata.style)
    },
    dataFilter () {
      return filterEnums[this.cdata.filter].func
    }
  },
}
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>
