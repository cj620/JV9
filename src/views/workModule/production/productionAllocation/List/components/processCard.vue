<template>
  <div class="process-card" :style="{ width: itemWidth ? itemWidth : '' }">
    <div class="process-card-content">
      <div class="process-level" :style="{
        backgroundColor : LevelEnumMap[this.processData.Level] ? LevelEnumMap[this.processData.Level].fcolor : ''
      }">
      </div>
      <div class="process-content">
        <div class="process-content-item">
          <div v-if="isAllocated" class="item-num">No.{{ this.num }}</div>
          <div class="item-partNo">{{ this.processData.PartNo }}</div>
          <div class="item-process">({{ this.processData.Process }})</div>
        </div>
        <div class="process-content-item" v-if="isAllocated">
          <div v-if="this.processData.FixedProcessingDevice" class="item-lock-state" style="color: red">
            <i class="el-icon-lock" style="margin-right: 5px; font-size: 18px;"></i>
            {{ $t('production.Pr_Locked') }}
          </div>
          <div v-else class="item-lock-state">
            <i class="el-icon-unlock" style="margin-right: 5px; font-size: 18px"></i>
            {{ $t('production.Pr_Unlocked') }}
          </div>
          <div class="item-state">
            {{ $t('Generality.Ge_Type') }}:
            {{ TaskTypeEnumMap[this.processData.TaskType] ? TaskTypeEnumMap[this.processData.TaskType].name : "- -" }}
          </div>
          <div class="item-time">
            {{ $t('Generality.Ge_WorkHours') }}:
            {{ this.processData.PlanTime }}
          </div>
        </div>
        <div class="process-content-item" v-else>
          <div class="item-state" style="width: 60%">
            {{ $t('Generality.Ge_Type') }}:
            {{ TaskTypeEnumMap[this.processData.TaskType] ? TaskTypeEnumMap[this.processData.TaskType].name : "- -" }}
          </div>
          <div class="item-time" style="width: 40%">
            {{ $t('Generality.Ge_WorkHours') }}:
            {{ this.processData.PlanTime }}
          </div>
        </div>
      </div>
      <div class="process-button">
        <div class="process-button-operate" v-if="isAllocated">
          <div class="process-button-operate-item" style="margin: 5px 0 10px 0" @click="editProgress">
            <i class="el-icon-edit-outline"></i>
          </div>
          <div class="process-button-operate-item" style="margin: 10px 0 5px 0" @click="editLockState">
            <i class="el-icon-unlock" v-if="this.processData.FixedProcessingDevice"></i>
            <i class="el-icon-lock" v-else></i>
          </div>
        </div>
        <div class="process-button-trans" v-else>
          <div class="circle"></div>
          <i
            class="el-icon-back"
            style="color: #0960bd; position: absolute; top: 20px; right: 16px; font-size: 26px; cursor: pointer;"
            @click="pushProcess"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { LevelEnum, taskTypeEnum } from "@/enum/workModule";
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
    },
    itemWidth: {
      type: String,
      default: null,
    }
  },
  computed: {
    LevelEnumMap() {
      return LevelEnum;
    },
    TaskTypeEnumMap() {
      return taskTypeEnum;
    }
  },
  methods: {
    pushProcess() {
      this.$emit("pushToAllocated", this.processData);
    },
    editProgress() {
      this.$emit("editProgress", this.processData);
    },
    editLockState() {
      this.$emit("editLockState", this.processData)
    }
  }
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
    border-radius: 10px;
    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.48);
    .process-level {
      width: 15px;
      height: 100%;
      border-radius: 10px 0 0 10px;
    }
    .process-content {
      width: calc(100% - 85px);
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      &-item {
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item-num {
          height: 100%;
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-partNo {
          height: 100%;
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .item-process {
          height: 100%;
          width: 30%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .item-lock-state{
          height: 100%;
          width: 30%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-state {
          height: 100%;
          width: 40%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .item-time {
          height: 100%;
          width: 30%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .process-button {
      width: 40px;
      height: 100%;
      &-operate {
        height: 100%;
        width: 100%;
        &-item {
          height: calc(50% - 10px);
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          color: #0960bd;
          cursor: pointer;
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
.circle {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: #0960bd 2px solid;
  position: absolute;
  top: 19px;
  right: 14px;
}
</style>
