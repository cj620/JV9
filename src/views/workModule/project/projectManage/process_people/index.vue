<!--
 * @Author: your name
 * @Date: 2021-11-23 09:00:38
 * @LastEditTime: 2022-01-14 10:11:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\process_people\index.vue
-->
<template>
  <div style="padding: 15px; background: #fff">
    <el-tabs v-model="activeName">
      <el-tab-pane :label="$t('project.Pro_ProjectSchedule')" name="first">
        <div class="tab-wrapper">
          <Gantt ref="ganttchart" :tasks="tasks" />
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('project.Pro_ProjectPersonnel')" name="second">
        <div class="tab-wrapper">
          <ProjectTab
            :cdata="item"
            v-for="(item, index) in PeopleDetail"
            :key="index"
          ></ProjectTab>
          <el-empty
            description="暂无内容"
            v-if="PeopleDetail.length == 0"
          ></el-empty>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { project_worker_progress } from "@/api/workApi/project/projectManage";
import { project_gantt_progress } from "@/api/workApi/project/projectInfo";
import { timeFormat } from "@/jv_doc/utils/time";
import ProjectTab from "./cpns/ProjectTab.vue";
import Gantt from "@/components/JVInternal/Gantt";
export default {
  name: "Pm_ProjectManagement_process_people",
  components: {
    ProjectTab,
    Gantt,
  },
  data() {
    return {
      activeName: "first",
      PeopleDetail: [],
      tasks: {
        data: [],
      },
    };
  },
  created() {
    this.getGanttData();
    this.getData();
  },
  methods: {
    getData() {
      let Project = this.$route.query.Project;
      project_worker_progress({ Project }).then((res) => {
        this.PeopleDetail = res;
      });
    },

    getGanttData() {
      let Project = this.$route.query.Project;
      project_gantt_progress({ Project }).then((res) => {
        let result = [];
        res.forEach((item) => {
          result.push({
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
          });
        });
        this.tasks.data = result;
        console.log('this.tasks.data::: ', this.tasks.data);
        this.$refs.ganttchart.GetData();
      });
    },
    handleClick(tab, event) {},
  },
};
</script>
<style scoped lang="scss">
.tab-wrapper {
  background-color: #f4f4f4;
  min-height: calc(100vh - 170px);
}
</style>
