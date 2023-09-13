<template>
  <dv-full-screen-container>
    <div class="Quality-signage">
      <!--页面头部-->
      <div class="Quality-signage-header">
        <div class="Quality-signage-header-left">
          logo
        </div>
        <div class="Quality-signage-header-center">
          品质部门看板
        </div>
        <div class="Quality-signage-header-right">
          <formatted-time/>
        </div>
      </div>
      <!-- 页面主体 -->
      <div class="Quality-signage-content">
        <!-- 数据 -->
        <div class="Quality-signage-content-top">
          <dv-border-box-7 :color="['#4c5f98', '#5166b0']" style="width: 360px" v-for="(item) in qualityData" :key="item.title">
            <div class="border-box-7-content">
              <div class="border-box-7-content-top">{{ item.title }}</div>
              <div class="border-box-7-content-bottom">{{ item.data }}</div>
            </div>
          </dv-border-box-7>
        </div>
        <!-- 图表 -->
        <div class="Quality-signage-content-body">
          <div class="Quality-signage-content-body-item">
              <monthly-anomaly :result="monthlyAnomaly"></monthly-anomaly>
          </div>
          <div class="Quality-signage-content-body-item">
              <inspection-record :result="inspectionRecord"></inspection-record>
          </div>
          <div class="Quality-signage-content-body-item">
              <process-rework :result="processRework"></process-rework>
          </div>
        </div>
        <div class="Quality-signage-content-body">
          <div class="Quality-signage-content-body-item">
              <unqualified-analysis :result="UnqualifiedAnalysis"></unqualified-analysis>
          </div>
          <div class="Quality-signage-content-body-item">
              <order-to-be-inspected :result="orderToBeInspected"></order-to-be-inspected>
          </div>
          <div class="Quality-signage-content-body-item">
              <rework-details :result="reworkDetails"></rework-details>
          </div>
        </div>
      </div>
    </div>
    <d-loading v-show="loading" />
  </dv-full-screen-container>
</template>
<script>
import dLoading from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/d-loading.vue";
import FormattedTime from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/formattedTime.vue";
import MonthlyAnomaly from "./components/monthlyAnomaly.vue";
import InspectionRecord from "./components/inspectionRecord.vue";
import ProcessRework from "./components/processRework.vue";
import UnqualifiedAnalysis
	from "@/views/basicModule/KanBan/IntegratedSignage/QualitySignage/components/unqualifiedAnalysis.vue";
import OrderToBeInspected
	from "@/views/basicModule/KanBan/IntegratedSignage/QualitySignage/components/orderToBeInspected.vue";
import ReworkDetails from "@/views/basicModule/KanBan/IntegratedSignage/QualitySignage/components/reworkDetails.vue";

export default {
  name: "QualitySignage",
  components: {
	  ReworkDetails,
	  OrderToBeInspected,
	  UnqualifiedAnalysis,
	  ProcessRework,
	  InspectionRecord,
	  MonthlyAnomaly,
    FormattedTime,
    dLoading,
  },
  data(){
    return{
      loading: false,
      qualityData:[],
      monthlyAnomaly:{},
		  inspectionRecord:{},
		  processRework:[],
		  UnqualifiedAnalysis:[],
		  orderToBeInspected:[],
		  reworkDetails:[],

      // res:{
		  //   // 顶部数据
      //   qualityData: [
      //     { title:'送检总数', data: 3423}, //送检总数
      //     { title:'已检验数', data: 1233}, //已检验数
      //     { title:'本月NG数', data: 876}, //本月NG数
      //     { title:'不良率', data: '3.6%' }, //不良率
      //     { title:'返工率', data: '2%'}, //返工率
      //   ],
      //   // 每月异常统计
      //   monthlyAnomaly: {
      //     AnomalyQty: [20,31,51,22,23,54,12,98,32,55,22,34],
      //     AnomalyPercent: [10,23,31,4,12,12,34,21,3,12,21,4]
      //   },
		  //   // 员工检验记录
      //   inspectionRecord: {
			//     Qualified: [211,435,323,412,531], //合格数
			//     Unqualified: [32,21,32,50,75], //不合格数
			//     Staff: ['张三1','张三2','张三3','张三4','张三5'] //员工
      //   },
		  //   // 工序返工占比
		  //   processRework:[
      //     { name: '数据1',value:150 }, //数据1
      //     { name: '数据2',value:100 }, //数据2
      //   ],
		  //   // 不合格分析
		  //   nonconformingAnalysis:[
	    //     { name: '尺寸不合格',value:100 },
	    //     { name: '有毛刺',value:150 },
      //     { name: '质检',value:181 },
      //   ],
		  //   // 待检工单 /BillId:单号 /Part:零件 /InspectionTime:送检时间 /Submitter:送检人
		  //   orderToBeInspected:[
			//     { BillId: 'SP22331212',Part:'零件001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三1'},
			//     { BillId: 'SP23223312',Part:'零件002',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三2'},
			//     { BillId: 'SP92331212',Part:'螺丝',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三3'},
			//     { BillId: 'SP87631212',Part:'004',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三4'},
			//     { BillId: 'SP29561212',Part:'001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三5'},
      //   ],
		  //   // 返工明细 /PartNo:零件编号 /Process:工序 /Worker:作业员 /ReasonForRework:返工原因
		  //   reworkDetails:[
			//     { PartNo: 'PA1212',Process:'铣床',Worker:'张三1',ReasonForRework:'有毛刺'},
			//     { PartNo: 'PA1212',Process:'铣床',Worker:'张三1',ReasonForRework:'尺寸不合格'},
			//     { PartNo: 'PA1212',Process:'铣床',Worker:'张三2',ReasonForRework:'有毛刺'},
			//     { PartNo: 'PA1212',Process:'铣床',Worker:'张三3',ReasonForRework:'有毛刺'},
			//     { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',ReasonForRework:'有毛刺'},
      //   ],
      // }
    }
  },
  created() {
    setTimeout(() => {
      this.qualityData = [
        { title:'送检总数', data: 3423},
        { title:'已检验数', data: 1233},
        { title:'本月NG数', data: 876},
        { title:'不良率', data: '3.6%' },
        { title:'返工率', data: '2%'},
      ]
		  this.monthlyAnomaly = {
		    UnqualifiedQty: [20,31,51,22,23,54,12,98,32,55,22,34],
		    UnqualifiedPercent: [10,23,31,4,12,12,34,21,3,12,21,4]
      }
	    this.inspectionRecord = {
        Qualified: [211,435,323,412,531],
        Unqualified: [32,21,32,50,75],
        Staff: ['张三1','张三2','张三3','张三4','张三5']
      }
	    this.processRework = [
		    { name: '数据1',value:150 }, //数据1
		    { name: '数据2',value:100 }, //数据2
		  ]
      this.UnqualifiedAnalysis= [
		    { name: '尺寸不合格',value:100 },
		    { name: '有毛刺',value:150 },
		    { name: '质检',value:181 },
		  ]
      this.orderToBeInspected = [
		    { BillId: 'SP22331212',Part:'零件001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三1'},
		    { BillId: 'SP23223312',Part:'零件002',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三2'},
		    { BillId: 'SP92331212',Part:'螺丝',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三3'},
		    { BillId: 'SP87631212',Part:'004',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三4'},
		    { BillId: 'SP29561212',Part:'001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三5'},
		    { BillId: 'SP29561212',Part:'001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三5'},
		    { BillId: 'SP29561212',Part:'001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三5'},
		    { BillId: 'SP29561212',Part:'001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三5'},
		    { BillId: 'SP29561212',Part:'001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三5'},
		    { BillId: 'SP29561212',Part:'001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三5'},
		    { BillId: 'SP29561212',Part:'001',InspectionTime:'2023-08-27T12:00:00',Submitter:'张三5'},
		  ]
      this.reworkDetails = [
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三1',ReasonForRework:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三1',ReasonForRework:'尺寸不合格'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三2',ReasonForRework:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三3',ReasonForRework:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',ReasonForRework:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',ReasonForRework:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',ReasonForRework:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',ReasonForRework:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',ReasonForRework:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',ReasonForRework:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',ReasonForRework:'有毛刺'},
		  ]
    })
  }
}
</script>
<style scoped lang="scss">
.Quality-signage {
  width: 100%;
  height: 100%;
  background: #0b0f28;
  overflow: hidden;
  &-header {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    background: url("../EquipmentSignage/3.svg") no-repeat;
    background-size: cover;

    &-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
    }

    &-center {
      font-size: 30px;
      color: #fff;
      height: 100%;
      line-height: 80px;
      z-index: 1;
    }

    &-left {
      height: 100%;
      display: flex;
      align-items: flex-end;
      padding-left: 20px;
      color: #fff;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 200px;
    }

    &-right {
      height: 100%;
      color: #efefef;
      display: flex;
      align-items: flex-end;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 200px;
      justify-content: center;
    }
  }
  &-content {
    height: calc(100% - 90px);
    padding: 0 20px;
    overflow: hidden;
    &-top {
      margin-top: 10px;
      height: 120px;
      display: flex;
      justify-content: space-between;
    }
    &-body {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      &-item {
        height: 400px;
        width: 615px;
        background-color: #242d48;
      }
    }
  }
}
.border-box-7-content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
  &-top {
    width: 100%;
    height: 50%;
    color: #eaeaea;
    font-weight: bold;
    text-align: center;
    line-height: 59px;
    font-size: 20px;
  }
  &-bottom {
    width: 100%;
    height: 50%;
    color: #00E7FF;
    text-align: center;
    font-size: 30px;
  }
}
</style>
