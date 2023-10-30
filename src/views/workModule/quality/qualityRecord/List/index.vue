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
      <template #BillId="{ row }">
        <el-link type="primary" @click="goDetail1(row)">{{
          row.BillId
        }}</el-link>
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            // 创建过程单
            {
              label: $t('menu.Qc_ProcessCheck'),
              disabled: getActionState(row.CheckState),
              confirm: toMachiningCheckList.bind(null, row),
            },
            // 创建成品单
            {
              label: $t('menu.Qc_FinishedProduct'),
              disabled: getActionState(row.CheckState),
              confirm: toFinishedProduct.bind(null, row),
            },
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
import { site_collection_inspection_arrival } from "@/api/workApi/quality/siteCollection";
export default {
  name: "QualityRecord",
  data() {
    return {
      tableObj: {},
      CheckResultEnum: {
        Qualified: i18n.t("quality.Qc_Qualified"),
        TobeChecked: i18n.t("quality.Qc_ToBeTested"),
        Unqualified: i18n.t("quality.Qc_Unqualified"),
        Completed: i18n.t("Generality.Ge_Completed"),
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
    goDetail1(row) {
      this.$router.push({
        name: "ProductionTaskDetails",
        query: {
          BillId: row.BillId,
        },
      });
      console.log(row, "row");
    },
    //免检
    inspectionArrival(e) {
      console.log(e);
      // this.$confirm("确定要免检吗", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      // }).then(() => {
      //   site_collection_inspection_arrival({ Ids: [e.Id] }).then((res) => {
      //     this.tableObj.getData();
      //   });
      // });
    },
    //点击过程检验单
    toMachiningCheckList(e) {
      this.$router.push({
        name: "Qc_ProcessCheck_Add",
        params: {
          type: "add",
          ProcessCheckType: "NormalCheck",
          title: "addSaleOrder",
          data: { row: e },
        },
      });
    },
    //点击零件成品检验单
    toFinishedProduct(e) {
      this.$router.push({
        name: "Qc_FinishedProduct_Add",
        params: { type: "add", title: "addSaleOrder", data: { row: e } },
      });
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  mounted() {},
  computed: {
    // 获取按钮状态
    getActionState() {
      return (state) => {
        return state !== "TobeChecked";
      };
    },
  },
  components: {},
};
</script>
