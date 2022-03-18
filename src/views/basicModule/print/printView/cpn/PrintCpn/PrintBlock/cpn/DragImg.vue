<!--
 * @Author: C.
 * @Date: 2021-07-22 13:33:51
 * @LastEditTime: 2021-09-28 10:38:41
 * @Description: file content
-->
<template>
  <div :style="currentStyle"
       class="drag-img-show">
    <el-image :src="imageUrl"></el-image>
  </div>
</template>

<script>
import { handleStyle } from "../../../../../utils";
import { imgUrlPlugin } from "@/jv_doc/utils/system";
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
  created () {
    console.log(this.data, this.cdata, 8888);
  },
  computed: {
    currentStyle () {
      return handleStyle(this.cdata.style)
    },
    imageUrl () {
      return imgUrlPlugin(this.data[this.cdata.prop])
    }
  },
}
</script>

<style lang="scss">
.drag-img-show {
  position: absolute;
  overflow: hidden;
}
</style>
