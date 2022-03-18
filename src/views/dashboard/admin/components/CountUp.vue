<!--
 * @Author: H.
 * @Date: 2021-12-22 09:35:18
 * @LastEditTime: 2021-12-23 09:36:03
 * @Description:
-->
<template>
  <div class="card-panel">
    <div class="card-panel-icon-wrapper icon-people">
      <svg-icon :iconClass="typeMap[countUpData.type].icons" class-name="card-panel-icon" />
    </div>
    <div class="card-panel-description">
      <div class="card-panel-text">{{ countUpData.title }}</div>
      <count-to
        :start-val="countUpData.startVal || 0"
        :end-val="countUpData.endVal || 0"
        :duration="countUpData.duration || 2600"
        class="card-panel-num"
      />
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  props: {
    countUpData: {
      type: Object,
      default: () => ({}),
    },
  },
  data(){
    return{
      typeMap:{
        DesignChangeQuantityOfCurrentMonth:{
          icons:'edit-two'
        },
        NewToolingQuantityOfCurrentMonth:{
          icons:'control_point_duplicate'
        },
        ToolCorrectionQuantityOfCurrentMonth:{
          icons:'if-fix-tools'
        },
        TrialToolingQuantityOfCurrentMonth:{
          icons:'flask'
        },
      }
    }
  },
  components: {
    CountTo,
  },
};
</script>

<style lang="scss" scoped>
.card-panel {
  height: 108px;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);

  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }
  .card-panel-icon {
    float: left;
    font-size: 48px;
  }
  .card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;

    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }

    .card-panel-num {
      font-size: 20px;
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
