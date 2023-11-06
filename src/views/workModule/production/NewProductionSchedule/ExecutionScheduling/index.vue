<template>
  <page-wrapper :footer="false">
    <div class="execution-scheduling">
      <!--顶部操作行-->
      <div class="execution-scheduling-header">
        <!--开始时间-->
        <div class="execution-scheduling-header-item">
          <div style="width: 80px">开始时间：</div>
          <el-date-picker
            v-model="StartDate"
            type="date"
            placeholder="选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </div>
        <!--算法选择-->
        <div class="execution-scheduling-header-item">
          <div style="min-width: 80px">算法选择：</div>
          <el-select v-model="algorithm" placeholder="请选择">
            <el-option
              v-for="item in algorithmOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!--启动自动排程-->
        <div class="execution-scheduling-header-item">
          <el-button @click="StartAutomaticScheduling">启动自动排程</el-button>
        </div>
        <!--发布排程结果-->
        <div class="execution-scheduling-header-item">
<!--          <el-button-->
<!--            :disabled="!SchedulingShow"-->
<!--            @click="PublishSchedulingResults"-->
<!--            >发布排程结果</el-button-->
<!--          >-->
          <el-button
            @click="PublishSchedulingResults"
          >发布排程结果</el-button
          >
        </div>
        <!--排程日志-->
        <div class="execution-scheduling-header-item">
          <el-button @click="ScheduleLog">排程日志</el-button>
        </div>
      </div>
      <!--内容-->
      <div class="execution-scheduling-content">
        <transition name="el-zoom-in-top">
          <div v-show="SchedulingShow">
            <div class="execution-scheduling-content-title">排程报告</div>
            <div class="execution-scheduling-content-info">
              参与排程模具
              <span class="blue-Highlight">{{ ToolingNoTotal }}</span> 套,
              合计零件 <span class="blue-Highlight">{{ PartNoTotal }}</span> 件,
              其中
              <span class="red-Highlight">{{ OverdueToolingNoTotal }}</span>
              套模具共
              <span class="red-Highlight">{{ OverduePartNoTotal }}</span>
              个工件无法按期交付
            </div>
            <div style="margin-top: 20px" v-show="ProcessList.length || PartList.length">系统建议采取以下几种措施:</div>
            <div style="margin-top: 10px"  v-show="ProcessList.length">
              1.将以下工件外协
              <span style="text-decoration: underline; cursor: pointer"
                    @click="WorkpieceOutsourcing = true"
                >配置>></span
              >
            </div>
            <div style="text-indent: 2em; color: red; margin-top: 10px"  v-show="ProcessList.length">
              <span v-for="(item, i) in ProcessList" :key="i"
                >{{ item }};
              </span>
            </div>
            <div style="margin-top: 20px" v-show="PartList.length">
              2.协商将以下模具交期推迟
              <span
                style="text-decoration: underline; cursor: pointer"
                @click="SchedulingResults = !SchedulingResults"
                >配置>></span
              >
            </div>
            <div style="text-indent: 2em; color: red; margin-top: 10px"  v-show="PartList.length">
              <span v-for="(item, i) in PartList" :key="i">{{ item }}; </span>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 工件外协弹窗 -->
    <JvDialog
      title="工件外协"
      :visible.sync="WorkpieceOutsourcing"
      :IsShowConfirmFooterBtn="false"
      v-if="WorkpieceOutsourcing"
      width="80%"
    >
      <WorkpieceOutsourcingTable :tableData="WorkpieceOutsourcingData"></WorkpieceOutsourcingTable>
    </JvDialog>
    <!-- 排程结果弹窗 -->
    <JvDialog
      title="排程结果"
      :visible.sync="SchedulingResults"
      :IsShowConfirmFooterBtn="false"
      v-if="SchedulingResults"
      width="80%"
    >
      <calculate :data="calculateData"></calculate>
    </JvDialog>
    <!-- 排程日志弹窗 -->
    <apsLog :visible.sync="apsDialogFormVisible"></apsLog>
  </page-wrapper>
</template>

<script>
import PageWrapper from "~/cpn/PageWrapper/index.vue";
import { AlgorithmTypeEnum } from "@/enum/workModule/production/AlgorithmTypeEnum";
import JvDialog from "~/cpn/JvDialog/index.vue";
import { do_aps1, do_publish } from "@/api/workApi/production/aps";
import calculate from "./components/calculate/index.vue";
import WorkpieceOutsourcingTable from './components/WorkpieceOutsourcingTable/index.vue'
import apsLog from "@/views/workModule/production/productionSchedule/List/components/apsLog.vue";
import timeFormat from '@/jv_doc/utils/time/timeFormat';
export default {
  name: "index",
  components: { apsLog, JvDialog, PageWrapper, calculate, WorkpieceOutsourcingTable },
  data() {
    return {
      StartDate: new Date(), // 开始时间
      algorithm: 0, // 算法选择
      algorithmOptions: AlgorithmTypeEnum.getEnums(), // 算法选择Options
      ToolingNoTotal: 11, // 总计模具
      PartNoTotal: 61, // 总计零件
      OverdueToolingNoTotal: 9, // 总计超交期模具
      OverduePartNoTotal: 46, // 总计超交期零件
      OverloadData: 11, // 超负荷数据
      OverDeliveryDate: 11, //    超交期数据
      SchedulingResults: false, // 交期推迟配置弹窗
      SchedulingShow: false, // 是否启动排程过
      apsDialogFormVisible: false, // 排程结果弹窗
      WorkpieceOutsourcing: false, // 工件外协弹窗
      WorkpieceOutsourcingData: [], // 工件外协窗传过去的数据
      calculateData: [], // 交期推迟弹窗传过去的数据
      ProcessList: [], // 工件列表（排程后的数据）
      PartList: [], // 零件列表（排程后的数据）
    };
  },
  created() {},
  methods: {
    // 启动自动排程
    StartAutomaticScheduling() {
      do_aps1({
        StartDate: timeFormat(this.StartDate, 'yyyy-MM-dd hh:mm:ss'),
        SchedulingType: this.algorithm,
      }).then((res) => {
        this.$message({
          type: "success",
          message: "操作成功！",
        });
        this.SchedulingShow = true;
        this.setReportData(res);
        this.calculateData = res['OverDeliveryDate']['BillDataList'];
        this.WorkpieceOutsourcingData = res['OverloadData']['ProcessDataList']
      });
    },
    // 设置排程报告数据
    setReportData(data) {
      this.OverduePartNoTotal = data.OverduePartNoTotal;
      this.OverdueToolingNoTotal = data.OverdueToolingNoTotal;
      this.PartNoTotal = data.PartNoTotal;
      this.ToolingNoTotal = data.ToolingNoTotal;
      this.PartList = data.OverDeliveryDate.PartList;
      this.ProcessList = data.OverloadData.ProcessList;
    },
    // 发布排程结果
    PublishSchedulingResults() {
      do_publish().then((res) => {
        console.log(res, "发布排程结果成功");
      });
    },
    // 排程日志
    ScheduleLog() {
      this.apsDialogFormVisible = true;
    },
  },
};
</script>

<style scoped lang="scss">
.execution-scheduling {
  &-header {
    width: 100%;
    height: 50px;
    background: #fff;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    &-item {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
  }
  &-content {
    &-info {
      margin-top: 20px;
      text-indent: 2em;
      .blue-Highlight {
        color: blue;
        font-size: 20px;
        font-weight: bold;
      }
      .red-Highlight {
        color: red;
        font-size: 20px;
        font-weight: bold;
      }
    }
    &-title {
      font-size: 24px;
      font-weight: bold;
    }
    height: calc(100% - 60px);
    width: 100%;
    background: #fff;
    padding: 10px;
  }
  width: 100%;
  height: 100%;
  border-radius: 4px;
}
</style>
