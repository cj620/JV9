<!--销售订单详情-->
<template>
  <PageWrapper ref="page">
    <el-tabs @tab-click="tabClick" slot="sticky-tabs">
      <!-- tab 导航栏  -->
      <el-tab-pane
        v-for="pane in tabPanes"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      ></el-tab-pane>
    </el-tabs>
    <Action
      slot="sticky-extra"
      size="small"
      :actions="btnAction"
    ></Action>
    <!--单据信息-->
    <JvBlock :title="cur_billId" ref="first">
      <!---->
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
          <template #PrTaskBillId="{ record }">
            <span
              style="color: #409eff; cursor: pointer"
              @click="linkToProduct(record)"
              >{{ record }}</span
            >
          </template>
        </JvDetail>
        <JvState :state="detailObj.detailData.State"></JvState>
      </div>
    </JvBlock>

    <!--物料信息-->
    <JvBlock :title="$t('quality.Qc_CheckDetailList')" ref="second">
      <JvTable :table-obj="tableObj">
        <template #State="{ record }">
          <span :style="{ color: record == 'NG' ? 'red' : '#000' }">
            <!-- 状态标签 -->
            {{ record }}
          </span>
        </template>
      </JvTable>
    </JvBlock>
    <!--物料信息-->
    <JvBlock :title="$t('quality.Qc_ProcessCheckChart')" ref="third">
      <!-- <div style="height: 600px;display: flex;flex-wrap: wrap">
        <div class="check-mould-img" v-for="(item,index) in BillFiles" :key="index">
          <el-image
            :preview-src-list="[imgUrlPlugin(item)]"
            style="width: 100%; height: 100%"
            :src="imgUrlPlugin(item)"
            fit="cover"
            class="items-details-Img-error"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </div> -->
      <el-image
        v-for="(item, index) in detailObj.detailData.Images || []"
        :key="index"
        style="width: 100px; height: 100px; padding: 5px"
        :preview-src-list="[imgUrlPlugin(item)]"
        :src="imgUrlPlugin(item)"
        fit="cover"
        class="items-details-Img-error"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <el-empty
        :description="$t('Generality.Ge_NoData')"
        v-if="
          !detailObj.detailData.Images ||
          detailObj.detailData.Images.length == 0
        "
      ></el-empty>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :BillId="fileBillId"></JvFileExhibit>
    </JvBlock>
    <!--审核流程-->
    <JvBlock :title="$t('Generality.Ge_ApproveProcess')" ref="fifth">
      <AuditProcess :process="detailObj.detailData.AuditNodes"></AuditProcess>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { stateEnum } from "@/enum/workModule";
import { tableConfig, detailConfig } from "./config";
import { mapState } from "vuex";
import JvState from "@/components/JVInternal/JvState/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";

import { Table } from "@/jv_doc/class/table";
import Detail from "@/jv_doc/class/detail/Detail";
import { qc_process_check_get, API } from "@/api/workApi/quality/processCheck";
import { getBillFile } from "@/api/basicApi/systemSettings/upload";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import {
  auditPlugin,
  detailBtnModel,
  detailPageModel,
} from "@/jv_doc/utils/system/index";
export default {
  name: "index",
  components: {
    JvState,
    AuditProcess,
    JvFileExhibit,
  },
  data() {
    return {
      // 当前单据的id
      cur_billId: "",
      tableObj: {},
      detailObj: {},
      detailData: {},
      BillFiles: [],
      btnAction: [],
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        // 检验明细
        {
          label: this.$t("quality.Qc_CheckDetailList"),
          name: "second",
        },
        // 检验图
        {
          label: this.$t("quality.Qc_ProcessCheckChart"),
          name: "third",
        },
        // 附件
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
        // 审核流程
        {
          label: this.$t("Generality.Ge_ApproveProcess"),
          name: "fifth",
        },
      ],
      // 编辑路由指向 谨慎删除
      editRouteName: "Qc_ProcessCheck_Edit",
      // 打印模板标识 谨慎删除
      printMod: "Qc_ProcessCheck",
    };
  },
  async created() {
    this.fileBillId = this.$route.query.BillId;
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
    });

    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: null,
    });
    await this.GetData();
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    stateMap() {
      return stateEnum[this.detailObj.detailData.State];
    },
  },

  methods: {
    imgUrlPlugin,
    //获取数据
    async GetData() {
      await qc_process_check_get({ BillId: this.$route.query.BillId }).then(
        (res) => {
          this.detailObj.detailData = res;
          this.detailObj.detailData.ToolingNo = this.$route.query.ToolingNo;
          this.detailObj.detailData.PartNo = this.$route.query.ItemId;
          this.cur_billId = res.BillId;
          this.tableObj.setData(res.BillItems);
          this.btnAction = detailPageModel(this, res, API, this.GetData);
          this.btnAction.splice(4,1);
          this.btnAction.splice(5,2);
          this.btnAction.push({
            label: "开异常单",
            confirm: this.createError,
          });
        }
      );
    },
    linkToProduct(BillId) {
      this.$router.push({
        name: "ProductionTaskDetails",
        query: { BillId },
      });
    },
    //订单转
    orderTransform(routerName, keyName) {
      this.$router.push({
        name: routerName,
        params: { [keyName]: this.detailObj.detailData },
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    createError() {
      console.log('开异常单')
    }
  },
};
</script>

<style lang="scss">
.check-mould-img {
  margin-right: 10px;
  width: 120px;
  height: 120px;
  // background-color: pink;
}
.items-details-Img-error {
  background-color: rgb(231, 231, 231);
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: rgb(161, 161, 161);
    .error-icon {
      color: rgb(161, 161, 161);
      font-size: 19px;
    }
  }
}
</style>
