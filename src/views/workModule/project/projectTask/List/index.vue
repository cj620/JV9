<!--
 * @Author: your name
 * @Date: 2021-11-01 15:42:07
 * @LastEditTime: 2022-08-10 17:11:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \keitoolv9\src\views\workModule\project\projectTask\List\c-menu.vue
-->
<!--销售订单-->
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
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('project.Pro_TaskRecord'),
            confirm: taskRecord,
          },
          {
            label: $t('Generality.Ge_Details1'),
            confirm: detailsList,
          },
        ]"
      >
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { listTableColBtnModel } from "@/jv_doc/utils/system/pagePlugin";
import { taskTypeEnum } from "@/enum/workModule";
export default {
  // 页面的标识
  name: "Pm_ProjectTask",
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

      TaskType: "",
    };
  },
  created() {
    this.init();
  },
  computed: {
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
  },
  methods: {
    init() {
      // 创建表格实例
      this.tableObj = new Table();
      this.tableObj.getData({TaskTypes:["NewTooling","DesignChange","ToolCorrection"]});
    },
    taskRecord() {
      this.$router.push({
        name: "Pm_ProjectTask_Record",
        query: { TaskType: this.TaskType },
      });
    },
    //项目任务明细
    detailsList() {
      this.$router.push({
        name: "Pm_ProjectTask_DetailList",
      });
    },
  },
};
</script>
