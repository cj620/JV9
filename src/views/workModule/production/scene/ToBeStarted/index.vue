<template>
  <PageWrapper :footer="false">
    <div style="height: 100%; width: 100%; background-color: #fff;">
      <!-- 顶部操作行 -->
      <div class="action-header">
        <el-button @click="batchStart" style="margin: 0 10px; height: 50px">
          批量开工
        </el-button>
        <div class="action-header-input">
          <el-input placeholder="请输入模具编码" v-model="ToolingNo">
          </el-input>
        </div>
        <div class="action-header-input">
          <el-input placeholder="请输入零件编码" v-model="PartNo">
          </el-input>
        </div>
        <el-button @click="filter" style="margin: 0 10px; height: 50px">
          过滤
        </el-button>
      </div>
      <!-- 表格 -->
      <div class="page-body">
        <div class="page-body-box">
          <JvTable :table-obj="tableObj1" :row-style="{ height: '60px' }">
            <template #Start="{ row }">
              <el-button
                @click="oneStart(row)"
                size="medium"
                style="width: 80%; height: 100%"
                :disabled="row.State !== 'Received' && row.State !== 'Processing' && row.State !== 'Pausing'"
              >
                开工
              </el-button>
            </template>
          </JvTable>
        </div>
        <div class="page-body-box">
          <JvTable :table-obj="tableObj2"></JvTable>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script>
import { Table } from "@/jv_doc/class/table"
import { tableConfig } from "./config";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
// 车间工作列表
import { site_collection_workshop_work_list } from "@/api/workApi/quality/siteCollection"
// 车间工作待入站列表
import { site_collection_workshop_pending_list } from "@/api/workApi/quality/siteCollection"
// 上机
import { upMachineCollection } from "@/api/workApi/production/productionReport";
export default {
  name: "ToBeStarted",
  data() {
    return {
      ToolingNo: "",
      PartNo: "",
      tableObj1: {},
      tableObj2: {},
      BillInfo: {},
      UserInfo: {},
    }
  },
  created() {
    this.tableObj1 = new Table({
      tableSchema: [{
        prop: "Start",
        label: "",
        align: "center",
        custom: true,
      },...tableConfig],
      pagination: false,
      sortCol: false,
      // chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
    })
    this.tableObj2 = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
    })
    this.getData({
      UserId: this.$store.state.user.userId
    })
    getAllUserData().then((res) => {
      this.UserInfo = res
    })
  },
  methods: {
    getData(obj){
      site_collection_workshop_work_list(obj).then((res) => {
        this.tableObj1.setData(res.Items)
      })
      site_collection_workshop_pending_list(obj).then((res) => {
        this.tableObj2.setData(res.Items)
      })
    },
    // 开工按钮
    oneStart(e){
      let obj = this.UserInfo.Items.find( (value,index) => {
        return value.UserName === e.Worker
      })
      this.BillInfo = {
        Bills: [
          {
            BillId: e.BillId,
            Quantity: e.Quantity,
          },
        ],
        UserId: obj.UserId,
        DeviceNo: e.PlanDevice,
      }
      upMachineCollection(this.BillInfo)
    },
    // 批量开工
    batchStart(){
      console.log('批量开工');
    },
    // 过滤
    filter(){
      this.getData({
        ToolingNo: this.ToolingNo,
        PartNo: this.PartNo,
        UserId: this.$store.state.user.userId
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.action-header {
  margin-bottom: 4px;
  padding: 20px 10px 10px 10px;
  width: 100%;
  display: flex;
  background-color: #fff;
  height: 60px;
  border-radius: 4px;
  align-items: center;
  &-input{
    margin: 0 10px;
    //display: flex;
    height: 50px;
    ::v-deep.el-input--medium {
      height: 50px !important;
      .el-input__inner {
        height: 50px !important;
      }
    }
  }
}
.page-body {
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  padding: 6px 10px;
  border-radius: 4px;
  width: 100%;
  height: calc(100% - 70px);
  &-box {
    width: 100%;
    height: 49%;
    ::v-deep .table-wrapper {
      height: 100% !important;
    }
  }
};
</style>
