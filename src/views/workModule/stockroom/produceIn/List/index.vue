<!--
 * @Author: your name
 * @Date: 2021-11-12 13:36:54
 * @LastEditTime: 2022-01-20 17:22:11
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\produceIn\List\index.vue
-->
<!--
 * @Author: H.
 * @Date: 2021-11-09 13:12:37
 * @LastEditTime: 2021-11-09 13:12:37
 * @Description: 生产入库
-->

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
import { Table } from "./config";
import { stateEnum } from "@/enum/workModule";
import { deleteStockProduceIn } from "@/api/workApi/stockroom/produceIn";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  name: "ReturnPicking",
  components: {
    BillStateTags,
  },
  data() {
    return {
      stateEnum,
      // 表格数据
      tableObj: {
        type: "",
        data: "",
      },
      transferData: {
        type: "",
        data: "",
      },
      form: {
        SortColumn: "ItemType",
        SortOrder: 4,
      },
      dialogFormVisible: false,
      chooseList: [],
      // 编辑路由
      EditRoute: "St_ProduceIn_Edit",
      // 新增路由
      AddRoute: "St_ProduceIn_Add",
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  computed: {
    // 表格操作模块
    getListTableBtnModel() {
      return listTableBtnModel(this);
    },
    // 表格操作列按钮
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
  },
  methods: {},
};
</script>
<style lang="scss"></style>
