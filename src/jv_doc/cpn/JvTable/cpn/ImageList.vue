<!--
 * @Author: C.
 * @Date: 2021-09-24 13:02:47
 * @LastEditTime: 2023-07-19 11:33:27
 * @Description: file content
-->
<template>
  <div>
    <div class="img-box" :style="imgStyle" v-if="getImageBind.length !== 0">
      <el-image
        class="jv-table-inner-img"
        v-for="(item,index) in getImageBind"
        style="height: 100%; width: 100%"
        v-bind="item"
        :key="index"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture error-icon"></i>
        </div>
      </el-image>
    </div>
    <span v-else>--</span>
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
      let imglist = [];
      if (Array.isArray(this.state)) {
        imglist = this.state;
      }
      const urlList = imglist.map((item) =>
        imgUrlPlugin(item, { prefix: this.cpnProps.preUrl })
      );
      return urlList.map((item) => {
        return {
          src: item,
          previewSrcList: urlList,
          ...this.cpnProps,
        };
      });
    },
    imgStyle() {
      return {
        width: this.cpnProps?.width ?? "38px",
        height: this.cpnProps?.height ?? "38px",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.jv-table-inner-img {
  background-color: rgb(231, 231, 231);
  margin-left: 5px;
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
