<!--
 * @Author: C.
 * @Date: 2022-08-31 09:59:45
-->
<template>
    <PageWrapper :footer="false">
  <jv-block title="机床运行状态">
    <div class="state-bar">
      <el-tooltip
        v-for="(item, index) in machineData.Data"
        :key="index"
        :style="{ background: item.state, width: item.time / 14.4 + '%' }"
        class="state-item"
        effect="dark"
        :content="Number(item.time)"
        placement="top-start"
      >
        <div>{{ item.time }}</div>
      </el-tooltip>
    </div>
    <div style="height:20px;border: 1px solid #000;width: 100%;display: flex ">
      <div v-for="(item,index) in 24" :style="{width: (100/24)+'%'}">
        {{index}}

      </div>
    </div>

  </jv-block>
        <button @click="a"> 1</button>

        <el-time-select
            placeholder="起始时间"
            v-model="startTime"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
        </el-time-select>
    </PageWrapper>
</template>
<script>
import { getBarData } from "./utils";
import { sales_order_test_list } from "@/api/workApi/sale/order";
export default {
  name: "Home",

  data() {
    return {
      machineData: null,
		startTime: '',
    };
  },
  created() {
    this.machineData = getBarData();
    this.getData()
  },
  methods: {
	  a(){
		console.log(this.startTime)
	},
    getData(){
      sales_order_test_list({
        "CustomerId":"C001",
        "BillId":"",
        "CustomerName":"",
        "State":"",
        "PageSize":20,
        "CurrentPage":1
      }).then(res=>{
        console.log(res)
      })

    }
  },
};
</script>
<style lang="scss" scoped>
.state-bar {
  width: 100%;
  height: 50px;
  border: 1px solid #ccc;
  background-color: #ccc;
  display: flex;
  justify-content: flex-start;
  .state-item {
    height: 100%;
    &:hover {
      filter: brightness(1.2);
    }
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
