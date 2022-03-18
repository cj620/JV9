<!--
 * @Author: H.
 * @Date: 2021-12-01 15:49:33
 * @LastEditTime: 2022-01-20 17:22:15
 * @Description:
-->

<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #AccountedType="{ row }">
        {{ accountedTypeEnum[row.AccountedType] }}
      </template>
    </JvTable>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
export default {
  data() {
    return {
      tableObj: {},
      accountedTypeEnum: {
        St_OtherOut: this.$t("menu.St_OtherOut"),
        St_OtherIn: this.$t("menu.St_OtherIn"),
        St_Picking: this.$t("menu.St_Picking"),
        St_ReturnPicking: this.$t("menu.St_ReturnPicking"),
        St_ProduceIn: this.$t("menu.St_ProduceIn"),
        St_StockInit: this.$t("menu.St_StockInit"),
        St_StockCheck: this.$t("menu.St_StockCheck"),
        St_CostChange: this.$t("menu.St_CostChange"),
        St_SplitAssemble: this.$t("menu.St_SplitAssemble"),
        St_Dispatch: this.$t("menu.St_Dispatch"),
        St_WasteOut: this.$t("menu.St_WasteOut"),
        St_SurplusIn: this.$t("menu.St_SurplusIn"),
        Pu_StockIn: this.$t("menu.Pu_StockIn"),
      },
    };
  },
  methods: {},
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
