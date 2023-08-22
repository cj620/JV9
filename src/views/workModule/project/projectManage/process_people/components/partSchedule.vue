<script>
import IconTooltip from "@/views/workModule/project/projectManage/process_people/components/icon-tooltip.vue";
import { ProcessState } from "@/enum/workModule";
export default {
  name: "Pm_Project_PartSchedule.vue",
  components: { IconTooltip },
  data() {
    return {
      ProcessState,
      searchValue: "",
      processList: [
        { a: "铣床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "磨床", b: "ToBeReceived", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
        { a: "水床", b: "Processed", c: "2023-08-22 13:22:45" },
      ],
    };
  },
};
</script>

<template>
  <PageWrapper :footer="false">
    <!-- 顶部操作行 -->
    <div class="part-schedule-header">
      <div class="part-schedule-header-left">
        <div class="part-schedule-header-left-box">
          <el-input
            :placeholder="`${$t('Generality.Ge_PleaseEnter')}...`"
            size="mini"
            v-model="searchValue"
          ></el-input>
        </div>
        <div class="part-schedule-header-left-box">
          <el-button size="mini">{{ $t("Generality.Ge_Search") }}</el-button>
        </div>
      </div>
      <div></div>
    </div>
    <!-- 内容 -->
    <div class="part-schedule-content">
      <!-- 每一项 -->
      <div class="part-schedule-content-item" v-for="item in 10" :key="item">
        <!-- 最前面的头部-->
        <div class="part-schedule-content-item-header">
          <!-- 头部的上部分 -->
          <div class="part-schedule-content-item-header-top">
            <!-- 图片 -->
            <div class="part-schedule-content-item-header-top-left">
              <el-image
                src="https://img2.baidu.com/it/u=2048195462,703560066&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333"
                :preview-src-list="[
                  'https://img2.baidu.com/it/u=2048195462,703560066&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333',
                ]"
                style="width: 65px; height: 65px; border-radius: 4px"
              ></el-image>
            </div>
            <!-- 信息 -->
            <div class="part-schedule-content-item-header-top-right">
              <div></div>
              <div>
                <icon-tooltip tip="工序" text="NC粗加工"></icon-tooltip>
              </div>
              <div>
                <icon-tooltip
                  icon="el-icon-user"
                  tip="负责人"
                  text="李显辉"
                ></icon-tooltip>
              </div>
              <div></div>
            </div>
          </div>
          <!-- 头部的下部分 -->
          <div class="part-schedule-content-item-header-bottom">
            <div class="part-schedule-content-item-header-bottom-box">
              <div style="margin-bottom: 4px">
                <icon-tooltip tip="零件编号" text="S221003-700"></icon-tooltip>
              </div>
              <div>
                <icon-tooltip tip="零件名称" text="怡宝盖"></icon-tooltip>
              </div>
            </div>
            <div class="part-schedule-content-item-header-bottom-box">
              <el-progress :percentage="30"></el-progress>
            </div>
          </div>
        </div>
        <!-- item的内容部分 -->
        <div class="part-schedule-content-item-content">
        <!-- 进度条的框体 -->
          <div
            class="progress-box"
            :style="{
              backgroundColor:
                i === processList.length-1 ? '#fff' :
                (ProcessState[item.b] && ProcessState[item.b].color)
                ,
                boxShadow: i === processList.length-1 ? 'none' : '2px 2px 6px 2px #ccc',
            }"
            v-for="(item, i) in processList"
            :key="i"
          >
            <!-- 进度条定位的内容 -->
            <div class="progress-box-content">
              <!-- 内容顶部 -->
              <div class="progress-box-content-top">{{ item.a }}</div>
              <!-- 圆圈 -->
              <div
                class="progress-box-content-circle"
              :style="{
                backgroundColor: ProcessState[item.b] && ProcessState[item.b]._color
              }"
              >
                <i class="el-icon-check"
                v-show="i === processList.length-1 && ProcessState[item.b].value === 'Processed'"
                ></i>
              </div>
              <!-- 内容底部 => 完成状态 和 时间 -->
              <div class="progress-box-content-bottom"
              :style="{textAlign: i === 0 ? 'start' : 'center',right: i === 0 ? '-20px' : 0}"
              >
                <span
                  :style="{textIndent: i === 0 ? '1.5em' : 0,marginBottom:'4px'}"
                >{{ ProcessState[item.b] && ProcessState[item.b].name }}</span>
                <span>{{ item.c }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<style scoped lang="scss">
.part-schedule-header {
  width: 100%;
  height: 40px;
  background: #fff;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  &-left {
    display: flex;
    align-items: center;
    &-box {
      margin-right: 10px;
    }
  }
}
.part-schedule-content {
  background: #fff;
  width: 100%;
  margin-top: 10px;
  height: calc(100vh - 170px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 10px;
  &-item {
    margin-top: 12px;
    width: 98%;
    user-select: none;
    //min-width: 1000px;
    border: 1px solid #eee;
    height: 140px;
    display: flex;
    &-header {
      width: 200px;
      height: 140px;
      position: relative;
      display: flex;
      flex-direction: column;
      &-top {
        display: flex;
        &-left {
          width: 75px;
          height: 75px;
          box-sizing: border-box;
          padding: 5px;
        }
        &-right {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          font-size: 12px;
          div {
            display: flex;
            margin-bottom: 6px;
            align-items: center;
          }
        }
      }
      &-bottom {
        height: 100px;
        padding: 0 5px 0 5px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 12px;
        &-box {
          margin-bottom: 6px;
          display: flex;
          //align-items: center;
          width: 100%;
          flex-direction: column;
          ::v-deep.el-progress-bar {
            width: 108%;
          }
        }
      }
    }
    &-content {
      width: calc(100% - 180px);
      display: flex;
      align-items: center;
      height: 140px;
      overflow-x: auto;
      padding-left: 40px;
      .progress-box{
        height: 25px;
        min-width: 160px;
        position: relative;
        &-content{
          width: 120px;
          left: -60px;
          position: absolute;
          top: -32.5px;
          font-size: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          &-top{
            height: 30px;
          }
          &-bottom{
            height: 50px;
            display: flex;
            flex-direction: column;
            text-align: center;
            position: relative;
            box-sizing: border-box;
            padding-top: 10px;
          }
          &-circle{
            border: 1px solid #ccc;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            color: #2ee438;
            font-size: 20px;
            text-align: center;
            line-height: 30px;
          }
        }
      }
    }
  }
}
.part-schedule-content-item-header::after {
  content: "";
  height: 124px;
  width: 1px;
  background: #eee;
  position: absolute;
  right: 0;
  top: 8px;
}
</style>
