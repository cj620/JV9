<!--
 * @Author: C.
 * @Date: 2021-07-21 15:01:15
 * @LastEditTime: 2022-01-25 10:11:48
 * @Description: file content
-->
<template>
  <div class="print" >
    <!-- :class="[{'m-b':index!==printData.length-1}]"
               v-for="(printDataItem,index) in printData"
               :key="index" -->
    <div class="print-wrapper" style="height: 100%">
      <div style="width: 80mm">
        <div ref="printTarget">
          <el-row :gutter="20">
            <el-col :span="12" v-for="(item, index) in printData" :key="index">
              <Tags :cdata="item"></Tags>
            </el-col>
          </el-row>
        </div>
      </div>
      <div
        v-if="printData.length == 0"
        style="background: #fff; width: 100%; height: 700px; padding-top: 200px"
      >
        <el-empty :description="$t('Generality.Ge_NoPrintData')"></el-empty>
      </div>
    </div>

    <div class="print-setting"  style="width: 368px">
     <!-- <PrintSetting />-->

      <div class="setting-btn-group"  style="width: 368px">
        <el-button type="primary" @click="printDemo">
          {{ $t("Generality.Ge_Print") }}</el-button
        >
        <Action
          :actions="[
            {
              label: $t('Generality.Ge_Back'),
              confirm: cancel,
            },

          ]"
        ></Action>
      </div>
    </div>
  </div>
</template>

<script>
import Print from "../printView/print";
import Vue from "vue";
Vue.use(Print);
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import PrintTable from "../printView/cpn/PrintCpn/PrintTable";
import PrintBlock from "../printView/cpn/PrintCpn/PrintBlock";
import PrintSetting from "../printView/cpn/PrintSetting";
import Tags from  "./cpn/Tags";
export default {
  components: {
    PrintTable,
    PrintBlock,
    PrintSetting,
    Tags,
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
