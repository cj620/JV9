<!--
 * @Author: C.
 * @Date: 2022-08-31 09:59:45
 * @LastEditTime: 2023-06-30 16:31:42
 * @Description: file content
-->
<template>
 
<div style="padding:20px">
  <div>
    <el-row  :gutter="20">
  <el-col :span="8">
    <div style="background: #fff; height: 108px;text-align: center;">
    <div style="font-size: 16px; padding-top: 36px;">本月订单数</div>
    <div style="font-size: 24px">100</div>
    </div>
  </el-col>
  <el-col :span="8">
    <div style="background: #fff; height: 108px;text-align: center;">
    <div style="font-size: 16px;padding-top: 36px;">本月金额</div>
    <div style="font-size: 24px">200000</div>
    </div>
  </el-col>
  <el-col :span="8">
    <div style="background: #fff; height: 108px;text-align: center;">
    <div style="font-size: 16px;padding-top: 36px;">本月出货数</div>
    <div style="font-size: 24px">95</div>
    </div>
  </el-col>
</el-row>
  </div>

  <div style="margin-top:20px ;">
    <el-row  :gutter="20">
  <el-col :span="8">
    <div id="main1" style="width: 100%;background: #fff; height: 350px"></div>
  </el-col>
  <el-col :span="8">
    <div id="main2" style="width: 100%;background: #fff; height: 350px"></div>
  </el-col>
  <el-col :span="8">
    <div id="main3" style="width: 100%;background: #fff; height: 350px"></div>
  </el-col>
</el-row>
  </div>

<div class="charts-line">
        
          <div id="main4" style="width: 1800px; height: 350px"></div>

        </div>
 
  

   </div>

</template>
<script>

import * as echarts from 'echarts';
export default {
  name: "Home",

  data() {
    return {
      src: "",

      opinionData1:[
        ["90", "80", "85", "90", "90", "95", "93"],
        ["8", "15", "10", "5", "8", "4", "5"],
        ["2", "5", "5", "5", "2", "1", "2"],
      
      ] ,
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
      this.charts2 = echarts.init(document.getElementById('main2'));
      this.charts3 = echarts.init(document.getElementById('main3'));

      this.charts4 = echarts.init(document.getElementById('main4'));
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
      this.charts4.setOption({
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
          { name: "合格率", 
          type: "bar", 
          smooth: true, 
          data: this.opinionData1[0],
          label: {
      show: true,
      formatter: '{c}%',
      position: "top"
    }
         },
          { name: "返工率", type: "bar",smooth: true,  data: this.opinionData1[1], },
          { name: "异常率", type: "bar",smooth: true,   data: this.opinionData1[2], },
        ],
      });

    },

    ClickSearch() {


    },
  },
};
</script>
<style lang="scss">

.charts-line{
background: #fff;
    display: flex;
    margin-top: 20px;
  }
</style>
