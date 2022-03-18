<!--
 * @Author: your name
 * @Date: 2021-11-24 09:51:18
 * @LastEditTime: 2022-01-26 10:27:23
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\design\designTask\List\cpns\StaffCard.vue
-->
<template>
  <div class="staff-card">
    <div class="staff-avatar">
      <el-image
        style="width: 100px; height: 105px"
        :src="imgUrlPlugin(cdata.PhotoUrl)"
        :preview-src-list="[imgUrlPlugin(cdata.PhotoUrl)]"
        class="staff-avatar-Img-error"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline error-icon"></i>
        </div>
      </el-image>
    </div>
    <div class="right-box">
      <el-progress
        type="circle"
        :percentage="Number(cdata.Efficency.toFixed(1))"
        :width="50"
        style="margin-left: 20px"
      ></el-progress>
      <div class="staff-desc">
        {{ cdata.DeviceNo }}
      </div>
      <div class="staff-desc">
        {{ cdata.Device }}
      </div>
    </div>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system";
export default {
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    imgUrlPlugin,
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.staff-card {
  padding: 5px;
  display: inline-block;
  width: 210px;
  height: 115px;
  @include shadow;
  position: relative;
  background-color: #fff;
  .right-box {
    position: absolute;
    padding: 5px;
    height: 100%;
    left: 105px;
    top: 0;
    .staff-desc {
      width: 105px;
      padding-left: 5px;
      margin-top: 7px;
      @include ellipsis;
      font-size: 14px;
      text-align: center;
    }
  }
}
.staff-avatar-Img-error {
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
</style>
