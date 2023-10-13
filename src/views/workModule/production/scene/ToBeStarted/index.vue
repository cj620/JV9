<template>
  <PageWrapper :footer="false">
    <div style="height: 100%; width: 100%; background-color: #fff;">
      <!-- 顶部操作行 -->
      <div class="action-header">
        <div class="action-header-input">
          <el-input placeholder="请输入模具编码" v-model="ToolingNo">
          </el-input>
        </div>
        <div class="action-header-input">
          <el-input placeholder="请输入零件编码" v-model="PartNo">
          </el-input>
        </div>
        <!--<div class="action-header-input">-->
        <!--  <el-input placeholder="请输入作业员" v-model="WorkerName">-->
        <!--  </el-input>-->
        <!--</div>-->
        <el-form class="action-header-form">
            <el-form-item size="medium">
                <el-select v-model="WorkerName" placeholder="请选择作业员">
                    <el-option
                        v-for="item in UserInfo"
                        :key="item.UserId"
                        :label="item.UserName"
                        :value="item.UserName"
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
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
                v-if=" row.State === 'Received' || row.State === 'Pausing'"
              >
                上机
              </el-button>
              <el-button
                @click="oneDown(row)"
                size="medium"
                style="width: 80%; height: 100%"
                v-else
              >
                下机
              </el-button>
            </template>
          </JvTable>
        </div>
        <div class="page-body-box">
          <JvTable :table-obj="tableObj2">
            <template #Start="{ row }">
                <el-button
                    @click="oneInSite(row)"
                    size="medium"
                    style="width: 80%; height: 100%"
                    :disabled="row.State !== 'ToBeReceived'"
                >
                    进站
                </el-button>
            </template>
          </JvTable>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script>
import { Table } from "@/jv_doc/class/table"
import { tableConfig } from "./config";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import {
  site_collection_workshop_work_list,
  site_collection_workshop_pending_list,
} from "@/api/workApi/quality/siteCollection"
import { inSite, upMachineCollection, downMachineCollection } from "@/api/workApi/production/productionReport";
export default {
  name: "ToBeStarted",
  data() {
    return {
      ToolingNo: "",
      PartNo: "",
      WorkerName: "",
      tableObj1: {},
      tableObj2: {},
      UserInfo: [],
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
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
    })
    this.tableObj2 = new Table({
      tableSchema: [{
        prop: "Start",
        label: "",
        align: "center",
        custom: true,
      },...tableConfig],
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
      this.UserInfo = res.Items
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
    // 根据userName查询userId
    searchUserId(str){
      if (str){
        let obj = this.UserInfo.find( (value,index) => {
          return value.UserName === str
        })
        return obj.UserId
      } else {
        return this.$store.state.user.userId
      }
    },
    // 过滤
    filter() {
      this.getData({
        ToolingNo: this.ToolingNo,
        PartNo: this.PartNo,
        UserId: this.searchUserId(this.WorkerName)
      })
    },
    // 进站按钮
    oneInSite(e){
      inSite(
        {
          TaskProcesses: [
            {
              TaskProcessId: e.Id,
              Quantity: e.Quantity
            }
          ],
          UserId: this.searchUserId(e.Worker)
        }
      ).then((res) =>{
        this.getData({
          ToolingNo: this.ToolingNo,
          PartNo: this.PartNo,
          UserId: this.searchUserId(this.WorkerName)
        })
      })
    },
    // 开工(上机)按钮
    oneStart(e){
      upMachineCollection({
        Bills: [
          {
            BillId: e.BillId,
            Quantity: e.Quantity,
          },
        ],
        UserId: this.searchUserId(e.Worker),
        DeviceNo: e.PlanDevice,
      }).then((res) =>{
        this.getData({
          ToolingNo: this.ToolingNo,
          PartNo: this.PartNo,
          UserId: this.searchUserId(this.WorkerName)
        })
      })
    },
    // 下机按钮
    oneDown(e){
      downMachineCollection({
        DownMachineCollectionItem: [
          {
            TaskProcessId: e.Id,
            DeviceNo: e.PlanDevice,
          }
        ],
        UserId: this.searchUserId(e.Worker),
      }).then((res) =>{
        this.getData({
          ToolingNo: this.ToolingNo,
          PartNo: this.PartNo,
          UserId: this.searchUserId(this.WorkerName)
        })
      })
    },
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
  &-form{
    margin: 0 10px;
    height: 50px;
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
