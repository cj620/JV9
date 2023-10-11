<template>
  <page-wrapper :footer="false">
    <div class="completion">
      <div class="completion-header">
        <div class="completion-header-processes">
          <span>{{ $t("Generality.Ge_Site") }}：</span>
          <div
            v-for="site in SiteData"
            :key="site"
            style="margin: 0 5px; display: inline-block"
          >
            <el-tag>{{ site }}</el-tag>
          </div>
        </div>
        <div class="completion-header-input">
          <el-input
            v-model.trim="formData"
            ref="refFocus"
            :placeholder="
              $t('production.Pr_PleaseEnterEmployeeNoAndWorkSheetNo')
            "
            @keyup.enter.native="onBoard($event)"
          ></el-input>
          <el-button @click="onBoard" style="margin-left: 15px; height: 50px">{{
            $t("production.Pr_UpToMachine")
          }}</el-button>
        </div>
        <div class="completion-header-time">
          <div>
            {{ $t("Generality.Ge_Personnel") }}：<span
            class="completion-header-info-f"
          >{{ UserData.UserName || "--" }}</span
          >
          </div>
          <span>{{ $t("production.Pr_GetOffTime") }}：</span>
            <el-date-picker v-model="form.EndDate" type="datetime">
            </el-date-picker>
        </div>
<!--        <div class="completion-header-info">-->
<!--          -->
<!--        </div>-->
      </div>
      <div class="completion-content"></div>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from "~/cpn/PageWrapper/index.vue";
import {getUser, getUserConfig} from "@/api/basicApi/systemSettings/user";

export default {
  name: "ScanCodeCompletion",
  components: { PageWrapper },
  data() {
    return {
      UserData: {
        UserName: "",
      },
      formData: "",
      form: {
        EndDate: new Date(),
        UserId: "",
      },
      SiteData: [],
    }
  },
  created() {
    this.GetConfig();
    this.$nextTick(() => {
      this.$refs.refFocus.$el.querySelector("input").focus();
    });
  },
  methods: {
    onBoard() {
      if (
        this.formData.substring(3, 0) === "H!_" ||
        this.formData.substring(3, 0) === "h!_"
      ) {
        this.form.UserId = this.formData.slice(3);
        if (this.form.UserId !== "") {
          getUser({ UserId: this.form.UserId }).then((res) => {
            // this.UserData.PhotoUrl = res.PhotoUrl;
            this.UserData.UserName = res.UserName;
            this.formData = "";
          });
        }
      }
    },
    GetConfig() {
      getUserConfig({ ConfigKey: "UserStation" }).then((res) => {
        this.SiteData = JSON.parse(res.ConfigValue);
      });
    },
  }
}
</script>

<style scoped lang="scss">
.completion {
  width: 100%;
  height: 100%;
  background: #fff;
  &-header {
    padding-left: 20px;
    &-processes {
      width: 100%;
      display: flex;
      align-items: center;
      height: 70px;
    }
    &-input{
      width: 360px;
      display: flex;
      //margin-top: 10px;
      ::v-deep.el-input--medium {
        height: 50px !important;
        .el-input__inner {
          height: 50px !important;
        }
      }
    }
    &-time{
      //width: 360px;
      display: flex;
      align-items: center;
      margin-top:20px;
      height: 50px;
      ::v-deep.el-input--medium {
        height: 50px !important;
        width: 200px;
        .el-input__inner {
          height: 50px !important;
        }
      }
    }
    &-info {
      display: flex;
      margin-top: 20px;
      &-f {
        font-weight: bold;
        color: #5657ed;
        font-size: 22px;
        margin-right: 20px;
        width: 100px;
        display: inline-block;
        position: relative;
        text-align: center;
      }
      &-f:after{
        content: "";
        height: 1px;
        background: #000;
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
      }
    }
  }
}
</style>
