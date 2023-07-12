<!--
 * @Author: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Date: 2022-06-20 12:56:50
 * @LastEditors: 勿忘 208760845@qq.com
 * @LastEditTime: 2022-09-06 08:50:30
 * @FilePath: \jvmmsv9-1front\src\views\workModule\quality\finishedProductCheckList\components\selectDetails.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <jv-dialog
      title="选择明细"
      width="70%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmAdd"
    >
      <!--1-->
      <JvTable :table-obj="tableObj"> </JvTable>
    </jv-dialog>
  </div>
</template>

<script>
import { tableConfig } from "./config";
import { API as produceDemand } from "@/api/workApi/production/productionDemand";
import { Table } from "@/jv_doc/class/table";

export default {
  name: "selectDetails",
  data() {
    return {
      tableObj: {},
    };
  },
  props: {
    transferData: {
      type: String,
      default: () => "",
    },
  },
  created() {
    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      // 行标识
      rowId: "Id",
      sortCol: true,
      chooseCol: true,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    });
    console.log(this.transferData);
    this.GetData();
  },
  methods: {
    GetData() {
      produceDemand.api_get({ BillId: this.transferData }).then((res) => {
        console.log(res);
        this.tableObj.setData(res.BillItems);
      });
    },

    confirmAdd() {
      console.log(this.tableObj.selectData.datas);
      this.$emit("confirmData", this.tableObj.selectData.datas);
    },
  },
};
</script>

<style scoped></style>
