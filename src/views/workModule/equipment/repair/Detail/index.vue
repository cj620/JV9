<!--
 * @Author: your name
 * @Date: 2021-11-29 10:47:35
 * @LastEditTime: 2022-06-02 09:01:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectTask\Detail\c-menu.vue
-->
<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
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
    <Action slot="sticky-extra" size="small" :actions="btnAction"></Action>

    <JvBlock
      :title="$t('Generality.Ge_BillInfo')"
      ref="first"
      :contentStyle="{
        paddingLeft: '150px',
        height: '280px',

      }"
      style="position: relative"
    >
      <div class="mould-img">
        <el-image
          :preview-src-list="[imgUrlPlugin(detailObj.detailData.PhotoUrl)]"
          style="width: 100%; height: 100%"
          :src="imgUrlPlugin(detailObj.detailData.PhotoUrl)"
          fit="cover"
          class="items-details-Img-error"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
        </JvDetail>
        <RepairState :state="detailObj.detailData.State"></RepairState>
      </div>
    </JvBlock>
    <!--报修配件-->
    <JvBlock :title="$t('device.De_DeviceRepairItem')" ref="second">
      <JvTable :table-obj="tableObj"> </JvTable>
    </JvBlock>
    <!--问题描述-->
    <JvBlock :title="$t('device.De_ProblemDescription')" ref="third">
      <RepairDescription :DesData="detailObj.detailData.ProblemDescription"></RepairDescription>
    </JvBlock>
    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="fourth">
      <JvRemark :RemarkData="detailObj.detailData.Remarks"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fifth">
      <JvFileExhibit :BillId="cur_Id"></JvFileExhibit>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { mapState } from "vuex";
import { API as Repair ,assets_device_repair_completed} from "@/api/workApi/equipment/repair";
import { detailConfig, itemTableConfig } from "./config";
import Detail from "@/jv_doc/class/detail/Detail";
import { repairStateEnum } from "@/enum/workModule";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import RepairDescription from "@/views/workModule/equipment/repair/components/RepairDescription.vue";
import RepairState from "../components/RepairState.vue"
import { Table } from "~/class/table";

export default {
  components: {
    JvRemark,
    JvFileExhibit,
    RepairDescription,
    RepairState,
  },
  data() {
    return {
      cur_Id: this.$route.query.BillId,
      repairStateEnum,
      detailObj: {},
      tableObj: {},
      btnAction: [],
      editRouteName: "As_DeviceRepairEdit",
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("device.De_DeviceRepairItem"),
          name: "second",
        },
        {
          label: this.$t('device.De_ProblemDescription'),
          name: "third"
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "fourth",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fifth",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  created() {
    this.tableObj = new Table({
      tableSchema: itemTableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    })
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 3,
    });
    this.getData();
  },
  mounted() {},
  methods: {
    imgUrlPlugin,
    getData() {
      Repair.api_get({ BillId: this.cur_Id }).then((res) => {
        this.detailObj.setData(res);
        this.tableObj.setData(res.BillItems);
      });
    },
    // 完成单据
    successOutsourcing() {
      assets_device_repair_completed({ BillId: this.cur_Id }).then(() => {
        this.getData();
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
};
</script>

<style lang="scss" scoped>
.mould-img {
  width: 120px;
  height: 120px;
  // background-color: pink;
  position: absolute;
  left: 10px;
  right: 200px;
}
.items-details-Img-error {
  background-color: rgb(231, 231, 231);
  ::v-deep .image-slot {
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
