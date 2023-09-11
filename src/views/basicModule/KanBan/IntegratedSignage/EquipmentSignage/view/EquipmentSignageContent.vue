<template>
  <div style="height: 100%">
    <div class="content-header">
      <div class="content-header-item" v-for="(item, i) in InfoList" :key="i"
      :style="{marginRight: i !== InfoList.length-1 ? '10px': ''}"
      >
        <dv-border-box-7 :color="['#17175c', '#264495']">
          <div class="content-header-item-box">
            <div class="content-header-item-box-title">{{item.title}}</div>
            <div class="content-header-item-box-number"
            :style="{color: i === InfoList.length-1 ? 'red' : '',
            minWidth: i === 1 ? '90px' : ''
            }"
            >
              <span v-if="contentResult.EquipmentProcessingInfo">{{contentResult.EquipmentProcessingInfo[item.prop]}}</span>
              <span v-if="i === 1">h</span>
              <span v-if="i === 2">%</span>
            </div>
          </div>
        </dv-border-box-7>
      </div>
    </div>
    <div class="content-table">
      <div class="content-table-header">
        <div class="content-table-header-Equipment content-table-header-common">{{$t('DataV.Da_Equipment')}}</div>
        <div class="content-table-header-DeviceName content-table-header-common">{{$t('DataV.Da_DeviceName')}}</div>
        <div class="content-table-header-time">
          <div v-for="(index, i) in 13" class="content-table-header-time-item">
            {{i*2}}h
          </div>
        </div>
      </div>
      <div class="content-table-content">
        <RollList :step="cWindow.global_config.DataVStep">
          <div class="content-table-content-item"
               v-for="(item, i) in contentResult.EquipmentOperationTimeline" :key="i"
          >
            <div class="content-table-content-item-Equipment content-table-content-item-common">
              <CImage :src="item.PhotoUrl" :preview-src-list="item.PhotoUrl"/>
            </div>
            <div class="content-table-content-item-DeviceName content-table-content-item-common">{{item['Equipment']}}</div>
            <div class="content-table-content-item-time">
              <div v-for="(time, t) in item.Values" :key="t"
                   :style="{width: setWidth(time, t, item)+'px', background: EquipmentStatusEnum[time.State].color}"></div>
            </div>
          </div>
        </RollList>

        <div class="content-table-content-bottom"  style="display: flex;align-items: center;justify-content: center">
          <div v-for="(item, i) in Object.keys(EquipmentStatusEnum)" :key="i"
               style="display: flex;align-items: center;color: #eaeaea;margin-right: 20px">
            <div class="content-table-content-bottom-bg" :style="{background: EquipmentStatusEnum[item].color,marginRight: '10px'}"></div>
            <div>{{EquipmentStatusEnum[item].name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EquipmentStatusEnum } from '@/enum/baseModule/dataV/EquipmentStatus';
import CImage from "@/components/CImage/index.vue";
import RollList from "@/components/RollList/index.vue";
const cWindow = window;
export default {
  name: "EquipmentSignageContent",
  components: { CImage, RollList },
  props: {
    contentResult: {
      type: Object,
      default() {
        return { EquipmentProcessingInfo: {}, EquipmentOperationTimeline: [] }
      }
    }
  },
  data() {
    return {
      cWindow,
      EquipmentStatusEnum,
      InfoList: [
        {title: i18n.t('DataV.Da_TotalProcessingQuantity'), prop: 'TotalProcessingQuantity'},
        {title: i18n.t('DataV.Da_AccumulatedProcessingTime'), prop: 'AccumulatedProcessingTime'},
        {title: i18n.t('DataV.Da_OEE'), prop: 'OEE'},
        {title: i18n.t('DataV.Da_FaultAlarmQuantity'), prop: 'FaultAlarmQuantity'},
      ]
    };
  },
  created() {},
  methods: {
    setWidth(item, i, parent) {
      const date = new Date();
      const num = 54 / (2*60*60*1000);
      let width = 0;
      if(i === 0) {
        let str = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ (date.getDate()-1);
        let timestamp = new Date(str).getTime(); // 昨天00:00:00的时间戳
        width = (new Date(item.EndTime).getTime() - timestamp) * num
      } else if(i === parent.Values.length - 1) {
        let str = date.getFullYear() +'-'+ (date.getMonth()+1) +'-'+ date.getDate();
        let timestamp = new Date(str).getTime(); // 今天00:00:00的时间戳
        width = (timestamp - new Date(item.StartTime).getTime()) * num
      } else {
        width = (new Date(item.EndTime).getTime() - new Date(item.StartTime).getTime()) * num
      }
      return width;
    }
  }
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'DS-Digital';
  src: url('../DS-DIGI-1.ttf') format('truetype');
}
.content-header{
  width: 100%;
  height: 60px;
  display: flex;
  &-item{
    height: 60px;
    flex: 1;
    &-box{
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &-title{
        color: #fff;
        padding-left: 10px;
        width: fit-content;
      }
      &-number{
        color: #47bfc0;
        font-family: 'DS-Digital';
        font-size: 36px;
        width: fit-content;
        padding-right: 10px;
        text-align: end;
      }
    }
  }
}
.content-table{
  width: 100%;
  margin-top: 10px;
  height: calc(100% - 80px);
  .content-table-header-time-item::after{
    content: '';
    width: 2px;
    height: 6px;
    background: #3146a1;
    position: absolute;
    bottom: 0;
    left: 26px;
  }
  &-header{
    display: flex;
    width: 100%;
    height: 40px;
    border-bottom: 2px solid #1b2e71;
    color: #eaeaea;
    &-common{
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 40px;
    }
    &-Equipment{
      width: 100px;
    }
    &-DeviceName{
      width: 158px;
    }
    &-time{
      width: 702px;
      display: flex;
      line-height: 40px;
      text-align: center;
      background: #1d295f;
      &-item{
        width: 54px;
        position: relative;
      }
    }
  }
  &-content{
    width: 100%;
    height: calc(100% - 40px);
    padding-bottom: 50px;
    position: relative;
    overflow-y: auto;
    &-item{
      width: 100%;
      height: 50px;
      display: flex;
      color: #eaeaea;
      font-size: 14px;
      margin-bottom: 10px;
      &-time{
        width: 702px;
        display: flex;
        padding: 0 27px;
        height: 100%;
        align-items: center;
        div{
          height: 25px;
        }
      }
      &-Equipment{
        padding: 0 10px;
        height: 40px;
        margin-top: 5px;
        width: 100px;
      }
      &-common{
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 50px;
      }
      &-DeviceName{
        width: 158px;
      }
    }
    &-bottom{
      width: 960px;
      height: 50px;
      position: fixed;
      bottom: 10px;
      background: #0b0f28;
      &-bg{
        height: 2px;
        width: 80px;
      }
    }
  }
}
</style>
