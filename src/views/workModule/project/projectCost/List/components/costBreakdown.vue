<!--
 * @Author: H.
 * @Date: 2022-01-05 11:11:18
 * @LastEditTime: 2022-03-03 15:45:17
 * @Description:
-->
<!--成本明细-->
<template>
  <jv-dialog
    :title="$t('Generality.Ge_CostDetails')"
    width="80%"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
    :append-to-body="false"
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmGenerateItems"
    :autoFocus="true"
  >
    <div>
      <JvTable :table-obj="tableObj"> </JvTable>
    </div>
  </jv-dialog>
</template>

<script>
import { project_cost_details } from "@/api/workApi/project/dataReport";
import { Table } from "@/jv_doc/class/table";

import {
  MaterialConfig,
  ProductionConfig,
  OutsourcingConfig,
  TrialToolingConfig,
} from "./TableConfig";
export default {
  name: "costBreakdown",
  data() {
    return {
      tableObj: {},
    };
  },
  props: {
    rowData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(this.rowData);
    const str = {
      Material: MaterialConfig,
      Production: ProductionConfig,
      Outsourcing: OutsourcingConfig,
      TrialTooling: TrialToolingConfig,
    };
    let tableConfig = str[this.rowData.CostType];

    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: this.$t("Generality.Ge_CostDetails"),
      operationCol: false,
      height: 350,
      freshBar: false,
      searchBar: false,
      printBar: false,
      printMod: "costBreakdownDialogtable",
    });
    this.GetData();
  },
  methods: {
    GetData() {
      project_cost_details({
        CostType: this.rowData.CostType,
        ToolingNo: this.rowData.ToolingNo,
      }).then((res) => {
        console.log(res);
        this.tableObj.setData(res.Items);
      });
    },
    confirmGenerateItems() {
      this.$emit("confirmGenerateItems", false);
    },
  },
};
</script>

<style scoped></style>
