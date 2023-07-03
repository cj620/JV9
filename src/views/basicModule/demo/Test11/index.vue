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
         质量汇总
        </div>
        <div class="productionTask-header-title">
          <div @click="ClickSearch" class="title">
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
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="地区">
          </el-table-column>
          <el-table-column prop="data1" label="零件数量" ></el-table-column>
          <el-table-column prop="data2" label="合格数" ></el-table-column>
          <el-table-column prop="data3" label="异常数" ></el-table-column>
          <el-table-column prop="data4" label="返工数" ></el-table-column>
            <el-table-column prop="data5" label="合格率" ></el-table-column>
            <el-table-column prop="data6" label="返工率" ></el-table-column>
            <el-table-column prop="data7" label="异常率" ></el-table-column>
        
        </el-table>
        <div class="charts-line">
          <div id="main1" style="width: 1800px; height: 400px"></div>
        

        </div>


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
        ["90", "80", "85", "90", "90", "95", "93"],
        ["8", "15", "10", "5", "8", "4", "5"],
        ["2", "5", "5", "5", "2", "1", "2"],
      
      ] ,

      tableData: [
        { date: '中国上海', data1: 100, data2: 90, data3: 8, data4: 2, data5: '90%', data6: '8%', data7: '2%'},
        { date: '印度尼西亚', data1: 100, data2: 80, data3: 15, data4: 5, data5: '80%', data6: '15%', data7: '5%'},
        { date: '新加坡', data1: 100, data2: 85, data3: 10, data4: 5, data5: '85%', data6: '10%', data7: '5%'},
        { date: '日本', data1: 100, data2: 90, data3: 5, data4: 5, data5: '90%', data6: '5%', data7: '5%'},
        { date: '越南', data1: 100, data2: 90, data3: 8, data4: 2, data5: '90%', data6: '8%', data7: '2%'},
        { date: '泰国', data1: 100, data2: 95, data3: 4, data4: 1, data5: '95%', data6: '4%', data7: '1%'},
        { date: '马来西亚', data1: 100, data2: 93, data3: 5, data4: 2, data5: '93%', data6: '5%', data7: '2%'},
      ]
    };
  },
  created() {},
//调用
  mounted() {
    this.$nextTick(function() {
      this.drawLine("main");
    });
  },

  methods: {
    drawLine() {
      this.charts1 = echarts.init(document.getElementById('main1'));

      this.charts1.setOption({
        title: {
          text: '质量分析汇总'
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ['合格率', '返工率', '异常率'],
          width: "50%",
          right: "4%"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: ['中国上海', '印度尼西亚', '新加坡', '日本', '越南', '泰国', '马来西亚']
        },
        yAxis: {
          type: "value",
          axisLabel:{
            show:true,
            formatter:'{value}%'
          }
        },
        series: [
          { name: "合格率", type: "line", smooth: true, data: this.opinionData[0], },
          { name: "返工率", type: "line",smooth: true,  data: this.opinionData[1], },
          { name: "异常率", type: "line",smooth: true,   data: this.opinionData[2], },
        ],
      });

    },

    ClickSearch() {


    },
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
  .charts-line{
padding-top: 40px;
    display: flex;
  }
  }</style>
