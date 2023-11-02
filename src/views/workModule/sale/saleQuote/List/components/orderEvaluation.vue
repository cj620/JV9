<template>
  <PageWrapper :footer="false" v-loading="loading">
    <div class="order-evaluation">
      <div class="order-evaluation-header">
        <span>{{ $t("sale.Sa_EvaluationTime") }}</span>
        <div>
          <el-date-picker
            style="width: 240px; margin-right: 10px"
            v-model="dateRange"
            size="mini"
            type="daterange"
            value-format="yyyy-MM-dd"
            :range-separator="$t('Generality.Ge_To')"
            :start-placeholder="$t('Generality.Ge_StartDate')"
            :end-placeholder="$t('Generality.Ge_EndDate')"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <el-button :disabled="!dateRange" size="mini" @click="openDialog">{{
          $t("sale.Sa_Evaluation")
        }}</el-button>
      </div>
      <div class="placeholder-map" v-show="placeholderMap">{{
          $t("sale.Sa_NoEvaluation")
        }}</div>
      <div class="order-evaluation-content">
        <div class="order-evaluation-content-top">
          <base-chart
            style="height: 100%"
            v-if="echartsShow" :options="options"></base-chart>
        </div>
        <div class="order-evaluation-content-bottom">
          <JvTable :table-obj="evaluationTable" v-if="echartsShow"></JvTable>
        </div>
      </div>

      <JvDialog
        :visible.sync="dialogShow"
        :title="$t('menu.Sa_SaleQuote')"
        @confirm="assess"
        width="80%"
      >
        <div class="searchHeader">
          <el-input
            clearable
            :placeholder="$t('Generality.Ge_BillId')"
            style="width: 140px; margin-right: 10px"
            v-model="searchValue"
            size="mini"
            @change="search"
          />
          <el-button size="mini" type="primary">{{
              $t("Generality.Ge_Search")
            }}</el-button>
        </div>
        <!-- 表格 -->
        <JvTable
          @selectionChange="selectionChange"
          ref="BillTable"
          :table-obj="tableObj"
        >
        </JvTable>
      </JvDialog>
    </div>
  </PageWrapper>
</template>

<script>
import { sales_estimate } from "@/api/workApi/sale/quotation.js";
import { Table, Table1 } from "./config";
import { setOptions } from './echartsOptions'
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
export default {
  name: "Sa_OrderEvaluation",
  components: { BaseChart },
  data() {
    return {
      loading: false,
      dateRange: "",
      dialogShow: false,
      // 表格实例
      tableObj: {},
      evaluationTable: {},
      searchValue: "",
      BillIds: [],
      options: {},
      echartsShow: false,
      placeholderMap: true,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() + 86400000 < Date.now();
        },
      }
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.evaluationTable = new Table1();
    this.tableObj.getData({ State: "Approved" });
  },
  methods: {
    assess() {
      if (this.BillIds.length) {
        this.loading = true;
        this.dialogShow = false;
        sales_estimate({
          StartDate: this.dateRange[0],
          EndDate: this.dateRange[1],
          BillIds: this.BillIds,
        }).then((res) => {
          if(res.Items.length) {
            this.options = setOptions(res);
            this.placeholderMap = false;
            this.echartsShow = true;
            this.evaluationTable.setData(res.Items);
          } else {
            this.placeholderMap = true;
            this.echartsShow = false;
          }
          this.loading = false;
          console.log(res);
        }).catch(err => {
          this.loading = false;
        })
      } else {
        this.$message.error(i18n.t("quality.Qc_PleaseSelectADocument"));
      }
    },
    selectionChange(val, Keys) {
      this.BillIds = Keys;
    },
    search() {
      this.tableObj.getData({ BillId: this.searchValue, State: "Approved" });
    },
    openDialog() {
      this.dialogShow = !this.dialogShow;
      this.$nextTick(() => {
        this.tableObj.doLayout();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.order-evaluation {
  background: #fff;
  width: 100%;
  height: 100%;
  position: relative;
  &-header {
    display: flex;
    height: 40px;
    align-items: center;
    padding-left: 10px;
    span:first-child {
      font-size: 14px;
      margin-right: 10px;
    }
  }
  &-content{
    height: calc(100% - 40px);
    &-top{
      height: 50%;
    }
    &-bottom{
      height: 50%;
      padding-top: 20px;
    }
  }
}
.searchHeader {
  display: flex;
  padding-left: 10px;
  margin-bottom: 10px;
}
.placeholder-map{
  position: absolute;
  width: 100%;
  height: calc(100% - 100px);
  color: #666666;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
