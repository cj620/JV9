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
          外协管理
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
        <el-tabs type="border-card">
          <el-tab-pane :label="item" v-for="item in tabList" :key="item">
            <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column prop="date" label="供应商编号" width="140"></el-table-column>
              <el-table-column prop="data1" label="供应商名称" width="140"></el-table-column>
              <el-table-column label="1月">
                <el-table-column prop="data2" label="数量"></el-table-column>
                <el-table-column prop="data3" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column label="2月">
                <el-table-column prop="data2" label="数量"></el-table-column>
                <el-table-column prop="data3" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column label="3月">
                <el-table-column prop="data2" label="数量"></el-table-column>
                <el-table-column prop="data3" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column label="4月">
                <el-table-column prop="data2" label="数量"></el-table-column>
                <el-table-column prop="data3" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column label="5月">
                <el-table-column prop="data2" label="数量"></el-table-column>
                <el-table-column prop="data3" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column label="6月">
                <el-table-column prop="data2" label="数量"></el-table-column>
                <el-table-column prop="data3" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column label="总计">
                <el-table-column prop="data4" label="数量"></el-table-column>
                <el-table-column prop="data5" label="金额"></el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>

        </el-tabs>




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
      tabList:[
        '中国上海',
        '印度尼西亚',
        '新加坡',
        '日本',
        '越南',
        '泰国',
        '马来西亚',
      ],
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
        { date: 'TP001', data1: 'KOEL TOOL1', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP002', data1: 'KOEL TOOL2', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP003', data1: 'KOEL TOOL3', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP004', data1: 'KOEL TOOL4', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP005', data1: 'KOEL TOOL5', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP006', data1: 'KOEL TOOL6', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP007', data1: 'KOEL TOOL7', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP008', data1: 'KOEL TOOL8', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP009', data1: 'KOEL TOOL9', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP0010', data1: 'KOEL TOOL10', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP0011', data1: 'KOEL TOOL11', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP0012', data1: 'KOEL TOOL12', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP0013', data1: 'KOEL TOOL13', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP0014', data1: 'KOEL TOOL14', data2: 10, data3: 10000, data4: 10, data5: 60000},
        { date: 'TP0015', data1: 'KOEL TOOL15', data2: 10, data3: 10000, data4: 10, data5: 60000},


      ]
    };
  },
  created() {},
//调用
  mounted() {

  },

  methods: {


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
