<template>
  <PageWrapper :footer="false">
    <div class="allocation-page">
      <div class="allocation-page-device">
        <div class="allocation-page-device-title">
          <el-select
            v-model="selectedResources"
            @change="selectResources"
            filterable
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
              {{ $t('production.Pr_AllocatedProcesses') }}
            </div>
            <div class="allocated-header-button" v-if="processList1.length">
              <div>
                <i
                  class="el-icon-unlock"
                  v-if="isAllLocked"
                  style="font-size: 25px; margin-right: 10px; cursor: pointer; color: #0960bd;"
                  @click="editAllLockDevice"
                ></i>
                <i
                  class="el-icon-lock"
                  v-else
                  style="font-size: 25px; margin-right: 10px; cursor: pointer; color: #0960bd;"
                  @click="editAllLockDevice"
                ></i>
              </div>
              <div>
                <i
                  class="el-icon-delete"
                  style="font-size: 25px; cursor: pointer; color: #0960bd;"
                  v-if="isAllUnlocked"
                  @click="clearAllAllocated"
                ></i>
                <i
                  class="el-icon-delete"
                  style="font-size: 25px; color: rgb(161, 161, 161);"
                  v-else
                ></i>
              </div>
            </div>
          </div>
          <div class="allocated-body">
            <JvDraggable
              :col='2'
              group="aa"
              Id="allocated"
              v-model="processList1"
              :animation="100"
              ref="JvDraggableRef"
              @add="handleAddAllocated"
              @update="handleUpdate"
              :onMove="onMove"
            >
              <template slot-scope="item">
                <ProcessCard
                  :processData="item.item"
                  :isAllocated="true"
                  :num="item.index + 1"
                  @editProgress="editProgress"
                  @editLockState="editLockState"
                ></ProcessCard>
              </template>
            </JvDraggable>
          </div>
        </div>
        <div class="unallocated">
          <div class="unallocated-header">
            <div class="unallocated-header-title">
              {{ $t('production.Pr_UnallocatedProcesses') }}
            </div>
          </div>
          <div class="unallocated-body">
            <JvDraggable
              group="aa"
              Id="unallocated"
              v-model="processList2"
              :animation="100"
              ref="JvDraggableRef1"
              @add="handleAddUnallocated"
            >
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
    <EditProcessForm
      :visible.sync="editProcessDialogFormVisible"
      v-if="editProcessDialogFormVisible"
      :editProcessData="editProcessData"
      @confirmToEdit="editDevice"
    ></EditProcessForm>
    <JvDialog
      :title="$t('Generality.Ge_Remind')"
      v-if="editAllLockVisible"
      :visible.sync="editAllLockVisible"
      @confirm="conformEditAllLock"
      width="350px">
      <div v-if="isAllLocked">
        {{ $t('production.Pr_WhetherToUnlockAllAllocatedProcesses') }}
      </div>
      <div v-else>
        {{ $t('production.Pr_WhetherToLockAllAllocatedProcesses') }}
      </div>
    </JvDialog>
    <JvDialog
      :title="$t('Generality.Ge_Remind')"
      v-if="editLockVisible"
      :visible.sync="editLockVisible"
      @confirm="conformEditLock"
      width="350px">
      {{
        editLockData.FixedProcessingDevice
          ? $t('production.Pr_WhetherToUnlockTheAllocatedProcess')
          : $t('production.Pr_WhetherToLockTheAllocatedProcess')
      }}
    </JvDialog>
    <JvDialog
      :title="$t('Generality.Ge_Remind')"
      v-if="clearAllVisible"
      :visible.sync="clearAllVisible"
      @confirm="conformClearAll"
      width="350px">
      {{ $t('production.Pr_WhetherToClearAllAllocatedProcesses') }}
    </JvDialog>
  </PageWrapper>
</template>
<script>
import { getAllResource, getResourceMember } from "@/api/workApi/production/baseData";
import { allocation_process_list } from "@/api/workApi/production/productionTask";
import {
  production_dispatching_list,
  production_dispatching_change_device,
  production_dispatching_lock_device,
  production_dispatching_empty_device,
} from "@/api/workApi/production/productionDispatch";
import JvDraggable from '@/components/JvDraggable/JvDraggable.vue';
import ProcessCard from "@/views/workModule/production/productionAllocation/List/components/processCard.vue";
import EditProcessForm from "@/views/workModule/production/productionAllocation/List/components/editProcessForm.vue";
import selectBomList from "@/views/workModule/production/productionTask/components/selectBomList.vue";
export default {
  name: "ProductionAllocation",
  components: {
    selectBomList,
    ProcessCard,
    JvDraggable,
    EditProcessForm,
  },
  data() {
    return {
      selectedResources: '',
      selectedDeviceNo: '',
      editProcessData: {},
      editLockData: {},
      resourcesOptions: [],
      deviceList: [],
      processList1: [],
      processList2: [],
      editProcessDialogFormVisible: false,
      editAllLockVisible: false,
      editLockVisible: false,
      clearAllVisible: false,
    }
  },
  computed: {
    isAllLocked() {
      return this.processList1.every(item => item.FixedProcessingDevice !== null && item.FixedProcessingDevice !== '');
    },
    isAllUnlocked() {
      return this.processList1.every(item => item.FixedProcessingDevice === null || item.FixedProcessingDevice === '');
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
    // 选中资源组获取设备列表
    selectResources(e) {
      getResourceMember({ ResourceId: e }).then((res) => {
        if (res.Count) {
          this.deviceList = res.Items;
          this.getProcessByDevice(this.deviceList[0].DeviceNo)
        } else {
          this.deviceList = [];
          this.processList1 = [];
          this.processList2 = [];
          this.selectedDeviceNo = "";
        }
      })
    },
    // 点击tabs选择设备
    clickDevice(e) {
      this.getProcessByDevice(e.label)
    },
    // 根据设备获取工序信息
    getProcessByDevice(e) {
      this.selectedDeviceNo = e;
      allocation_process_list({DeviceNo: e}).then((res) => {
        this.processList2 = res.Items
      })
      production_dispatching_list({
        CurrentPage: 1,
        Devices: [e],
        PageSize: 99,
      }).then((res) => {
        this.processList1 = res.Items[0].filter(item => item.State !== 'Processing')
      })
    },
    // 编辑工序信息
    editProgress(e) {
      this.editProcessData = e;
      this.editProcessDialogFormVisible = true;
    },
    // 更改工序锁定状态
    editLockState(e) {
      this.editLockData = e;
      this.editLockVisible = true;
    },
    conformEditLock() {
      production_dispatching_lock_device({
        TaskProcessId: this.editLockData.Id,
        // 不存在锁定机台时锁定当前设备，存在时即解绑
        DeviceNo: this.editLockData.FixedProcessingDevice ? null : this.selectedDeviceNo,
      }).then(() => {
        this.getProcessByDevice(this.selectedDeviceNo);
        this.editLockVisible = false;
      })
    },
    // 更改所有已派工工序锁定状态
    editAllLockDevice() {
      this.editAllLockVisible = true;
    },
    // 确认更改所有已派工工序锁定状态
    conformEditAllLock() {
      production_dispatching_lock_device({
        TaskProcessIds: this.processList1.map(item => item.Id),
        DeviceNo: this.isAllLocked ? null : this.selectedDeviceNo
      }).then(() => {
        this.editAllLockVisible = false;
        this.getProcessByDevice(this.selectedDeviceNo);
      })
    },
    // 清空当前设备已派工工序
    clearAllAllocated() {
      this.clearAllVisible = true;
    },
    // 确认清空当前设备已派工工序
    conformClearAll() {
      production_dispatching_empty_device({
        DeviceNo: this.selectedDeviceNo
      }).then(() => {
        this.getProcessByDevice(this.selectedDeviceNo);
        this.clearAllVisible = false;
      })
    },
    // 点击箭头添加到已派工
    pushToAllocated(e) {
      const obj = {
        TaskProcessId: e.Id,
        PlanStart: e.PlanStart,
        PlanEnd: e.PlanEnd,
        DeviceName: this.selectedDeviceNo,
        IsModifyDate: true,
      }
      this.editDevice(obj);
    },
    // 添加到已派工工序
    handleAddAllocated(e){
      // console.log('未派工添加到已派工:::', e, this.processList1)
      const obj = {
        TaskProcessId: this.processList1[e.newIndex].Id,
        PlanStart: this.processList1[e.newIndex].PlanStart,
        PlanEnd: this.processList1[e.newIndex].PlanEnd,
        DeviceName: this.selectedDeviceNo,
        IsModifyDate: true,
      }
      this.editDevice(obj);
    },
    handleUpdate(e) {
      // console.log('已派工内部排序:::', e, this.processList1)
    },
    // 添加到未派工工序
    handleAddUnallocated(e){
      const obj = {
        TaskProcessId: this.processList2[e.newIndex].Id,
        PlanStart: this.processList2[e.newIndex].PlanStart,
        PlanEnd: this.processList2[e.newIndex].PlanEnd,
        DeviceName: '',
        IsModifyDate: true,
      }
      this.editDevice(obj);
    },
    // 设备更改
    editDevice(e) {
      production_dispatching_change_device(e).then(() => {
        this.getProcessByDevice(this.selectedDeviceNo);
        this.editProcessDialogFormVisible = false;
      })
    },
    onMove(e) {
      if (e.draggedContext.element.FixedProcessingDevice && ( e.from.id !== e.to.id)) return false;
      return true;
    }
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
