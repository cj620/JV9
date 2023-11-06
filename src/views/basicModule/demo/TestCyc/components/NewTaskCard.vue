<template>
  <div class="task-card" @click="cardClick">
    <el-tooltip effect="dark" :content="stateMap.name" placement="right-start" style="width: 100%">
      <div class="state-bar" :style="{ background: stateMap.color }">
        {{ cdata.PartNo }}
      </div>
    </el-tooltip>
    <DropDown
      class="func-drop"
      :cdata="cdata"
      @command="dropCommand"
      :funcOpt="stateMap.operation"
    ></DropDown>
    <div class="task-content">
      <div class="task-content-top">
        <div class="task-content-top-left">
          <div class="task-content-top-left-text">
            <i class="el-icon-alarm-clock"></i>
            {{ cdata.PlanTime }}
          </div>
          <div class="task-content-top-left-text">
            <i class="el-icon-set-up"></i>
            {{ cdata.Process }}
          </div>
          <div class="task-content-top-left-text" style="width: 100%">
            <i class="el-icon-info"></i>
            {{ cdata.State }}
          </div>
        </div>
        <div class="task-content-top-right">
          <el-image
            style="width: 62px; height: 62px;"
            :src="imgUrlPlugin(cdata.PhotoUrl)"
            :preview-src-list="[imgUrlPlugin(cdata.PhotoUrl)]"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline error-icon"></i>
            </div>
          </el-image>
        </div>
      </div>
      <div class="task-content-bottom">
        <div class="task-content-bottom-text">
          <i class="el-icon-upload2"></i>
          {{ cdata.CreationDate }}
        </div>
        <div class="task-content-bottom-text">
          <i class="el-icon-alarm-clock"></i>
          {{ cdata.PlanStart }} -- {{ cdata.PlanEnd }}
        </div>
        <div class="task-content-bottom-text">
          <i class="el-icon-user"></i>
          {{ cdata.Worker }}
        </div>
      </div>
    </div>
<!--    <div class="task-content">-->
<!--      <div class="img-desc">-->
<!--        <el-image-->
<!--          style="width: 50px; height: 50px"-->
<!--          class="img"-->
<!--          :src="imgUrlPlugin(cdata.PhotoUrl)"-->
<!--          :preview-src-list="[imgUrlPlugin(cdata.PhotoUrl)]"-->
<!--        >-->
<!--          <div slot="error" class="image-slot">-->
<!--            <i class="el-icon-picture-outline error-icon"></i>-->
<!--          </div>-->
<!--        </el-image>-->
<!--        <div class="desc-box">-->
<!--          <div class="desc-text">-->
<!--            <i class="el-icon-box"></i>-->
<!--            {{ cdata.Process }}-->
<!--          </div>-->
<!--          <div class="desc-text">-->
<!--            &lt;!&ndash; <i class="el-icon-folder-checked"></i> &ndash;&gt;-->
<!--            &lt;!&ndash; {{ cdata.CurrentStation | IsEmpty }} &ndash;&gt;-->
<!--            <i class="el-icon-user" style="padding-right: 5px"></i>-->
<!--            {{ cdata.Worker | IsEmpty }}-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="time-progress">-->
<!--        <div class="time">-->
<!--          <i class="el-icon-date"></i>-->
<!--          <span>{{ cdata.PlanStart | timeFormat("yyyy-MM-dd hh:mm") }}</span>-->
<!--          <span class="hours">{{ cdata.PlanTime }}H</span>-->
<!--        </div>-->
<!--        <div class="time">-->
<!--          <i class="el-icon-date"></i>-->
<!--          <span>{{ cdata.PlanEnd | timeFormat("yyyy-MM-dd hh:mm") }}</span>-->
<!--        </div>-->
<!--        &lt;!&ndash; <div class="desc">-->
<!--          <i class="el-icon-user" style="padding-right: 5px"></i>-->
<!--          {{ cdata.Worker | IsEmpty }}-->
<!--        </div> &ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { ProcessState } from "@/enum/workModule";
import { taskTypeEnum } from "@/enum/workModule";
import DropDown from "@/views/workModule/production/productionDispatch/List/cpns/DropDown.vue";
export default {
  components: {
    DropDown,
  },
  data() {
    return {
      cdata: {
        Id: "1718834221713195009",
        BillGui: "1718834221583171586",
        BillId: "M231030002",
        Process: "NC粗加工",
        SortOrder: 0,
        PlanStart: "2023-11-03T10:20:00.9",
        PlanEnd: "2023-11-03T11:20:00.9",
        ActualStart: null,
        PlanTime: 1,
        PlanDevice: "C1",
        ActualDevice: null,
        State: "ToBeReceived",
        ToolingNo: "S239001",
        PartNo: "S20239001-A03",
        PartName: "模架",
        Quantity: 1,
        PartInfo: "450*420*406",
        PhotoUrl: "\\Image\\1697489874623397889.png",
        Worker: "cyc",
        CurrentStation: "NC粗加工",
        Resource: "CNC粗加工",
        CreationDate: "2001-01-01T12:00:00"
      }
    }
  },
  props: {
    // cdata: {
    //   type: Object,
    //   default: () => {},
    // },
  },
  methods: {
    imgUrlPlugin,
    cardClick() {
      // this.$router.push({
      //   name: "Pm_ProjectTask_Detail",
      //   query: { BillId: this.cdata.BillId },
      // });
    },
    dropCommand(e) {
      this.$emit("command", e);
    },
  },
  computed: {
    stateMap() {
      return ProcessState[this.cdata.State];
    },
    // taskMap() {
    //   return taskTypeEnum[this.cdata.TaskType];
    // },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.task-card {
  width: 100%;
  height: 100%;
  @include shadow;
  position: relative;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  .state-bar {
    height: 20px;
    border-radius: 10px 10px 0px 0px;
    background-color: #fff;
    width: 210px;
    padding: 1px 30px 1px 5px;
    @include ellipsis;
  }
  .func-drop {
    position: absolute;
    right: 7px;
    top: 0;
  }
  .task-content {
    width: 100%;
    height: calc(100% - 20px);
    display: flex;
    flex-direction: column;
    &-top {
      width: 100%;
      height: 40%;
      display: flex;
      &-left {
        height: 100%;
        width: calc(100% - 75px);
        display: flex;
        flex-wrap: wrap;
        &-text {
          width: 50%;
          height: 50%;
          border: silver 1px solid;
        }
      }
      &-right {
        height: 100%;
        width: 75px;
        text-align: center;
        .image-slot {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgb(231, 231, 231);
          // color: rgb(161, 161, 161);
          .error-icon {
            color: rgb(161, 161, 161);
            font-size: 19px;
          }
        }
      }
    }
    &-bottom {
      width: 100%;
      height: 60%;
      &-text {
        width: 100%;
        height: 33.3%;
        border: 1px silver solid;
      }
    }
  }
  //.task-content {
  //  width: 100%;
  //  height: 95px;
  //  background-color: #fff;
  //  width: 210px;
  //  padding: 0 5px;
  //  border-radius: 0px 0px 10px 10px;
  //
  //  .img-desc {
  //    width: 200px;
  //    height: 55px;
  //    padding-left: 50px;
  //    position: relative;
  //    // background-color: rgb(59, 112, 110);
  //    .img {
  //      position: absolute;
  //      left: 0;
  //      top: 5px;
  //      .image-slot {
  //        width: 100%;
  //        height: 100%;
  //        display: flex;
  //        justify-content: center;
  //        align-items: center;
  //        background-color: rgb(231, 231, 231);
  //        // color: rgb(161, 161, 161);
  //        .error-icon {
  //          color: rgb(161, 161, 161);
  //          font-size: 19px;
  //        }
  //      }
  //    }
  //    .desc-text {
  //      // margin-top: 5px;
  //      i {
  //        margin-right: 5px;
  //      }
  //      padding: 5px;
  //      width: 150px;
  //      @include ellipsis;
  //    }
  //  }
  //  .time-progress {
  //    .time {
  //      width: 200px;
  //      padding: 5px 0;
  //      @include ellipsis;
  //      .hours {
  //        margin-left: 20px;
  //      }
  //      i {
  //        margin-right: 5px;
  //      }
  //    }
  //    .desc {
  //      width: 200px;
  //      padding: 5px 0;
  //      @include ellipsis;
  //      i {
  //        margin-right: 5px;
  //      }
  //    }
  //  }
  //}
}
</style>
