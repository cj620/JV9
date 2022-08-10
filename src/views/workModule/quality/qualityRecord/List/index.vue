<!--
 * @Author: H.
 * @Date: 2021-11-18 18:23:23
 * @LastEditTime: 2022-08-10 17:23:21
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
        <span>{{ CheckResultEnum[row.CheckResult] }}</span>
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteCheckRecord.bind(null, [row.Id]),
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
import { deleteCheckRecord } from "@/api/workApi/quality/checkRecord";
export default {
  name: "QualityRecord",
  data() {
    return {
      tableObj: {},
      CheckResultEnum: {
        Qualified: i18n.t("quality.Qu_Qualified"),
        TobeChecked: i18n.t("quality.Qu_ToBeTested"),
        Unqualified: i18n.t("quality.Qu_Unqualified"),
      },
    };
  },
  methods: {
    deleteCheckRecord(ids) {
      deleteCheckRecord(ids).then(() => this.tableObj.getData());
    },
    add() {
      this.$router.push({
        name: "AddQualityRecord",
        params: { type: "add", title: "addQualityRecord" },
      });
    },
    goDetail(row) {
      this.$router.push({
        name: "QualityRecordDetails",
        query: {
          data: row,
        },
      });
      console.log(row, "row");
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
