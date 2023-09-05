<template>
  <dv-full-screen-container>
    <div class="Equipment-signage">
      <div class="Equipment-signage-header">
        <div class="Equipment-signage-header-left">logo</div>
        <div class="Equipment-signage-header-center">
          {{ $t("DataV.Da_EquipmentSignage") }}
        </div>
        <div class="Equipment-signage-header-right">
          <formatted-time format="yyyy/MM/dd hh:mm"/>
        </div>
      </div>
      <div class="Equipment-signage-content">
        <div class="Equipment-signage-content-left">
          <div class="Equipment-signage-content-left-box aside-box" v-for="(item, i) in leftList" :key="i">
            <item-box :title="item.title">
              <Component :is="item.component" :result="item.result"/>
            </item-box>
          </div>
        </div>
        <div class="Equipment-signage-content-center"></div>
        <div class="Equipment-signage-content-right">
          <div class="Equipment-signage-content-right-box aside-box" v-for="(item, i) in rightList" :key="i">
            <item-box :title="item.title">
              <Component :is="item.component" :result="item.result" />
            </item-box>
          </div>
        </div>
      </div>
    </div>
  </dv-full-screen-container>
</template>

<script>
import FormattedTime from "./components/formattedTime.vue";
import itemBox from './components/itemBox.vue';
import EquipmentStatus from "./view/EquipmentStatus.vue";
import AlarmSituation from "./view/AlarmSituation.vue";
import ShutdownCondition from "./view/ShutdownCondition.vue";
import OverallEfficiency from "./view/OverallEfficiency.vue";
import EquipmentDynamicCurve from "./view/EquipmentDynamicCurve.vue";
import HUT from "./view/HUT.vue";
export default {
  name: "EquipmentSignage",
  components: { FormattedTime, itemBox},
  data() {
    return {
      leftList: [
        {title: i18n.t('DataV.Da_EquipmentStatus'), component: EquipmentStatus},
        {title: i18n.t('DataV.Da_AlarmSituation'), component: AlarmSituation},
        {title: i18n.t('DataV.Da_ShutdownCondition'), component: ShutdownCondition},
      ],
      rightList: [
        {title: i18n.t('DataV.Da_OverallEfficiency'), component: OverallEfficiency},
        {title: i18n.t('DataV.Da_EquipmentDynamicCurve'), component: EquipmentDynamicCurve},
        {title: i18n.t('DataV.Da_HUT'), component: HUT},
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      this.$set(this.leftList[0], 'result', [
        { value: 1048, name: 'Alarm'},
        { value: 735, name: 'Operation'},
        { value: 580, name: 'Leisure'},
        { value: 484, name: 'Shutdown'},
        { value: 300, name: 'NotCollected' }
      ])
    },500)
  },
  methods: {},
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
    &-center {
      font-size: 30px;
      color: #fff;
      height: 100%;
      line-height: 80px;
    }
    &-left {
      height: 100%;
      display: flex;
      align-items: flex-end;
      padding-left: 20px;
      color: #fff;
      padding-bottom: 10px;
      box-sizing: border-box;
    }
    &-right {
      height: 100%;
      color: #efefef;
      display: flex;
      align-items: flex-end;
      padding-right: 20px;
      padding-bottom: 10px;
      box-sizing: border-box;
    }
  }
  &-content {
    width: 100%;
    height: calc(100% - 90px);
    display: flex;
    &-left{
      width: 470px;
      height: 100%;
      margin-right: 10px;
      padding-left: 20px;
    }
    &-right{
      width: 470px;
      height: 100%;
      margin-left: 10px;
      padding-right: 20px;
    }
    &-center{
      width: 960px;
      height: 100%;
    }
    .aside-box{
      height: 33%;
    }
  }
}
</style>
