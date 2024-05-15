<template>
  <PageWrapper :footer="false">
    <div class="allocation-page">
      <div class="allocation-page-device">
        <div class="allocation-page-device-title">
          资源组
          <i class="el-icon-search" style="margin-left: 8px"></i>
        </div>
        <div class="allocation-page-device-body">
          <el-tabs tab-position="left" @tab-click="clickDevice">
            <el-tab-pane
              v-for="(item, i) in deviceList"
              :key="i"
              :label="item.Device"
              :content="item.DeviceNo"
            ></el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="allocation-page-process">
        <div class="allocated">
          <div class="allocated-header">
            <div class="allocated-header-title">
              已派工工序
            </div>
            <div class="allocated-header-button">
              <i class="el-icon-lock" style="font-size: 25px; margin-right: 10px; cursor: pointer; color: #0960bd;"></i>
              <i class="el-icon-delete" style="font-size: 25px; cursor: pointer; color: #0960bd;"></i>
            </div>
          </div>
          <div class="allocated-body">
              <JvDraggable
                :col='2'
                group="aa"
                v-model="processList1"
                animation="10"
                ref="JvDraggableRef">
                <template slot-scope="item">
                  <ProcessCard
                    :processData="item.item"
                    :isAllocated="true"
                    :num="item.index + 1"
                  ></ProcessCard>
                </template>
              </JvDraggable>
          </div>
        </div>
        <div class="unallocated">
          <div class="unallocated-header">
            <div class="unallocated-header-title">
              未派工工序
            </div>
          </div>
          <div class="unallocated-body">
            <JvDraggable
              group="aa"
              v-model="processList2"
              animation="10"
              ref="JvDraggableRef1">
              <template slot-scope="item">
                <ProcessCard
                  :processData="item.item"
                  :isAllocated="false"
                  @pushToAllocated="pushToAllocated"
                ></ProcessCard>
              </template>
            </JvDraggable>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script>
import { production_device_list } from "@/api/workApi/production/baseData";
import { allocation_process_list } from "@/api/workApi/production/productionTask";
import JvDraggable from '@/components/JvDraggable/JvDraggable.vue';
import ProcessCard from "@/views/workModule/production/productionAllocation/List/components/processCard.vue";
export default {
  name: "ProductionAllocation",
  components: {
    ProcessCard,
    JvDraggable,
  },
  data() {
    return {
      deviceList: [],
      processList1: [
        {
          index: 1,
          ToolingNo: "XM240419-001",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'ToBeReceived',
          LockState: true,
        },
        {
          index: 2,
          ToolingNo: "XM240419-002",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'Processing',
          LockState: false,
        },
        {
          index: 3,
          ToolingNo: "XM240419-003",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'Processing',
          LockState: false,
        },
        {
          index: 4,
          ToolingNo: "XM240419-004",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'ToBeReceived',
          LockState: false,
        },
        {
          index: 5,
          ToolingNo: "XM240419-005",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'Processing',
          LockState: false,
        },
      ],
      processList2: [
        {
          index: 1,
          ToolingNo: "XM240419-101",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'Outsourcing',
          LockState: true,
        },
        {
          index: 2,
          ToolingNo: "XM240419-102",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'ToBeReceived',
          LockState: false,
        },
        {
          index: 3,
          ToolingNo: "XM240419-103",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'ToBeReceived',
          LockState: false,
        },
        {
          index: 4,
          ToolingNo: "XM240419-104",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'Received',
          LockState: false,
        },
        {
          index: 5,
          ToolingNo: "XM240419-105",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'Processed',
          LockState: false,
        },
        {
          index: 6,
          ToolingNo: "XM240419-106",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'Pausing',
          LockState: false,
        },
        {
          index: 7,
          ToolingNo: "XM240419-107",
          Process: "NC粗加工",
          TaskType: "新模",
          WorkHours: 15,
          ProcessState: 'ToBeReceived',
          LockState: false,
        },
      ],
    }
  },
  created() {
    production_device_list({
      CurrentPage: 1,
      PageSize: 999,
    }).then((res) => {
      this.deviceList = res.Items;
    })
  },
  methods: {
    pushToAllocated(e) {
      this.processList1.push(e)
    },
    // 点击tabs选择设备
    clickDevice(e) {
      allocation_process_list({DeviceNo: e.$attrs.content}).then((res) => {
        console.log(res)
      })
    }
  },
}
</script>
<style lang="scss">
.allocation-page {
  width: 100%;
  height: 100%;
  background-color: white;
  min-width: 1300px;
  min-height: 500px;
  display: flex;
  &-device {
    width: 180px;
    margin: 10px;
    display: flex;
    flex-wrap: wrap;
    &-title {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
    }
    &-body {
      width: 100%;
      height: calc(100% - 40px);
      overflow-y: auto;
      overflow-x: hidden;
      ::v-deep {
        .el-tabs--left {
          height: 100% !important;
        }
        .el-tabs__header {
          width: 180px !important;
        }
        .el-tabs__item {
          text-align: left;
        }
      }
      &-box {
        height: 90px;
        display: flex;
        align-items: center;
        transition: background-color 0.2s;
      }
    }
  }
  &-process {
    width: calc(100% - 180px);
    height: 100%;
    padding: 10px 10px 10px 5px;
    display: flex;
    justify-content: space-between;
    .allocated {
      width: 66%;
      height: 100%;
      &-header {
        width: 100%;
        height: 40px;
        border: #dfe4ed solid 1px;
        display: flex;
        justify-content: space-between;
        &-title {
          padding-left: 20px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
        &-button {
          padding-right: 15px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: right;
        }
      }
      &-body {
        width: 100%;
        height: calc(100% - 40px);
        border-left: #dfe4ed solid 1px;
        border-bottom: #dfe4ed solid 1px;
        border-right: #dfe4ed solid 1px;
        padding: 5px;
        overflow-y: auto;
        overflow-x: hidden;
        //&-item {
        //  height: 80px;
        //  width: 50%;
        //}
      }
    }
    .unallocated {
      width: 33%;
      height: 100%;
      &-header {
        width: 100%;
        height: 40px;
        border: #dfe4ed solid 1px;
        &-title {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
        }
      }
      &-body {
        width: 100%;
        height: calc(100% - 40px);
        border-left: #dfe4ed solid 1px;
        border-right: #dfe4ed solid 1px;
        border-bottom: #dfe4ed solid 1px;
        padding: 5px;
        overflow-y: auto;
        overflow-x: hidden;
        //&-item {
        //  height: 80px;
        //  width: 100%;
        //}
      }
    }
  }
  .ghostClass-box{
    width: 50%!important;
  }
  .ghostClass-box-1{
    width: 100%!important;
  }
  ::-webkit-scrollbar {
    width: 5px; /* 滚动条宽度 */
  }
}

</style>
