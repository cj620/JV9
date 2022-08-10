<!--
 * @Author: H.
 * @Date: 2021-12-08 11:00:45
 * @LastEditTime: 2022-08-10 17:20:52
 * @Description:
-->
<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #Category="{ row }">
        {{ Category[row.Category] }}
      </template>
      <template #State="{ row }">
        {{ State[row.State] }}
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: _delete.bind(null, [row.Id]),
              },
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
        ]"
      >
      </Action>
    </JvTable>
  </PageWrapper>
</template>

<script>
import { deleteOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";
import { Table } from "./config";
export default {
  name:'Pu_OutsourcingRequirement',
  data() {
    return {
      tableObj: {},
      Category: {
        Part: this.$t("production.Pr_PartOutsourcing"),
        Process: this.$t("production.Pr_ProcessOutsourcing"),
      },
      State: {
        ToBeProcessed: this.$t("Generality.Ge_Pending"),
        Outsourced: this.$t("purchase.Pu_Outsourced"),
      },
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    _delete(id) {
      deleteOutsourcingrRequirement(id).then(() => {
        this.tableObj.getData();
      });
    },
    add() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) {
        return this.$message.warning(
          this.$t("purchase.Pu_PleaseSelectTheOutsourcingRequirements")
        );
      }
      this.$router.push({
        name: "Pu_Outsourcing_Add",
        query: {
          ItemsData: datas,
        },
      });
    },
  },
};
</script>

<style scoped></style>
