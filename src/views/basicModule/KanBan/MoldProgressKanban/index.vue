<!--
 * @Author: H.
 * @Date: 2022-01-18 09:13:37
 * @LastEditTime: 2022-01-18 10:50:10
 * @Description:模具进度看板
-->
<template>
  <div class="mold-progress">
    <div class="mold-progress-header">
      <div class="mold-progress-header-circle">
        <div v-for="(item,index) in circleCount"
             :key="index"
             :class="[params.CurrentPage-1===index?'active':'','mold-progress-header-circle-item']"

        ></div>
      </div>
      <div class="mold-progress-header-title">
        {{$t('Generality.Ge_ToolingProgressDashboard')}}
      </div>
      <div class="mold-progress-header-time">
        {{currentTime|timeFormat('dd/MM/yyyy hh:mm')}}
      </div>

    </div>
    <div class="mold-progress-data">
      <div v-for="(item,index) in MoldProgressData" :key="index" class="mold-progress-data-item">
        <MoldItem :MoldProgressData="item" :key="item.ToolingNo" />
      </div>
    </div>

  </div>
</template>

<script>
import MoldItem from "./cpn/MoldItem.vue";
import { MoldProgressReport } from "@/api/basicApi/systemSettings/report";
export default {
  components: {
    MoldItem,
  },

  data() {
    return {
      params: {
        PageSize: window.global_config.DashboardQuantity?window.global_config.DashboardQuantity:14,
        CurrentPage: 1,
        SortOrder: 1,
      },
      timer: null,
      timers: null,
      currentTime: new Date(),
      circleCount:0,
      MoldProgressData: [],
    };
  },
  created() {
    console.log(window.global_config.DashboardRefreshTime)
    this.getData();
    this.timers = setInterval(()=> {
      this.currentTime = new Date()
    },1000)


  },
  methods: {
    getData() {
      MoldProgressReport(this.params).then((res) => {
        this.MoldProgressData = res.Items;
        this.circleCount = Math.ceil(res.Count/this.params.PageSize)
        this.timeInterval(res)

      });
    },
    timeInterval(){
      const time = window.global_config.DashboardRefreshTime?window.global_config.DashboardRefreshTime:60000
      this.timer = setTimeout(() => {
        if(this.params.CurrentPage=== this.circleCount){
          this.params.CurrentPage=1
          this.getData();
        }else {
          this.params.CurrentPage++
          this.getData();
        }
      }, time);
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timers);
    this.timer = null;
    this.timers = null;
  }

};
</script>

<style lang="scss" scoped>
  .mold-progress{
    background: #1B2563;
    color: #ffffff;
    height: 100%;
    min-height: 1080px;
    .mold-progress-header{
      height: 80px;
      font-size: 44px;
      display: flex;
      margin:0px 1% ;
      align-items: center;
      background: url("./bg1.png") no-repeat 0px 25px  ;
      background-size: 100% 100%;
      justify-content: space-between;
      .mold-progress-header-circle{
        width: 218px;
        display: flex;
        align-self: flex-end;
        .mold-progress-header-circle-item{
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background-color: #848484;
          margin-right: 7px;
        }
      }
      .mold-progress-header-title{
        text-align: center;
      }
      .mold-progress-header-time{
        font-size: 28px;
        align-self: flex-end;
      }

    }
    .mold-progress-data{
      display: flex;
      flex-wrap: wrap;
      padding: 10px;
      .mold-progress-data-item{
        width: 48%;
        height: 120px;
        background: #fff;
        color: #101010;
        font-size: 28px;
        margin:10px 1% 10px 1% ;
        border-radius: 7px;

      }
    }
  }
.active{
  background-color: #41EE39!important;

}

</style>
