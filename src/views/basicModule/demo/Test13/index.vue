<!--
 * @Author: C.
 * @Date: 2022-08-31 09:59:45
 * @LastEditTime: 2023-06-30 16:31:42
 * @Description: file content
-->
<template>

  <div style="padding:20px;background-color: #fff">
    <div class="device-item">
      <div v-for="item in 10">
        <div style="width: 300px;border: 1px #000 solid">
          <DeviceStatusContent :transferData="transferData"></DeviceStatusContent>
        </div>
      </div>
    </div>








  </div>

</template>
<script>

import DeviceStatusContent from "./DeviceStatusContent";
export default {
  name: "Home",

  data() {
    return {
      src: "",
      transferData:{
        State:'Runing',
        EquipmentId:'CNC01',
        ImgUrl:'http://www.jverp.com:8101//Files/1478904863940149250.png',
        MakInfo:'YZ200054-621',
        Activation:20,
      },

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

  },
  components: {
    DeviceStatusContent
  },
  methods: {


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
.device-item{
  display: flex;
}
</style>
