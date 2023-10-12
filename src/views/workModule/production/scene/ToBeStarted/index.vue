<template>
  <PageWrapper :footer="false">
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
    <div class="page-body">
      <div class="page-body-box">
        <JvTable :table-obj="tableObj1"></JvTable>
      </div>
      <div class="page-body-box">
        <JvTable :table-obj="tableObj2"></JvTable>
      </div>
    </div>
  </PageWrapper>
</template>
<script>
import { Table } from "@/jv_doc/class/table"
import { tableConfig } from "./config";
// 车间工作列表
import { site_collection_workshop_work_list } from "@/api/workApi/quality/siteCollection"
//车间工作待入站列表
import { site_collection_workshop_pending_list } from "@/api/workApi/quality/siteCollection"
export default {
  name: "ToBeStarted",
  data() {
    return {
      ToolingNo: "",
      PartNo: "",
      tableObj1: {},
      tableObj2: {},
    }
  },
  created() {
    this.tableObj1 = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
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
    // 批量开工
    batchStart(){
      console.log('批量开工');
    },
    // 过滤
    filter(){
      this.getData({
        ToolingNo: this.ToolingNo,
        PartNo: this.PartNo,
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.action-header {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  //justify-content: space-between;
  background-color: #fff;
  padding: 6px 10px;
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
  }
};
</style>
