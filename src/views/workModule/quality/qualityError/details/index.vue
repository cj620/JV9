<!--
 * @Author: H.
 * @Date: 2021-12-01 11:05:04
 * @LastEditTime: 2022-01-20 16:39:14
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
    <JvBlock :title="CheckErrData.ToolingNo" ref="first">
      <!---->
      <div style="position: relative">
        <JvDetail :detailObj="detailObj"> </JvDetail>
      </div>
    </JvBlock>
    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="second">
      <JvRemark :RemarkData="CheckErrData.Remarks"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="third">
      <JvFileExhibit :BillId="CheckErrData.Id"></JvFileExhibit>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import Detail from "@/jv_doc/class/detail/Detail";
import { detailConfig } from "./config";
export default {
  data() {
    return {
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "third",
        },
      ],
      detailObj: {},
      printMod: "Qc_QualityError",
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
      data: this.$route.query.data,
      schema: detailConfig,
    });
  },
  mounted() {},
  computed: {
    CheckErrData() {
      return this.$route.query.data;
    },
  },
  components: {
    JvFileExhibit,
    JvRemark,
  },
};
</script>

<style lang="scss" scoped></style>
