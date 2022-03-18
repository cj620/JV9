<!--
 * @Author: your name
 * @Date: 2021-11-01 15:42:07
 * @LastEditTime: 2022-01-20 17:19:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\List\index.vue
-->
<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #TaskType="{ record }">
        <!-- 状态标签 -->
        {{ taskTypeEnum[record].name }}
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction :actions="getListTableColBtnModel(row)" />
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 单据状态组件
import { taskTypeEnum } from "@/enum/workModule";
import { listTableColBtnModel } from "@/jv_doc/utils/system/pagePlugin";
export default {
  // 页面的标识
  // name: "Pm_ProjectTask_Record",
  data() {
    return {
      // 表格实例
      tableObj: {},
      taskTypeEnum,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 创建表格实例
      this.tableObj = new Table();
      this.tableObj.formObj.form.TaskType = this.$route.query.TaskType;
      this.tableObj.getData();
    },
  },
  computed: {
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
  },
};
</script>
