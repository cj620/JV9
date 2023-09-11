<template>
  <div class="daily-processing-task">
    <div class="daily-processing-task-title">每日加工任务</div>
    <div class="daily-processing-task-table">
      <div class="daily-processing-task-table-header">
        <div
          v-for="(item, i) in headerList"
          :key="item.prop"
          :style="{ borderLeft: i !== 0 ? '1px solid #374264' : 'none' }"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="daily-processing-task-table-content">
        <RollList v-if="result.length" :step="cWindow.global_config.DataVStep">
          <div
            class="daily-processing-task-table-content-item"
            v-for="(parent, p) in result"
            :key="p"
          >
            <div
              v-for="(item, i) in headerList"
              :key="item.prop"
              :style="{ borderLeft: i !== 0 ? '1px solid #374264' : 'none' }"
            >
              {{
                isNaN(parent[item.prop]) &&
                !isNaN(Date.parse(parent[item.prop]))
                  ? timeFormat(parent[item.prop])
                  : parent[item.prop]
              }}
            </div>
          </div>
        </RollList>
      </div>
    </div>
  </div>
</template>

<script>
import RollList from "@/components/RollList/index.vue";
import timeFormat from "~/utils/time/timeFormat";
const cWindow = window;
export default {
  name: "Daily-processing-task",
  components: { RollList },
  props: {
    result: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      cWindow,
      headerList: [
        {prop: 'StartTime', label: i18n.t('DataV.Da_StartTime')},
        {prop: 'EndTime', label: i18n.t('DataV.Da_EndTime')},
        {prop: 'PlannedMachine', label: i18n.t('DataV.Da_PlannedMachine')},
        {prop: 'ActualMachine', label: i18n.t('DataV.Da_ActualMachine')},
        {prop: 'State', label: i18n.t('DataV.Da_State')},
      ],
    }
  },
  created() {
  },
  methods: {
    timeFormat,
  }
  // watch: {
  //   result(val) {
  //
  //   }
  // }
}
</script>

<style scoped lang="scss">
.daily-processing-task {
  height: 100%;
  width: 100%;
  &-title {
    font-size: 18px;
    font-weight: bold;
    color: #eaeaea;
    height: 40px;
    width: 100%;
    text-align: center;
    line-height: 40px;
  }
  &-table {
    height: calc(100% - 40px);
    width: 100%;
    padding: 0 20px;
    &-header {
      width: 640px;
      height: 40px;
      border-top: 1px solid #374264;
      border-left: 1px solid #374264;
      border-right: 1px solid #374264;
      border-bottom: 2px solid #37579e;
      box-sizing: border-box;
      display: flex;
      div {
        height: 100%;
        text-align: center;
        flex: 1;
        line-height: 40px;
        color: #eaeaea;
      }
    }
    &-content {
      border-left: 1px solid #374264;
      border-right: 1px solid #374264;
      border-bottom: 1px solid #374264;
      height: calc(100% - 60px);
      overflow-y: auto;
      &-item {
        height: 40px;
        border-bottom: 1px solid #374264;
        display: flex;
        div {
          height: 100%;
          text-align: center;
          flex: 1;
          line-height: 40px;
          color: #eaeaea;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 6px;
        }
      }
    }
  }
}
</style>
