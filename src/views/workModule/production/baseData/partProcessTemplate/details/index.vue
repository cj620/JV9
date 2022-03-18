<!--
 * @Author: H.
 * @Date: 2021-12-01 15:28:55
 * @LastEditTime: 2022-01-14 10:48:19
 * @Description:
-->

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
    <!--单据信息-->
    <JvBlock :title="$t('Generality.Ge_TemplateInfo')"  ref="first">
      <JvDetail :detailObj="detailObj"></JvDetail>
    </JvBlock>

    <!--物料信息-->
    <JvBlock :title="$t('Generality.Ge_ProcessInfo')" ref="second">
      <JvTable :table-obj="tableObj"> </JvTable>
    </JvBlock>
    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <JvRemark :RemarkData="RemarkData"></JvRemark>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import JvRemark from "@/components/JVInternal/JvRemark/index";
import { tableConfig, detailConfig } from "./config";
import { Table } from "@/jv_doc/class/table";
import Detail from "@/jv_doc/class/detail/Detail";
export default {
  data() {
    return {
      tableObj: {},
      detailObj: {},
      routeData: this.$route.query.data,
      RemarkData: "",
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_TaskContent"),
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "third",
        },
      ],
    };
  },
  methods: {
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
  created() {
    this.detailObj = new Detail({
      data: this.routeData,
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
      height: 350,
    });
    this.tableObj.setData(this.routeData.BillItems);
    this.RemarkData = this.routeData.Remarks;
  },
  mounted() {},
  computed: {},
  components: {
    JvRemark,
  },
};
</script>

<style lang="scss" scoped></style>
