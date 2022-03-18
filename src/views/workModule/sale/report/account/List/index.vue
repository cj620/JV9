<!--销售对账-->
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
import { deleteSalesAccount } from "@/api/workApi/sale/account";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import BillStateTags from "@/components/WorkModule/BillStateTags";
export default {
  name: "Sa_Account",
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
      IsState: false,
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
      this.tableObj.api({ BillIds: id }).then((data) => {
        this.tableObj.getData();
        console.log("110", data);
      });
    },
    //新增分类
    add() {
      this.$router.push({
        name: "Sa_AccountChecking_Add",
        params: { type: "add" },
      });
    },

    //编辑
    edit(e) {
      editLock({ BillId: e.BillId }).then((res) => {
        this.$router.push({
          name: "Sa_AccountChecking_Edit",
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
