<!--
 * @Author: your name
 * @Date: 2021-11-12 17:35:40
 * @LastEditTime: 2022-01-20 17:22:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\stockInit\List\index.vue
-->
<!--
 * @Author: H.
 * @Date: 2021-11-09 13:18:24
 * @LastEditTime: 2021-11-09 13:18:25
 * @Description: 库存期初
-->

<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <BillStateTags :state="record"></BillStateTags>
      </template>

      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
              disabled: getActionState(row.State, 'edit'),
            },
            {
              label: $t('Generality.Ge_Delete'),
              disabled: getActionState(row.State, 'edit'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.BillId]),
              },
            },
          ]"
        />
      </template>
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_New'),

            confirm: add.bind(),
          },
          {
            label: $t('Generality.Ge_Delete'),
            disabled: canIsDel,
            popConfirm: {
              title: $t('Generality.Ge_DeleteConfirm'),
              confirm: del.bind(),
            },
          },
        ]"
      >
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { stateEnum } from "@/enum/workModule";
import { deleteStockStockInit } from "@/api/workApi/stockroom/stockInit";
import BillStateTags from "@/components/WorkModule/BillStateTags";
export default {
  name: "StockInit",
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
    };
  },
  created() {
    this.tableObj = new Table();

    this.tableObj.getData();
  },
  computed: {
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Rejected", "Unsubmitted"].includes(item.State);
      });
    },
    // 获取按钮状态
    getActionState() {
      return (state, type) => {
        return !stateEnum[state]?.operation?.[type];
      };
    },
  },
  methods: {
    //删除单据
    deleteOrder(id) {
      this.tableObj.api.del({ BillIds: id }).then((data) => {
        this.tableObj.getData();
      });
    },
    //新增分类
    add() {
      this.$router.push({
        name: "St_StockInit_Add",
        params: { type: "add", title: "addSaleOrder" },
      });
    },

    //编辑
    edit(e) {
      this.tableObj.api.editLock({ BillId: e.BillId }).then((res) => {
        this.$router.push({
          name: "St_StockInit_Edit",
          query: { BillId: e.BillId },
        });
      });
    },
    //批量删除单据
    del() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
  },
};
</script>
<style lang="scss"></style>
