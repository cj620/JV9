<!--
 * @Author: your name
 * @Date: 2021-11-29 10:47:35
 * @LastEditTime: 2022-06-01 16:48:56
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
    <JvBlock :title="$t('Generality.Ge_BillInfo')"
             ref="first"
             :contentStyle="{
        paddingLeft: '15px',
        height: '300px',
      }"
             style="position: relative">
      <div style="position: relative">
      <JvDetail :detailObj="detailObj"> </JvDetail>
      </div>
    </JvBlock>
    <!-- 保养 -->
    <JvBlock :title="$t('device.De_Maintenance')" ref="second">
      <JvTable :tableObj="maintenanceTableObj"> </JvTable>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="third">
      <JvFileExhibit :BillId="cur_Id"></JvFileExhibit>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { mapState } from "vuex";
import { Table, detailConfig } from "./config";
import Detail from "@/jv_doc/class/detail/Detail";
import { API as Maintenance } from "@/api/workApi/equipment/maintenance";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import {log} from "qrcode/lib/core/galois-field";
export default {
  name: "index",
  components: {
    JvFileExhibit,
  },
  data() {
    return {
      cur_Id: this.$route.query.BillId,
      detailObj: {},
      maintenanceTableObj: {},
      btnAction: [],
      // 编辑路由指向 谨慎删除
      editRouteName: "As_DeviceMaintenanceEdit",
      printMod: "As_DeviceMaintenance",
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("device.De_Maintenance"),
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "third",
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
  },
  created() {
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
    getData() {
      Maintenance.api_get({ BillId: this.cur_Id }).then((res) => {
        this.detailObj.setData(res);
        // console.log(res)
        this.maintenanceTableObj.setData(res.BillItems);
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
};
</script>

<style lang="scss">

</style>
