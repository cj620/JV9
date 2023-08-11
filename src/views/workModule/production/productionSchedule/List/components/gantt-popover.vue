<template>
  <div>
    <div
      style="
        display: flex;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        justify-content: space-between;
      "
    >
      <div style="margin-right: 20px">
        <el-image
          :src="imgUrlPlugin(item.PhotoUrl)"
          style="height: 100px"
          :preview-src-list="[imgUrlPlugin(item.PhotoUrl)]"
        >
          <div slot="error" class="image-slot1">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>

      <div style="width: 300px">
        <JvDetail :detailObj="detailObj"></JvDetail>
      </div>
    </div>
    <el-table :data="item.Data" height="350">
      <el-table-column
        v-for="(column, column_idx) in detailColumn"
        :key="column_idx"
        :width="column.width"
        :property="column.property"
        :label="column.label"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import Detail from "@/jv_doc/class/detail/Detail";
import { detailConfig } from "./ganttPopoverConfig";
export default {
  name: "gannt-popover",
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      // 表格每一项详情表格的column配置
      detailColumn: [
        {
          property: "Process",
          label: i18n.t("Generality.Ge_ProcessName"),
        },
        {
          width: 80,
          property: "PlanTime",
          label: i18n.t("Generality.Ge_PlanTime"),
        },
        {
          property: "_PlanStart",
          label: i18n.t("Generality.Ge_PlanStart"),
        },
        {
          property: "_PlanEnd",
          label: i18n.t("Generality.Ge_PlanEnd"),
        },
      ],
    };
  },
  created() {
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 2,
    });
    this.detailObj.detailData = this.item;
  },
  methods: {
    imgUrlPlugin,
  },
};
</script>

<style scoped lang="scss">
.data-details {
  flex-direction: column;
  display: flex;
  justify-content: space-around;
  height: 100%;
  font-weight: bold;
}
.el-image {
  ::v-deep .image-slot1 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #f5f7fa;
    width: 120px;
    i {
      font-size: 20px;
    }
  }
}
</style>
