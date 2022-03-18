<!--
 * @Author: your name
 * @Date: 2021-11-24 11:16:43
 * @LastEditTime: 2021-12-14 11:14:24
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\design\designTask\List\cpns\TaskCard.vue
-->
<template>
  <div class="task-card" @click="cardClick">
    <div class="state-bar" :style="{ background: stateMap.color }">
      {{ cdata.ToolingNo }}
    </div>
    <div class="task-content">
      <div class="img-desc">
        <el-image
          style="width: 50px; height: 50px"
          class="img"
          :src="imgUrlPlugin(cdata.PhotoUrl)"
          :preview-src-list="[imgUrlPlugin(cdata.PhotoUrl)]"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline  error-icon"></i>
          </div>

        </el-image>
        <div class="desc-box">
          <div class="desc-text">
            <i class="el-icon-box"></i>
            {{ cdata.Process }}
          </div>
          <div class="desc-text">
            <i class="el-icon-folder-checked"></i>
            {{ taskMap.name }}
          </div>
        </div>
      </div>
      <div class="time-progress">
        <div class="time">
          <i class="el-icon-date"></i>
          <span>{{ cdata.PlanEnd | timeFormat("yyyy-MM-dd hh:mm") }}</span>
          <span class="hours">{{ cdata.PlanTime }}H</span>
        </div>
        <div>
          <!-- <i class="el-icon-pie-chart"></i> -->
          <el-progress
            :text-inside="true"
            :stroke-width="15"
            :percentage="Number(cdata.Progress)"
          ></el-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { taskStateEnum } from "@/enum/workModule";
import { taskTypeEnum } from "@/enum/workModule";
export default {
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    imgUrlPlugin,
    cardClick() {
      this.$router.push({
        name: "Pm_ProjectTask_Detail",
        query: { BillId: this.cdata.BillId },
      });
    },
  },
  computed: {
    stateMap() {
      return taskStateEnum[this.cdata.State];
    },
    taskMap() {
      return taskTypeEnum[this.cdata.TaskType];
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.task-card {
  // padding: 0 5px;
  width: 210px;
  height: 125px;
  @include shadow;
  position: relative;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  .state-bar {
    // width: 100%;
    height: 20px;
    border-radius: 10px 10px 0px 0px;
    background-color: rgb(211, 153, 153);
    width: 210px;
    padding: 1px 5px;
    @include ellipsis;
  }
  .task-content {
    width: 100%;
    height: 95px;
    background-color: #fff;
    width: 210px;
    padding: 0 5px;
    border-radius: 0px 0px 10px 10px;

    .img-desc {
      width: 200px;
      height: 55px;
      padding-left: 50px;
      position: relative;
      // background-color: rgb(59, 112, 110);
      .img {
        position: absolute;
        left: 0;
        top: 5px;
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
      .desc-text {
        // margin-top: 5px;
        i {
          margin-right: 5px;
        }
        padding: 5px;
        width: 150px;
        @include ellipsis;
      }
    }
    .time-progress {
      .time {
        width: 200px;
        padding: 5px 0;
        @include ellipsis;
        .hours {
          margin-left: 20px;
        }
        i {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
