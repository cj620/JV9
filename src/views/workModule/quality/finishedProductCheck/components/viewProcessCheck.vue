<!--
 * @Author: 勿忘 208760845@qq.com
 * @Date: 2022-08-31 10:48:37
 * @LastEditors: 勿忘 208760845@qq.com
 * @LastEditTime: 2022-09-06 08:50:38
 * @FilePath: \jvmmsv9-1front\src\views\workModule\quality\finishedProductCheckList\components\viewProcessCheck.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <jv-dialog
      title="查看过程检验单"
      width="90%"
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
import { tableConfig1 } from "./config";
import { Table } from "@/jv_doc/class/table";
import { qc_process_check_list } from "@/api/workApi/quality/processCheck";

export default {
  name: "selectDetails",
  data() {
    return {
      tableObj: {},
    };
  },
  props: {
    productionId: {
      type: String,
      default: () => "",
    },
  },
  created() {
    this.tableObj = new Table({
      tableSchema: tableConfig1,
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
    this.GetData();
  },
  methods: {
    GetData() {
      const str = {
        PrTaskBillId: this.productionId,
        PageSize: 20,
        CurrentPage: 1,
      };
      qc_process_check_list(str).then((res) => {
        console.log(res);
        this.tableObj.setData(res.Items);
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
