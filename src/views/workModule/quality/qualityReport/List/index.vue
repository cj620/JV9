<!--品质报表-->
<template>
  <PageWrapper ref="page" :footer="false">
    <div class="qualityReport-page">
      <div class="qualityReport-page-top">
        <div class="qualityReport-page-search">
          <el-button-group style="margin-right: 10px">
            <el-button type="warning" plain @click="monthSearch(1)">{{
              $t("Generality.Ge_1Month")
            }}</el-button>
            <el-button type="warning" plain @click="monthSearch(2)">{{
              $t("Generality.Ge_2Month")
            }}</el-button>
            <el-button type="warning" plain @click="monthSearch(3)">{{
              $t("Generality.Ge_3Month")
            }}</el-button>
            <el-button type="warning" plain @click="monthSearch(6)">{{
              $t("Generality.Ge_6Month")
            }}</el-button>
            <el-button type="warning" plain @click="monthSearch(12)">{{
              $t("Generality.Ge_12Month")
            }}</el-button>
          </el-button-group>
          <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="~"
            :start-placeholder="$t('Generality.Ge_StartDate')"
            :end-placeholder="$t('Generality.Ge_EndDate')"
            @change="timeChange"
          >
          </el-date-picker>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="qualityReport-page-size">
              {{ $t("quality.Qc_ProcessReworkRatio") }}
            </div>
            <el-divider></el-divider>
            <PieChart
              id="PieChart3"
              v-if="ReworkProportion.length > 0"
              :data="ReworkProportion"
            ></PieChart>
            <div v-else>
              <PieChart id="PieChart3" :data="ReworkProportion"></PieChart>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="qualityReport-page-size">
              {{ $t("quality.Qc_ProportionOfAbnormalQualityOfDepartment") }}
            </div>
            <el-divider></el-divider>

            <PieChart
              id="PieChart4"
              v-if="AbnormalProportion.length > 0"
              :data="AbnormalProportion"
            ></PieChart>
            <div v-else>
              <PieChart id="PieChart4" :data="AbnormalProportion"></PieChart>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="qualityReport-page-bottom">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="qualityReport-page-bottom-header">
              <div class="qualityReport-page-size">
                {{ $t("quality.Qc_ReworkDetailList") }}
              </div>
              <div class="qualityReport-page-bottom-more" @click="JumpDetail">
                {{ $t("Generality.Ge_More")
                }}<i class="el-icon-d-arrow-right"></i>
              </div>
            </div>

            <el-divider></el-divider>
            <JvTable :table-obj="tableObj1"> </JvTable>
          </el-col>
          <el-col :span="12">
            <div class="qualityReport-page-bottom-header">
              <div class="qualityReport-page-size">
                {{ $t("quality.Qc_Ge_QualityAbnormal") }}
              </div>
              <div class="qualityReport-page-bottom-more" @click="JumpDetail">
                {{ $t("Generality.Ge_More")
                }}<i class="el-icon-d-arrow-right"></i>
              </div>
            </div>
            <el-divider></el-divider>
            <JvTable :table-obj="tableObj2">
              <template #CheckResult="{ record }">
                <!-- 状态标签 -->
                {{ record }}
              </template>
            </JvTable>
          </el-col>
        </el-row>
      </div>
    </div>
  </PageWrapper>
</template>

<script>
import PieChart from "./components/pieChart";
import { dataReportQc } from "@/api/workApi/quality/qualityReport";
import { Table } from "@/jv_doc/class/table";
import { tableConfig1, tableConfig2 } from "./config";
import { data } from "../../../../basicModule/demo/EditTable/data";
export default {
  name: "QualityReport",
  data() {
    return {
      value1: ["", ""],
      ReworkProportion: [],
      AbnormalProportion: [],
      tableObj1: {},
      tableObj2: {},
      form: {
        StartDate: "",
        EndDate: "",
      },
    };
  },
  components: {
    PieChart,
  },
  async created() {
    this.tableObj1 = new Table({
      tableSchema: tableConfig1,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 300,
    });
    this.tableObj2 = new Table({
      tableSchema: tableConfig2,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 300,
    });
    await this.GetData();
  },
  methods: {
    async GetData() {
      await dataReportQc(this.form).then((res) => {
        this.ReworkProportion = res.ReworkProportion;
        this.AbnormalProportion = res.AbnormalProportion;

        this.tableObj1.setData(res.ReworkList);
        this.tableObj2.setData(res.AbnormalList);
      });
    },
    //月份查询
    monthSearch(e) {
      this.value1 = [this.GetPreMonthDay(e), new Date()];
      this.timeChange();
    },
    GetPreMonthDay(monthNum) {
      var date = new Date();
      var year = date.getFullYear(); //获取当前日期的年份
      var month = date.getMonth() + 1; //获取当前日期的月份
      var day = date.getDate(); //获取当前日期的日
      var days = new Date(year, month, 0);
      days = days.getDate(); //获取当前日期中月的天数
      var year2 = year;
      var month2 = parseInt(month) - monthNum;
      if (month2 <= 0) {
        var absM = Math.abs(month2);
        year2 =
          parseInt(year2) - Math.ceil(absM / 12 == 0 ? 1 : parseInt(absM) / 12);
        month2 = 12 - (absM % 12);
      }
      var day2 = day;
      var days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      var t2 = year2 + "-" + month2 + "-" + day2;
      return t2;
    },
    //修改时间
    timeChange() {
      this.form.StartDate = this.value1[0];
      this.form.EndDate = this.value1[1];
      this.GetData();
    },
    //跳转到品质异常
    JumpDetail() {
      this.$router.push({
        name: "QualityError", //跳转的路径
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.qualityReport-page {
  height: 100%;
  background-color: #ffffff;
  padding: 10px;

  .qualityReport-page-top {
    height: 50%;
    min-height: 300px;
    .qualityReport-page-search {
      margin-bottom: 24px;
    }
    .qualityReport-page-top-error {
      height: 100%;
      display: flex;
      align-items: center;
      justify-items: center;
      justify-content: center;
    }
  }
  .qualityReport-page-bottom {
    height: 50%;
    min-height: 300px;
    .qualityReport-page-bottom-header {
      display: flex;
      justify-content: space-between;
      .qualityReport-page-bottom-more {
        color: #1890ff;
        cursor: pointer;
      }
    }
  }
}
.qualityReport-page-size {
  color: #ff9502;
}
</style>
