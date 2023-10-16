<template>
  <PageWrapper :footer="false">
    <div style="height: 100%; width: 100%; background-color: #fff;">
      <!-- 顶部操作行 -->
      <div class="action-header">
        <el-form class="action-header-form">
          <el-form-item size="medium">
            <el-select v-model="WorkerName" :placeholder="$t('production.Pr_PleaseSelectTheWorker')">
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
          {{ $t('Generality.Ge_Search') }}
        </el-button>
      </div>
      <!-- 表格 -->
      <div class="page-body">
        <JvTable :table-obj="tableObj">

        </JvTable>
      </div>
    </div>
  </PageWrapper>
</template>
<script>
import { Table } from "./config"
import JvTable from "~/cpn/JvTable/index.vue";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
export default {
  name: "WorkReportRecords",
  components: { JvTable },
  data() {
    return {
      UserInfo: [],
      WorkerName: "",
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table()
    getAllUserData().then((res) => {
      this.UserInfo = res.Items;
      this.WorkerName = this.UserInfo.find( (value,index) => {
        return value.UserId === this.$store.state.user.userId
      }).UserName;
      this.filter();
    })
  },
  methods: {
    filter(){
      this.tableObj.getData({
        UserName: this.WorkerName
      })
    },
  },
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
  &-form{
    margin: 0 10px;
    height: 50px;
    ::v-deep.el-input__inner {
      height: 50px !important;
    }
  }
}
.page-body {
  background-color: #fff;
  padding: 6px 10px;
  width: 100%;
  height: calc(100% - 70px);
}
</style>
