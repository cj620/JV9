<template>
  <div class="process-card">
    <div class="process-card-content">
      <div class="process-state" :style="{ backgroundColor : ProcessStateMap[this.processData.ProcessState].color }"></div>
      <div class="process-content">
        <div class="process-content-item">
          <div v-if="this.num">No.{{ this.num }}</div>
          <div>{{ this.processData.ToolingNo }}</div>
          <div>({{ this.processData.Process }})</div>
        </div>
        <div class="process-content-item">
          <div>类型：{{ this.processData.TaskType }}</div>
          <div>工时：{{ this.processData.WorkHours }}</div>
        </div>
      </div>
      <div class="process-button">
        <div class="process-button-operate" v-if="isAllocated">
          <div class="process-button-operate-item"><i class="el-icon-edit-outline"></i></div>
          <div class="process-button-operate-item"><i class="el-icon-lock"></i></div>
        </div>
        <div class="process-button-trans" v-else>
          <div style="height: 30px; width: 30px; border-radius: 50%; border: #0960bd 2px solid; position: absolute; top: 19px; right: 14px; "></div>
          <i class="el-icon-back" style="color: #0960bd; position: absolute; top: 20px; right: 16px; font-size: 26px;"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ProcessState } from "@/enum/workModule";
export default {
  props: {
    processData: {
      type: Object,
      default: () => {}
    },
    num: {
      type: Number,
      default: () => null
    },
    isAllocated: {
      type: Boolean,
      default: null,
    }
  },
  computed: {
    ProcessStateMap() {
      return ProcessState;
    },
  },
}
</script>
<style scoped lang="scss">
.process-card {
  width: 100%;
  height: 80px;
  padding: 5px;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fff;
  &-content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border: 1px solid silver;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    .process-state {
      width: 30px;
      height: 100%;
    }
    .process-content {
      width: calc(100% - 70px);
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      &-item {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .process-button {
      width: 40px;
      height: 100%;
      &-operate {
        height: 100%;
        width: 100%;
        &-item {
          height: 50%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          color: #0960bd;
        }
      }
      &-trans {
        height: 100%;
        width: 100%;
        position: relative;
      }
    }
  }
}
</style>
