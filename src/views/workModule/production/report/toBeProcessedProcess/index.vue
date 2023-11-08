<!--
 * @Author: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Date: 2022-08-18 16:26:04
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @LastEditTime: 2022-08-24 19:28:02
 * @FilePath: \jvmmsv9-1front\src\views\workModule\production\report\toBeProcessedProcess\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <PageWrapper ref="page" :footer="false">
    <div style="height: 300px">
      <div v-for="(item, index) in lineList" :key="index" style="height: 300px">
        <ChartBox :option="item" height="100%"></ChartBox>
      </div>
    </div>
    <div style="height: calc(100% - 300px)">
      <JvTable ref="BillTable" :table-obj="tableObj"> </JvTable>
    </div>
  </PageWrapper>
</template>

<script>
// 引入表格类
import { Table } from "./config";
import ChartBox from "@/components/WorkModule/ChartBox/index.vue";
import { createLineOptionList } from "./utils";
import { data_report_to_be_processed_process } from "@/api/workApi/production/dataReport";

export default {
  data() {
    return {
      tableObj: {},
      ChartData: {},
      lineList: [],
    };
  },
  components: {
    ChartBox,
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    console.log(this.tableObj.formObj.form, 22);
    this.tableObj.getData();
    this.tableObj.setCallBack(() => {
      this.getData();
    });
  },
  methods: {
    getData() {
      data_report_to_be_processed_process(this.tableObj.formObj.form).then(
        (res) => {
          console.log(res.Items, 6666);
          let Date = res.Items.map((x) => x.Process);
          let Data = res.Items.map((x) => x.PlanTime);
          let DataList = { Date, Data, Name: "预计工时汇总" };
          this.lineList = createLineOptionList([DataList]);
          this.lineList[0].title.textStyle = {
            color: '#000',
            fontWeight: 'bold'
          }
          this.lineList[0].color = ['#738edd']

          this.lineList[0].xAxis[0].axisLine = {
            lineStyle: {
              color: "#000",
            }
          }
          this.lineList[0].yAxis[0].axisTick = {
            show: true,
          }
          this.lineList[0].yAxis[0].axisLine = {
            show: true,
            lineStyle: {
              color: "#000",
            }
          }
          this.lineList[0].label = {
            color: '#fff'
          }
          console.log(this.lineList)
        }
      );
    },
  },
};
</script>

<style></style>
