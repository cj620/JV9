<template>
  <div style="width: 48%; height: 50%">
    <div class="chart-title">
      {{ title }}
      <el-tooltip class="toolTip" effect="dark" :content="AlgorithmDes" placement="top">
        <i class="el-icon-question" style="color:#1890ff"/>
      </el-tooltip>
    </div>
    <div class="chart-wrapper" :style="{height: boxHeight / 2 - 58.3 + 'px'}">
      <div
        class="chart-description"
        v-if="Object.keys(this.datas).length !== 0"
      >
        <div>
          {{$t("production.Pr_Total")}}:{{ datas.TotalCount }}
          <span v-for="(item, index) in description" :key="index">
            {{ WorksheetNum[index] !== 0 ? item + WorksheetNum[index] : "" }}
          </span>
          <span>{{$t("production.Pr_ComputingTime")}}:{{ CreationDate }}</span>
        </div>
      </div>
      <div class="chart-description" v-else>
        <div>{{$t("Generality.Ge_NoData")}}</div>
      </div>
      <PieChart :id="id" :WorksheetNum="WorksheetNum" :height="boxHeight / 2 - 58.3 - 54.2"></PieChart>
    </div>
  </div>
</template>
<script>
import PieChart from "./pieChart.vue";
import { AlgorithmTypeEnum } from "@/enum/workModule/production/AlgorithmTypeEnum";
import { timeFormat } from "@/jv_doc/utils/time";
export default {
  name: "",
  components: { PieChart },
  props: {
    id: {
      type: String,
      default() {
        return null;
      },
    },
    boxHeight: {
      type: Number,
      default: 0
    },
    datas: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // 标题
      title: "",
      // 各类工单数
      WorksheetNum: [],
      CreationDate: "",
      AlgorithmDes: "",
      description: [
        `${i18n.t("production.Pr_NormalWorkSheet")}:`,
        `${i18n.t("production.Pr_OverdueWorkSheet")}:`,
        `${i18n.t("production.Pr_OverloadWorkSheet")}:`,
      ],
    };
  },
  mounted() {
    Object.keys(this.title).length !== 0 ? this.load() : "";
  },
  watch: {
    datas() {
      this.load();
    },
  },
  methods: {
    // 提取信息
    getCount() {
      this.WorksheetNum = [
        // 正常工单数
        this.datas.TotalCount -
          this.datas.OverdueCount -
          this.datas.OverloadCount,
        // 超交期工单数
        this.datas.OverdueCount,
        // 超负荷工单数
        this.datas.OverloadCount,
        // 异常工单详情
        this.datas.OverloadBills
      ];
      this.CreationDate = timeFormat(
        this.datas.CreationDate,
        "yyyy-MM-dd hh:mm:ss"
      );
    },
    load() {
      this.AlgorithmDes = AlgorithmTypeEnum.getItem(this.datas.AlgorithmType, "name").description
      this.title = i18n.t(`production.Pr_${this.datas.AlgorithmType}`);
      if (Object.keys(this.datas).length === 0) {
        this.WorksheetNum = [];
      } else {
        this.getCount();
      }
    },
  },
};
</script>
<style scoped>
.chart-title {
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  padding: 20px 0;
}
.chart-description {
  font-size: 14px;
  font-weight: 600;
  //margin-top: 12px;
  text-align: center;
  padding: 10px 0;
}
.chart-description > div {
  margin-top: 2px;
}
.chart-wrapper{
  border: 1px solid #eee;
  min-height: 200px;
}
</style>
