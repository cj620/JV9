<!--
 * @Author: C.
 * @Date: 2021-08-02 10:49:38
 * @LastEditTime: 2021-09-29 16:21:13
 * @Description: file content
-->
<template>
  <div class="item-wrapper"
       :style="contentStyle">
    {{dataFilter(data[cdata.prop],cdata.filterOptions)}}
  </div>
</template>

<script>
import { handleStyle } from "../../../../../utils";
import { filterEnums } from "../../../../../enums";
export default {
  name: 'TableDiv',
  data () {
    return {
    }
  },
  methods: {

  },
  props: {
    cdata: {
      type: Object,
      default: () => { }
    },
    data: {
      type: Object,
      default: () => { }
    },
  },
  computed: {
    contentStyle () {
      return handleStyle(this.cdata.style, 'only-style')
    },
    dataFilter () {
      return filterEnums[this.cdata.filter].func
    }
  }
}
</script>

<style lang="scss">
@import "../../../../../style/print-edit.scss";
</style>