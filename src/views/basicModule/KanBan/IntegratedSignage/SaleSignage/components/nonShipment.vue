<template>
  <div class="non-Shipment">
    <div class="non-Shipment-title">
      {{ $t('DataV.Da_NonShipmentWithinAWeek') }}
    </div>
    <div class="non-Shipment-table">
      <div class="non-Shipment-table-header">
        <div
          v-for="(item, i) in headerList"
          :key="item.prop"
          :style="{ borderLeft: i !== 0 ? '1px solid #374264' : 'none' }"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="non-Shipment-table-content">
        <RollList v-if="result.length" :step="$window.global_config.DataVStep">
          <div
            class="non-Shipment-table-content-item"
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
  name: "nonShipment",
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
        {prop: 'Id', label: this.$t('DataV.Da_SerialNumber')},
        {prop: 'CustomerId', label: this.$t('sale.Sa_CustomerId')},
        {prop: 'BillId', label: this.$t('DataV.Da_BillId')},
        {prop: 'UnshippedQuantity', label: this.$t('DataV.Da_UnshippedQuantity')},
        {prop: 'DeliveryDate', label: this.$t('DataV.Da_DeliveryDate')},
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
.non-Shipment {
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
