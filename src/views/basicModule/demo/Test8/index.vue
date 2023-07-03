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
          人员作业汇总
        </div>
        <div class="productionTask-header-title">
          <div class="title">
            <i class="el-icon-search"></i>

            <div style="margin-left: 50px">2023/6/01-2023/6/30</div>

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
              <el-table-column prop="data1" label="人员" ></el-table-column>
              <el-table-column prop="data2" label="工序类别" ></el-table-column>
              <el-table-column prop="data3" label="计划工时"></el-table-column>
                <el-table-column prop="data4" label="实际工时"></el-table-column>
                <el-table-column prop="data5" label="超时"></el-table-column>
          
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
        {  data1: '张三',data2: '设计',  data3: 210, data4: 200, data5: 10, },
        {  data1: '张三1',data2: '设计',  data3: 210, data4: 200, data5: 10, },
        {  data1: '张三2',data2: '设计', data3: 210, data4: 200, data5: 10, },
        {  data1: '张三3',data2: '设计', data3: 210, data4: 200, data5: 10, },
        {  data1: '张三4',data2: '编程', data3: 210, data4: 200, data5: 10, },
        {  data1: '张三5',data2: '编程', data3: 210, data4: 200, data5: 10, },
        {  data1: '张三6',data2: '编程',  data3: 210, data4: 200, data5: 10, },
        {  data1: '张三7',data2: '编程',  data3: 210, data4: 200, data5: 10, },
        {  data1: '李四',data2: '加工',  data3: 210, data4: 200, data5: 10, },
        {  data1: '李四1',data2: '加工',data3: 210, data4: 200, data5: 10, },
        {  data1: '李四2',data2: '加工', data3: 210, data4: 200, data5: 10, },
        {  data1: '李四3',data2: '加工',  data3: 210, data4: 200, data5: 10, },
        {  data1: '李四4',data2: '加工',  data3: 210, data4: 200, data5: 10, },
        {  data1: '李四5',data2: '加工',  data3: 210, data4: 200, data5: 10, },
        {  data1: '李四6',data2: '加工',  data3: 210, data4: 200, data5: 10, },
        {  data1: '李四7',data2: '加工',  data3: 210, data4: 200, data5: 10, },
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
