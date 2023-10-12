<!-- 钳工收料 -->
<template>
  <PageWrapper ref="page" :footer="false">
    <JvBlock class="report-page">
      <div class="report-content-header">
        <UserImg :UserData="UserData"></UserImg>
        <div class="report-content-header-content-info">
          <div
            style="display: flex"
            class="report-content-header-content-info-confirm"
          >
            <el-input
              v-model.trim="formData"
              ref="refFocus"
              @keyup.enter.native="receive($event)"
            ></el-input>
            <el-button @click="receiveRecord" style="margin-left: 40px">
              {{ $t("production.Pr_receiveRecord") }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="report-content-state1">
        <div>
          {{ $t("production.Pr_received") }}
        </div>
      </div>
      <div class="report-content-table">
        <JvTable :table-obj="tableObj"></JvTable>
      </div>
    </JvBlock>
    <!-- 收料数量 -->
    <JvDialog
      :visible.sync="receiveNumDialogVisible"
      :title="$t('production.Pr_pleaseEnterReceiveNumber')"
      v-if="receiveNumDialogVisible"
      @confirm="receiveConfirm"
      width="40%"
    >
        <el-input v-model="quantity" type="number">
        </el-input>
    </JvDialog>
  </PageWrapper>
</template>
<script>
import { Table } from "./config"
import UserImg from "@/components/JVInternal/UserImg/index.vue";
import { getUser } from "@/api/basicApi/systemSettings/user";
import { saveRCVRecord } from "@/api/workApi/production/baseData"
import { getProductionTask } from "@/api/workApi/production/productionTask"
import { timeFormat } from "~/utils/time";
export default {
  name: "ProductionFitterReceive",
  components: { UserImg },
  data() {
    return {
      UserData: {
        UserName: "",
        PhotoUrl: "",
      },
      form: {
        UserId: "",
        BillId: "",
      },
      SiteData: [],
      formData: "",
		  receiveNumDialogVisible: false,
		  quantity: 1,
      billInfo: {},
		  tableObj: {}
    }
  },
  created() {
    this.tableObj = new Table()
    this.tableObj.getData({ CreationDate: timeFormat(new Date(), "yyyy-MM-dd") })
  },
  methods: {
    receive() {
      if (this.formData.substring(3, 0) === "H!_") {
        this.form.UserId = this.formData.slice(3);
        if (this.form.UserId !== "") {
          getUser({ UserId: this.form.UserId }).then((res) => {
            this.UserData.PhotoUrl = res.PhotoUrl;
            this.UserData.UserName = res.UserName;
            this.formData = "";
          });
        }
      } else if (this.formData.substring(3, 0) === "O!_") {
        this.form.BillId = this.formData.slice(3);
        this.formData = "";
      } else {
        this.formData = "";
      }
      if (this.form.UserId === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterEmployeeInfo")
        );
      if (this.form.BillId === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterWorkSheetInfo")
        );
		  this.receiveNumDialogVisible = true;
		  getProductionTask({ BillId: this.form.BillId }).then((res) => {
        this.billInfo = res;
      })
    },
	  receiveConfirm() {
		  saveRCVRecord({
        PrTaskBillId: this.form.BillId,
        Quantity: this.quantity,
        UserId: this.form.UserId,
	    }).then((res) => {
        this.tableObj.getData({ CreationDate: timeFormat(new Date(), "yyyy-MM-dd") })
      })
		  this.receiveNumDialogVisible = false;
    },
    receiveRecord() {
      this.$router.push({
        name: "ProductionFitterReceiveRecord",
      });
    }
  }
};
</script>
<style lang="scss">
.report-page {
  height: 100%;
  background-color: #ffffff;
  .content{
    height: 100%;
    .report-content-header {
      display: flex;
      .report-content-header-content-info {
        margin-left: 20px;
        .report-content-header-content-info-site {
        }
        .report-content-header-content-info-confirm {
          //margin: 10px 0;
        }
      }
    }
    .report-content-state1 {
      height: 50px;
      display: flex;
      align-items: center;
      border-bottom: 1px #cccccc solid;
      border-top: 1px #cccccc solid;
      margin-bottom: 5px;
      margin-top: 15px;
    }
    .report-content-table{
      height: calc(100% - 246px);
    }
  }
}
</style>
