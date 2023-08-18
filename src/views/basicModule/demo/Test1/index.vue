<template>
  <PageWrapper :footer="false">
    <!--    顶部操作行-->
    <div class="header-handle">
      <!--      左-->
      <div
        style="display: flex; height: 100%; align-items: center; width: auto"
      >
        <el-input
          size="mini"
          style="width: 160px"
          v-model="searchValue"
          @change="searchValueChange"
        ></el-input>
        <div class="padding-box"></div>
        <el-button type="primary" size="mini">搜索</el-button>
        <div class="padding-box"></div>
        <el-select v-model="ganttChangeShow" size="mini" style="width: 100px">
          <el-option
            v-for="item in ganttChangeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="padding-box"></div>
        <div
          class="state-list"
          v-for="(item, i) in stateList"
          :key="item.value"
        >
          <input
            type="color"
            class="custom-color"
            v-model="item.color"
            disabled
            @mouseenter="hoverStateValue = item.value"
            @mouseleave="hoverStateValue = ''"
          />
          <span>{{ item.label }}</span>
        </div>
      </div>
      <!--      右-->
      <div>
        <el-dropdown @command="setGanttZoom" v-show="ganttChangeShow">
          <el-button type="text">
            <i class="el-icon-setting" style="font-size: 26px; color: #555"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in unitOptions"
              :key="item.value"
              :command="item.value"
              >{{ item.label }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="chart-box" v-show="!ganttChangeShow">
      <div class="mould-box">
        <div class="mould-box-item" v-for="(item, i) in list" :key="i">
          <el-image
            :src="imgUrlPlugin(item.ToolingInfo.PhotoUrl)"
            :preview-src-list="[imgUrlPlugin(item.ToolingInfo.PhotoUrl)]"
          ></el-image>
          <div
            class="info-box"
            :style="{width: chartBoxWidth + 'px'}"
          >
            <div class="info-box-item">
              <div></div>
              <div>
                {{ $t("Generality.Ge_ToolingNo") }}:
                {{ item.ToolingInfo.ToolingNo }}12312312312312312312312321312
              </div>
              <div>
                {{ $t("Generality.Ge_ToolingName") }}:
                {{ item.ToolingInfo.ToolingName }}
              </div>
              <div></div>
            </div>
            <div class="info-box-item">
              <div></div>
              <div>
                {{ $t("production.Pr_DeliveryDate") }}:
                {{
                  timeFormat(
                    item.ToolingInfo.DeliveryDate,
                    "yyyy-MM-dd hh:mm:ss"
                  )
                }}
              </div>
              <div>
                {{ $t("production.Pr_ProofDate") }}:
                {{
                  timeFormat(item.ToolingInfo.ProofDate, "yyyy-MM-dd hh:mm:ss")
                }}
              </div>
              <div></div>
            </div>
            <div class="info-box-item">
              <div></div>
              <div>
                {{ $t("menu.Sa_Customer") }}: {{ item.ToolingInfo.Customer }}
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="details-box">
        <div class="details-box-item" v-for="(item, i) in list" :key="i">
          <div
            :class="[children.State === hoverStateValue ? children.State : '']"
            class="details-box-children"
            v-for="(children, c) in item.WorkerList"
          >
            <div
              class="details-box-children-title"
              :style="{ background: setBgColor(children) }"
            >
              {{ children.TaskName }}
            </div>
            <div class="details-box-children-content">
              <div>
                {{ $t("project.Pro_Worker") }}: {{ children.WorkerName }}
              </div>
              <div>
                {{ $t("Generality.Ge_PlanStart") }}:
                {{ timeFormat(children.PlanStart, "yyyy-MM-dd hh:mm:ss") }}
              </div>
              <div>
                {{ $t("Generality.Ge_PlanEnd") }}:
                {{ timeFormat(children.PlanEnd, "yyyy-MM-dd hh:mm:ss") }}
              </div>
              <div>
                {{ $t("Generality.Ge_ActualEnd") }}:
                {{ timeFormat(children.ActualEnd, "yyyy-MM-dd hh:mm:ss") }}
              </div>
              <div style="padding: 0">
                <el-progress
                  :percentage="children.Progress"
                  :format="() => ''"
                ></el-progress>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="project-container" v-show="ganttChangeShow">
      <gantt
        ref="ganttchart"
        class="left-container"
        :tasks="tasks"
        :formSchema="formSchema"
        :api="partProcessingPlan"
        :foldoRunfoldFlag="1"
        dragProgress
        tooltip
      >
      </gantt>
    </div>
  </PageWrapper>
</template>

<script>
import gantt from "@/components/JVInternal/Gantt";
import { formSchema } from "./formConfig";
import { Data } from "./data";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { timeFormat } from "@/jv_doc/utils/time";
import { partProcessingPlan } from "@/api/workApi/production/dataReport";
export default {
  name: "index",
  data() {
    return {
      tasks: {
        data: [],
        links: [],
      },
      searchValue: "",
      unitOptions: [],
      ganttChangeOptions: [
        { label: "甘特图", value: true },
        { label: "图表", value: false },
      ],
      ganttChangeShow: false,
      formSchema: formSchema,
      partProcessingPlan: partProcessingPlan,
      stateList: [
        {
          color: "#efefef",
          label: i18n.t("project.Pro_NotStarted"),
          value: "NotStarted",
        },
        {
          color: "#f6c268",
          label: i18n.t("Generality.Ge_Processing"),
          value: "Processing",
        },
        {
          color: "#a7f241",
          label: i18n.t("Generality.Ge_Completed"),
          value: "Completed",
        },
        {
          color: "#f11635",
          label: i18n.t("Generality.Ge_Deferred"),
          value: "Deferred",
        },
      ],
      hoverStateValue: "",
      list: Data,
      chartBoxWidth: 0,
    };
  },
  components: {
    gantt,
  },
  async created() {
    this.GetData();
  },
  mounted() {
    this.unitOptions = this.$refs.ganttchart.unitOptions;
    const chartBox = document.querySelector(".chart-box");
    this.chartBoxWidth = chartBox.clientWidth;
  },
  methods: {
    imgUrlPlugin,
    timeFormat,
    setBgColor(item) {
      const res = this.stateList.filter((children) => {
        return children.value === item.State;
      });
      return res[0].color;
    },
    setGanttZoom(unit) {
      this.$refs.ganttchart.setGanttZoom(unit);
    },
    searchValueChange(value) {
      console.log(value);
    },
    GetData() {
      partProcessingPlan({}).then((res) => {
        let arr = [];
        res.forEach((item) => {
          arr.push({
            id: item.Id, // 父节点id
            open: item.IsOpen, // 是否展开
            text: item.Title, // 父节点名字
            start_date: timeFormat(item.StartDate, "yyyy-MM-dd hh:mm:ss"), // 必须要字段 task 开始时间
            cap_plan_end: timeFormat(item.EndDate, "yyyy-MM-dd hh:mm:ss"),
            end_date: item.EndDate
              ? timeFormat(item.EndDate, "yyyy-MM-dd hh:mm:ss")
              : "",
            parent: item.ParentId,
            color: item.Color,
            duration: item.Duration,
            progress: item.ProcessRate,
            EmployeeName: item.EmployeeName,
            // fatherId: item.fatherId
            // row_height: 50,
            // bar_height: 40
          });
        });
        this.tasks.data = [...arr];
        this.tasks.links = [
          // { id:1, source:2, target:2, type:1},
          { id: 1, source: 1, target: 2, type: 1, info: "这是第一条link" },
          { id: 2, source: 2, target: 3, type: 1, info: "这是第二条link" },
          { id: 3, source: 3, target: 4, type: 1, info: "这是第三条link" },
        ];
        if (this.$refs.ganttchart) {
          this.$refs.ganttchart.GetData();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-handle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  height: 40px;
  padding: 0 10px;
  align-items: center;
  font-size: 12px;
}
.state-list {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 20px;
  span {
    line-height: 0;
  }
}
.padding-box {
  width: 12px;
}
.custom-color {
  border: none;
  background: #fff;
  padding: 0;
  height: 20px;
  margin-right: 10px;
}
::-webkit-color-swatch-wrapper {
  padding: 0;
}
::-webkit-color-swatch {
  border: 1px solid #eee;
  border-radius: 2px;
}
.chart-box {
  font-size: 12px;
  width: 100%;
  height: calc(100% - 40px);
  overflow: auto;
  position: relative;
  .mould-box {
    position: sticky;
    left: 0;
    width: 200px;
    z-index: 1;
    background: #fff;
    box-shadow: 0 0 6px 2px #eee;
    &-item {
      height: 160px;
      display: flex;
      align-items: center;
      margin-bottom: 70px;
      position: relative;
      box-sizing: border-box;
      padding: 10px 10px;
      .el-image {
        width: 100%;
        height: 100%;
      }
    }
  }
  .details-box {
    background: #fff;
    left: 200px;
    position: absolute;
    top: 0;
    &-item {
      height: 160px;
      margin-bottom: 70px;
      display: flex;
      align-items: center;
    }
    &-children {
      width: 200px;
      height: 160px;
      margin-left: 20px;
      box-sizing: border-box;
      //box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.15);
      box-shadow: 0 0 6px 2px #eee;
      border: 1px solid rgba(0, 0, 0, 0);
      &-title {
        text-align: center;
        line-height: 30px;
        height: 30px;
        border-bottom: 1px solid #eee;
      }
      &-content {
        width: 100%;
        box-sizing: border-box;
        padding: 2px 10px;
        div {
          padding: 6px 0;
          width: 100%;
        }
        .el-progress {
          width: 120%;
        }
      }
    }
  }
  .info-box {
    height: 60px;
    width: 1000px;
    background: #eee;
    position: absolute;
    z-index: 2;
    bottom: -65px;
    display: flex;
    padding-left: 10px;
    left: 0;
    .info-box-item {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-right: 30px;
      width: 220px;
      div {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
      }
    }
  }
}
.NotStarted {
  border: 1px solid #efefef !important;
}
.Processing {
  border: 1px solid #f6c268 !important;
}
.Completed {
  border: 1px solid #a7f241 !important;
}
.Deferred {
  border: 1px solid #f11635 !important;
}
</style>
