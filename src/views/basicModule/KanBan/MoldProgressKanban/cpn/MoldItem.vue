<!--
 * @Author: H.
 * @Date: 2022-01-18 09:14:29
 * @LastEditTime: 2022-01-18 11:34:25
 * @Description:
-->
<template>

  <el-row
    justify="center"
    type="flex"
    align="center"
    class="mold-progress-item-row"

  >
    <template v-if="Object.keys(MoldProgressData).length !== 0">
      <div >
        <div>
        <el-image
          style="width: 100px; height: 100px;border-radius: 7px;"
          :src="imgUrlPlugin(MoldProgressData.PhotoUrl)"
          class="mold-progress-item-Img-error"
          >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline  error-icon"></i>
          </div>
        </el-image>
      </div
      ></div>
      <el-col :span="24" class="mold-progress-item-col"  style="min-width: 200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
        <div>
          <svg-icon icon-class="number" />
        {{ MoldProgressData.ToolingNo ? MoldProgressData.ToolingNo : "--" }}
      </div>
        <div>
          <i class="el-icon-user"></i>
          {{ MoldProgressData.Worker  ? MoldProgressData.Worker : "--" }}
        </div>
      </el-col >
      <div class="mold-progress-item-col" style="min-width: 220px">
        <div>
          <svg-icon icon-class="date_range" />
          {{  MoldProgressData.DeliveryDate|timeFormat("dd/MM/yyyy") }}
        </div>
        <div>
          <i class="el-icon-alarm-clock"></i>
          {{ MoldProgressData.WorkDate |timeFormat("MM/dd hh:mm")}}
        </div>
      </div>
      <div   class="mold-progress-item-col"  style="min-width: 200px">
        <div>
          <el-progress :text-inside="true" color="#41EE39" :stroke-width="26" :percentage="MoldProgressData.Progress"></el-progress>
        </div>
        <div>
          <svg-icon icon-class="mb-wechat-moment"></svg-icon>
          {{ MoldProgressData.Process ? MoldProgressData.Process : "--" }}
        </div>
      </div>
    </template>
    <template v-else>
      <el-col :span="24">
        <el-empty
          :image-size="40"
          description="暂无内容"
          style="padding: 0"
        ></el-empty>
      </el-col>
    </template>
  </el-row>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";

export default {
  props: {
    MoldProgressData: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    imgUrlPlugin,
  },
};
</script>

<style lang="scss" >
.mold-progress-item-row{
  padding: 10px;
   .mold-progress-item-Img-error{
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
  .mold-progress-item-col{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;

  }
}
</style>
