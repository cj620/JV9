<!--
 * @Author: H.
 * @Date: 2021-11-18 18:23:23
 * @LastEditTime: 2022-08-10 17:23:58
 * @Description:
-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable :table-obj="tableObj">
      <template #ToolingNo="{ row }">
        <el-link type="primary" @click="goDetail(row)">{{
          row.ToolingNo
        }}</el-link>
      </template>
      <template #CheckResult="{ row }">
        <span>{{ CheckResult[row.CheckResult] }}</span>
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteCheckErr.bind(null, [row.Id]),
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
import { deleteCheckErr } from "@/api/workApi/quality/checkErr";
export default {
  name:'QualityError',
  data() {
    return {
      tableObj: {},
      CheckResult: {
        Rework: this.$t("quality.Qu_Rework"),
        Scrap: this.$t("setup.ReportWork"),
      },
    };
  },
  methods: {
    deleteCheckErr(ids) {
      deleteCheckErr(ids).then(() => this.tableObj.getData());
    },
    add() {
      this.$router.push({
        name: "AddQualityError",
        params: { type: "add", title: "addQualityError" },
      });
    },
    goDetail(row) {
      this.$router.push({
        name: "QualityErrorDetails",
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
