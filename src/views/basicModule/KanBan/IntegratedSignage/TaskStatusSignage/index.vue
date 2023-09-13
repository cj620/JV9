<template>
  <dv-full-screen-container>
    <div class="TaskStatus-signage">
      <div class="TaskStatus-signage-header">
        <div class="TaskStatus-signage-header-left">
          logo
        </div>
        <div class="TaskStatus-signage-header-center">
          {{ $t("DataV.Da_DepartmentSignage") }}
        </div>
        <div class="TaskStatus-signage-header-right">
          <formatted-time/>
        </div>
      </div>
      <div class="TaskStatus-signage-content">

        <div class="TaskStatus-signage-content-top">
          <div>
            <item-box :title="$t('DataV.Da_LastWeekCapacity')" class="TaskStatus-signage-content-top-box">
              <weekDataBox :boxData="result.LastWeekCapacity"></weekDataBox>
            </item-box>
          </div>
          <div>
            <item-box :title="$t('DataV.Da_NextWeekCapacity')" class="TaskStatus-signage-content-top-box">
              <weekDataBox :boxData="result.NextWeekCapacity"></weekDataBox>
            </item-box>
          </div>
        </div>

        <div class="TaskStatus-signage-content-bottom">
          <div v-for="(item) in result.ResourcesStatus" class="TaskStatus-signage-content-bottom-box">
            <item-box :title="item.Name" style="width: 100%;">
              <resourceBox :boxData="item"></resourceBox>
            </item-box>
          </div>
        </div>
      </div>
      <d-loading v-show="loading" />
    </div>
  </dv-full-screen-container>
</template>
<script>
import dLoading from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/d-loading.vue";
import FormattedTime from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/formattedTime.vue";
import ItemBox from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/itemBox.vue";
import resourceBox from "./components/resourceBox.vue";
import { department_comprehensive_dashboard } from "@/api/basicApi/dataV/kanban";
import weekDataBox from "./components/weekDataBox.vue";
import screenFull from 'screenfull';
export default {
  Name: "TaskStatusSignage",
  components: { weekDataBox, ItemBox, FormattedTime, dLoading, resourceBox },

  data() {
    return {
      loading: false,
      result: {
        ResourcesStatus: [],
        LastWeekCapacity: [],
        NextWeekCapacity: [],
      },
    };
  },
  created() {
    this.loading = true;
    screenFull.toggle(); // 全屏
    this.getData()
  },
  methods: {
    getData(){
      department_comprehensive_dashboard().then(
        (res) => {
          this.result.ResourcesStatus = res['ResourcesStatus'];
          this.result.LastWeekCapacity = res['LastWeekCapacity'];
          this.result.NextWeekCapacity = res['NextWeekCapacity'];
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
        });
    }
  },
}
</script>
<style scoped lang="scss">
.TaskStatus-signage {
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
  &-content {
    padding: 0 20px;
    overflow: hidden;
    height: calc(100% - 90px);
    &-top {
      width: 1880px;
      height: 33%;
      display: flex;
      &-box {
        height: 100%;
        width: 940px;
      }
    }
    &-bottom {
      width: 1880px;
      height: 66%;
      display: flex;
      flex-wrap: wrap;
      &-box {
        height: 50%;
        width: 626.6px;
      }
    }

  }
}
</style>
