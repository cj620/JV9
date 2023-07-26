<!--
 * @Author: H.
 * @Date: 2021-11-17
 * @LastEditTime: 2022-08-10 17:20:26
 * @Description: 委外对账
-->

<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
              disabled: !(
                stateEnum[row.State] && stateEnum[row.State].operation.edit
              ),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOutsourcingAccount.bind(null, [row.BillId]),
              },
              disabled: !(
                stateEnum[row.State] && stateEnum[row.State].operation.del
              ),
            },
          ]"
        ></TableAction
      ></template>
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
import { stateEnum } from "@/enum/workModule";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { API } from "@/api/workApi/purchase/outsourcingAccount";
import { Table } from "./config";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";

export default {
  name: "Pu_OutsourcingAccount",
  data() {
    return {
      stateEnum,
      tableObj: {},
    };
  },
  methods: {
    deleteOutsourcingAccount(id) {
      API.api_delete({ BillIds: id }).then(() => {
        this.tableObj.getData();
      });
    },
    edit(e) {
      editLock({ BillId: e.BillId }).then((res) => {
        this.$router.push({
          name: "Pu_OutsourcingAccount_Edit",
          query: { BillId: e.BillId },
        });
      });
    },
    add() {
      this.$router.push({
        name: "Pu_OutsourcingAccount_Add",
        params: { type: "add", title: "addSaleOrder" },
      });
    },
    del() {
      this.deleteOutsourcingAccount(this.tableObj.selectData.keys);
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  mounted() {},
  computed: {
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Rejected", "Unsubmitted"].includes(item.State);
      });
    },
  },
  components: {
    BillStateTags,
  },
};
</script>

<style lang="scss" scoped></style>
