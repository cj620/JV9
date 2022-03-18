<!--
 * @Author: C.
 * @Date: 2021-08-02 10:49:38
 * @LastEditTime: 2021-08-06 14:00:39
 * @Description: file content
-->
<template>
  <div class="print-label"
       :style="contentStyle"
       style="width:100%">
    {{cdata.label}}
  </div>
</template>

<script>
import { handleStyle } from "../../../../utils";
export default {
  data () {
    return {
      inputShow: false,
    }
  },
  methods: {
    dblclick (e) {
      console.log('1111111111111');
      this.inputShow = true
      this.$nextTick(() => {
        this.$refs[e].focus()
      })
    }
  },
  props: {
    cdata: {
      type: Object,
      default: () => { }
    },
  },
  computed: {
    contentStyle () {
      return handleStyle(this.cdata.style, 'only-style')
    },
  }
}
</script>

<style lang="scss">
@import "../../../../style/print-edit.scss";
</style>