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
              :placeholder="
                $t('production.Pr_PleaseEnterEmployeeNoAndWorkSheetNo')
              "
              @keyup.enter.native="onBoard($event)"
            ></el-input>
            <el-button @click="onBoard" style="margin-left: 15px">{{
              $t("production.Pr_UpToMachine")
            }}</el-button>
          </div>
          <div v-if="type === 'OnBoard'">
            {{ $t("production.Pr_Equipment")}}
            <el-select
              v-model="form.DeviceNo"
              style="width: 100%"
              @change="DeviceChange"
            >
              <el-option
                v-for="item in equipmentListData"
                :key="item.DeviceNo"
                :label="item.Device"
                :value="item.DeviceNo"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div class="report-content-header-OnTheMachine-info">
          <cardList type="cardType" :cardDataList="OnTheMachineDataList">
            <template #content="{ row }">
              {{ row.Process }}
            </template>
          </cardList>
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
      <cardList type="cardType" :cardDataList="DataList" @viewProcess="viewProcess">
        <template #contentTime="{ row }">
          <i class="el-icon-alarm-clock"></i>
          {{row.PlanTime}}H
        </template>
        <template #BillId="{ row }">
          <i class="el-icon-s-order"></i>
          <span style="margin-left: 6px; color: #409eff; cursor: pointer" @click="toProductionTask(row.BillId)">{{ row.BillId }}</span>
        </template>
        <template #content="{ row }">
          <svg-icon icon-class="cross-ring" />
          {{ row.Process }}
        </template>
        <template #operateTime="{ row }">
          <i class="el-icon-date"></i>
          {{row.PlanStart| timeFormat("yyyy-MM-dd hh:mm")}}

        </template>
        <template slot="operateButton" slot-scope="row">
          <el-button icon="el-icon-top" @click="clickOnBoard(row)"></el-button>
        </template>
      </cardList>
    </div>
    <inputQuantity
      :visible.sync="inputQuantityDialogFormVisible"
      v-if="inputQuantityDialogFormVisible"
      :defaultQuantity="defaultQuantity"
      @confirmQuantity="confirmQuantity"
    ></inputQuantity>
  </div>
</template>

<script>
import cardList from "./cardList";
import inputQuantity from "./inputQuantity";
import {
  currentSiteList,
  upMachineCollection,
  get_process,
} from "@/api/workApi/production/productionReport";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import UserImg from "@/components/JVInternal/UserImg";
import { getUser } from "@/api/basicApi/systemSettings/user";
import {
  currentSiteDeviceList,
  getByIdProductionDevice,
} from "@/api/workApi/production/baseData";
export default {
  name: "index",
  data() {
    return {
      IsShow: false,
      inputQuantityDialogFormVisible: false,
      formData: "",
      UserData: {
        UserName: "",
        PhotoUrl: "",
      },
      input: "",
      BillId: "",
      cardType: "",
      defaultQuantity: 0,
      equipmentListData: [],
      ProcessContent: '',
      ProcessPicture: [],
      DataList: [],
      OnTheMachineDataList: [],
      form: {
        UserId: "",
        BillId: "",
        DeviceNo: "",
      },
    };
  },
  created() {
    this.cardType = this.type;
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
    inputQuantity,
    UserImg,
  },
  methods: {
    imgUrlPlugin,
    clickOnBoard(e) {
      if (this.form.UserId === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterEmployeeInfo")
        );
      if (this.form.DeviceNo === "")
        return this.$message.warning(
          this.$t("production.Pr_PleaseSelectDevice")
        );
      this.defaultQuantity = e.row.Quantity;
      this.BillId = e.row.BillId;
      this.inputQuantityDialogFormVisible = true;
    },

    //查看加工图片和加工内容
    viewProcess(e){
      get_process({Id:e.Id}).then(res=>{
        console.log(res)
        this.ProcessContent = res.ProcessContent
        this.ProcessPicture = res.ProcessPicture
      })
    },
    //确定要选择数据
    confirmQuantity(e) {
      const str = {
        Bills: [
          {
            BillId: this.BillId,
            Quantity: e,
          },
        ],
        UserId: this.form.UserId,
        DeviceNo: this.form.DeviceNo,
      };
      this.inputQuantityDialogFormVisible = false;
      this.IsOnBoard(str);
    },
    GetData() {
      currentSiteDeviceList({}).then((res) => {
        this.equipmentListData = res.Items;
      });
      currentSiteList({ SelectType: 1 }).then((res) => {
        this.DataList = res.Items;
      });
    },
    //上机
    onBoard() {
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
      this.setIsOnBoard();
    },
    setIsOnBoard() {
      if (this.form.UserId === "") {
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterEmployeeInfo")
        );
      } else if(this.form.DeviceNo === "") {
        return this.$message.warning(
          this.$t("production.Pr_PleaseSelectDevice")
        );
      } else if(this.form.BillId === "") {
        return this.$message.warning(
          this.$t("production.Pr_PleaseEnterWorkSheetInfo")
        );
      } else {
        this.BillId = this.form.BillId;
        this.inputQuantityDialogFormVisible = true;
      }
    },

    //调用上机接口
    IsOnBoard(e) {
      console.log(e);

      upMachineCollection(e).then((res) => {
        console.log(res);
        this.GetData();
        this.form.UserId = "";
        this.form.BillId = "";
        this.form.DeviceNo = "";
        this.UserData.PhotoUrl = "";
        this.UserData.UserName = "";
      });
    },
    //改变设备
    DeviceChange() {
      currentSiteList({ DeviceNo: this.form.DeviceNo, SelectType: 2 }).then(
        (res) => {
          console.log(res);
          this.OnTheMachineDataList = res.Items;
        }
      );
    },
    toProductionTask(BillId) {
      this.$router.push({
        name: "ProductionTaskDetails",
        query: { BillId },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.report-content {
  .report-content-header {
    //height: 180px;
    // border: 1px solid red;
    display: flex;
    .report-content-header-staff {
      width: 110px;
      height: 130px;
      border: 1px solid #ccc;
      text-align: center;
      box-shadow: 3px 3px 3px #888888;
    }
    .report-content-header-content-info {
      margin: 0 20px;
      .report-content-header-content-info-site {
      }
      .report-content-header-content-info-confirm {
        margin: 10px 0;
      }
    }
    //.report-content-header-OnTheMachine-info {
    //  min-width: 700px;
    //}
  }
  .report-content-state {
    display: flex;
    align-items: center;
    height: 50px;

    border-bottom: 1px #cccccc solid;
    border-top: 1px #cccccc solid;
    margin-bottom: 5px;
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
