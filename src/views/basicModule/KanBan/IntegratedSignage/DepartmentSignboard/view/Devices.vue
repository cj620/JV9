<template>
  <div class="Devices">
    <div class="Devices-title">{{$t('DataV.Da_Devices')}}</div>
    <div class="Devices-content">
      <div class="Devices-content-info">
        <div v-for="(item, i) in infoList" :key="i">{{ item.label }}：<span style="font-weight: bold;font-size: 18px">{{result[item.prop]}}</span></div>
      </div>
      <div class="Devices-content-item-box">
        <RollList :step="cWindow.global_config.DataVStep-80" v-if="JSON.stringify(result) !== '{}'" id="infoId">
          <div class="Devices-content-item" v-for="(item, i) in result['DevicesList']" :key="i">
            <div class="Devices-content-item-top">
              <div class="Devices-content-item-top-devices-name">
                <span class="Devices-content-item-top-devices-name-state" :style="{background: EquipmentStatusEnum[item.State].color}"></span>
                {{item.DevicesName || '--' }}
              </div>
              <div class="Devices-content-item-top-worker">{{item.Worker || '--' }}</div>
              <div class="Devices-content-item-top-devices-no">{{item.DevicesNo || '--' }}</div>
            </div>
            <div class="Devices-content-item-bottom">
              <div class="Devices-content-item-bottom-img">
                <CImage :src="item.PhotoUrl" :preview-src-list="[item.PhotoUrl]" />
              </div>
              <div class="Devices-content-item-bottom-left Devices-content-item-bottom-common">
                <span>{{$t('DataV.Da_OperatingHours')}}：{{item.OperatingHours || '--' }}</span>
                <span>{{$t('DataV.Da_CurrentNumberOfWorkpieces')}}：{{item.CurrentNumberOfWorkpieces || '--' }}</span>
                <span>{{$t('DataV.Da_PlannedCropYield')}}：{{item.PlannedCropYield}}</span>
              </div>
              <div class="Devices-content-item-bottom-right Devices-content-item-bottom-common">
                <span>{{$t('DataV.Da_RunTime')}}(M)：{{item.RunTime}}</span>
                <span>{{$t('DataV.Da_DownTime')}}(M)：{{item.DownTime}}</span>
                <span>{{$t('DataV.Da_ActualCropYield')}}：{{item.ActualCropYield}}</span>
              </div>
            </div>
          </div>
        </RollList>
      </div>
    </div>
  </div>
</template>

<script>
import RollList from "@/components/RollList/index.vue";
import CImage from "@/components/CImage/index.vue";
import {EquipmentStatusEnum} from "@/enum/baseModule/dataV/EquipmentStatus";
const cWindow = window;
export default {
  name: "Devices",
  components: { CImage, RollList },
  props: {
    result: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      cWindow,
      EquipmentStatusEnum,
      infoList: [
        {label: i18n.t('DataV.Da_NormalMachine'), prop: 'NormalNumberOfUnits'},
        {label: i18n.t('DataV.Da_ShutdownMaintenance'), prop: 'ShutdownMaintenance'},
        {label: i18n.t('DataV.Da_OperationalAvailability'), prop: 'OperationalAvailability'},
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.Devices{
  width: 660px;
  height: calc(100% - 40px);
  background: #242d48;
  margin-top: 20px;
  margin-left: 20px;
  &-title {
    font-size: 18px;
    font-weight: bold;
    color: #eaeaea;
    height: 40px;
    width: 100%;
    text-align: center;
    line-height: 40px;
  }
  &-content{
    height: calc(100% - 50px);
    width: calc(100% - 20px);
    border: 1px solid #374264;
    margin-left: 10px;
    //margin-top: 10px;
    box-sizing: border-box;
    &-info{
      display: flex;
      height: 40px;
      justify-content: space-between;
      align-items: center;
      color: #eaeaea;
      padding: 0 20px;
      div{
        flex: 3;
        text-align: start;
      }
      div:nth-child(2){
        flex: 3.6;
      }
      div:last-child{
        flex: 3.3;
      }
    }
    &-item{
      height: 153.6px;
      position: relative;
      box-sizing: border-box;
      padding-top: 10px;
      color: #eaeaea;
      &-top{
        width: 100%;
        display: flex;
        height: 30px;
        div{padding-left: 20px;display: flex;
        align-items: center;height: 100%}
        &-devices-name{
          width: 158px;
          &-state{
            display: inline-block;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            background: #a7f241;
            margin-right: 10px;
          }
        }
        &-worker{
          width: 240px;
        }
        &-devices-no{
          width: 240px;
        }
      }
      &-bottom{
        margin-top: 10px;
        width: 100%;
        display: flex;
        height: 100px;
        &-common{
          padding: 10px 0 10px 20px;
          width: 240px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
        &-img{
          padding: 4px 0 10px 20px;
          width: 158px;
        }
        &-left{

        }
        &-right{

        }
      }
    }
    .Devices-content-item:after{
      content: '';
      position: absolute;
      height: 1px;
      width: 600px;
      left: 19px;
      background: #374264;
      bottom: 0;
    }
    &-item-box{
      width: 100%;
      height: 768px;
      overflow-y: hidden;
    }
  }
}
</style>
