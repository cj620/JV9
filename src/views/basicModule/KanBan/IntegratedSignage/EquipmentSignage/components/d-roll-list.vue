<template>
  <div style="height: 100%">
    <div class="roll-table-header">
      <div
        class="roll-table-header-item"
        v-for="item in tableConfig"
        :key="item.prop"
        :style="{
          width: item.width ? item.width + 'px' : 'auto',
        }"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="roll-table-content">
      <RollList v-if="result.length" :step="cWindow.global_config.DataVStep" :id="id">
        <div
          :class="[
            index % 2 === 1 ? 'newColor' : '',
            'roll-table-content-item',
          ]"
          v-for="(parent, index) in result"
          :key="JSON.stringify(parent)"
        >
          <div
            class="roll-table-content-item-children"
            v-for="item in tableConfig"
            :key="item.prop"
            :style="{
              width: item.width ? item.width + 'px' : 'auto',
            }"
          >
            <span v-if="item.cpn === 'custom'">
              <slot
                :name="item.prop"
                :scope="{ parent, col: parent[item.prop], prop: item.prop }"
              ></slot>
            </span>
            <span
              v-else-if="item.format"
              :style="
                item.setStyle ? item.setStyle(parent[item.prop], parent) : {}
              "
            >
              {{ item.format(parent[item.prop], parent) }}
            </span>
            <span
              v-else
              :style="
                item.setStyle ? item.setStyle(parent[item.prop], parent) : {}
              "
            >
              {{
                isNaN(parent[item.prop]) &&
                !isNaN(Date.parse(parent[item.prop]))
                  ? timeFormat(parent[item.prop])
                  : parent[item.prop]
              }}
            </span>
          </div>
        </div>
      </RollList>
    </div>
  </div>
</template>

<script>
import RollList from "@/components/RollList/index.vue";
import timeFormat from '@/jv_doc/utils/time/timeFormat';
const cWindow = window;
export default {
  components: { RollList },
  props: {
    tableConfig: {
      type: Array,
      default() {
        return []
      }
    },
    result: {
      type: Array,
      default() {
        return []
      }
    },
    id: {
      type: String,
      default: 'roll'
    }
  },
  data() {
    return {
      cWindow
    }
  },
  created() {
  },
  methods: {
    timeFormat,
  }
}
</script>

<style scoped lang="scss">
.roll-table-header {
  height: 40px;
  color: #eaeaea;
  display: flex;
  width: 100%;
  border-bottom: 2px solid #1b2e71;
  //flex: 1;
  &-item {
    flex: 1;
    line-height: 40px;
    text-align: center;
  }
}
.roll-table-content {
  width: 100%;
  height: calc(100% - 40px);
  color: #eaeaea;
  &-item {
    width: 100%;
    height: 40px;
    display: flex;
    &-children {
      height: 40px;
      flex: 1;
      line-height: 40px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 4px;
      font-size: 14px;
    }
  }
  .newColor {
    background: #0c1247;
  }
}
</style>
