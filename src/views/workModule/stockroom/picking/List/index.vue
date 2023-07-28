<!--
 * @Author: H.
 * @Date: 2021-11-09 13:11:04
 * @LastEditTime: 2022-01-20 17:22:06
 * @Description: 生产领料
-->

<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #PickingType="{ record }">
        {{ pickingTypeMap[record] && pickingTypeMap[record].name }}
      </template>
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
import { stateEnum, pickingTypeEnum } from "@/enum/workModule";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  name: "Picking",
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
      chooseList: [],
      // 编辑路由
      EditRoute: "St_Picking_Edit",
      // 新增路由
      AddRoute: "St_Picking_Add",
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
    pickingTypeMap() {
      return pickingTypeEnum;
    },
  },
  methods: {},
};
</script>
<style lang="scss"></style>
