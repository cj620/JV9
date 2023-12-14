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
                confirm: deleteTemplate.bind(null, [row.Id]),
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
import { deleteProjectProcessTemplate } from "@/api/workApi/project/baseData";
export default {
  name: "Pm_ProjectProcessTemplate",
  data(){
    return {
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    add(){
        this.$router.push({
            name: "AddProjectProcessTemplate",
        });
    },
    edit(row){
        this.$router.push({
            name: "EditProjectProcessTemplate",
            params: { data: row },
        });
    },
    deleteTemplate(ids){
        deleteProjectProcessTemplate(ids).then(() => this.tableObj.getData())
    },
    goDetail(row) {
        this.$router.push({
            name: "ProjectProcessTemplateDetail",
            query: {
                data: row,
            },
        });
    },
  },
}

</script>
