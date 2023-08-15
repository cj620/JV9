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
    <JvTable :table-obj="tableObj"> </JvTable>
  </div>
</template>

<script>
import { Table } from "@/jv_doc/class/table";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import Detail from "@/jv_doc/class/detail/Detail";
import { detailConfig, tableConfig } from "./ganttPopoverConfig";
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
      tableObj: {},
    };
  },
  created() {
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 2,
    });
    this.detailObj.detailData = this.item;
    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 500,
    });
    this.tableObj.setData(this.item.TaskProcesses);
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
