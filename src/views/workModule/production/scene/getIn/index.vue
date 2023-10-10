<template>
  <page-wrapper :footer="false">
    <div class="get-in">
      <!--头部-->
      <div class="get-in-header">
        <!--工序-->
        <div class="get-in-header-processes">
          <i class="el-icon-location-information"></i>
          <div
            v-for="site in SiteData"
            :key="site"
            style="margin: 0 5px; display: inline-block"
          >
            <el-tag>{{ site }}</el-tag>
          </div>
        </div>
        <!-- 表单，用来输入用户和任务单-->
        <div class="get-in-header-form">
          <el-input
            v-model.trim="formData"
            ref="refFocus"
            :placeholder="
                $t('production.Pr_PleaseEnterEmployeeNoAndWorkSheetNo')
              "
            @keyup.enter.native="onBoard($event)"
          ></el-input>
          <el-button @click="onBoard" style="margin-left: 15px">{{
              $t("production.Pr_UpToMachine")
            }}</el-button>
        </div>
        <!-- 信息-->
        <div class="get-in-header-info">
          <div>人员：{{ UserData.UserName }}</div>
          <div>单号：{{ form.DeviceNo }}</div>
        </div>
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from "~/cpn/PageWrapper/index.vue";
import {getUser, getUserConfig} from "@/api/basicApi/systemSettings/user";
import {getByIdProductionDevice} from "@/api/workApi/production/baseData";
import {currentSiteList} from "@/api/workApi/production/productionReport";

export default {
  name: "index",
  components: { PageWrapper },
  data() {
    return {
      SiteData: [],
      formData: "",
      UserData: {
        UserName: '',
      },
      form: {

      }
    }
  },
  created() {
    this.GetConfig();
  },
  methods: {
    GetConfig() {
      getUserConfig({ ConfigKey: "UserStation" }).then((res) => {
        this.SiteData = JSON.parse(res.ConfigValue);
      });
    },
    // 上机
    onBoard() {
      if (this.formData.substring(3, 0) === "H!_") {
        this.form.UserId = this.formData.slice(3);
        if (this.form.UserId !== "") {
          getUser({ UserId: this.form.UserId }).then((res) => {
            // this.UserData.PhotoUrl = res.PhotoUrl;
            this.UserData.UserName = res.UserName;
            this.formData = "";
          });
        }
      } else if (this.formData.substring(3, 0) === "O!_") {
        this.form.BillId = this.formData.slice(3);
        this.formData = "";
      } else if (this.formData.substring(3, 0) === "M!_") {
        this.form.DeviceNo = this.formData.slice(3);
        this.formData = "";
        getByIdProductionDevice({ DeviceNo: this.form.DeviceNo })
          .then((res) => {
            this.formData = "";
            return currentSiteList({
              DeviceNo: this.form.DeviceNo,
              SelectType: 2,
            });
          })
          .then((res) => {
            this.OnTheMachineDataList = res.Items;
          });
      } else {
        this.formData = "";
      }
      if (this.form.UserId === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterEmployeeInfo")
        );
      if (this.form.DeviceNo === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseSelectDevice")
        );

      if (this.form.BillId === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterWorkSheetInfo")
        );
      this.BillId = this.form.BillId;
      this.inputQuantityDialogFormVisible = true;
    },
  }
};
</script>

<style scoped lang="scss">
.get-in{
  width: 100%;
  height: 100%;
  background: #fff;
  &-header{
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    &-processes{
      width: 100%;
      display: flex;
      align-items: center;
      height: 50px;
      padding-left: 10px;
    }
    &-form{
      padding-left: 10px;
      width: 300px;
      display: flex;
    }
  }
}

</style>
