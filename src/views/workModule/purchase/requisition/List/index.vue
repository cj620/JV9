<!--
 * @Author: H.
 * @Date: 2021-11-09 09:42:54
 * @LastEditTime: 2022-01-20 17:20:13
 * @Description: 采购订单
-->

<template>
  <PageWrapper :footer="false">
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
              disabled: !(
                stateEnum[row.State] && stateEnum[row.State].operation.edit
              ),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deletePurchaseRequisition.bind(null, [row.BillId]),
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
             {
            label: $t('project.Pro_CheckDetails'),
            confirm: toDetailsList,
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
import { API } from "@/api/workApi/purchase/requisition";
import { Table } from "./config";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";

export default {
  data() {
    return {
      stateEnum,
      tableObj: {},
    };
  },
  methods: {
    toDetailsList() {
      this.$router.push({
        name: "Pu_Requisition_Detail_list",
      });
    },
    deletePurchaseRequisition(id) {
      API.api_delete({ BillIds: id }).then(() => {
        this.tableObj.getData();
      });
    },
    edit(e) {
      editLock({ BillId: e.BillId }).then((res) => {
        this.$router.push({
          name: "Pu_Requisition_Edit",
          query: { BillId: e.BillId },
        });
      });
    },
    add() {
      this.$router.push({
        name: "Pu_Requisition_Add",
        params: { type: "add", title: "Pu_Requisition_Add" },
      });
    },
    del() {
      this.deletePurchaseRequisition(this.tableObj.selectData.keys);
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
