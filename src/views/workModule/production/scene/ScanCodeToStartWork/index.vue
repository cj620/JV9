<template>
  <page-wrapper :footer="false">
    <div class="get-in">
      <!--头部-->
      <div class="get-in-header">
        <!--左-->
        <div class="get-in-header-left">
          <!--工序-->
          <div class="get-in-header-processes">
            <!--          <i class="el-icon-location-information"></i>-->
            <span>{{$t('Generality.Ge_Site')}}: </span>
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
            <el-button @click="onBoard" style="margin-left: 15px; height: 50px">{{
                $t("production.Pr_UpToMachine")
              }}</el-button>
          </div>
          <!-- 信息-->
          <div class="get-in-header-info">
            <div>
              {{$t("Generality.Ge_Personnel")}}：<span class="get-in-header-info-f">{{
                UserData.UserName || '--'
              }}</span>
            </div>
            <div>
              {{$t("Generality.Ge_OddNumbers")}}：<span class="get-in-header-info-f">{{ form.BillId || '--' }}</span>
            </div>
          </div>
          <div class="get-in-header-info">
            <div>
              {{$t("DataV.Da_Equipment")}}：<span class="get-in-header-info-f">{{
                UserData.UserName || '--'
              }}</span>
            </div>
          </div>
        </div>
        <!--右-->
        <div class="get-in-header-right">
          <div class="get-in-header-right-title">
            {{$t("production.Pr_MachineToolOperationProcess")}}
          </div>
          <div class="get-in-header-right-box">
            <div class="get-in-header-right-box-item"  v-for="(item, i) in DataList" :key="i">
              <div class="get-in-header-right-box-item-title">{{ item.PartNo }}</div>
              <div class="get-in-header-right-box-item-content">
                <div class="get-in-header-right-box-item-content-left">
                  <div>{{$t('Generality.Ge_ProcessName')}}: <span style="font-weight: bold">{{item.Process}}</span></div>
                  <div>{{$t('Generality.Ge_WorkHours')}}: <span style="font-weight: bold">{{item.PlanTime}}H</span> </div>
                  <div>{{$t('Generality.Ge_Quantity')}}: <span style="font-weight: bold">{{item.Quantity}}</span></div>
                </div>
                <div class="get-in-header-right-box-item-content-right">
                  <div class="image-box">
                    <CImage :src="item.PhotoUrl?item.PhotoUrl:''"></CImage>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="get-in-header-right-control"><i class="el-icon-arrow-right"></i></div>
        </div>
      </div>

      <div class="get-in-title">{{$t("Generality.Ge_InStationProcess")}}</div>

      <div class="get-in-content">
        <div class="get-in-content-cardBox">
          <div class="get-in-content-cardBox-item" v-for="(item, i) in DataList" :key="i">
            <div class="get-in-content-cardBox-item-title">{{ item.PartNo }}</div>
            <div class="get-in-content-cardBox-item-content">
              <div class="get-in-content-cardBox-item-content-left">
                <div>{{$t('Generality.Ge_ProcessName')}}: <span style="font-weight: bold">{{item.Process}}</span></div>
                <div>{{$t('Generality.Ge_WorkHours')}}: <span style="font-weight: bold">{{item.PlanTime}}H</span> </div>
                <div>{{$t('Generality.Ge_Quantity')}}: <span style="font-weight: bold">{{item.Quantity}}</span></div>
              </div>
              <div class="get-in-content-cardBox-item-content-right">
                <div class="image-box">
                  <CImage :src="item.PhotoUrl?item.PhotoUrl:''"></CImage>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="get-in-content-control" v-show="controlShow">
          <div class="get-in-content-up" @click="setScrollTo('up')"><i class="el-icon-top"></i></div>
          <div class="get-in-content-down" @click="setScrollTo('down')"><i class="el-icon-bottom"></i></div>
        </div>
      </div>
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
  </page-wrapper>
</template>

<script>
import PageWrapper from "~/cpn/PageWrapper/index.vue";
import { getUser, getUserConfig } from "@/api/basicApi/systemSettings/user";
import {
  currentSiteList,
  inSite,
  siteMatchingProcessList,
} from "@/api/workApi/production/productionReport";
import CImage from "@/components/CImage/index.vue";
import inputQuantity from "@/views/workModule/production/productionReport/List/components/inputQuantity.vue";
import selectProcess from "@/views/workModule/production/productionReport/List/components/selectProcess.vue";

export default {
  name: "index",
  components: { selectProcess, inputQuantity, PageWrapper, CImage },
  data() {
    return {
      SiteData: [],
      selectProcessDialogFormVisible: false,
      inputQuantityDialogFormVisible: false,
      TaskProcessId: "",
      transferData: [],
      DataList:[],
      defaultQuantity: 1,
      formData: "",
      UserData: {
        UserName: "",
      },
      form: {
        UserId: "",
        BillId: "",
      },
      controlShow: false,
      scrollNumber: 0,
    };
  },
  created() {
    this.GetData();
    this.GetConfig();
  },
  mounted() {
    this.watchScroll(); // 监听滚动条
    this.setCardShow();
    window.onresize = () => {
      this.setCardShow();
    }
  },
  methods: {
    watchScroll() {
      let cardBox = document.querySelector('.get-in-content-cardBox');
      cardBox.onscroll = () => {
        this.scrollNumber = cardBox.scrollTop;
      }
    },
    setCardShow() {
      let cardBox = document.querySelector('.get-in-content-cardBox');
      this.controlShow = cardBox.scrollHeight > cardBox.clientHeight;
    },
    GetConfig() {
      getUserConfig({ ConfigKey: "UserStation" }).then((res) => {
        this.SiteData = JSON.parse(res.ConfigValue);
      });
    },
    GetData() {
      currentSiteList({ SelectType: 0 }).then((res) => {
        this.DataList = res.Items;
        console.log(this.DataList)
      });
    },
    // 上机
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
      } else if (
        this.formData.substring(3, 0) === "O!_" ||
        this.formData.substring(3, 0) === "o!_"
      ) {
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
    // 设置滚动条
    setScrollTo(val) {
      let cardBox = document.querySelector('.get-in-content-cardBox');
      if(val === 'up') {
        this.scrollNumber = cardBox.scrollTop;
        console.log(cardBox.clientHeight + cardBox.scrollTop + 2, cardBox.scrollHeight)
        this.scrollNumber-=210;
        const scrollToTop = () => {
          const c = cardBox.scrollTop
          if (c > this.scrollNumber) {
            if(!cardBox.scrollTop) return
            window.requestAnimationFrame(scrollToTop)
            cardBox.onscroll = null;
            cardBox.scrollTo(0, c - 15)
          } else {
            this.watchScroll();
          }
        }
        scrollToTop()
      } else {
        this.scrollNumber = cardBox.scrollTop;
        this.scrollNumber+=210;
        const scrollToTop = () => {
          let c = cardBox.scrollTop
          if (c < this.scrollNumber) {
            if(cardBox.clientHeight + cardBox.scrollTop + 2 >= cardBox.scrollHeight) return
            window.requestAnimationFrame(scrollToTop)
            cardBox.onscroll = null;
            cardBox.scrollTo(0, c + 15)
          } else {
            this.watchScroll();
          }
        }
        scrollToTop()
      }
    },

  },
};
</script>

<style scoped lang="scss">
.get-in {
  width: 100%;
  height: 100%;
  background: #fff;
  &-header {
    width: 100%;
    height: 240px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    &-left{
      width: 400px;
      height: 100%;
    }
    &-right{
      width: calc(100% - 400px);
      height: 100%;
      padding-left: 20px;
      position: relative;
      &-title{
        width: 100%;
        display: flex;
        align-items: center;
        height: 50px;
      }
      &-box{
        width: calc(100% - 70px);
        height: calc(100% - 50px);
        overflow-x: auto;
        display: -webkit-box;
        &-item{
          width: 300px;
          height: 100%;
          border: 1px solid #eee;
          margin-right: 20px;
          &-title {
            width: 100%;
            height: 30px;
            background: #ffbf6b;
            line-height: 30px;
            color: #fff;
            text-indent: 1em;
          }
          &-content {
            width: 100%;
            display: flex;
            height: calc(100% - 30px);
            &-left {
              text-indent: 1em;
              width: calc(100% - 110px);
              div {
                margin-top: 16px;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            &-right {
              height: 100%;
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
      &-control{
        width: 60px;
        height: calc(100% - 50px);
        background: rgba(0,0,0,.3);
        position: absolute;
        right: 0;
        bottom: 0;
        font-size: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .3s;
        cursor: pointer;
      }
      &-control:hover{
        background: rgba(0,0,0,.6);
        //color: #fff;
      }
    }
    &-processes {
      width: 100%;
      display: flex;
      align-items: center;
      height: 50px;
      padding-left: 20px;
    }
    &-form {
      padding-left: 20px;
      width: 300px;
      display: flex;
      margin-top: 10px;
      ::v-deep.el-input--medium {
        height: 50px !important;
        .el-input__inner {
          height: 50px !important;
        }
      }
      button {
        font-size: 18px;
      }
    }
    &-info {
      display: flex;
      padding-left: 20px;
      margin-top: 24px;
      font-size: 18px;
      &-f {
        font-weight: bold;
      }
      div {
        margin-right: 20px;
      }
    }
  }
  &-content {
    width: 100%;
    height: calc(100% - 300px);
    padding-top: 10px;
    position: relative;
    &-cardBox {
      width: 100%;
      height: 100%;
      display: flex;
      //justify-content: center;
      flex-wrap: wrap;
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
          display: flex;
          height: calc(100% - 30px);
          &-left {
            text-indent: 1em;
            width: calc(100% - 110px);
            div {
              margin-top: 16px;
              width: 100%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          &-right {
            height: 100%;
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
.get-in-header-right-box::-webkit-scrollbar {
  display: none;
}
.get-in-title{
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  padding-left: 20px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
</style>
