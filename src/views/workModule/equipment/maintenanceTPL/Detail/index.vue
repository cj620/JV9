<!--
 * @Author: your name
 * @Date: 2021-11-29 10:47:35
 * @LastEditTime: 2022-06-02 14:01:44
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectTask\Detail\index.vue
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
    <JvBlock  :title="cur_Id" ref="first">
      <JvDetail :detailObj="detailObj"> </JvDetail>
    </JvBlock>
    <!-- 保养 -->
    <JvBlock title="保养信息"  ref="second">
      <JvTable :tableObj="maintenanceTableObj"> </JvTable>
    </JvBlock>
    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <JvRemark :RemarkData="detailObj.detailData.Remarks"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :DeviceNo="cur_Id"></JvFileExhibit>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { mapState } from "vuex";
import { Table, detailConfig } from "./config";
import Detail from "@/jv_doc/class/detail/Detail";
import { API as Maintenance_tpl } from "@/api/workApi/equipment/maintenance_tpl";

import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { taskTypeEnum } from "@/enum/workModule";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import {} from "./";
export default {
  // name: "Pm_ProjectTask_Detail",
  components: {
    JvRemark,
    JvFileExhibit,
  },
  data() {
    return {
      cur_Id: this.$route.query.Id,
      detailObj: {},
      // 工序
      tableObj: {},
      maintenanceTableObj: {},
      repairTableObj: {},
      useTableObj: {},
      btnAction: [],
      DynamicInfo: [],
      // 编辑路由指向 谨慎删除
      editRouteName: "Pm_ProjectTask_Edit",
      printMod: "Pm_ProjectTask",
      taskTypeEnum,
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: '保养信息',
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "third",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
      ],
      dynamicShow: false,
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),

    BillIdShow() {},
  },
  created() {
    // this.ruleForm
    this.tableObj = new Table();
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 3,
    });
    this.maintenanceTableObj = new Table();
    this.getData();
  },
  mounted() {},
  methods: {
    imgUrlPlugin,
    getData() {
      Maintenance_tpl.api_get({ Id: this.cur_Id }).then((res) => {
        this.detailObj.setData(res);
        this.maintenanceTableObj.setData(res.Items);
        // this.tableObj.setData(res.BillItems);
        // this.btnAction = detailPageModel(this, res, ProjectTask, this.getData);
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

.sum-text {
  display: inline-block;
  // padding-right: 100px;
  width: 200px;
  text-align: end;
}
</style>
