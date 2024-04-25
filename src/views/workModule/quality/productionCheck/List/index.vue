<!--加工检验-->
<template>
  <PageWrapper ref="page" :footer="false">
    <JvBlock class="productionCheck-page">
      <div class="productionCheck-content">
        <div class="productionCheck-content-header">
          <UserImg :UserData="UserData"> </UserImg>
          <div class="productionCheck-content-info-confirm">
            <div style="display: flex">
              <el-input
                v-model="formData"
                ref="refFocus"
                :placeholder="$t('production.Pr_PleaseEnterEmployeeInfo')"
                @keyup.enter.native="onBoard($event)"
              ></el-input>
              <el-button @click="onBoard" style="margin-left: 15px">{{
                $t("production.Pr_EnterStation")
              }}</el-button>
            </div>
          </div>
        </div>
        <div class="productionCheck-content-state">
          {{ $t("production.Pr_AlreadyInStation") }}
        </div>
        <div>
          <cardList :cardDataList="DataList">
            <template #contentTime="{ row }">
              <i class="el-icon-date"></i>
              {{row.CheckDate| timeFormat("yyyy-MM-dd hh:mm")}}

            </template>
            <template slot="operateTime" slot-scope="row">
              <el-button
                @click="toMachiningCheckList(row)"
                size="small"
                :disabled="canCreateCheck(row.row.CheckState)"
              >
                {{ $t("menu.Qc_ProcessCheck") }}
              </el-button>
              <el-button
                @click="toFinishedProduct(row)"
                size="small"
                :disabled="canCreateFinished(row.row.CheckState, row.row.PrTaskState)"
              >
                {{ $t("menu.Qc_FinishedProduct") }}
              </el-button>
            </template>
          </cardList>
        </div>
      </div>
    </JvBlock>
    <selectUnqualified
      :visible.sync="selectUnqualifiedDialogFormVisible"
      v-if="selectUnqualifiedDialogFormVisible"
      :transferData="transferData"
    ></selectUnqualified>
  </PageWrapper>
</template>

<script>
import UserImg from "@/components/JVInternal/UserImg";
import selectUnqualified from "./components/selectUnqualified";
import { getUser } from "@/api/basicApi/systemSettings/user";
import { mapState } from "vuex";
import {
  processingInspectionInSite,
  processingInspectionQualified,
  listInspectionTobechecked,
} from "@/api/workApi/quality/siteCollection";
import cardList from "../../../production/productionReport/List/components/cardList";
import { getProductionTask } from "@/api/workApi/production/productionTask";
import closeTag from "@/utils/closeTag";
export default {
  name: "ProductionCheck",
  components: {
    cardList,
    selectUnqualified,
    UserImg,
  },
  data() {
    return {
      DataList: [],
      ProcessList: [],
      formData: "",
      transferData: {},
      selectUnqualifiedDialogFormVisible: false,
      UserData: {
        UserName: "",
        PhotoUrl: "",
      },
      form: {
        UserId: "",
        BillId: "",
      },
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    // 获取按钮状态
    canCreateCheck() {
      return (CheckState) => {
        return CheckState !== "TobeChecked";
      };
    },
    canCreateFinished() {
      return (CheckState, PrTaskState) => {
        return CheckState !== "TobeChecked" || PrTaskState !== 'Processed';
      };
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.refFocus.$el.querySelector("input").focus();
    });
  },
  methods: {
    onBoard() {
      if (this.formData.substring(3, 0) === "H!_") {
        this.form.UserId = this.formData.slice(3);
        if (this.form.UserId !== "") {
          getUser({ UserId: this.form.UserId }).then((res) => {
            this.UserData.PhotoUrl = res.PhotoUrl;
            this.UserData.UserName = res.UserName;
            this.formData = "";
            this.GetList();
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
    IsOnBoard(e) {
      processingInspectionInSite({
        BillIds: [e.BillId],
        UserId: e.UserId,
      }).then((res) => {
        this.form.BillId = "";
        this.GetList();
      });
    },
    //获取已入站列表页
    GetList() {
      const str = {
        UserId: this.form.UserId,
        PageSize: 10,
        CurrentPage: 1,
      };
      listInspectionTobechecked(str).then((res) => {
        this.DataList = res.Items;
      });
    },
    toMachiningCheckList(e) {
      this.$router.push({
        name: "Qc_ProcessCheck_Add",
        params: {
          type: "add",
          ProcessCheckType: 2,
          title: "addSaleOrder",
          data: e,
        },
      });
    },
    //点击零件成品检验单
    toFinishedProduct(e) {
      this.$router.push({
        name: "Qc_FinishedProduct_Add",
        params: { type: "add", title: "addSaleOrder", data: e },
      });
    },
    //点击不合格
    clickUnqualified(e) {
      getProductionTask({ BillId: e.row.BillId }).then((res) => {
        res.Id = e.row.Id;
        /*this.$router.push({
          name: "AddQualityError",
          params: { type: "add", title: "addQualityRecord", data: res },
        });*/

        let TagName = {
          path: "/quality/addQualityError",
          name: `AddQualityError`,
          params: { type: "add", title: "addQualityRecord", data: res },
          fullPath: "/quality/addQualityError",
        };
        closeTag(this.current, TagName);
      });
    },
    //点击合格
    clickQualified(e) {
      processingInspectionQualified({ Ids: [e.row.Id] }).then((res) => {
        this.GetList();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.productionCheck-page {
  height: 100%;
  background-color: #ffffff;

  .productionCheck-content {
    .productionCheck-content-header {
      display: flex;
      height: 180px;

      .productionCheck-content-info-confirm {
        margin: 0 20px;
      }
    }
  }
  .productionCheck-content-state {
    padding: 15px 0px;
    border-bottom: 1px #cccccc solid;
    border-top: 1px #cccccc solid;
    margin-bottom: 15px;
  }
}
</style>
