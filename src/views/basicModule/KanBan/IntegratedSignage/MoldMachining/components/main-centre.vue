<template>
<div  class="data-v-main-centre">
  <div class="centre-top">
    <div v-for="(item,index) in dataList" :class="'centre-top-circle'+(index+1)" :key="index">
      <div class="title">{{ item.Value }}</div>
      <div class="value">{{ item.Name }}</div>
      <div class="value" v-show="false">{{ msg }}</div>
    </div>

  </div>
  <div  class="centre-center">
    <div  class="centre-center-data" v-for="(item,index) in centreDataList" :key="index">
      <div class="centre-center-data-pie">
        <conic-gradient :rate="item.Value" :config=item.Config>
        </conic-gradient>
      </div>

      <div class="centre-center-data-title">
        {{ item.Name }}
      </div>



    </div>
  </div>
  <div class="centre-bottom">
    <div  class="centre-bottom-title">
      <div>紧急工单</div>
      <div>共计：
      <span  class="centre-bottom-title-number">
        {{EmergencyProdTask.length}}
      </span>
        </div>
    </div>
    <div   class="centre-bottom-table">
    
     
        <custom-table :data="EmergencyProdTask"></custom-table> 
  

    </div>
  </div>
</div>
</template>

<script>
import conicGradient from "./conic-gradient.vue";

import customTable from "./customTable.vue";

export default {
  name: "main-centre",
  components: {
    conicGradient,
    customTable
  },
  data(){
    return{
      dataList:[

      ],
      msg:1,
      centreDataList:[],
      EmergencyProdTask:[]


    }
  },
  props:{
    CentreDataList:{
      type:Object,
      default:{}
    }
  },

  created() {
    this.dataList=this.CentreDataList.Data4
    this.centreDataList=this.CentreDataList.Data5
    this.EmergencyProdTask=this.CentreDataList.Data6
    console.log(this.centreDataList,98989898);

  },
  mounted() {
    this.changeData();
  },
  activated() {
    console.log("activated");
    this.changeData();
  },
  methods:{
    changeData(){
      this.timer = setInterval(() => {
        this.dataList=this.shuffle(this.dataList)
        console.log(11, this.dataList);
        this.msg=Math.random()

      }, 5000);
    },
    shuffle(array) {
      let str =''
      str=array[0]
      for (let i = 0; i < 4; i++) {
        array[i]=array[i+1];
      }
      array[4]=str;
      return array;
    },

}
}
</script>

<style lang="scss" scoped>
$fontWeight: 500;
.data-v-main-centre{
  width: 2010px;
  height: 100%;

  margin: 0 22px;
  .centre-top{
    height: 868px;
    margin-bottom: 130px;
    position: relative;
    .centre-top-circle1{
      width: 255px;
      height:255px;
      background: url("../img/circle1.png") no-repeat 0px 0px;
      position:absolute;
      left: 422px;
      top: 146px;
     display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .title{
        font-size: 58px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 25px;
        font-weight: $fontWeight;
      }
    }
    .centre-top-circle2{
      width: 164px;
      height:164px;
      background: url("../img/circle2.png") no-repeat 0px 0px;
      position:absolute;
      left: 510px;
      top: 720px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .title{
        font-size: 40px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 18px;
        font-weight: $fontWeight;
      }
    }
    .centre-top-circle3{
      width: 405px;
      height:405px;
      background: url("../img/circle3.png") no-repeat 0px 0px;
      position:absolute;
      left: 780px;
      top: 310px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .title{
        font-size: 78px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 38px;
        font-weight: $fontWeight;
      }
    }
    .centre-top-circle4{
      width: 200px;
      height:200px;
      background: url("../img/circle4.png") no-repeat 0px 0px;
      position:absolute;
      left: 1300px;
      top: 170px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .title{
        font-size: 48px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 22px;
        font-weight: $fontWeight;
      }
    }
    .centre-top-circle5{
      width: 270px;
      height:270px;
      background: url("../img/circle5.png") no-repeat 0px 0px;
      position:absolute;
      left: 1315px;
      top: 610px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .title{
        font-size: 34px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 22px;
        font-weight: $fontWeight;
      }
    }
  }
  .centre-center{
    display: flex;
    .centre-center-data{
      width: 240px;
      height: 300px;
      margin-left: 130px;
      .centre-center-data-pie{
        width: 240px;
        height: 240px;
      }
      .centre-center-data-title{
        margin-top: 20px;
        font-size: 30px;
        text-align: center;
        font-weight: $fontWeight;
      }

    }
  }
  .centre-bottom{
    background-color: #242947;
    height: 545px;
    margin-top: 85px;
    padding: 35px;
    .centre-bottom-title{
      display: flex;
      font-size: 40px;
      font-weight: $fontWeight;
      justify-content: space-between;
      justify-items: center;
      align-items: center;
      div{
        display: flex;
        justify-items: center;
        align-items: center;
      }
      .centre-bottom-title-number{
        font-size: 60px;
        font-weight: $fontWeight;

        color: #ff5a6a;
      }

    }
    .centre-bottom-table{
      margin-top: 50px;

    }
  }
}
</style>
