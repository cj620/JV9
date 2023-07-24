<!--
 * @Author: C.
 * @Date: 2021-09-24 13:02:47
 * @LastEditTime: 2023-07-19 11:15:32
 * @Description: file content
-->
<template>
  <!-- <el-image v-bind="getImageBind" class="jv-table-inner-img">
    <div slot="error" class="image-slot">
      <i class="el-icon-picture error-icon"></i>
    </div>
  </el-image> -->
  <div class="img-box" :style="getImageBind.style">
    <el-image
      class="jv-table-inner-img"
      v-bind="getImageBind"
      style="height: 100%; width: 100%"
    >
      <div slot="error" class="image-slot">
        <i class="el-icon-picture error-icon"></i>
      </div>
    </el-image>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system";
export default {
  props: {
    state: [Array, String, Boolean, Object],
    // rowData: {
    //   type: Object,
    //   default: () => { }
    // },
    cpnProps: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getImageBind() {
      if (!this.cpnProps) return {};
      let imgPreUrl = imgUrlPlugin(this.state, {
        prefix: this.cpnProps.preUrl,
      });
      return {
        src: imgPreUrl,
        previewSrcList: [imgPreUrl],
        style: {
          width: this.cpnProps?.width ?? "38px",
          height: this.cpnProps?.height ?? "38px",
        },
        ...this.cpnProps,
      };
    },
  },
};
</script>

<style lang="scss" >
.jv-table-inner-img {
  background-color: rgb(231, 231, 231);
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: rgb(161, 161, 161);
    .error-icon {
      color: rgb(161, 161, 161);
      font-size: 19px;
    }
  }
}
.img-box {
  // width: 50px;
  // height: 50px;
  /* background-color: pink; */
}
</style>
