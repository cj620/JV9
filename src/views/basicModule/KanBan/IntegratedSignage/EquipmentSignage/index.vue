<template>
  <dv-full-screen-container>
    <div class="Equipment-signage">
      <div class="Equipment-signage-header">
        <div class="Equipment-signage-header-left">
          <img src="../logo.png" alt="">
        </div>
        <div class="Equipment-signage-header-center">
          {{ $t("DataV.Da_EquipmentSignage") }}
        </div>
        <div class="Equipment-signage-header-right">
          <formatted-time />
        </div>
      </div>
      <div class="Equipment-signage-content">
        <div class="Equipment-signage-content-left">
          <div
            class="Equipment-signage-content-left-box aside-box"
            v-for="(item, i) in leftList"
            :key="i"
          >
            <item-box :title="item.title">
              <Component :is="item.component" :result="item.result" />
            </item-box>
          </div>
        </div>
        <!--  中间部分-->
        <div class="Equipment-signage-content-center">
          <EquipmentSignageContent :contentResult="contentResult" />
        </div>
        <div class="Equipment-signage-content-right">
          <div
            class="Equipment-signage-content-right-box aside-box"
            v-for="(item, i) in rightList"
            :key="i"
          >
            <item-box :title="item.title">
              <Component :is="item.component" :result="item.result" />
            </item-box>
          </div>
        </div>
      </div>
      <d-loading v-show="loading" />
    </div>
  </dv-full-screen-container>
</template>

<script>
import FormattedTime from "./components/formattedTime.vue";
import itemBox from "./components/itemBox.vue";
import dLoading from "./components/d-loading.vue";
import EquipmentStatus from "./view/EquipmentStatus.vue";
import AlarmSituation from "./view/AlarmSituation.vue";
import ShutdownCondition from "./view/ShutdownCondition.vue";
import OverallEfficiency from "./view/OverallEfficiency.vue";
import EquipmentDynamicCurve from "./view/EquipmentDynamicCurve.vue";
import HUT from "./view/HUT.vue";
import { equipment_comprehensive_dashboard } from "@/api/basicApi/dataV/kanban";
import EquipmentSignageContent from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/view/EquipmentSignageContent.vue";
import screenFull from 'screenfull';
export default {
  name: "EquipmentSignage",
  components: { EquipmentSignageContent, FormattedTime, itemBox, dLoading },
  data() {
    return {
      loading: false,
      timer: null,
      leftList: [
        {
          title: i18n.t("DataV.Da_EquipmentStatus"),
          component: EquipmentStatus,
          result: [],
        },
        {
          title: i18n.t("DataV.Da_AlarmSituation"),
          component: AlarmSituation,
          result: [],
        },
        {
          title: i18n.t("DataV.Da_ShutdownCondition"),
          component: ShutdownCondition,
          result: [],
        },
      ],
      rightList: [
        {
          title: i18n.t("DataV.Da_OverallEfficiency"),
          component: OverallEfficiency,
          result: [],
        },
        {
          title: i18n.t("DataV.Da_EquipmentDynamicCurve"),
          component: EquipmentDynamicCurve,
          result: {},
        },
        { title: i18n.t("DataV.Da_HUT"), component: HUT, result: {} },
      ],
      contentResult: {EquipmentProcessingInfo: {},EquipmentOperationTimeline: []},
    };
  },
  created() {
    screenFull.toggle(); // 全屏
    this.loading = true;
    this.getResult();
    this.timer = setInterval(this.getResult, window.global_config.DashboardRefreshTime);
  },
  mounted() {},
  methods: {
    getResult() {
      const left = ["EquipmentStatus", "AlarmSituation", "ShutdownCondition"];
      const right = ["OverallEfficiency", "EquipmentDynamicCurve", "HUT"];
      equipment_comprehensive_dashboard()
        .then((res) => {
          left.forEach((item, i) => {
            this.leftList[i].result = res[item];
          });
          right.forEach((item, i) => {
            this.rightList[i].result = res[item];
          });
          this.contentResult.EquipmentProcessingInfo = res['EquipmentProcessingInfo'];
          this.contentResult.EquipmentOperationTimeline = res['EquipmentOperationTimeline'];

          // 假数据
          // let list = []
          // for (let i = 0; i < 20; i++) {
          //   res['EquipmentOperationTimeline'].forEach(item => {
          //     list.push(item)
          //   })
          // }
          // this.contentResult.EquipmentOperationTimeline = list;

          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    }
  },
  beforeDestroy() {
    //清除定时器
    clearTimeout(this.timer);
  },
  destroyed() {
    //清除定时器
    clearTimeout(this.timer);
    this.timer = null;
  },
};
</script>

<style scoped lang="scss">
.Equipment-signage {
  width: 100%;
  height: 100%;
  background: #0b0f28;
  overflow: hidden;
  &-header {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    background: url("./3.svg") no-repeat;
    background-size: cover;
    &-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    &-center {
      font-size: 30px;
      color: #fff;
      height: 100%;
      line-height: 80px;
      z-index: 1;
    }
    &-left {
      height: 100%;
      display: flex;
      align-items: flex-end;
      padding-left: 20px;
      color: #fff;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 200px;
      position: relative;
      img{
        width: 100%;
        position: absolute;
        bottom: -6px;
      }
    }
    &-right {
      height: 100%;
      color: #efefef;
      display: flex;
      align-items: flex-end;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 200px;
      justify-content: center;
    }
  }
  &-content {
    width: 100%;
    height: calc(100% - 90px);
    display: flex;
    &-left {
      width: 470px;
      height: 100%;
      margin-right: 10px;
      padding-left: 20px;
    }
    &-right {
      width: 470px;
      height: 100%;
      margin-left: 10px;
      padding-right: 20px;
    }
    &-center {
      width: 960px;
      height: 100%;
    }
    .aside-box {
      height: 33%;
    }
  }
}
</style>
