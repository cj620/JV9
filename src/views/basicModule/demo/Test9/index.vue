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
         <el-table-column prop="date" label="订单"></el-table-column>
         <el-table-column prop="data1" label="模具"></el-table-column>
         <el-table-column prop="data2" label="类别"></el-table-column>
         <el-table-column prop="data3" label="物料成本"></el-table-column>
         <el-table-column prop="data4" label="加工成本"></el-table-column>
         <el-table-column prop="data5" label="外协成本"></el-table-column>
         <el-table-column prop="data6" label="成本"></el-table-column>
         <el-table-column prop="data9" label="总成本"></el-table-column>
         <el-table-column prop="data7" label="订单金额"></el-table-column>
         <el-table-column prop="data8" label="毛利润"></el-table-column>
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
       { date: 'SA230615001', data1: '2306001', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615001', data1: '2306002', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615001', data1: '2306003', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615002', data1: '2306004', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615002', data1: '2306005', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615002', data1: '2306006', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615003', data1: '2306007', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615003', data1: '2306008', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615003', data1: '2306009', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615004', data1: '23060010', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615004', data1: '23060011', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615004', data1: '23060012', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615005', data1: '23060013', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615005', data1: '23060014', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
       { date: 'SA230615005', data1: '23060015', data2: '新模', data3: 1000, data4: 5000, data5: 1000, data6: 7000, data7: 30000, data8: 9000, data9: 21000},
    
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
     }else if(columnIndex ===7){
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
     }else if(columnIndex ===8){
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
     }else if(columnIndex ===9){
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
