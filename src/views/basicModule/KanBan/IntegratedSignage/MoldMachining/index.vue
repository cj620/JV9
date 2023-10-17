<template>
  <dv-full-screen-container>
    <div class="data-v-content">
      <div class="data-v-content-header">
        <div>
          <img src="../logo.png" />
        </div>
        <div class="data-v-content-header-title">模具综合看板</div>
        <formatted-time style="font-size: 20px" format="yyyy-MM-dd hh:mm" />
      </div>
      <div class="data-v-content-main">
        <main-left :LeftDataList="DataList" v-if="IsShow"></main-left>
        <main-centre :CentreDataList="DataList" v-if="IsShow"></main-centre>
        <main-right :RightDataList="DataList" v-if="IsShow"></main-right>
      </div>
    </div>
  </dv-full-screen-container>
</template>

<script>
import mainLeft from "./components/main-left.vue";
import mainCentre from "./components/main-centre.vue";
import mainRight from "./components/main-right.vue";
import screenFull from "screenfull";

import { timeFormat } from "~/utils/time/index";
import {Data} from './data';
import { data_report_vkb_datav_dashboard } from "@/api/workApi/production/dataReport";
import FormattedTime from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/formattedTime.vue";
export default {
  name: "index",
  components: {
    FormattedTime,
    mainLeft,
    mainCentre,
    mainRight,
  },
  data() {
    return {
      currentTime: timeFormat(new Date(), "yyyy-MM-dd hh:mm:ss"),
      DataList: {},
      IsShow: false,
    };
  },
  created() {
    screenFull.toggle();
    this.getData();
  },
  methods: {
    getData() {
      setTimeout(() => {
        this.IsShow = true;
        this.DataList = Data;
      },800)
      // data_report_vkb_datav_dashboard().then((res) => {
      //   console.log(res, 9898989);
      //   this.IsShow = true;
      //   this.DataList = res;
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
.data-v-content {
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue";
  background: url("./img/bg.jpg") no-repeat 0px 0px;
  color: #ffffff;
  .data-v-content-header {
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30px;
    img{
      height: 60px;
    }
    .data-v-content-header-title {
      font-size: 35px;
      font-weight: 500;
    }
    .data-v-content-header-time {
      font-size: 25px;
      font-weight: 400;
      opacity: 0.9;
    }
  }
}
* {
  margin: 0;
  padding: 0;
}
.data-v-content-main {
  display: flex;
  height: calc(100% - 100px);
}
</style>
