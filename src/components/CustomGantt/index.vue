<template>
  <div
    :style="{ padding: padding + 'px', paddingBottom: 0 }"
    style="width: 100%; position: relative; background: #fff"
  >
    <!-- 边框线 -->
    <div
      class="custom-border-box"
      :style="{
        left:
          tableHeaderWidth +
          30 +
          (detailShow ? detailIconWidth : 0) +
          Number(padding) +
          'px',
        height: ganttContainerHeight - 14 + 'px',
      }"
    ></div>
    <div
      class="custom-border-box-left"
      :style="{
        height: ganttContainerHeight - 14 + 'px',
      }"
    ></div>
    <div
      class="custom-border-box-right"
      :style="{
        height: ganttContainerHeight - 14 + 'px',
        right: Number(padding) + 'px',
      }"
    ></div>
    <!-- 最外层的盒子 -->
    <div
      class="ganttContainer"
      :style="{
        height: ganttContainerHeight - Number(padding) + 'px',
      }"
    >
      <div class="loading-ganttContainer"
           v-show="loading"
           v-loading="loading"
      ></div>
      <!-- 时间表头列表 -->
      <div
        class="date-header"
        :style="{
          width: cWidth + 'px',
          height: tableHeaderHeight + 'px',
          marginLeft:
            tableHeaderWidth + 40 + (detailShow ? detailIconWidth : 0) + 'px',
        }"
      >
        <div
          class="date-header-item"
          :style="{ height: tableHeaderHeight / 2 + 'px' }"
        >
          <div
            class="date-header-cell"
            v-for="(item, i) in TableDateTopList"
            :key="i"
            :style="{ width: gantt.cellWidth * item.number + 'px' }"
          >
            <span
              class="beyond-hiding"
              :style="{ width: gantt.cellWidth * item.number + 'px' }"
              >{{ item.text }}</span
            >
          </div>
        </div>
        <div
          class="date-header-item"
          :style="{ height: tableHeaderHeight / 2 + 'px' }"
        >
          <div
            class="date-header-cell"
            v-for="(item, i) in TableDateBottomList"
            :key="i"
            :style="{ width: gantt.cellWidth + 'px', background: setWeekendColor(i)}"
          >
            {{ item < 10 ? "0" + item : item }}
          </div>
        </div>
      </div>

      <!-- 左侧表格表头 -->
      <div
        class="header-table-top"
        :style="{
          height: tableHeaderHeight + 'px',
          width:
            tableHeaderWidth + 40 + (detailShow ? detailIconWidth : 0) + 'px',
          marginTop: -tableHeaderHeight + 'px',
        }"
      >
        <div :style="{ width: detailIconWidth + 'px' }">
          <!-- <i class="el-icon-s-grid"></i> -->
        </div>
        <div
          v-for="(item, i) in _columns"
          :key="item.name"
          :style="{ width: item.width + 'px'}"
        >
          {{ item.label }}
        </div>
      </div>
      <!-- 左侧表格内容 -->
      <div
        class="header-table"
        :style="{
          width:
            tableHeaderWidth + 40 + (detailShow ? detailIconWidth : 0) + 'px',
        }"
      >
        <div
          v-for="(item, i) in list"
          :key="item.BillId"
          class="header-table-item"
          :style="{ width: '100%', height: tableItemHeight + 'px',background: headerTableIdx === i ? 'rgba(42, 155, 241,.2)': '' }"
          @mouseenter="hoverHeaderTable(item, i)"
          @mouseleave="leaveHeaderTable"
          @click="clickHeaderTable(item, i)"
        >
          <div
            class="header-table-item-box"
            :style="{ height: tableItemHeight - tableItemPadding * 2 + 'px', }"
          >
            <el-popover
              :placement="popoverOptions.placement"
              :width="popoverOptions.width"
              :trigger="popoverOptions.trigger"
            >
              <slot name="popover" :item="item"></slot>
              <div
                slot="reference"
                class="detail-style"
                :style="{ width: detailIconWidth + 'px' }"
                v-if="detailShow"
              >
                <i class="el-icon-s-grid"></i>
              </div>
            </el-popover>
            <div :style="{ width: detailIconWidth + 'px' }" v-if="!detailShow"></div>
            <div
              v-for="(jtem, j) in _columns"
              :key="jtem.name"
              :style="{
                width: jtem.width + 'px',
                textAlign: 'center',
                height: tableItemHeight - tableItemPadding * 2 + 'px',
              }"
            >
              <span v-if="jtem.name === 'PhotoUrl'">
                <el-image
                  :style="{ height: tableItemHeight - tableItemPadding * 2 - 4 + 'px' }"
                  :preview-src-list="[imgUrlPlugin(item[jtem.name])]"
                  :src="imgUrlPlugin(item[jtem.name])"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </span>
              <span
                class="beyond-hiding"
                v-else-if="
                  isNaN(item[jtem.name]) && !isNaN(Date.parse(item[jtem.name]))
                "
                >{{ timeFormat(item[jtem.name]) }}</span
              >
              <span class="beyond-hiding" v-else>{{ item[jtem.name] || '--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- task任务条盒子 -->
      <div
        id="canvas_parent"
        :style="{
          width: cWidth + 'px',
          left:
            tableHeaderWidth + 40 + (detailShow ? detailIconWidth : 0) + 'px',
          top: tableHeaderHeight + tableItemPadding + 'px',
        }"
      >
        <!-- <canvas></canvas> -->
        <div
          v-show="taskHint"
          class="task-hint"
          :style="{ height: tableItemHeight + 'px', top: taskHint_Top + 'px' }"
        ></div>
        <div
          v-show="clickTaskHint"
          class="task-hint"
          :style="{ height: tableItemHeight + 'px', top: clickTaskHint_Top + 'px' }"
        ></div>
      </div>
    </div>

    <!-- 点击task的表单弹窗 -->
    <JvDialog
      @confirm="confirm(taskDetail)"
      :title="dialogTitle"
      width="35%"
      :visible.sync="dialogVisible"
    >
      <slot name="taskDialogSlot" :item="taskDetail"></slot>
    </JvDialog>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { timeFormat } from "@/jv_doc/utils/time";
import { getTimeRangeList } from "@/jv_doc/utils/time/getTimeRangeList";
import { CreateGantt } from "./createGantt";
import { setBubbleSort } from "./protogenesis.js"; // 引入排序方法
export default {
  props: {
    // 数据
    result: {
      type: Object,
      default: {},
    },
    // 表头配置
    columns: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 表格头部的高度
    tableHeaderHeight: {
      type: Number,
      default: 50,
    },
    // table每一项的高度
    tableItemHeight: {
      type: Number,
      default: 54,
    },
    // 任务条高度
    taskHeight: {
      type: Number,
      default: 30,
    },
    // 表格每一项的padding值
    tableItemPadding: {
      type: Number,
      default: 8,
    },
    // task任务条圆角
    taskRadius: {
      type: Number | String,
      default: null,
    },
    // loading加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 默认以小时单位呈现甘特图
    defaultUnitOfTime: {
      type: String,
      default: "hour",
    },
    // 甘特图盒子的高度
    ganttContainerHeight: {
      type: Number,
      default: 650,
    },
    // 是否显示表格每一项的详情展示图标
    detailShow: {
      type: Boolean,
      default: false,
    },
    // 详情popover的配置
    popoverOptions: {
      type: Object,
      default: () => {
        return {
          placement: "right", // 显示的方位
          width: 200, // 宽度
          trigger: "click", // 触发方式
        }
      }
    },
    // 甘特图盒子的padding值
    padding: {
      type: Number | String,
      default: 0,
    },
    // task条上的文字
    taskInnerHtml: {
      type: Function,
      default: null,
    },
    // task是否可以hover
    isTaskHover: {
      type: Boolean,
      default: false,
    },
    // task是否可以被右键点击
    isTaskRightClick: {
      type: Boolean,
      default: false,
    },
    // task是否可以被左键点击
    isTaskLeftClick: {
      type: Boolean,
      default: false,
    },
    // task是否可以被点击
    isTaskClick: {
      type: Boolean,
      default: false,
    },
    // task悬浮窗组件
    floatingWindow: {
      type: Object,
      default: null,
    },
    MenuItems: {
      type: Array,
      default: () => {
        return [{label: '测试菜单', event(item, e) {
            console.log('当前数据：', item);
            console.log('当前节点:', e)
          }}]
      },
    },
    MenuComponents: {
      type: Object,
      default: null,
    },
    // task悬浮窗字符串模板
    popoverInnerHtml: {
      type: Function,
      default: null,
    },
    // taskDialog标题
    taskDialogTitle: {
      type: String,
      default: "Id",
    },
    // 任务条背景颜色
    taskColor: {
      type: String,
      default: "#2a9bf1"
    },
    // 设置任务条背景颜色的方法
    setTaskBackground: {
      type: Function,
      default: () => {
        return {condition: false, color: "#2a9bf1"}
      },
    }
  },
  data() {
    return {
      taskDetail: null,
      dialogTitle: "",
      formObj: "",
      dialogVisible: false,
      detailIconWidth: 30,
      cWidth: 2000,
      cHeight: "82vh",
      gantt: null,
      // displayPriority: 0,
      tableHeaderWidth: 0, // 表格头部的宽度
      TableDateTopList: [], // 时间表头列表
      TableDateBottomList: [],
      cellWidth: 0,
      list: [],
      unitOptions: [
        {
          value: "week",
          label: "周",
        },
        {
          value: "hour",
          label: "时",
        },
        {
          value: "minute",
          label: "分",
        },
      ],
      unitOfTime: this._props.defaultUnitOfTime,
      deferList: {},
      TimeRangeList: [],
      pageSize: 10,
      current: 1,
      taskHint: false, // 显示鼠标悬浮table时候task高亮
      clickTaskHint: false, // 点击之后
      taskHint_Top: 0, // 计算哪一行task高亮
      headerTableIdx: null,
      clickTaskHint_Top: 0,
      clickState: false, // 鼠标是否点击table的状态，如果点击了 鼠标移开的时候 不隐藏task高亮。 只有当鼠标悬浮到别的item上面才会重置状态
      // scrollOffsetLeft: 0,
      _columns: []
    };
  },
  created() {
    setBubbleSort(); // 挂载排序方法
    // 设置task圆角
    let radius =
      this.taskRadius !== null
        ? this.taskRadius
        : this.taskHeight / 2;
    // 获取表头宽度
    this._columns = this.columns.map(item => {
      return {
        ...item,
        width: item.width || 100,
      }
    })
    if(this.columns.length) {
      this.tableHeaderWidth = this._columns
        .map((item) => item.width)
        .reduce((a, b) => {
          return a + b;
        });
    }


    const options = {
      setTaskBackground: this.setTaskBackground,
      taskColor: this.taskColor,
      isTaskHover: this.isTaskHover,
      isTaskRightClick: this.isTaskRightClick,
      isTaskLeftClick: this.isTaskLeftClick,
      tableItemHeight: this.tableItemHeight,
      taskHeight: this.taskHeight,
      tableItemPadding: this.tableItemPadding,
      unitOfTime: this.unitOfTime,
      taskRadius: radius,
      tableHeaderWidth: this.tableHeaderWidth,
      popoverShow: !!(this.popoverInnerHtml || this.floatingWindow),
      popoverInnerHtml: this.popoverInnerHtml,
      Component: this.floatingWindow,
      MenuComponents: this.MenuComponents,
      MenuItems: this.MenuItems,
      taskInnerHtml: this.taskInnerHtml,
    };
    this.gantt = new CreateGantt(options);
    this.gantt.setDialogVisible = this.setDialogVisible;
  },
  mounted() {
    this.setTaskBackground();
  },
  methods: {
    timeFormat,
    imgUrlPlugin,
    confirm(taskDetail) {
      this.$emit("taskDialogConfrim", taskDetail);
      // 确认
    },
    // 设置周末底色
    setWeekendColor(i) {
      if(this.unitOfTime !== 'week')  return ''
      if (this.TimeRangeList.dayDetails[i].week === 6 || this.TimeRangeList.dayDetails[i].week === 7) {
        return '#ffd3a5'
      } else {
        return ''
      }
    },
    // 设置task弹窗
    setDialogVisible(data) {
      if(!this.isTaskClick) return
      this.taskDetail = data;
      // 设置表单弹窗
      this.dialogTitle = data[this.taskDialogTitle] + '' || "提示";
      this.$emit("taskClick", data);
      this.dialogVisible = true;
    },
    // 设置时间表头
    setTableDateList() {
      if (this.unitOfTime === "week") {
        this.cWidth = this.TimeRangeList.dayArr.length * 120;
        this.TableDateTopList = this.TimeRangeList.weekDetails;
        this.TableDateBottomList = this.TimeRangeList.dayArr;
      } else if (this.unitOfTime === "hour") {
        this.cWidth = this.TimeRangeList.hourArr.length * 72;
        this.TableDateTopList = this.TimeRangeList.dayDetails;
        this.TableDateBottomList = this.TimeRangeList.hourArr;
      } else if (this.unitOfTime === "minute") {
        this.cWidth = this.TimeRangeList.minuteArr.length * 48;
        this.TableDateTopList = this.TimeRangeList.hourDetails;
        this.TableDateBottomList = this.TimeRangeList.minuteArr;
      }
    },
    // 切换时间单位
    setGanttZoom(val) {
      this.unitOfTime = val;
      this.gantt.setCellWidth(val); // 先计算cell多长

      let canvasParent = document.getElementById("canvas_parent");
      this.gantt.removeTask(canvasParent);
      this.gantt.createTask(canvasParent);

      // 设置滚动条滚动到当前单位task列表最前面task的位置
      let timeObj = this.getMaxAndMinTime(this.result.Items, true);
      if(!timeObj.firstNode || !timeObj.lastNode) return
      let left = timeObj.firstNode.offsetLeft;
      this.TimeRangeList = getTimeRangeList(
        timeObj.MinimumTime,
        timeObj.MaximumTime
      );
      this.setTableDateList(); // 再计算datetable长度
      this.setScrollToLeft(left);
    },
    // 鼠标悬浮事件（显示task提示高亮）
    hoverHeaderTable(item, idx) {
      // this.clickState = false;
      this.taskHint_Top = this.tableItemHeight * idx - this.tableItemPadding;
      this.taskHint = true;
    },
    // 鼠标离开事件
    leaveHeaderTable() {
      this.taskHint = false;
    },
    // 鼠标点击事件
    clickHeaderTable(item, idx) {
      this.headerTableIdx = idx;
      this.clickTaskHint_Top = this.tableItemHeight * idx - this.tableItemPadding;
      this.clickTaskHint = true; // task提示高亮显示
      console.log(item.Id)
      let firstTask = document.getElementById(`custom-task-${item.Id}-0`);

      // this.scrollOffsetLeft = firstTask.offsetLeft;
      this.setScrollToLeft(firstTask.offsetLeft);
      // this.clickState = true;
    },
    // 设置滚动条滚动到当前行第一个task
    setScrollToLeft(offsetLeft) {
      const ganttContainer = document.querySelector(".ganttContainer");
      let top = ganttContainer.scrollTop;
      ganttContainer.scrollTo(offsetLeft - 10, top);
      // const left = ganttContainer.scrollLeft
      // console.log('left::: ', left);
      // if (left < this.scrollOffsetLeft - 10) {
      //     window.requestAnimationFrame(this.setScrollToLeft)
      //     ganttContainer.scrollTo(left + 100, top)
      // }
    },
    // 根据后端返回的数据列表取出时间范围
    getMaxAndMinTime(data, isNode) {
      let startlist = [];
      let endlist = [];
      let TimeResult = {
        MaximumTime: "",
        MinimumTime: "",
        firstNode: null,
        lastNode: null,
      };
      function formatt(time) {
        return new Date(timeFormat(time, "yyyy-MM-dd hh:mm:ss")).getTime();
      }
      if(!data.length) {
        return {
          MaximumTime: "2023-01-01 00:00:00",
          MinimumTime: "2023-01-01 00:00:01",
          firstNode: null,
          lastNode: null,
        }
      }
      data.forEach((item) => {
        item.Data.forEach((jtem) => {
          startlist.push(formatt(jtem.PlanStart));
          endlist.push(formatt(jtem.PlanEnd));
        });
      });
      // 从小到大排序
      startlist.bubbleSort();
      // 从大到小排序
      endlist.bubbleSort(true);

      data.forEach((item) => {
        item.Data.forEach((jtem, j) => {
          if (formatt(jtem.PlanStart) === startlist[0]) {
            if (isNode) {
              TimeResult.firstNode = document.getElementById(
                `custom-task-${item.Id}-${j}`
              );
            }
            TimeResult.MinimumTime = timeFormat(
              jtem.PlanStart,
              "yyyy-MM-dd hh:mm:ss"
            );
          }
          if (formatt(jtem.PlanEnd) === endlist[0]) {
            if (isNode) {
              TimeResult.lastNode = document.getElementById(
                `custom-task-${item.Id}-${j}`
              );
            }
            TimeResult.MaximumTime = timeFormat(
              jtem.PlanEnd,
              "yyyy-MM-dd hh:mm:ss"
            );
          }
        });
      });
      // 判断是否小于14天，如果小于14天 就增加到14天
      if (this.unitOfTime === "week") {
        let rangeDay =
          (new Date(TimeResult.MaximumTime).getTime() -
            new Date(TimeResult.MinimumTime).getTime()) /
          1000 /
          60 /
          60 /
          24;
        if (Math.round(rangeDay) < 14) {
          let day = (14 - Math.round(rangeDay)) * 86400000;
          let res = new Date(TimeResult.MaximumTime).getTime() + day;
          TimeResult.MaximumTime = timeFormat(res, "yyyy-MM-dd hh:mm:ss");
        }
        // let minTime = new Date(TimeResult.MinimumTime).getTime() - 86400000;
        // TimeResult.MinimumTime = timeFormat(minTime, "yyyy-MM-dd hh:mm:ss")
      }
      return TimeResult;
    },
  },
  watch: {
    // 监听接口返回成功
    result(val) {
      this.clickTaskHint = false;
      this.headerTableIdx = null;
      let MaximumTime = this.getMaxAndMinTime(val.Items).MaximumTime;
      let MinimumTime = this.getMaxAndMinTime(val.Items).MinimumTime;
      this.gantt.MinimumTime = MinimumTime;
      // this.gantt.MaximumTime = timeFormat(MaximumTime, 'yyyy-MM-dd hh:mm:ss'); // 赋值 最前面的时间 （起）
      // this.gantt.MinimumTime = timeFormat(MinimumTime, 'yyyy-MM-dd hh:mm:ss'); // 赋值 最后面的时间 （止）

      // this.gantt.getCalendarData(); // 获取日历数据

      this.TimeRangeList = getTimeRangeList(MinimumTime, MaximumTime);

      this.setTableDateList(); // 赋值日期列表和每一格的长度 用来渲染

      // 赋值表头列表
      this.list = val.Items.map((item) => {
        return {
          ...item,
          Data: item.Data.map((jtem) => {
            return {
              ...jtem,
              _PlanStart: timeFormat(jtem.PlanStart, "yyyy-MM-dd hh:mm:ss"),
              _PlanEnd: timeFormat(jtem.PlanEnd, "yyyy-MM-dd hh:mm:ss"),
            };
          }),
        };
      });
      // console.log(this.list);
      this.gantt.tasks = this.list; // 赋值task列表
      this.$nextTick(() => {
        // let canvasParent = document.getElementById('canvas_parent')
        this.setGanttZoom(this.unitOfTime);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "./custom-gantt.css";

//.c-page-wrapper {
//  overflow: hidden;
//}

.custom-border-box {
  position: absolute;
  width: 10px;
  box-shadow: 4px 0px 4px 0px #e0e0e0;
  opacity: 0.5;
  z-index: 8;
}
.custom-border-box-left {
  width: 1px;
  background: #ccc;
  position: absolute;
  z-index: 9;
}
.custom-border-box-right {
  width: 1px;
  background: #ccc;
  position: absolute;
  z-index: 9;
}
.ganttContainer::-webkit-scrollbar {
  height: 14px;
}

.ganttContainer {
  width: 100%;
  background-color: #fff;
  //border-radius: 4px;
  overflow-y: auto;
  position: relative;
  font-size: 14px;
  transition: 0.1s;

  .header-table {
    position: sticky;
    left: 0;
    // border-right: 1px solid #ddd;
    z-index: 4;
    // box-shadow: 2px 6px 6px 1px #e0e0e0;
    background-color: #fff;

    &-item:hover {
      background-color: rgba(42, 155, 241, 0.2);
    }

    &-item {
      display: flex;
      justify-content: center;
      align-items: center;
      // box-sizing: border-box;
      padding-left: 20px;
      padding-right: 20px;

      &-box {
        width: 100%;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 2px 5px 8px 0px #ececec;
        text-align: center;
        cursor: pointer;
        display: flex;
        transition: 0.3s;

        div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .header-table-item-box:hover {
    transform: scale(1.02);
  }

  .header-table-top {
    // border-right: 1px solid #ddd;
    // box-shadow: 4px 0px 6px 1px #e0e0e0;
    background-color: #fff;
    position: sticky;
    left: 0;
    top: 0;
    height: 50px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    display: flex;
    z-index: 8;
    padding-right: 20px;
    padding-left: 20px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
    }
  }

  .date-header {
    position: sticky;
    top: 0px;
    z-index: 4;
    display: flex;
    flex-direction: column;
    border-top: 1px solid #ccc;
    background-color: #fff;

    &-item {
      border-bottom: 1px solid #ccc;
      display: flex;
    }

    .date-header-cell {
      border-right: 1px solid #ccc;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  #canvas_parent {
    position: absolute;
  }
}

.custom-pagination {
  height: 40px;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-box {
  }
}
.detail-style {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
::v-deep .el-image {
  .image-slot {
    min-width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #e7e7e7;
    color: #a1a1a1;
  }
}
.loading-ganttContainer{
  width: 100%;
  height: 100%;
  position: sticky;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
