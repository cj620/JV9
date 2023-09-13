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
              <unqualified-analysis :result="unqualifiedAnalysis"></unqualified-analysis>
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
import { quality_department_dashboard } from "@/api/basicApi/dataV/kanban";

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
		  unqualifiedAnalysis:[],
		  orderToBeInspected:[],
		  reworkDetails:[],
    }
  },
  created() {
	  this.loading = true;
	  this.getData()
    setTimeout(() => {
		  this.monthlyAnomaly = {
		    UnqualifiedQty: [20,31,51,22,23,54,12,98,32,55,22,34],
		    UnqualifiedPercent: [10,23,31,4,12,12,34,21,3,12,21,4]
      }
      // this.unqualifiedAnalysis= [
		  //   { name: '尺寸不合格',value:100 },
		  //   { name: '有毛刺',value:150 },
		  //   { name: '质检',value:181 },
		  // ]
      // this.orderToBeInspected = [
		  //   { BillId: 'SP22331212',PartNo:'零件001',CheckDate:'2023-08-27T12:00:00',Worker:'张三1'},
		  //   { BillId: 'SP23223312',PartNo:'零件002',CheckDate:'2023-08-27T12:00:00',Worker:'张三2'},
		  //   { BillId: 'SP92331212',PartNo:'螺丝',CheckDate:'2023-08-27T12:00:00',Worker:'张三3'},
		  //   { BillId: 'SP87631212',PartNo:'004',CheckDate:'2023-08-27T12:00:00',Worker:'张三4'},
		  //   { BillId: 'SP29561212',PartNo:'001',CheckDate:'2023-08-27T12:00:00',Worker:'张三5'},
		  //   { BillId: 'SP29561212',PartNo:'001',CheckDate:'2023-08-27T12:00:00',Worker:'张三5'},
		  //   { BillId: 'SP29561212',PartNo:'001',CheckDate:'2023-08-27T12:00:00',Worker:'张三5'},
		  //   { BillId: 'SP29561212',PartNo:'001',CheckDate:'2023-08-27T12:00:00',Worker:'张三5'},
		  //   { BillId: 'SP29561212',PartNo:'001',CheckDate:'2023-08-27T12:00:00',Worker:'张三5'},
		  //   { BillId: 'SP29561212',PartNo:'001',CheckDate:'2023-08-27T12:00:00',Worker:'张三5'},
		  //   { BillId: 'SP29561212',PartNo:'001',CheckDate:'2023-08-27T12:00:00',Worker:'张三5'},
		  // ]
      this.reworkDetails = [
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三1',Remarks:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三1',Remarks:'尺寸不合格'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三2',Remarks:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三3',Remarks:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',Remarks:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',Remarks:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',Remarks:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',Remarks:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',Remarks:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',Remarks:'有毛刺'},
		    { PartNo: 'PA1212',Process:'铣床',Worker:'张三4',Remarks:'有毛刺'},
		  ]
    })
  },
	methods: {
		getData(){
		  quality_department_dashboard().then((res) => {
        console.log(res);
        this.qualityData = [
          { title:'送检总数', data: res.TopInfo[0]},
          { title:'已检验数', data: res.TopInfo[1]},
          { title:'本月NG数', data: res.TopInfo[2]},
          { title:'不良率', data: res.TopInfo[3] },
          { title:'返工率', data: res.TopInfo[4]},
        ]
        this.inspectionRecord = res.InspectionRecord
        this.processRework = res.ProcessRework.map(obj => {
          return {
            name: obj.Name,
            value: obj.Value
          };
        });
        this.unqualifiedAnalysis = res.UnqualifiedAnalysis.map(obj => {
          return {
            name: obj.Name,
            value: obj.Value
          };
        });
        this.orderToBeInspected = res.OrderToBeInspected
        this.reworkDetails = res.ReworkData
        this.loading = false;
        }
		  ).catch((err) => {
          this.loading = false;
        }
		  );
		}
	},
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
