<!--
 * @Author: H.
 * @Date: 2022-01-20 13:45:29
 * @LastEditTime: 2022-01-20 17:17:43
 * @Description:
-->
<!--加工计划图-->
<template>
  <PageWrapper :footer="false">
    <div style="background: #fff">
      <div class="project-container">
        <gantt ref="ganttchart" class="left-container"
        :tasks="tasks"
        :formSchema="formSchema"
        :api="partProcessingPlan"
        >
        </gantt>
      </div>
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
        links: []
      },
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
  methods: {
    GetData() {
      partProcessingPlan({}).then((res) => {
        // console.log(res);
        let arr = [];
        res.forEach((item) => {
          arr.push({
            id: item.Id, // 父节点id
            open: item.IsOpen, // 是否展开
            text: item.Title, // 父节点名字
            start_date: timeFormat(item.StartDate, "yyyy-MM-dd hh:mm:ss"), // 必须要字段 task 开始时间
            cap_plan_end: timeFormat(item.EndDate, "yyyy-MM-dd hh:mm:ss"),
            end_date: item.EndDate ? timeFormat(item.EndDate, "yyyy-MM-dd hh:mm:ss"): '',
            parent: item.ParentId,
            color: item.Color,
            duration: item.Duration,
            progress: item.ProcessRate,
            // row_height: 50,
            // bar_height: 40
          });
        });
        this.tasks.data = [...arr];

        this.tasks.links = [
            // { id:1, source:2, target:2, type:1},
            { id:1, source:1, target:2, type:1, info: '这是第一条link'},
            { id:2, source:2, target:3, type:1, info: '这是第二条link'},
            { id:3, source:3, target:4, type:1, info: '这是第三条link'},
        ]
        this.$refs.ganttchart.GetData();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.project-container {
  height: 100%;
  padding: 0 10px;
  min-height: calc(100vh - 120px);
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
}
</style>
