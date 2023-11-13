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
    <div  class="centre-center-data" v-for="(item,index) in dataList5" :key="index">
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
      <div>{{ $t('Mold.Mo_OngoingOrders') }}</div>
      <div>{{ $t('Generality.Ge_total') }}：
      <span  class="centre-bottom-title-number">
        {{EmergencyProdTask.length}}
      </span>
        </div>
    </div>
    <div   class="centre-bottom-table">

        <d-roll-list
          :itemStyle="setStyle"
          :header-style="{borderBottom: 'none', background: '#303959'}"
          :table-config="tableConfig" :result="EmergencyProdTask"></d-roll-list>
<!--        <custom-table :data="EmergencyProdTask"></custom-table>-->


    </div>
  </div>
</div>
</template>

<script>
import conicGradient from "./conic-gradient.vue";

// import customTable from "./customTable.vue";
import DRollList from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/d-roll-list.vue";

export default {
  name: "main-centre",
  components: {
    DRollList,
    conicGradient,
    // customTable
  },
  data(){
    return{
      dataList:[

      ],
      dataList5:[],
      msg:1,
      centreDataList:[],
      EmergencyProdTask:[],

      tableConfig: [
        {prop: 'BillId', label: i18n.t('Generality.Ge_BillId')},
        {prop: 'ToolingNo', label: i18n.t('production.Pr_ToolingNo')},
        {prop: 'PartNo', label: i18n.t('design.De_ToolingNo')},
        {prop: 'PartName', label: i18n.t('Generality.Ge_PartName')},
        {prop: 'State', label: i18n.t('Generality.Ge_State')},
      ]
    }
  },
  props:{
    CentreDataList:{
      type:Object,
      default:{}
    }
  },

  created() {
    const menu = {
      Mo_DesignChangeThisMonth: this.$t('Mold.Mo_DesignChangeThisMonth'),
      Mo_TrialMoldThisMonth: this.$t('Mold.Mo_TrialMoldThisMonth'),
      Mo_OrdersReceivedThisMonth: this.$t('Mold.Mo_OrdersReceivedThisMonth'),
      Mo_NewToolingThisMonth: this.$t('Mold.Mo_NewToolingThisMonth'),
      Mo_CorrectingToolingThisMonth: this.$t('Mold.Mo_CorrectingToolingThisMonth'),
    }
    this.dataList=this.CentreDataList.Data4.map(item => {
      return {
        ...item,
        Name: menu[item.Name]
      }
    })
    const menu1 = {
      "Mo_MoldAchievementRate": this.$t('Mold.Mo_MoldAchievementRate'),
      "Mo_OverdueMolds": this.$t('Mold.Mo_OverdueMolds'),
      "Mo_PartAchievementRate": this.$t('Mold.Mo_PartAchievementRate'),
      "Mo_OverdueParts": this.$t('Mold.Mo_OverdueParts'),
      "Mo_TrialMoldAchievementRate": this.$t('Mold.Mo_TrialMoldAchievementRate'),
    }
    this.dataList5 = this.CentreDataList.Data5.map(item => {
      return {
        ...item,
        Name: menu1[item.Name]
      }
    })
    this.EmergencyProdTask=this.CentreDataList.Data6

  },
  mounted() {
    this.changeData();
  },
  activated() {
    this.changeData();
  },
  methods:{
    setStyle(item, index) {
      return {
        background: index % 2 === 1 ? '#303959' : '',
      }
    },
    changeData(){
      this.timer = setInterval(() => {
        this.dataList=this.shuffle(this.dataList)
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
  width: 960px;
  height: 100%;

  margin: 0 22px;
  .centre-top{
    height: 460px;
    margin-bottom: 50px;
    position: relative;
    .centre-top-circle1{
      width: 128px;
      height:128px;
      background: url("../img/circle1.png") no-repeat;
      background-size: cover;
      position:absolute;
      left: 200px;
      top: 70px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      .title{
        font-size: 28px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 12px;
        font-weight: $fontWeight;
      }
    }
    .centre-top-circle2{
      width: 82px;
      height:82px;
      background: url("../img/circle2.png") no-repeat;
      background-size: cover;
      position:absolute;
      left: 255px;
      top: 360px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .title{
        font-size: 20px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 12px;
        font-weight: $fontWeight;
      }
    }
    .centre-top-circle3{
      width: 202px;
      height:202px;
      background: url("../img/circle3.png") no-repeat;
      background-size: cover;
      position:absolute;
      left: 380px;
      top: 160px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .title{
        font-size: 37px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 16px;
        font-weight: $fontWeight;
      }
    }
    .centre-top-circle4{
      width: 100px;
      height:100px;
      background: url("../img/circle4.png") no-repeat;
      background-size: cover;
      position:absolute;
      left: 650px;
      top: 85px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .title{
        font-size: 24px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 12px;
        font-weight: $fontWeight;
      }
    }
    .centre-top-circle5{
      width: 135px;
      height:135px;
      background: url("../img/circle5.png") no-repeat;
      background-size: cover;
      position:absolute;
      left: 657px;
      top: 305px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .title{
        font-size: 18px;
        font-weight: $fontWeight;
      }
      .value{
        font-size: 12px;
        font-weight: $fontWeight;
      }
    }
  }
  .centre-center{
    display: flex;
    .centre-center-data{
      width: 130px;
      height: 150px;
      margin-left: 30px;
      margin-right: 30px;
      .centre-center-data-pie{
        width: 120px;
        height: 120px;
        margin-left: 10px;
      }
      .centre-center-data-title{
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
        font-weight: $fontWeight;
      }

    }
  }
  .centre-bottom{
    background-color: #242947;
    height: 280px;
    margin-top: 20px;
    padding: 8px;
    .centre-bottom-title{
      display: flex;
      font-size: 18px;
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
        font-size: 26px;
        font-weight: $fontWeight;

        color: #ff5a6a;
      }

    }
    .centre-bottom-table{
      height: 230px;
      margin-top: 10px;
    }
  }
}
</style>
