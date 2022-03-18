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
              @keyup.enter.native="PitStop($event)"
            ></el-input>
            <el-button @click="PitStop" style="margin-left: 15px">{{
              $t("production.Pr_EnterStation")
            }}</el-button>
          </div>
          <div style="font-size: 20px">
            {{ $t("production.Pr_WorkSheetNo") }}:{{ form.BillId }}
          </div>
        </div>

        <div>
          <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
          >
            <div
              ref="ball"
              class="report-content-header-baseInfo"
              v-if="IsShow"
            ></div>
          </transition>
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
          {{row.PlanTime}}H
        </template>
        <template #operateTime="{ row }">
          <i class="el-icon-date"></i>
          {{row.PlanStart| timeFormat("yyyy-MM-dd hh:mm")}}

        </template>
        <template #content="{ row }">
          <svg-icon icon-class="cross-ring" />
          {{ row.Process }}
        </template>
      </cardList>
    </div>
    <selectProcess
      :visible.sync="selectProcessDialogFormVisible"
      v-if="selectProcessDialogFormVisible"
      :transferData="transferData"
      @confirmSelectProcess="confirmSelectProcess"
    ></selectProcess>

    <inputQuantity
      :visible.sync="inputQuantityDialogFormVisible"
      v-if="inputQuantityDialogFormVisible"
      @confirmQuantity="confirmQuantity"
      :defaultQuantity="defaultQuantity"
    ></inputQuantity>
  </div>
</template>

<script>
import cardList from "./cardList";
import selectProcess from "./selectProcess";
import inputQuantity from "./inputQuantity";
import { getUser } from "@/api/basicApi/systemSettings/user";
import UserImg from "@/components/JVInternal/UserImg";
import {
  siteMatchingProcessList,
  currentSiteList,
  inSite,
  get_process,
} from "@/api/workApi/production/productionReport";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
export default {
  name: "index",
  data() {
    return {
      IsShow: false,
      selectProcessDialogFormVisible: false,
      inputQuantityDialogFormVisible: false,
      formData: "",
      TaskProcessId: "",
      transferData: [],
      ProcessContent: '',
      ProcessPicture: [],
      defaultQuantity: 1,
      UserData: {
        UserName: "",
        PhotoUrl: "",
      },
      DataList: [],
      form: {
        UserId: "",
        BillId: "",
      },
    };
  },
  created() {
    this.GetData();
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
    inputQuantity,
    UserImg,
  },
  methods: {
    imgUrlPlugin,
    GetData() {
      currentSiteList({ SelectType: 0 }).then((res) => {
        this.DataList = res.Items;
      });
    },
    PitStop() {
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

      this.IsOnBoard(this.form);
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
    //查询要进战的工序
    IsOnBoard(e) {
      siteMatchingProcessList({ BillId: e.BillId }).then((res) => {
        if (res.Items.length > 1) {
          this.transferData = res.Items;
          this.selectProcessDialogFormVisible = true;
        } else {
          this.inputQuantityDialogFormVisible = true;
          this.TaskProcessId = res.Items[0].Id;
          this.defaultQuantity = res.Items[0].Quantity;
        }
      });
    },
    //确定要进战的工序
    confirmSelectProcess(e) {
      this.selectProcessDialogFormVisible = false;
      console.log(e);
      const str = {
        TaskProcesses: [
          {
            TaskProcessId: e.Data[0].Id,
            Quantity: e.Quantity,
          },
        ],
        UserId: this.form.UserId,
      };
      this.InSite(str);
    },
    //确定要选择数据
    confirmQuantity(e) {
      const str = {
        TaskProcesses: [
          {
            TaskProcessId: this.TaskProcessId,
            Quantity: e,
          },
        ],
        UserId: this.form.UserId,
      };
      this.InSite(str);
      this.inputQuantityDialogFormVisible = false;
    },

    //进站
    InSite(e) {
      inSite(e).then((res) => {

        this.GetData();
        this.form.UserId = "";
        this.form.BillId = "";
        this.UserData.PhotoUrl = "";
        this.UserData.UserName = "";
      });
    },
    beforeEnter(el) {

      el.style.transform = "translate(10, 0)";
    },
    enter(el, done) {
      el.offsetWidth;
      //enter表示动画开始之后的样式这里可以设置小球完成动画之后的结束状态
      el.style.transform = "translate(-400px,225px)";
      el.style.transition = "all 1s ease";

      done();
      this.IsShow = false;

    },
    afterEnter(el) {

      this.DataList.unshift(6);
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
    height: 50px;

    display: flex;
    align-items: center;
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
