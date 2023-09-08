<template>
  <dv-full-screen-container>
    <div class="Sale-signage">
      <div class="Sale-signage-header">
        <div class="Sale-signage-header-left">
          logo
        </div>
        <div class="Sale-signage-header-center">
          {{ $t("DataV.Da_SaleSignage") }}
        </div>
        <div class="Sale-signage-header-right">
          <formatted-time format="yyyy/MM/dd hh:mm:ss" />
        </div>
      </div>
      <div class="Sale-signage-body"></div>
    </div>
    <d-loading v-show="loading" />
  </dv-full-screen-container>
</template>

<script>
import dLoading from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/d-loading.vue";
import FormattedTime from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/formattedTime.vue";

export default {
  name: "SaleSignage",
  components: { FormattedTime, dLoading },
  data(){
    return{
      loading: false,
    }
  }
}
</script>
<style scoped lang="scss">
.Sale-signage {
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
    background: url("../EquipmentSignage/3.svg") no-repeat;
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
}
</style>
