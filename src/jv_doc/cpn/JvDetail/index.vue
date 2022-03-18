<!--
 * @Author: your name
 * @Date: 2021-11-04 13:00:17
 * @LastEditTime: 2022-01-04 08:47:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\jv_doc\cpn\JvDetail\index.vue
-->
<template>
  <div class="jv-desc-style">
    <el-descriptions v-bind="getBindProps">
      <el-descriptions-item
        v-for="item in getBindProps.schema"
        :key="item.prop"
        :label="item.label"
        v-bind="item.cpnProps"
      >
        <slot
          v-if="item.custom"
          :name="item.prop"
          :prop="item.prop"
          :record="detailObj.detailData[item.prop]"
        >
        </slot>
        <span v-else>{{
          dataFilter(item.filter, detailObj.detailData[item.prop])
        }}</span>
      </el-descriptions-item>
    </el-descriptions>
    <!-- <el-button @click="print">12 </el-button> -->
  </div>
</template>

<script>
import { filterMaps } from "../../maps";
export default {
  name: "JvDetail",
  props: {
    detailObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  methods: {
    print() {

    },
  },
  computed: {
    getBindProps() {
      return this.detailObj.props;
    },
    // filterEnums
    dataFilter() {
      return (type = "default", data) => filterMaps[type].func(data);
    },
  },
};
</script>

<style lang="scss">
.jv-desc-style {
  // .el-descriptions__body .el-descriptions__table .el-descriptions-item__cell {
  //   line-height: 1.2;
  // }
  // .el-descriptions--medium:not(.is-bordered) .el-descriptions-item__cell {
  //   padding-bottom: 5px px;
  // }
  .el-descriptions__body .el-descriptions__table .el-descriptions-item__label {
    padding: 0;
  }
}
</style>
