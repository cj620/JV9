<!--
 * @Author: your name
 * @Date: 2022-01-20 16:24:55
 * @LastEditTime: 2022-01-20 16:40:11
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\production\productionSchedule\detailedLoad\index.vue
-->
<template>
  <PageWrapper :footer="false">
    <div class="detailed-load">
      <div class="detailed-load-left">
        <JvTable
          :table-obj="tableObj1"
          highlight-current-row
          ref="singleTable"
          @current-change="handleCurrentChange"
        >
          <template #UtilizationRate="{ record }">
            <el-progress
              :percentage="parseFloat(record.toFixed(2))"
            ></el-progress>
          </template>
        </JvTable>
      </div>

      <div class="detailed-load-right">
        <JvTable :table-obj="tableObj2"> </JvTable>
      </div>
    </div>
  </PageWrapper>
</template>

<script>
import { Table } from "@/jv_doc/class/table";
import { tableConfig1, tableConfig2 } from "./config";
import { query_latest_aps_result_for_chart } from "@/api/workApi/production/aps";
export default {
  name: "ProductionDetailedLoad",
  data() {
    return {
      form: {
        CurrentPage: 1,
        PageSize: 50,
      },
      tableObj1: {},
      tableObj2: {},
    };
  },
  created() {
    this.tableObj1 = new Table({
      tableSchema: tableConfig1,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
    });
    this.tableObj2 = new Table({
      tableSchema: tableConfig2,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
    });
    this.GetData();
  },
  methods: {
    GetData() {
      query_latest_aps_result_for_chart(this.form).then((res) => {
        console.log(res);
        this.tableObj1.setData(res.Items);
      });
    },
    //单击明细表格
    handleCurrentChange(val) {
      this.tableObj2.setData(val.ApsResultItems);

    },
  },
};
</script>

<style lang="scss" scoped>
.detailed-load {
  background: #fff;
  height: 100%;
  display: flex;
  .detailed-load-left {
    height: 100%;
    width: 40%;
    padding: 10px 0;
  }
  .detailed-load-right {
    width: 60%;
    height: 100%;
    padding: 10px 0;
  }
}
</style>
