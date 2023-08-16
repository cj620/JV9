<!--
 * @Author: C.
 * @Date: 2021-07-13 10:34:24
 * @LastEditTime: 2021-12-06 11:01:25
 * @Description: file content
-->
<template>
  <PageWrapper>
    <!-- 表格 -->
    <JvTable
      ref="BillTable"
      :table-obj="tableObj"
      :header-cell-style="headerClass"
    >
      <template #name="{ record, row }">
        <span v-if="row.type == '1'">{{ record }}</span>
        <div v-else style="padding-left: 30px">
          <div>{{ record }}</div>
          <el-image
            style="width: 100px; height: 100px"
            :src="row.image"
          ></el-image>
        </div>
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { setCpn, delCpn } from "@/jv_doc/maps/cpnMaps";
import ColProgress from "./cpns/ColProgress";
import imgUrlPlugin  from "@/jv_doc/utils/system/imgUrlPlugin";
import { timeFormat } from "@/jv_doc/utils/time";
export default {
  name: "list",
  data() {
    return {
      // 表格数据
      tableObj: {},
      auditForm: {
        Remarks: "",
        BizFormId: "",
        AuditResult: "",
      },
      remarkShow: false,
      chooseList: [],
    };
  },
  created() {
    setCpn("ColProgress", ColProgress);
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  beforeDestroy() {
    delCpn("ColProgress");
  },
  computed: {},
  methods: {
    imgUrlPlugin,
    headerClass(e) {
      if (e.columnIndex == 0) return;
      let col_date = timeFormat(new Date(), "yyyy-MM-") + e.column.label;
      let dt = new Date(col_date).getDay();
      if (dt % 7 == 6 || dt % 7 == 0) {
        return {
          // color: "pink",
          background: "rgb(255, 211, 165)",
        };
      }
    },
  },
};
</script>
<style lang="scss">
.month-weekend {
  color: pink;
}
</style>
