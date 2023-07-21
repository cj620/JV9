<!--
 * @Author: your name
 * @Date: 2021-11-01 15:42:07
 * @LastEditTime: 2023-07-21 14:01:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \keitoolv9\src\views\workModule\sale\saleQuote\List\index.vue
-->
<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction :actions="getListTableColBtnModel(row)" />
      </template>
      <!-- 表格操作行 -->
      <Action size="mini" slot="btn-list" :actions="getListTableBtnModel">
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import {
  listTableColBtnModel,
  listTableBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  // 页面的标识
  name: "Sa_SaleQuote",
  components: {
    // 单据状态组件
    BillStateTags,
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      // 编辑路由
      EditRoute: "Sa_SaleQuote_Edit",
      // 新增路由
      AddRoute: "Sa_SaleQuote_Add",
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  computed: {
    // 表格操作模块
    getListTableBtnModel() {
      return listTableBtnModel(this);
    },
    // 表格行
    getListTableColBtnModel() {
      return (row) => {
        // console.log(listTableColBtnModel(this, row));
        // return listTableColBtnModel(this, row, [
        //   {
        //     type: "copy",
        //     isShow: false,
        //   },
        // ]);
        return listTableColBtnModel(this, row);
      };
    },
  },
  methods: {
    copy(row) {
      console.log(row);
      this.$router.push({
        name: "Sa_SaleQuote_Add",
        query: { BillId: row.BillId, type: "copy" },
      });
    },
  },
};
</script>
