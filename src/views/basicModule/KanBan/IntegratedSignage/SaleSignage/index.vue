<template>
  <dv-full-screen-container>
    <div class="Sale-signage">
      <!--页面头部-->
      <div class="Sale-signage-header">
        <div class="Sale-signage-header-left">
          <img src="../logo.png" alt="">
        </div>
        <div class="Sale-signage-header-center">
          {{ $t("DataV.Da_SaleSignage") }}
        </div>
        <div class="Sale-signage-header-right">
          <formatted-time/>
        </div>
      </div>
      <!--页面主体-->
      <div class="Sale-signage-content">
        <!--销售金额-->
        <div class="Sale-signage-content-top">
          <!-- 本年销售数据 -->
          <div class="Sale-signage-content-top-left">
            <dv-border-box-7 :color="['#4c5f98', '#5166b0']" style="width: 33%" v-for="(item) in AnnualData" :key="item.title">
              <div class="border-box-7-content">
                <div class="border-box-7-content-top">{{ item.title }}</div>
                <div class="border-box-7-content-bottom">{{ item.data }}</div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 本月销售数据 -->
          <div class="Sale-signage-content-top-right">
            <dv-border-box-7 :color="['#4c5f98', '#5166b0']" style="width: 33.3%" v-for="(item) in MonthlyData" :key="item.title">
              <div class="border-box-7-content">
                <div class="border-box-7-content-top">{{ item.title }}</div>
                <div class="border-box-7-content-bottom">{{ item.data }}</div>
              </div>
            </dv-border-box-7>
          </div>
        </div>
        <!--销售订单-->
        <div class="Sale-signage-content-main">
          <div class="Sale-signage-content-main-top">
            <!-- 本年每月订单统计 -->
            <div class="Monthly-order-statistics">
              <monthlyOrders :result="MonthlyOrdersData"></monthlyOrders>
            </div>
            <!-- 订单分类统计 -->
            <div class="Order-classification-statistics">
              <sortStatistics :result="OrderClassificationData"></sortStatistics>
            </div>
          </div>
          <div class="Sale-signage-content-main-bottom">
            <!-- 本年每月出货统计 -->
            <div class="Monthly-shipment-statistics">
              <monthlyShipments :result="MonthlyShipmentsData"></monthlyShipments>
            </div>
            <!-- 本年出货Top8统计 -->
            <div class="Top8-statistics-for-shipments">
              <top8Shipments :result="Top8ShipmentsList"></top8Shipments>
            </div>
            <!-- 一周内未出货统计 -->
            <div class="Non-shipment-within-a-week">
              <nonShipment :result="NonShipmentList"></nonShipment>
            </div>
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
import monthlyOrders from "./components/monthlyOrders.vue";
import sortStatistics from "./components/sortStatistics.vue"
import monthlyShipments from "./components/monthlyShipments.vue";
import top8Shipments from "./components/top8Shipments.vue";
import nonShipment from "./components/nonShipment.vue";
import screenFull from 'screenfull';
import { sales_dashboard } from "@/api/basicApi/dataV/kanban";
export default {
  name: "SaleSignage",
  components: {
    FormattedTime,
    dLoading,
    monthlyOrders,
    sortStatistics,
    monthlyShipments,
    top8Shipments,
    nonShipment
  },
  data(){
    return{
      loading: false,
      AnnualData:[],
      MonthlyData:[],
      MonthlyOrdersData:{},
      OrderClassificationData:[],
      MonthlyShipmentsData: {},
      Top8ShipmentsList: [],
      NonShipmentList: [],
    }
  },
  created() {
    screenFull.toggle(); // 全屏
    this.getData()
  },
  methods: {
    getData(){
      sales_dashboard().then((res)=>{
        console.log(res);
        this.AnnualData = [
          { title: this.$t('DataV.Da_TotalSalesAmountThisYear'), data: res.TopInfo[0]},
          { title: this.$t('DataV.Da_TotalAmountNotShippedThisYear'), data: res.TopInfo[1]},
          { title: this.$t('DataV.Da_ShippedAmountThisYear'), data: res.TopInfo[2]},
        ];
        this.MonthlyData = [
          { title: this.$t('DataV.Da_TotalSalesAmountThisMonth'), data: res.TopInfo[3] },
          { title: this.$t('DataV.Da_TotalAmountNotShippedThisMonth'), data: res.TopInfo[4]},
          { title: this.$t('DataV.Da_ShippedAmountThisMonth'), data: res.TopInfo[5]},
        ];
        this.MonthlyOrdersData = res.MonthlyOrdersData;
        this.OrderClassificationData = res.OrderClassificationData;
        this.MonthlyShipmentsData = res.MonthlyShipmentsData;
        this.Top8ShipmentsList = res.Top8ShipmentsList.map(obj => {
          return {
            name: obj.Name,
            value: obj.Value
          };
        });
        this.NonShipmentList = res.NonShipmentList
      })
    }
  }
}
</script>
<style scoped lang="scss">
.Sale-signage {
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
      position: relative;
      img{
        width: 100%;
        position: absolute;
        bottom: -6px;
      }
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
      &-left {
        width: 49.6%;
        height: 100%;
        display: flex;
      }
      &-right {
        width: 49.6%;
        height: 100%;
        display: flex;
      }
    }
    &-main {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      &-top {
        height: 400px;
        width: 1880px;
        margin-bottom: 10px;
        display: flex;
        .Monthly-order-statistics{
          width: 1253.3px;
          height: 100%;
          margin-right: 10px;
          background-color: #242d48;
        }
        .Order-classification-statistics{
          width: 616.7px;
          height: 100%;
          margin-left: 10px;
          background-color: #242d48;
        }
      }
      &-bottom {
        height: 400px;
        width: 1880px;
        margin-top: 10px;
        display: flex;
        .Monthly-shipment-statistics {
          width: 626.7px;
          height: 100%;
          margin-right: 10px;
          background-color: #242d48;
        }
        .Top8-statistics-for-shipments {
          width: 626.7px;
          height: 100%;
          margin: 0 10px;
          background-color: #242d48;
        }
        .Non-shipment-within-a-week {
          width: 626.7px;
          height: 100%;
          margin-left: 10px;
          background-color: #242d48;
        }
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
