<!--
 * @Author: your name
 * @Date: 2021-11-24 11:16:43
 * @LastEditTime: 2022-01-21 17:27:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\design\designTask\List\cpns\TaskCard.vue
-->
<template>
  <div class="task-card">
    <el-tooltip effect="dark" :content="stateMap.name" placement="right-start">
      <div class="state-bar" :style="{ background: stateMap.color }">
        {{ cdata.PartNo }}
        <div v-if="cdata.FixedProcessingDevice" class="" style="height: 100%">
          <i class="el-icon-lock"></i>
        </div>
      </div>
    </el-tooltip>
    <DropDown
      class="func-drop"
      :cdata="cdata"
      @command="dropCommand"
      :funcOpt="stateMap.operation"
    ></DropDown>
    <div class="task-content">
      <div class="img-desc">
        <el-image
          style="width: 50px; height: 50px"
          class="img"
          :src="imgUrlPlugin(cdata.PhotoUrl)"
          :preview-src-list="[imgUrlPlugin(cdata.PhotoUrl)]"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline error-icon"></i>
          </div>
        </el-image>
        <div class="desc-box">
          <div class="desc-text">
            <i class="el-icon-box"></i>
            {{ cdata.Process }}
          </div>
          <div class="desc-text">
            <i class="el-icon-user" style="padding-right: 5px"></i>
            {{ cdata.Worker | IsEmpty }}
          </div>
        </div>
      </div>
      <div class="time-progress">
        <div class="time">
          <i class="el-icon-date"></i>
          <span>{{ cdata.PlanStart | timeFormat("yyyy-MM-dd hh:mm") }}</span>
          <span class="hours">{{ cdata.PlanTime }}H</span>
        </div>
        <div class="time">
          <i class="el-icon-date"></i>
          <span>{{ cdata.PlanEnd | timeFormat("yyyy-MM-dd hh:mm") }}</span>
        </div>
      </div>
      <div style="margin-top: -5px">
        <i class="el-icon-document" style="margin-right: 4px"></i>
        <el-button type="text" size="mini" @click="goProduction(cdata.BillId)" style="font-size: 14px">
          {{cdata.BillId}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { ProcessState } from "@/enum/workModule";
import DropDown from "./DropDown.vue";
export default {
  components: {
    DropDown,
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    imgUrlPlugin,
    dropCommand(e) {
      this.$emit("command", e);
    },
    goProduction(BillId) {
      this.$router.push({
        name: 'ProductionTaskDetails',
        query: {
          BillId
        }
      })
    }
  },
  computed: {
    stateMap() {
      return ProcessState[this.cdata.State];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/jv_doc/style/mixin.scss";
.task-card {
  width: 235px;
  height: 155px;
  @include shadow;
  position: relative;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  .state-bar {
    height: 20px;
    line-height: 20px;
    border-radius: 10px 10px 0px 0px;
    background-color: #fff;
    width: 235px;
    padding: 1px 30px 1px 5px;
    display: flex;
    justify-content: space-between;
    @include ellipsis;
  }
  .func-drop {
    position: absolute;
    right: 7px;
    top: 0;
  }
  .task-content {
    width: 100%;
    height: 135px;
    background-color: #fff;
    padding: 0 5px 0 10px;
    border-radius: 0 0 10px 10px;
    .img-desc {
      width: 200px;
      height: 55px;
      padding-left: 50px;
      position: relative;
      .img {
        position: absolute;
        left: 0;
        top: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(231, 231, 231);
        .image-slot {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgb(161, 161, 161);
          .error-icon {
            color: rgb(161, 161, 161);
            font-size: 19px;
          }
        }
      }
      .desc-text {
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
          margin-left: 35px;
        }
        i {
          margin-right: 5px;
        }
      }
      .desc {
        width: 200px;
        padding: 5px 0;
        @include ellipsis;
        i {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
