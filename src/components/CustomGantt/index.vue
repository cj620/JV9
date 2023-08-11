<template>
  <div
    :style="{ padding: padding + 'px', paddingBottom: 0 }"
    style="width: 100%; position: relative; background: #fff"
  >
    <!-- <div style="
		margin-bottom: 10px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding: 6px 10px;
        height: 48px;
		border-radius: 4px;
		align-items: center;">
            <div style="display: flex; align-items: center;">
                <span style="font-size: 14px;">单位：</span>
                <el-select style="width: 66px;" @change="setGanttZoom" v-model="unitOfTime" placeholder="请选择单位">
                    <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <slot name="gatHeaderLeft"></slot>
            </div>
            <div style="display: flex; align-items: center;">
                <slot name="gntHeaderRight"></slot>
            </div>
        </div> -->
    <!-- 边框线 -->
    <div
      class="custom-border-box"
      :style="{
        left:
          tableHeaderWidth +
          30 +
          (detailShow ? detailIconWidth : 0) +
          padding +
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
        right: padding + 'px',
      }"
    ></div>
    <!-- 最外层的盒子 -->
    <div
      class="ganttContainer"
      :style="{
        height: ganttContainerHeight - padding + 'px',
      }"
      v-loading="loading"
    >
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
          <!-- <div v-for="index in Object.keys(deferList).length" style="display:flex" v-if="defer(index)">
                        <div class="date-header-cell"
                        v-for="(item, i) in TableDateBottomList.slice(deferList[index], deferList[index+1])" :key="i"
                            :style="{width: gantt.cellWidth+'px'}"
                            >
                            {{ item < 10 ? '0'+item : item }}
                        </div>
                    </div> -->

          <div
            class="date-header-cell"
            v-for="(item, i) in TableDateBottomList"
            :key="i"
            :style="{ width: gantt.cellWidth + 'px' }"
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
          v-for="(item, i) in columns"
          :key="item.name"
          :style="{ width: item.width + 'px' }"
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
          :key="item.Id"
          class="header-table-item"
          :style="{ width: '100%', height: tasksHeight + 'px' }"
          @mouseenter="hoverHeaderTable(item, i)"
          @mouseleave="leaveHeaderTable"
          @click="clickHeaderTable(item, i)"
        >
          <div
            class="header-table-item-box"
            :style="{ height: tasksHeight - tasksPadding * 2 + 'px' }"
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
            <div
              v-for="(jtem, j) in columns"
              :key="jtem.name"
              :style="{
                width: jtem.width + 'px',
                height: tasksHeight - tasksPadding * 2 + 'px',
              }"
            >
              <span v-if="jtem.name === 'PhotoUrl'">
                <el-image
                  :style="{ height: tasksHeight - tasksPadding * 2 - 4 + 'px' }"
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
              <span class="beyond-hiding" v-else>{{ item[jtem.name] }}</span>
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
          top: tableHeaderHeight + tasksPadding + 'px',
        }"
      >
        <!-- <canvas></canvas> -->
        <div
          v-show="taskHint"
          class="task-hint"
          :style="{ height: tasksHeight + 'px', top: taskHint_Top + 'px' }"
        ></div>
      </div>
    </div>

    <!-- 点击task的表单弹窗 -->
    <JvDialog
      @confirm="confirm"
      :title="dialogTitle"
      width="35%"
      :visible.sync="dialogVisible"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </JvDialog>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { timeFormat } from "@/jv_doc/utils/time";
import { getTimeRangeList } from "@/jv_doc/utils/time/getTimeRangeList";
import { CreateGantt } from "./createGantt";
import { Form } from "@/jv_doc/class/form";
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
      default: [],
    },
    // 表格头部的高度
    tableHeaderHeight: {
      type: Number,
      default: 50,
    },
    // 任务条高度
    tasksHeight: {
      type: Number,
      default: 54,
    },
    // 任务条padding值
    tasksPadding: {
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
      default: 800,
    },
    // 是否显示表格每一项的详情展示图标
    detailShow: {
      type: Boolean,
      default: false,
    },
    // 详情popover的配置
    popoverOptions: {
      type: Object,
      default: {
        placement: "right", // 显示的方位
        width: 200, // 宽度
        trigger: "click", // 触发方式
      },
    },
    // 甘特图盒子的padding值
    padding: {
      type: Number,
      default: 0,
    },
    floatingWindow: {
      type: Object,
      default: {},
    },
    formSchema: {
      type: Array,
      default() {
        return [
          {
            prop: "PlanStart",
            cpn: "SingleDateTime",
            label: i18n.t("Generality.Ge_PlanStart"),
            rules: [
              {
                required: true,
                message: i18n.t("Generality.Ge_PleaseEnter"),
                trigger: ["change", "blur"],
              },
            ],
          },
          {
            prop: "PlanEnd",
            cpn: "SingleDateTime",
            label: i18n.t("Generality.Ge_PlanEnd"),
            rules: [
              {
                required: true,
                message: i18n.t("Generality.Ge_PleaseEnter"),
                trigger: ["change", "blur"],
              },
            ],
          },
        ];
      },
    },
  },
  data() {
    return {
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
      taskHint_Top: 0, // 计算哪一行task高亮
      clickState: false, // 鼠标是否点击table的状态，如果点击了 鼠标移开的时候 不隐藏task高亮。 只有当鼠标悬浮到别的item上面才会重置状态
      // scrollOffsetLeft: 0,
    };
  },
  created() {
    setBubbleSort(); // 挂载排序方法
    this.formObj = new Form({
      formSchema: this.formSchema,
      baseColProps: {
        span: 24,
      },
      // gutter: 30,
      labelWidth: "80px",
    });

    // 设置task圆角
    let radius =
      this.taskRadius !== null
        ? this.taskRadius
        : (this.tasksHeight - this.tasksPadding) / 2;
    // 获取表头宽度
    this.tableHeaderWidth = this.columns
      .map((item) => item.width)
      .reduce((a, b) => {
        return a + b;
      });

    // `
    //                       <div>${i18n.t("Generality.Ge_ProcessName")}：${
    //   jtem.Process
    // }</div>
    //                       <div>${i18n.t("Generality.Ge_PlanTime")}：${
    //   jtem.PlanTime
    // }H</div>
    //         <div>${i18n.t("production.Pr_PlanningDevices")}：${
    //   jtem.PlanDevice
    // }</div>
    //         <div>${i18n.t("Generality.Ge_PlanStart")}：${jtem._PlanStart}</div>
    //         <div>${i18n.t("Generality.Ge_PlanEnd")}：${jtem._PlanEnd}</div>
    //         `

    const options = {
      tasksHeight: this.tasksHeight,
      tasksPadding: this.tasksPadding,
      unitOfTime: this.unitOfTime,
      taskRadius: radius,
      tableHeaderWidth: this.tableHeaderWidth,
      // popoverInnerHtml: `你好`,
      Component: this.floatingWindow,
    };
    this.gantt = new CreateGantt(options);
    this.gantt.setDialogVisible = this.setDialogVisible;
  },
  mounted() {},
  methods: {
    timeFormat,
    imgUrlPlugin,
    confirm() {
      // 确认
      console.log(":点击了确认:: ");
    },
    setDialogVisible(data) {
      // 设置表单弹窗
      this.dialogTitle = data.Process;
      Object.keys(this.formObj.form).forEach((item) => {
        this.formObj.form[item] = data[item];
      });
      this.dialogVisible = true;
    },

    // runDisplayPriority(index) {
    //   const step = () => {
    //     requestAnimationFrame(() => {
    //       this.displayPriority++;
    //       if (this.displayPriority < Object.keys(this.deferList).length) {
    //         step();
    //       }
    //     });
    //   };
    //   step();
    // },
    //
    // defer(index) {
    //   return this.displayPriority > index;
    // },
    setTableDateList() {
      if (this.unitOfTime === "week") {
        this.cWidth = this.TimeRangeList.dayArr.length * 72;
        this.TableDateTopList = this.TimeRangeList.weekDetails;
        this.TableDateBottomList = this.TimeRangeList.dayArr;
      } else if (this.unitOfTime === "hour") {
        this.cWidth = this.TimeRangeList.hourArr.length * 48;
        this.TableDateTopList = this.TimeRangeList.dayDetails;
        this.TableDateBottomList = this.TimeRangeList.hourArr;
      } else if (this.unitOfTime === "minute") {
        this.cWidth = this.TimeRangeList.minuteArr.length * 48;
        this.TableDateTopList = this.TimeRangeList.hourDetails;
        this.TableDateBottomList = this.TimeRangeList.minuteArr;
      }

      // this.displayPriority = 0;
      // this.runDisplayPriority(); 白屏优化
    },
    // 切换时间单位
    setGanttZoom(val) {
      this.unitOfTime = val;
      this.gantt.setCellWidth(val); // 先计算cell多长
      this.setTableDateList(); // 再计算datetable长度
      let canvasParent = document.getElementById("canvas_parent");
      this.gantt.removeTask(canvasParent);
      this.gantt.createTask(canvasParent);

      // 设置滚动条滚动到当前单位task列表最前面task的位置
      let left = this.getMaxAndMinTime(this.result.Items, true).firstNode
        .offsetLeft;
      this.setScrollToLeft(left);
    },
    hoverHeaderTable(item, idx) {
      // 鼠标悬浮事件（显示task提示高亮）
      this.clickState = false;
      this.taskHint_Top = this.tasksHeight * idx - this.tasksPadding;
      this.taskHint = true;
    },
    leaveHeaderTable() {
      // 鼠标离开事件
      if (!this.clickState) this.taskHint = false;
    },
    clickHeaderTable(item, idx) {
      // 鼠标点击事件
      let firstTask = document.getElementById(`custom-task-${item.Id}-0`);
      // this.scrollOffsetLeft = firstTask.offsetLeft;
      this.setScrollToLeft(firstTask.offsetLeft);
      this.clickState = true;
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
      return TimeResult;
    },
  },
  watch: {
    // 监听接口返回成功
    result(val) {
      let MaximumTime = this.getMaxAndMinTime(val.Items).MaximumTime;
      let MinimumTime = this.getMaxAndMinTime(val.Items).MinimumTime;

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
      console.log(this.list);
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

.c-page-wrapper {
  overflow: hidden;
}

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
  justify-content: end;
  align-items: center;
}
</style>
