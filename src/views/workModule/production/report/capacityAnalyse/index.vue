<!--
 * @Author: C.
 * @Date: 2021-07-13 10:34:24
 * @LastEditTime: 2023-12-05 19:28:40
 * @Description: file content
-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable
      @cell-click="clickToDetail"
      ref="BillTable"
      :table-obj="tableObj"
      :header-cell-style="headerClass"
      :load="load"
    >
      <template #titleBar>
        <Popover
          @confirm="getTableData"
          @reset="tableObj.formObj.form.Month = ''"
          style="margin: 0 10px"
        >
          <el-date-picker
            v-model="tableObj.formObj.form.Month"
            type="month"
            :placeholder="$t('project.Pro_ChooseMonth')"
            @change="change"
          >
          </el-date-picker>
        </Popover>
        <span> {{ tableObj.formObj.form.Month | timeFormat("yyyy.MM") }}</span>
      </template>
      <template #Resource="{ record, row }">
        <span v-if="row.Flag == '0'">{{ record }}</span>
        <div v-else style="padding-left: 30px">
          <div>{{ record }}</div>
          <el-image
            style="width: 100px; height: 100px"
            :src="imgUrlPlugin(row.PhotoUrl)"
          ></el-image>
        </div>
      </template>
    </JvTable>
    <JvDialog
      v-if="detailDataView"
      :visible.sync="detailDataView"
      destroy-on-close
      :title="$t('Generality.Ge_DetailedInformation')"
      :IsShowFooterBtn="false"
      width="80%"
    >
      <JvTable :table-obj="detailTableObj">
        <template #ApsState="{ record }">
          {{ ApsSheetsMap[record].name }}
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
// 获取列表接口
import { capacity_analysis_items } from "@/api/workApi/production/dataReport";

import { setCpn, delCpn } from "@/jv_doc/maps/cpnMaps";
import ColProgress from "./cpns/ColProgress";
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { timeFormat } from "@/jv_doc/utils/time";
import Popover from "@/jv_doc/cpn/JvTable/cpn/Popover.vue";
import { DetailTable } from "./detailConfig";
export default {
  name: "list",
  components: {
    Popover,
  },
  data() {
    return {
      // 表格数据
      tableObj: {},
      detailTableObj: {},
      detailDataView: false,
      currenMoth: new Date(),
      ApsSheetsMap: {
        Normal: {
          name: this.$t("production.Pr_Normal"),
        },
        Overdue: {
          name: this.$t("production.Pr_OverdueWorkSheet"),
        },
        Overload: {
          name: this.$t("production.Pr_OverloadWorkSheet"),
        },
      },
    };
  },
  created() {
    setCpn("ColProgress", ColProgress);
    this.init();
  },
  beforeDestroy() {
    delCpn("ColProgress");
  },
  computed: {},
  methods: {
    init() {
      this.tableObj = new Table();
      this.tableObj.getData();
      this.detailTableObj = new DetailTable();
    },
    getTableData() {
      this.currenMoth = this.tableObj.formObj.form.Month;
      this.tableObj.getData();
    },
    clickToDetail(row, column) {
      const columnLabel = "Data" + column.label;
      if (row[columnLabel] && row[columnLabel].length !== 0) {
        this.detailTableObj.setData(row[columnLabel]);
        this.detailDataView = true;
      }
    },
    imgUrlPlugin,
    headerClass(e) {
      if (e.columnIndex == 0) return;
      let col_date = timeFormat(this.currenMoth, "yyyy-MM-") + e.column.label;
      let dt = new Date(col_date).getDay();
      if (dt % 7 == 6 || dt % 7 == 0) {
        return {
          // color: "pink",
          background: "rgb(255, 211, 165)",
        };
      }
    },
    load(tree, treeNode, resolve) {
      capacity_analysis_items({
        Month: this.tableObj.formObj.form.Month,
        ProcessName: tree.Resource,
      }).then((res) => {
        resolve(res.Items);
      });
    },
    change(e) {
      // console.log(timeFormat(e));
      this.tableObj.formObj.form.Month = timeFormat(e);
    },
  },
};
</script>
<style lang="scss">
.month-weekend {
  color: pink;
}
.jv-table-keyword {
  display: none;
}
</style>
