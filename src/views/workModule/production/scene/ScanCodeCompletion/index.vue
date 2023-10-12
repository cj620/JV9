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
            $t("production.Pr_DownFromMachine")
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

      <div class="completion-title">{{ $t("Generality.Ge_TaskContent") }}</div>

      <div class="completion-content">
        <div class="completion-content-cardBox">
          <div style="display: flex; flex-wrap: wrap; width: 100%">
            <div
              class="completion-content-cardBox-item"
              v-for="(item, i) in DataList"
              :key="i"
            >
              <div
                class="completion-content-cardBox-item-title"
                :style="{ background: ProcessState[item.State].color }"
              >
                {{ item.PartNo }}
              </div>
              <div class="completion-content-cardBox-item-content">
                <div class="completion-content-cardBox-item-content-top">
                  <div class="completion-content-cardBox-item-content-left">
                    <div>
                      {{ $t("Generality.Ge_ProcessName") }}:
                      <span style="font-weight: bold">{{ item.Process }}</span>
                    </div>
                    <div>
                      {{ $t("Generality.Ge_WorkHours") }}:
                      <span style="font-weight: bold">{{ item.PlanTime }}H</span>
                    </div>
                    <div>
                      {{ $t("Generality.Ge_Quantity") }}:
                      <span style="font-weight: bold">{{ item.Quantity }}</span>
                    </div>
                  </div>
                  <div class="completion-content-cardBox-item-content-right">
                    <div class="image-box">
                      <CImage :src="item.PhotoUrl ? item.PhotoUrl : ''"></CImage>
                    </div>
                  </div>
                </div>
                <div class="completion-content-cardBox-item-content-bottom">
                  <el-button icon="el-icon-video-pause" @click="clickPauseDisembark(item)"></el-button>
                  <el-button icon="el-icon-bottom" @click="clickDisembark(item)"></el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import PageWrapper from "~/cpn/PageWrapper/index.vue";
import { getUser, getUserConfig } from "@/api/basicApi/systemSettings/user";
import { currentSiteList, downMachineCollection } from "@/api/workApi/production/productionReport";
import CImage from "@/components/CImage/index.vue";
import ProcessState from '@/enum/workModule/production/ProcessState';
import { timeFormat } from "@/jv_doc/utils/time";

export default {
  name: "ScanCodeCompletion",
  components: { CImage, PageWrapper },
  data() {
    return {
      ProcessState,
      UserData: {
        UserName: "",
      },
      formData: "",
      form: {
        EndDate: new Date(),
        UserId: "",
      },
      SiteData: [],
      DataList: [],
    };
  },
  created() {
    this.GetConfig();
    this.$nextTick(() => {
      this.$refs.refFocus.$el.querySelector("input").focus();
    });
  },
  methods: {
    GetData() {
      const str = {
        SelectType: 2,
        UserId: this.form.UserId,
        DeviceNo: "",
      };
      currentSiteList(str).then((res) => {
        console.log(res);
        this.DataList = res.Items;
      });
    },
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
            this.form.EndDate = new Date();
            this.GetData();
          });
        }
      }
    },
    GetConfig() {
      getUserConfig({ ConfigKey: "UserStation" }).then((res) => {
        this.SiteData = JSON.parse(res.ConfigValue);
      });
    },
    //暂停下机
    clickPauseDisembark(item) {
      if (this.form.UserId === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterEmployeeInfo")
        );
      const str = {
        DownMachineCollectionItem: [
          {
            TaskProcessId: item.Id,
            DeviceNo: item.ActualDevice,
          },
        ],
        UserId: this.form.UserId,
        IsSuspend: true,
        EndDate:timeFormat(this.form.EndDate,'yyyy-MM-dd hh:mm:ss'),
      };
      this.IsDisembark(str);
    },
    //单个下机
    clickDisembark(item) {

      if (this.form.UserId === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterEmployeeInfo")
        );
      const str = {
        DownMachineCollectionItem: [
          {
            TaskProcessId: item.Id,
            DeviceNo: item.ActualDevice,
          },
        ],
        UserId: this.form.UserId,
        IsSuspend: false,
        EndDate:timeFormat(this.form.EndDate,'yyyy-MM-dd hh:mm:ss'),
      };
      this.IsDisembark(str);
    },
    IsDisembark(e) {
      downMachineCollection(e).then((res) => {
        console.log(res);
        this.GetData();
      });
    },
  },
};
</script>

<style scoped lang="scss">
.completion {
  width: 100%;
  height: 100%;
  background: #fff;
  &-header {
    padding-left: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    &-processes {
      width: 100%;
      display: flex;
      align-items: center;
      height: 70px;
    }
    &-input {
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
    &-time {
      //width: 360px;
      display: flex;
      align-items: center;
      margin-top: 20px;
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
      &-f:after {
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
  &-content {
    width: 100%;
    height: calc(100% - 260px);
    padding-top: 10px;
    position: relative;
    &-cardBox {
      width: 100%;
      height: 100%;
      //display: flex;
      //justify-content: center;
      //flex-wrap: wrap;
      overflow-y: auto;
      padding-left: 20px;
      //justify-content: space-around;
      &-item {
        //min-width: 300px;
        width: 300px;
        height: 200px;
        border: 1px solid #eee;
        margin-bottom: 20px;
        margin-right: 20px;
        border-radius: 8px;
        overflow: hidden;
        &-title {
          width: 100%;
          height: 30px;
          background: #4095e5;
          line-height: 30px;
          color: #fff;
          text-indent: 1em;
        }
        &-content {
          width: 100%;
          height: calc(100% - 30px);
          &-top{
            height: 120px;
            width: 100%;
            display: flex;
          }
          &-bottom{
            width: 100%;
            height: 50px;
            display: flex;
            justify-content: flex-end;
            .el-button{
              height: 40px;
              margin-right: 10px;
            }
          }
          &-left {
            text-indent: 1em;
            width: calc(100% - 110px);
            height: 120px;
            div {
              margin-top: 16px;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          &-right {
            height: 120px;
            display: flex;
            align-items: center;
            padding-right: 10px;
            .image-box {
              width: 100px;
              height: 100px;
            }
          }
        }
      }
    }
    &-control {
      position: absolute;
      right: 10px;
      bottom: 0;
      div {
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 60px;
        font-size: 30px;
        background: rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        cursor: pointer;
      }
      div:hover {
        background: rgba(0, 0, 0, 0.6);
      }
    }
  }
}
.get-in-content-cardBox::-webkit-scrollbar {
  display: none;
}
.completion-title {
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>
