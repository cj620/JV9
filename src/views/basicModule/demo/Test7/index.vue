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
          设备负荷
        </div>
        <div class="productionTask-header-title">
          <div class="title">
            <i class="el-icon-search"></i>

            <div style="margin-left: 50px">2023/6/26-2023/7/01</div>

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
              <el-table-column prop="data1" label="设备编号" width="140"></el-table-column>
              <el-table-column prop="data9" label="设备名称" width="140"></el-table-column>
              <el-table-column prop="data2" label="设备可用时间" width="140"></el-table-column>
              <el-table-column label="工时">
                <el-table-column prop="data3" label="计划工时"></el-table-column>
                <el-table-column prop="data4" label="实际工时"></el-table-column>
                <el-table-column prop="data5" label="采集工时"></el-table-column>
              </el-table-column>
              <el-table-column label="稼动率">
                <el-table-column prop="data6" label="计划稼动率"></el-table-column>
                <el-table-column prop="data7" label="实际稼动率"></el-table-column>
                <el-table-column prop="data8" label="采集稼动率"></el-table-column>
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
        {  data1: 'CNC1',data9: 'CNC1', data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'CNC2',data9: 'CNC2',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'CNC3', data9: 'CNC3', data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'CNC4',data9: 'CNC4',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'CNC5', data9: 'CNC5', data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'EDM1',data9: 'EDM1',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'EDM2',data9: 'EDM2',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'MC1',data9: '磨床1',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'MC2',data9: '磨床2',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'XC1',data9: '铣床1',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'XC2',data9: '铣床2',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'W1',data9: '线切割1',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
        {  data1: 'W2',data9: '线切割2',  data2: 24, data3: 24, data4: 22, data5: 20, data6:'100%', data7: '91.7%', data8: '83%'},
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
