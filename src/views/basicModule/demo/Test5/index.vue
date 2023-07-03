<!--
 * @Author: C.
 * @Date: 2022-08-31 09:59:45
 * @LastEditTime: 2023-06-30 16:31:42
 * @Description: file content
-->
<template>
   <PageWrapper :footer="false">
    <div class="productionTask">
      <div class="productionTask-header">
        <div>
          订单明细
        </div>
        <div class="productionTask-header-title">
          <div class="title">
            <i class="el-icon-search"></i>
          </div>
          <div class="oprations">

          </div>
        </div>
        <div class="productionTask-header-setting"></div>
      </div>
      <div class="jv-table-style">
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          border
          style="width: 100%">
          <el-table-column prop="date" label="地区"></el-table-column>
          <el-table-column prop="data1" label="客户"></el-table-column>
          <el-table-column prop="data2" label="订单编号"></el-table-column>
          <el-table-column prop="data3" label="订单数量"></el-table-column>
          <el-table-column prop="data4" label="订单金额"></el-table-column>
          <el-table-column prop="data5" label="订单日期"></el-table-column>
        </el-table>



      </div>
      </div>

   </PageWrapper>

</template>
<script>

import * as echarts from 'echarts';
export default {
  name: "Home",

  data() {
    return {
      src: "",

      opinionData:[
        ["30", "35", "40", "40", "50"],
        ["10", "20", "25", "30", "35"],
        ["13", "22", "34", "34", "45"],
        ["20", "42", "38", "35", "45"],
        ["30", "35", "40", "45", "28"],
        ["41", "42", "34", "35", "25"],
        ["25", "35", "40", "45", "40"],
      ] ,

      tableData: [
        { date: '新加坡', data1: 'KOEL TOOL', data2: 'SA230630001', data3: 1, data4: 1000, data5: '2023-08-14'},
        { date: '新加坡', data1: 'KOEL TOOL1', data2: 'SA230630002', data3: 4, data4: 2000, data5: '2023-08-14'},
        { date: '新加坡', data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '中国上海',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '中国上海',  data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '中国上海',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '印度尼西亚', data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '印度尼西亚',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '印度尼西亚',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '日本',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '日本',  data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '日本',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '越南', data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '越南',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '越南',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '泰国',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '泰国',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
        { date: '泰国',   data1: 'KOEL TOOL2', data2: 'SA230630003', data3: 5, data4: 3000, data5: '2023-08-14'},
      ]
    };
  },
  created() {},
//调用
  mounted() {

  },

  methods: {


    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  },
};
</script>
<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.productionTask {
  height: 100%;
  /*width: 100%;*/
  min-width: 1400px;
  padding: 15px;
  background: #fff;
  .productionTask-header {
    width: 100%;
    height: 45px;
    background-color: #fff;
    margin-bottom: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .productionTask-header-title {
      height: 100%;

      display: flex;
      flex: 1;
      .title {
        margin-left: 15px;
        height: 100%;
        font-size: 18px;
        font-weight: 700;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        align-items: center;
        flex-flow: row;
      }
      .oprations {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        flex-wrap: wrap;
        align-items: center;
        flex-flow: row;
      }
    }
    &:hover {
      cursor: pointer;
    }
    }

  }</style>
