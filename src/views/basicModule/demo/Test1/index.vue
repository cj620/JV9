<template>
  <PageWrapper :footer="false">
    <!--    顶部操作行-->
    <div class="header-handle">
      <!--      左-->
      <div style="display: flex; height: 100%; align-items: center;width: auto">
        <el-input
          size="mini"
          style="width: 160px"
          v-model="searchValue"
          @change="searchValueChange"
        ></el-input>
        <div class="padding-box"></div>
        <el-button type="primary" size="mini">搜索</el-button>
        <div class="padding-box"></div>
        <el-select v-model="ganttChangeShow" size="mini"
                   style="width: 100px"
        >
          <el-option
            v-for="item in ganttChangeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="padding-box"></div>
        <input type="color" class="custom-color">
        <span>未开始</span>

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
        {label: "甘特图",value: true},
        {label: "图表",value: false}
      ],
      ganttChangeShow: false,
      formSchema: formSchema,
      partProcessingPlan: partProcessingPlan,
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
  },
  methods: {
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
}
.padding-box{
  width: 12px;
}
.custom-color{
  border: none ;
  box-shadow: 0 0 6px 2px #ccc;
  background: #fff;
  padding: 0;
}
::-webkit-color-swatch-wrapper{
  padding: 0;
}
::-webkit-color-swatch{
  border: none;
  border-radius: 2px;
}
</style>
