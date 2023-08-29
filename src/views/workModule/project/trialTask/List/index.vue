<!--
 * @Author: H.
 * @Date: 2021-11-09 11:33:00
 * @LastEditTime: 2022-08-10 17:12:40
 * @Description: 试模任务
-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <!-- 状态标签 -->
        <BillStateTags :state="record"></BillStateTags>
      </template>
      <template #TaskType="{ record }">
        <!-- 状态标签 -->
        {{ taskTypeEnum[record].name }}
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction :actions="getListTableColBtnModel(row)" />
      </template>
      <!-- 表格操作行 -->
      <!--<Action-->
      <!--  size="mini"-->
      <!--  slot="btn-list"-->
      <!--  :actions="[-->
      <!--    {-->
      <!--      label: $t('project.Pro_TaskRecord'),-->
      <!--      confirm: taskRecord,-->
      <!--    },-->
      <!--    {-->
      <!--      label: $t('Generality.Ge_Details1'),-->
      <!--      confirm: detailsList,-->
      <!--    },-->
      <!--  ]"-->
      <!--&gt;-->
      <!--</Action>-->
    </JvTable>
  </PageWrapper>
</template>
<script>
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { listTableColBtnModel } from "@/jv_doc/utils/system/pagePlugin";
import { taskTypeEnum } from "@/enum/workModule";
// 引入表格类
import { Table } from "./config";
export default {
  name:'Pm_TestTask',
  components: {
    // 单据状态组件
    BillStateTags,
  },
  data() {
    return {
      taskTypeEnum,
      // 表格实例
      tableObj: {},
      // 编辑路由
      EditRoute: "Sa_SaleQuote_Edit",
      // 新增路由
      AddRoute: "Sa_SaleQuote_Add",

      TaskType: "TrialTooling",
    };
  },
  methods: {
    init() {
      this.tableObj = new Table();
      this.tableObj.formObj.form.TaskType = this.TaskType;
      this.tableObj.getData();
    },
    // taskRecord() {
    //   this.$router.push({
    //     name: "Pm_ProjectTask_Record",
    //     query: { TaskType: this.TaskType },
    //   });
    // },
    // //项目任务明细
    // detailsList() {
    //   this.$router.push({
    //     name: "Pm_ProjectTask_DetailList",
    //   });
    // },
  },
  created() {
    this.init();
  },
  mounted() {},
  computed: {
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
