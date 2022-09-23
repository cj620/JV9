<template>
  <div>
    <div class="report-content">
      <div class="report-content-header">
        <UserImg :UserData="UserData"></UserImg>

        <div class="report-content-header-content-info">
          <div class="report-content-header-content-info-site">
            <i class="el-icon-location-information"></i>
            <div
              v-for="site in SiteData"
              :key="site"
              style="margin: 0 5px; display: inline-block"
            >
              <el-tag>{{ site }}</el-tag>
            </div>
          </div>
          <div
            style="display: flex"
            class="report-content-header-content-info-confirm"
          >
            <el-input
              v-model.trim="formData"
              ref="refFocus"
              :placeholder="$t('production.Pr_PleaseEnterEmployeeInfo')"
              @keyup.enter.native="Disembark($event)"
            ></el-input>
            <el-button @click="Disembark" style="margin-left: 15px">{{
              $t("production.Pr_DownFromMachine")
            }}</el-button>
          </div>
          <div>
            {{ $t("production.Pr_GetOffTime") }}
            <el-date-picker v-model="form.EndDate" type="datetime">
            </el-date-picker>
          </div>
        </div>
        <div>
          <div
            ref="ball"
            class="report-content-header-baseInfo"
            v-if="IsShow"
          ></div>
        </div>
      </div>

      <div class="report-content-state">
        <div>
          {{ $t("Generality.Ge_TaskContent") }}：{{ProcessContent}}
        </div>
        <div style="margin-left: 20px">
          {{ $t("Generality.Ge_ProcessPicture") }}：
        </div>
        <div><el-image
          v-for="(TItem, index) in ProcessPicture"
          :key="index"
          class="process-picture"
          :src="imgUrlPlugin(TItem)"
          :preview-src-list="[imgUrlPlugin(TItem)]"
          fit="cover"
        ></el-image></div>



      </div>
      <cardList :cardDataList="DataList" @viewProcess="viewProcess">
        <template #contentTime="{ row }">
          <i class="el-icon-alarm-clock"></i>
          {{row.UsedTime.toFixed(2)}}H
        </template>
        <template #content="{ row }">
          <svg-icon icon-class="projector-two" />
          {{ row.ActualDevice }}
        </template>
        <template #operateTime="{ row }">
          <i class="el-icon-date"></i>
          {{row.WorkDate| timeFormat("yyyy-MM-dd hh:mm")}}

        </template>
        <template slot="operateButton1" slot-scope="row">
          <el-button
            icon="el-icon-video-pause"
            @click="clickPauseDisembark(row)"
          ></el-button>
        </template>
        <template slot="operateButton" slot-scope="row">
          <el-button icon="el-icon-bottom" @click="clickDisembark(row)">
          </el-button>
        </template>
      </cardList>
    </div>
    <selectProcess
      :visible.sync="selectProcessDialogFormVisible"
      v-if="selectProcessDialogFormVisible"
      :transferData="transferData"
      @confirmSelectProcess="confirmSelectProcess"
    ></selectProcess>
  </div>
</template>

<script>
import cardList from "./cardList";
import selectProcess from "./selectProcess";
import { getUser } from "@/api/basicApi/systemSettings/user";
import UserImg from "@/components/JVInternal/UserImg";
import { timeFormat } from "@/jv_doc/utils/time";
import {
  downMachineCollection,
  currentSiteList,
  get_process,
} from "@/api/workApi/production/productionReport";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
export default {
  name: "index",
  data() {
    return {
      IsShow: false,
      selectProcessDialogFormVisible: false,
      formData: "",
      transferData: [],
      ProcessContent: '',
      ProcessPicture: [],
      UserData: {
        UserName: "",
        PhotoUrl: "",
      },
      DataList: [],
      form: {
        UserId: "",
        EndDate: new Date(),
      },
    };
  },
  created() {

    this.$nextTick(() => {
      this.$refs.refFocus.$el.querySelector("input").focus();
    });
  },
  props: {
    type: {
      type: String,
      default: () => "",
    },
    SiteData: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    cardList,
    selectProcess,
    UserImg,
  },
  methods: {
    imgUrlPlugin,
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
    //查看加工图片和加工内容
    viewProcess(e){
      console.log(e)
      get_process({Id:e.Id}).then(res=>{
        console.log(res)
        this.ProcessContent = res.ProcessContent
        this.ProcessPicture = res.ProcessPicture
      })


    },
    //下机
    Disembark() {
      if (this.formData.substring(3, 0) === "H!_") {
        this.form.UserId = this.formData.slice(3);
        if (this.form.UserId !== "") {
          getUser({ UserId: this.form.UserId }).then((res) => {
            console.log(res);
            this.UserData.PhotoUrl = res.PhotoUrl;
            this.UserData.UserName = res.UserName;

            this.formData = "";

            this.form.EndDate=new Date()
            this.GetData();
          });
        }
      } else {
        this.formData = "";
      }
    },
    //暂停下机
    clickPauseDisembark(e) {
      if (this.form.UserId === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterEmployeeInfo")
        );
      const str = {
        DownMachineCollectionItem: [
          {
            TaskProcessId: e.row.Id,
            DeviceNo: e.row.ActualDevice,
          },
        ],
        UserId: this.form.UserId,
        IsSuspend: true,
        EndDate:timeFormat(this.form.EndDate,'yyyy-MM-dd hh:mm:ss'),
      };
      this.IsDisembark(str);
    },
    //单个下机
    clickDisembark(e) {

      if (this.form.UserId === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterEmployeeInfo")
        );
      const str = {
        DownMachineCollectionItem: [
          {
            TaskProcessId: e.row.Id,
            DeviceNo: e.row.ActualDevice,
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

<style lang="scss">
.report-content {
  .report-content-header {
    // height: 150px;
    display: flex;

    .report-content-header-content-info {
      margin-left: 20px;
      .report-content-header-content-info-site {
      }
      .report-content-header-content-info-confirm {
        margin: 10px 0;
      }
    }
    .report-content-header-baseInfo {
      width: 185px;
      height: 110px;
      margin-right: 20px;
      border: 1px solid #000;
    }
  }
  .report-content-state {
    display: flex;
    align-items: center;
    border-bottom: 1px #cccccc solid;
    border-top: 1px #cccccc solid;
    margin-bottom: 5px;
    height: 50px;
    .process-picture{
      width: 40px;
      height: 40px;
      margin-right: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      box-shadow: 2px 2px 2px #ccc;
    }
  }
}
</style>
