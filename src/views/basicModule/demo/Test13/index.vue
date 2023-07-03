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

            <div style="margin-left: 50px">时间：2023/6/26-2023/7/01</div>
            <div style="margin-left: 50px">地区：中国上海</div>

          </div>
          <div class="oprations">
            <div>   <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select></div>
          </div>
        </div>
        <div class="productionTask-header-setting"></div>
      </div>
    <el-row :gutter="20">

      <el-col :span="4"  v-for="item in transferDataList">
        <div style="border: 1px #000 solid;margin-top: 20px">
          <DeviceStatusContent :transferData="item"></DeviceStatusContent>
        </div>

      </el-col>


    </el-row>







  </div>
  </PageWrapper>
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
      transferDataList:[],
      options: [{
        value: '中国上海',
        label: '中国上海'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '中国上海',
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
  created() {
    let arr =['CNC01','CNC02','CNC03','CNC04','CNC05','CNC06','CNC07','CNC08','CNC09',
      'EDM01','EDM02','EDM03','EDM04','EDM05','EDM06','EDM07','EDM08','WEDM01','WEDM02','WEDM03','WEDM04']
    let str={}
    for (var i = 1; i <= arr.length; i++) {
      str = {
        State:'Runing',
          EquipmentId:arr[i],
        ImgUrl:'http://www.jverp.com:8101//Files/'+arr[i]+'.PNG',
        MakInfo:'YZ200054-621'+i,
        Activation:70+i,
      }
      if(i==2||i==7||i==10||i==15){
        str.State = 'stop'
        str.MakInfo = ''
      }
      this.transferDataList.push(str)
    }
  },
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
