<template>
  <dv-full-screen-container>
    <div class="Sale-signage">
      <!--页面头部-->
      <div class="Sale-signage-header">
        <div class="Sale-signage-header-left">
          logo
        </div>
        <div class="Sale-signage-header-center">
          {{ $t("DataV.Da_SaleSignage") }}
        </div>
        <div class="Sale-signage-header-right">
          <formatted-time format="yyyy/MM/dd hh:mm:ss" />
        </div>
      </div>
      <!--页面主体-->
      <div class="Sale-signage-content">
        <!--销售金额-->
        <div class="Sale-signage-content-top">
          <!-- 本年销售数据 -->
          <div class="Sale-signage-content-top-left">
            <dv-border-box-7 :color="['#4c5f98', '#5166b0']" style="width: 33%" v-for="(item) in AnnualData">
              <div class="border-box-7-content">
                <div class="border-box-7-content-top">{{ item.title }}</div>
                <div class="border-box-7-content-bottom">{{ item.data }}</div>
              </div>
            </dv-border-box-7>
          </div>
          <!-- 本月销售数据 -->
          <div class="Sale-signage-content-top-right">
            <dv-border-box-7 :color="['#4c5f98', '#5166b0']" style="width: 33.3%" v-for="(item) in MonthlyData">
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
              <sortStatistics :result="SortData"></sortStatistics>
            </div>
          </div>
          <div class="Sale-signage-content-main-bottom">
            <!-- 本年每月出货统计 -->
            <div class="Monthly-shipment-statistics">
              <monthlyShipments :result="MonthlyShipmentsData"></monthlyShipments>
            </div>
            <!-- 本年出货Top8统计 -->
            <div class="Top8-statistics-for-shipments">
              <top8Shipments :result="sortTop8"></top8Shipments>
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
      SortData:[],
      MonthlyShipmentsData: [],
      Top8ShipmentsList: [],
      sortTop8:[],
      NonShipmentList: [],
    }
  },
  created() {
    setTimeout(() => {
      this.AnnualData = [
        { title:"本年销售总金额", data:21495 },
        { title:"本年未出货总金额",data:64383 },
        { title:"已出货金额",data:25443 },
      ];
      this.MonthlyData = [
        { title:"本月销售总金额", data:12333 },
        { title:"本月未出货总金额",data:23179 },
        { title:"本月已出货总金额",data:12321 },
      ];
      this.MonthlyOrdersData = {
        //   国内订单
        DomesticOrders: [123,423,231,235,121,231,534,121,32,12,342,534],
        //   国外订单
        ForeignOrders: [198,472,348,324,481,349,162,325,324,54,231,123],
        //   客诉订单
        ComplaintOrder: [12,32,45,56,2,43,23,54,23,32,12,34],
        //   其它类型
        OtherOrder: [110,220,120,222,132,113,354,511,320,320,333,111],
      };
      // 订单分类统计
      this.SortData = [
        { value:4332, name: 'DomesticOrders' },
        { value:3133, name: 'ForeignOrders' },
        { value:1244, name: 'ComplaintOrder' },
        { value:5243, name: 'OtherOrder' },
      ];
      this.MonthlyShipmentsData = [123,423,231,235,121,231,534,121,32,12,342,534]
      this.Top8ShipmentsList = [
        { name:'A182',value:110 },
        { name:'A142',value:120 },
        { name:'B23',value:222 },
        { name:'B55',value:132 },
        { name:'B213',value:113 },
        { name:'C23',value:354 },
        { name:'C54',value:511 },
        { name:'C134',value:320 },
      ]
      this.sortTop8 = this.Top8ShipmentsList.sort((a, b) => b.value - a.value);
      this.NonShipmentList = [
        {Id: 0, CustomerId: '001', BillId: 'SP22331212', UnshippedQuantity: '32', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 1, CustomerId: '001', BillId: 'SP27645212', UnshippedQuantity: '213', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 2, CustomerId: '006', BillId: 'SP23231212', UnshippedQuantity: '12', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 3, CustomerId: '006', BillId: 'SP22231214', UnshippedQuantity: '32', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 4, CustomerId: '123', BillId: 'SP22231213', UnshippedQuantity: '4', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 5, CustomerId: '224', BillId: 'SP22231212', UnshippedQuantity: '23', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 6, CustomerId: '886', BillId: 'SP22231215', UnshippedQuantity: '21', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 7, CustomerId: '245', BillId: 'SP22231216', UnshippedQuantity: '34', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 8, CustomerId: '202', BillId: 'SP22231217', UnshippedQuantity: '324', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 9, CustomerId: '202', BillId: 'SP22231218', UnshippedQuantity: '2', DeliveryDate: '2023-08-27T12:00:00' },
        {Id: 10, CustomerId: '203', BillId: 'SP22231292', UnshippedQuantity: '2', DeliveryDate: '2023-08-27T12:00:00' },
      ]

    }, 1000);
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
