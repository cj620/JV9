<template>
  <PageWrapper :footer="false">
    <div class="allocation-page">
      <div class="allocation-page-device">
        <div class="allocation-page-device-title">
          <el-select
            v-model="selectedResources"
            @change="selectResources"
            style="width: 175px"
          >
            <el-option
              v-for="item in resourcesOptions"
              :key="item.ResourceId"
              :label="item.ResourceId"
              :value="item.ResourceId"
            >
            </el-option>
          </el-select>
<!--          <i class="el-icon-search" style="margin-left: 8px; cursor: pointer;"></i>-->
        </div>
        <div class="allocation-page-device-body">
          <el-tabs tab-position="left" @tab-click="clickDevice">
            <el-tab-pane
              v-for="(item, i) in deviceList"
              :key="i"
              :label="item.DeviceNo"
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
              Id="allocated"
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
              Id="unallocated"
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
import { getAllResource, getResourceMember } from "@/api/workApi/production/baseData";
import { allocation_process_list } from "@/api/workApi/production/productionTask";
import { production_dispatching_list } from "@/api/workApi/production/productionDispatch";
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
      selectedResources: '',
      resourcesOptions: [],
      deviceList: [],
      processList1: [],
      processList2: [],
    }
  },
  created() {
    getAllResource().then((res) => {
      this.resourcesOptions = res.Items;
      this.selectedResources = this.resourcesOptions[0].ResourceId;
      this.selectResources(this.selectedResources);
    })
  },
  methods: {
    pushToAllocated(e) {
      this.processList1.push(e)
      const index = this.processList2.findIndex(item => item.id === e.id);
      if (index !== -1) {
        this.processList2.splice(index, 1);
      }
    },
    selectResources(e) {
      getResourceMember({ ResourceId: e }).then((res) => {
        this.deviceList = res.Items;
        this.getProcessByDevice(this.deviceList[0].DeviceNo)
      })
    },
    // 点击tabs选择设备
    clickDevice(e) {
      this.getProcessByDevice(e.label)
    },
    // 根据设备获取工序信息
    getProcessByDevice(e) {
      allocation_process_list({DeviceNo: e}).then((res) => {
        this.processList2 = res.Items
      })
      production_dispatching_list({
        CurrentPage: 1,
        Devices: [e],
        PageSize: 99,
      }).then((res) => {
        this.processList1 = res.Items[0]
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.allocation-page {
  width: 100%;
  height: 100%;
  background-color: white;
  min-width: 1300px;
  min-height: 500px;
  display: flex;
  ::-webkit-scrollbar {
    width: 5px; /* 滚动条宽度 */
  }
  &-device {
    width: 180px;
    margin: 10px 5px 10px 10px;
    display: flex;
    flex-wrap: wrap;
    &-title {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: left;
      align-items: center;
      font-size: 18px;
    }
    &-body {
      width: 100%;
      margin-top: 5px;
      height: calc(100% - 40px);
      overflow-y: auto;
      overflow-x: hidden;
      ::v-deep {
        .el-tabs--left {
          height: 100% !important;
          display: flex !important;
          justify-content: right !important;
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

}

</style>
