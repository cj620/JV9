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
          :disabled="ganttChangeShow"
          :placeholder="$t('Generality.Ge_ToolingNo')"
          clearable
          @change="searchValueChange"
        ></el-input>
        <div class="padding-box"></div>
        <el-button type="primary" size="mini">{{$t("Generality.Ge_Search")}}</el-button>
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
        <div  v-for="(item, i) in list" :key="i">
          <div style="height: 70px"></div>
          <div class="mould-box-item">
            <el-image
              :src="imgUrlPlugin(item.ToolingInfo.PhotoUrl)"
              :preview-src-list="[imgUrlPlugin(item.ToolingInfo.PhotoUrl)]"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div
              class="info-box"
              :style="{width: chartBoxWidth + 'px'}"
            >
              <div class="info-box-item">
                <div></div>
                <div>
                  {{ $t("Generality.Ge_ToolingNo") }}:
                  {{ item.ToolingInfo.ToolingNo }}
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
                      "yyyy-MM-dd"
                    )
                  }}
                </div>
                <div>
                  {{ $t("production.Pr_ProofDate") }}:
                  {{
                    timeFormat(item.ToolingInfo.SampleDate, "yyyy-MM-dd")
                  }}
                </div>
                <div></div>
              </div>
              <div class="info-box-item">
                <div></div>
                <div>
                  {{ $t("menu.Sa_Customer") }}: {{ item.ToolingInfo.CustomerName || '--' }}
                </div>
                <div></div>
              </div>
              <div class="go-details">
                <el-button size="mini" @click="goDetails(item.ToolingInfo.ToolingNo)">{{$t("project.Pr_PartSchedule")}}</el-button>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="details-box">
        <div  v-for="(item, i) in list" :key="i">
          <div style="height: 70px"></div>
          <div class="details-box-item" >
            <div
              :class="[children.State === hoverStateValue ? children.State : '']"
              class="details-box-children"
              v-for="(children, c) in item.WorkerList"
              @click="setProjectTaskLogs(children)"
            >
              <div>
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
                    {{ timeFormat(children.PlanStart, "yyyy-MM-dd") }}
                  </div>
                  <div>
                    {{ $t("Generality.Ge_PlanEnd") }}:
                    {{ timeFormat(children.PlanEnd, "yyyy-MM-dd") }}
                  </div>
                  <div>
                    {{ $t("Generality.Ge_ActualEnd") }}:
                    {{ timeFormat(children.ActualEnd, "yyyy-MM-dd") }}
                  </div>
                  <div style="padding: 0">
                    <el-progress
                      :style="{width: setProgress(children.Progress)}"
                      :percentage="children.Progress"
                    ></el-progress>
                  </div>
                </div>
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
        :_arguments="_arguments"
        :api="partProcessingPlan"
        :getData="GetData"
        :foldoRunfoldFlag="1"
        dragProgress
        tooltip
      >
      </gantt>
    </div>
    <JvDialog
      :visible.sync="showProjectTaskLogs"
      :title="ProjectTaskLogs.TaskName"
      @confrim="showProjectTaskLogs = !showProjectTaskLogs"
    >
      <div style="height: 60vh;min-height: 30vh">
        <popover-table :item="ProjectTaskLogs"></popover-table>
      </div>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import gantt from "@/components/JVInternal/Gantt";
import { formSchema } from "./formConfig";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { timeFormat } from "@/jv_doc/utils/time";
import {project_gantt_progress, worker_progress} from '@/api/workApi/project/projectInfo';
import i18n from "@/i18n/i18n";
import PopoverTable from "@/views/workModule/project/projectManage/process_people/components/popover-table.vue";
export default {
  // name: "ProjectManage_process_people",
  data() {
    return {
      _arguments: null,
      tasks: {
        data: [],
        links: [],
      },
      searchValue: "",
      unitOptions: [],
      ganttChangeOptions: [
        { label: i18n.t("Generality.Ge_Chart"), value: false },
        { label: i18n.t("Generality.Ge_Gantt"), value: true },
      ],
      ganttChangeShow: false,
      formSchema: formSchema,
      partProcessingPlan: project_gantt_progress,
      stateList: [
        {
          color: "#efefef",
          label: i18n.t("project.Pro_NotStarted"),
          value: "NotStarted",
        },
        // {
        //   color: "#f6c268",
        //   label: i18n.t("Generality.Ge_Processing"),
        //   value: "Processing",
        // },
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
        {
          label: i18n.t("project.Pro_Ongoing"),
          value: "HaveInHand",
          color: "#E6A23C",
        }
      ],
      hoverStateValue: "",
      list: [],
      chartBoxWidth: 0,
      ProjectTaskLogs: [],
      showProjectTaskLogs: false,
    };
  },
  components: {
    PopoverTable,
    gantt,
  },
  beforeRouteLeave(to, from, next) {
    window.onresize = null;
    next();
  },
  async created() {
    this._arguments = {Project: this.$route.query.Project};
    this.$route.query.ToolingNo ? this.searchValue = this.$route.query.ToolingNo : '';
    this.getWorkerProgress();
  },
  mounted() {
    // this.GetData();

    this.unitOptions = this.$refs.ganttchart.unitOptions;
    this.getChartBoxWidth();
    window.onresize = () => {
      this.debounce(this.getChartBoxWidth,100)
    }
  },
  activated(){
    this.getChartBoxWidth();
    window.onresize = () => {
      this.debounce(this.getChartBoxWidth,100)
    }
  },
  methods: {
    imgUrlPlugin,
    timeFormat,
    setProjectTaskLogs(item) {
      this.showProjectTaskLogs = !this.showProjectTaskLogs;
      this.ProjectTaskLogs = item;
    },
    goDetails(ToolingNo) {
      this.$router.push({
        path: "Pm_Project_PartSchedule",
        query: {
          ToolingNo: ToolingNo
        }
      })
    },
    getWorkerProgress() {
      let Project = this.$route.query.Project;
      worker_progress({"Project":Project,"ToolingNo":this.searchValue}).then(res => {
        console.log(res)
        this.list = res;
      });
    },
    getChartBoxWidth() {
      const chartBox = document.querySelector(".chart-box");
      this.chartBoxWidth = chartBox.clientWidth;
    },
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
      this.getWorkerProgress();
    },
    // 防抖函数
    debounce(func, wait) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(func, wait);
    },
    GetData(res) {
      let result = [];
      if(Array.isArray(res) && res.length > 0)  res.forEach((item) => {
        result.push({
          id: item.Id, // 父节点id
          open: item.IsOpen, // 是否展开
          text: item.Title, // 父节点名字
          start_date: item.StartDate ? timeFormat(item.StartDate, "yyyy-MM-dd hh:mm:ss") : '1970-01-01 00:00:00', // 必须要字段 task 开始时间
          cap_plan_end: item.StartDate ? timeFormat(item.EndDate, "yyyy-MM-dd hh:mm:ss") : '1970-01-01 00:00:00',
          end_date: item.EndDate ? timeFormat(item.EndDate, "yyyy-MM-dd hh:mm:ss") : '1970-01-01 00:00:00',
          parent: item.ParentId,
          color: item.Color,
          duration: item.Duration,
          progress: item.ProcessRate,
        });
      });
      return result;
    },
    setProgress(num) {
      const _enum = {
        1: '116%',
        2: '111%',
        3: '108%',
        4: '106%',
        5: '100%',
      }
      return _enum[num.toString().length] || '100%'
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
  font-size: 14px;
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
  font-size: 14px;
  width: 100%;
  height: calc(100% - 40px);
  overflow: auto;
  position: relative;
  background: #fff;
  .mould-box {
    position: sticky;
    left: 0;
    width: 200px;
    z-index: 1;
    background: #fff;
    box-shadow: 0 0 6px 2px #eee;
    &-item {
      height: 170px;
      display: flex;
      align-items: center;
      //margin-bottom: 70px;
      position: relative;
      box-sizing: border-box;
      padding: 10px 10px;
      border-bottom: 1px solid #eee;
      .el-image {
        width: 100%;
        height: 100%;
        ::v-deep.image-slot{
          width: 100%;
          height: 100%;
          background: #f5f7fa;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 26px;
          transform: scaleX(1.2);
          color: #909399;
        }
      }
    }
  }
  .details-box {
    background: #fff;
    left: 200px;
    position: absolute;
    top: 0;
    &-item {
      height: 165px;
      display: flex;
      align-items: center;
      margin-top: 5px;
    }
    &-children:hover{
      transform: scale(1.05);
    }
    &-children {
      transition: .3s;
      cursor: pointer;
      width: 200px;
      height: 165px;
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
          padding: 5px 0;
          width: 100%;
        }
        .el-progress {
          //width: 112%;
        }
      }
    }
  }
  .info-box {
    font-size: 14px;
    height: 60px;
    width: 1000px;
    background: #eee;
    position: absolute;
    z-index: 2;
    top: -60px;
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
    .go-details{
      position: absolute;
      right: 20px;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
.NotStarted {
  border: 1px solid #efefef !important;
}
.HaveInHand {
  border: 1px solid #E6A23C !important;
}
.Completed {
  border: 1px solid #a7f241 !important;
}
.Deferred {
  border: 1px solid #f11635 !important;
}
</style>
