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
        :formObj="formObj"
        :SubmitterData="SubmitterData"
        @changeSubmitter="changeSubmitter"
        >
          

        </gantt>
      </div>
    </div>
  </PageWrapper>
</template>

<script>
import gantt from "@/components/JVInternal/Gantt";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { timeFormat } from "@/jv_doc/utils/time";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { partProcessingPlan } from "@/api/workApi/production/dataReport";
export default {
  name: "index",
  data() {
    return {
      tasks: {
        data: [],
      },
      formObj: {},
      SubmitterData: [],
    };
  },
  components: {
    gantt,
  },
  async created() {
    this.GetData();
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      // gutter: 30,
      labelWidth: "80px",
    });
    await this.Configuration();
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
            parent: item.ParentId,
            color: item.Color,
            duration: item.Duration,
            progress: item.ProcessRate,
          });
        });
        this.tasks.data = [...arr];
        this.$refs.ganttchart.GetData();
      });
    },

    //获取客户Id
    async Configuration() {
      await getAllUserData({}).then((res) => {
        this.SubmitterData = res.Items;
      });
    },
    //选择提交人确定部门
    changeSubmitter(e) {
      this.SubmitterData.forEach((item) => {
        if (item.UserName === e) {
          this.formObj.form.Department = item.DepartmentName;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.project-container {
  height: 100%;
  padding: 10px;
  min-height: calc(100vh - 120px);

  .left-container {
    overflow: hidden;
    position: relative;
  }
}
</style>
