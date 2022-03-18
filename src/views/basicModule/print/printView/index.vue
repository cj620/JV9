<!--
 * @Author: C.
 * @Date: 2021-07-21 15:01:15
 * @LastEditTime: 2022-01-25 10:11:48
 * @Description: file content
-->
<template>
  <div class="print">
    <!-- :class="[{'m-b':index!==printData.length-1}]"
               v-for="(printDataItem,index) in printData"
               :key="index" -->
    <div class="print-wrapper">
      <div>
        <div ref="printTarget">
          <PageView
            v-for="(printDataItem, index) in printData"
            :printData="printDataItem"
            :key="index"
          ></PageView>
        </div>
      </div>
      <div
        v-if="printData.length == 0"
        style="background: #fff; width: 100%; height: 700px; padding-top: 200px"
      >
        <el-empty :description="$t('Generality.Ge_NoPrintData')"></el-empty>
      </div>
    </div>

    <div class="print-setting">
      <PrintSetting />

      <div class="setting-btn-group">
        <el-button type="primary" @click="printDemo">
          {{ $t("Generality.Ge_Print") }}</el-button
        >
        <Action
          :actions="[
            {
              label: $t('Generality.Ge_Back'),
              confirm: cancel,
            },
            {
              label: $t('Generality.Ge_Edit'),
              confirm: toEdit,
            },
          ]"
        ></Action>
      </div>
    </div>
  </div>
</template>

<script>
import Print from "./print";
import Vue from "vue";
Vue.use(Print);
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import PrintTable from "./cpn/PrintCpn/PrintTable";
import PrintBlock from "./cpn/PrintCpn/PrintBlock";
import PrintSetting from "./cpn/PrintSetting";
import PageView from "./cpn/PageView";
export default {
  components: {
    PrintTable,
    PrintBlock,
    PrintSetting,
    PageView,
  },
  data() {
    return {};
  },
  mounted() {
    this.getPirntTemplate();
    // if (this.$route?.query?.fast) {
    //   this.$nextTick(() => {
    //     this.printDemo();
    //   });
    // }
    // console.log(this.$route, 666655);
  },
  methods: {
    ...mapMutations("print", ["HOLD_CONFIG", "RESET_CONFIG"]),
    ...mapActions("print", ["getPirntTemplate"]),
    printDemo() {
      this.$print(this.$refs.printTarget);
    },
    cancel() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    toEdit() {
      this.$router.push({ name: "printEdit" });
    },
  },
  computed: {
    ...mapState({
      paperStyle: (state) => state.print.paperStyle,
      printData: (state) => state.print.printData,
    }),
    ...mapGetters("print", ["paperSize"]),
  },
};
</script>

<style lang="scss">
@import "../style/print.scss";
.page-break {
  page-break-after: always;
  background-color: #fff;
  // border: 1px solid #ccc;
}
.m-b {
  margin-bottom: 10px;
}
</style>
