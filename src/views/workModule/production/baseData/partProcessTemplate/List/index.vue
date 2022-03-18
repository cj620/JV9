<!--
 * @Author: H.
 * @Date: 2021-11-30 11:06:17
 * @LastEditTime: 2022-01-20 17:15:59
 * @Description:
-->
<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #Template="{ row }">
        <el-link type="primary" @click="goDetail(row)">{{
          row.Template
        }}</el-link>
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteProcessTemplate.bind(null, [row.Id]),
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
import { Table } from "./config";
import { deleteProcessTemplate } from "@/api/workApi/production/baseData";
export default {
  data() {
    return {
      tableObj: {},
    };
  },
  methods: {
    add() {
      this.$router.push({
        name: "AddProcessTemplate",
      });
    },
    deleteProcessTemplate(ids) {
      deleteProcessTemplate(ids).then(() => this.tableObj.getData());
    },
    edit(row) {
      this.$router.push({
        name: "EditProcessTemplate",
        params: { data: row },
      });
    },
    goDetail(row) {
      this.$router.push({
        name: "ProcessTemplateDetails",
        query: {
          data: row,
        },
      });
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  mounted() {},
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped></style>
