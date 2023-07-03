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
         产值报表
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
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期">
          </el-table-column>
          <el-table-column label="中国上海">
            <el-table-column prop="data1" label="产值" ></el-table-column>
            <el-table-column prop="data2" label="人均产值" ></el-table-column>
            <el-table-column prop="data3" label="毛利" ></el-table-column>
          </el-table-column>
          <el-table-column label="印度尼西亚">
            <el-table-column prop="data1" label="产值" ></el-table-column>
            <el-table-column prop="data2" label="人均产值" ></el-table-column>
            <el-table-column prop="data3" label="毛利" ></el-table-column>
          </el-table-column>
          <el-table-column label="新加坡">
            <el-table-column prop="data1" label="产值" ></el-table-column>
            <el-table-column prop="data2" label="人均产值" ></el-table-column>
            <el-table-column prop="data3" label="毛利" ></el-table-column>
          </el-table-column>
          <el-table-column label="日本">
            <el-table-column prop="data1" label="产值" ></el-table-column>
            <el-table-column prop="data2" label="人均产值" ></el-table-column>
            <el-table-column prop="data3" label="毛利" ></el-table-column>
          </el-table-column>
          <el-table-column label="越南">
            <el-table-column prop="data1" label="产值" ></el-table-column>
            <el-table-column prop="data2" label="人均产值" ></el-table-column>
            <el-table-column prop="data3" label="毛利" ></el-table-column>
          </el-table-column>
          <el-table-column label="泰国">
            <el-table-column prop="data1" label="产值" ></el-table-column>
            <el-table-column prop="data2" label="人均产值" ></el-table-column>
            <el-table-column prop="data3" label="毛利" ></el-table-column>
          </el-table-column>
          <el-table-column label="马来西亚">
            <el-table-column prop="data1" label="产值" ></el-table-column>
            <el-table-column prop="data2" label="人均产值" ></el-table-column>
            <el-table-column prop="data3" label="毛利" ></el-table-column>
          </el-table-column>
        </el-table>
        <div class="charts-line">
          <div id="main1" style="width: 600px; height: 400px"></div>
          <div id="main2" style="width: 600px; height: 400px"></div>
          <div id="main3" style="width: 600px; height: 400px"></div>

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
        ["30", "35", "40", "40", "50"],
        ["10", "20", "25", "30", "35"],
        ["13", "22", "34", "34", "45"],
        ["20", "42", "38", "35", "45"],
        ["30", "35", "40", "45", "28"],
        ["41", "42", "34", "35", "25"],
        ["25", "35", "40", "45", "40"],
      ] ,

      tableData: [
        { date: '1月', data1: 80, data2: 75, data3: 90},
        { date: '2月', data1: 80, data2: 75, data3: 90},
        { date: '3月',  data1: 80, data2: 75, data3: 90},
        { date: '4月',  data1: 80, data2: 75, data3: 90},
        { date: '5月', data1: 80, data2: 75, data3: 90},
        { date: '6月',  data1: 80, data2: 75, data3: 90},
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
      this.charts2 = echarts.init(document.getElementById('main2'));
      this.charts3 = echarts.init(document.getElementById('main3'));
      this.charts1.setOption({
        title: {
          text: '产值分析汇总'
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ['中国上海', '印度尼西亚', '新加坡', '日本', '越南', '泰国', '马来西亚'],
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
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
          type: "value",
        },

        series: [
          { name: "中国上海", type: "line", smooth: true, data: this.opinionData[0], },
          { name: "印度尼西亚", type: "line",smooth: true,  data: this.opinionData[1], },
          { name: "新加坡", type: "line",smooth: true,   data: this.opinionData[2], },
          { name: "日本", type: "line",smooth: true,   data: this.opinionData[3], },
          { name: "越南", type: "line",smooth: true,  data: this.opinionData[4], },
          { name: "泰国", type: "line",smooth: true,  data: this.opinionData[5], },
          { name: "马来西亚", type: "line",smooth: true,  data: this.opinionData[6], },
        ],
      });
      this.charts2.setOption({
        title: {
          text: '人均产值分析汇总'
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ['中国上海', '印度尼西亚', '新加坡', '日本', '越南', '泰国', '马来西亚'],
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
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
          type: "value",
        },

        series: [
          { name: "中国上海", type: "line", smooth: true, data: this.opinionData[0], },
          { name: "印度尼西亚", type: "line",smooth: true,  data: this.opinionData[1], },
          { name: "新加坡", type: "line",smooth: true,   data: this.opinionData[2], },
          { name: "日本", type: "line",smooth: true,   data: this.opinionData[3], },
          { name: "越南", type: "line",smooth: true,  data: this.opinionData[4], },
          { name: "泰国", type: "line",smooth: true,  data: this.opinionData[5], },
          { name: "马来西亚", type: "line",smooth: true,  data: this.opinionData[6], },
        ],
      });
      this.charts3.setOption({
        title: {
          text: '毛利分析汇总'
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ['中国上海', '印度尼西亚', '新加坡', '日本', '越南', '泰国', '马来西亚'],
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
          data: ['1月', '2月', '3月', '4月', '5月', '6月']
        },
        yAxis: {
          type: "value",
        },

        series: [
          { name: "中国上海", type: "line", smooth: true, data: this.opinionData[0], },
          { name: "印度尼西亚", type: "line",smooth: true,  data: this.opinionData[1], },
          { name: "新加坡", type: "line",smooth: true,   data: this.opinionData[2], },
          { name: "日本", type: "line",smooth: true,   data: this.opinionData[3], },
          { name: "越南", type: "line",smooth: true,  data: this.opinionData[4], },
          { name: "泰国", type: "line",smooth: true,  data: this.opinionData[5], },
          { name: "马来西亚", type: "line",smooth: true,  data: this.opinionData[6], },
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
