<template>
  <div class="rework-Details">
    <div class="rework-Details-title">
      {{ $t('DataV.Da_ReworkDetail') }}
    </div>
    <div class="rework-Details-table">
      <div class="rework-Details-table-header">
        <div
          v-for="(item, i) in headerList"
          :key="item.prop"
          :style="{ borderLeft: i !== 0 ? '1px solid #374264' : 'none' }"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="rework-Details-table-content">
        <RollList v-if="result.length" id="newRoll" :step="$window.global_config.DataVStep" :num="8">
          <div
            class="rework-Details-table-content-item"
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
export default {
  name: "reworkDetails",
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
      headerList: [
        {prop: 'PartNo', label: this.$t('Generality.Ge_PartNo')},
        {prop: 'ReworkProcess', label: this.$t('quality.Qc_ReworkProcess')},
        {prop: 'Worker', label: this.$t('Generality.Ge_Worker')},
        {prop: 'Remarks', label: this.$t('DataV.Da_ReworkReason')},
      ],
      $window: null,
    }
  },
  created() {
    this.$window = window
  },
  methods: {
    timeFormat,
  }
}
</script>

<style scoped lang="scss">
.rework-Details {
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
      width: 100%;
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
