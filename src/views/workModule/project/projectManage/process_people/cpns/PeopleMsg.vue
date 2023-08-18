<!--
 * @Author: your name
 * @Date: 2021-11-23 11:01:30
 * @LastEditTime: 2021-12-10 13:33:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\process_people\cpns\ProjectMsg.vue
-->
<template>
  <div class="card-style mag-card">
    <!-- 图片 -->
    <div class="img-style">
      <el-image
        style="width: 80px; height: 80px"
        :src="imgUrlPlugin(cdata.PhotoUrl)"
        class="productionTask-details-img"
        :preview-src-list="[imgUrlPlugin(cdata.PhotoUrl)]"
      >
          <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline error-icon"></i>
          </div>

      </el-image>
    </div>
    <!-- 时间 -->
    <div class="card-text">
      <i class="el-icon-date"></i>
      <span>{{ cdata.LastEndTime | timeFormat }}</span>
    </div>
    <!-- 人员 -->
    <div class="card-text">
      <i class="el-icon-user"></i>
      <span>{{ cdata.WorkerName }}</span>
    </div>
    <div style="margin-top: 5px">
      <!-- <i class="el-icon-pie-chart"></i> -->
      <!-- <span>{{ cdata.Progress }}</span> -->

      <el-progress
        :text-inside="true"
        :stroke-width="15"
        :percentage="cdata.Progress"
        :format="() => cdata.TaskName"
      ></el-progress>
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
.card-style {
  width: 120px;
  height: 160px;
  @include shadow;
  @include cardHover;
}
.mag-card {
  padding: 5px;
  .img-style {
    // padding-top: 5px;
    @include flexBox;
  }
  .card-text {
    margin-top: 5px;
    font-size: 14px;
    width: 100px;
    @include ellipsis;
    i {
      padding-right: 4px;
    }
  }
  .el-progress-bar__innerText {
    color: #000;
  }
}
.productionTask-details-img {
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
