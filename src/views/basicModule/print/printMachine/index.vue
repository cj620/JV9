<!--
 * @Author: C.
 * @Date: 2021-07-21 15:01:15
 * @LastEditTime: 2022-08-16 10:17:59
 * @Description: file content
-->
<template>
  <div class="print">
    <div class="print-wrapper">
      <div style="width: 80mm" v-if="printMode == 1">
        <div ref="printTarget">
          <el-row :gutter="20" v-for="(item, index) in printData" :key="index">
            <el-col :span="12">
              <StikyTag :cdata="item"></StikyTag>
            </el-col>
            <el-col :span="12">
              <StikyTag :cdata="item"></StikyTag>
            </el-col>
          </el-row>
        </div>
      </div>
      <div
        style="
          width: 210mm;
          min-height: 296.6mm;
          background-color: #ffffff;
          padding: 1mm;
        "
        v-else
      >
        <div ref="printTarget">
          <div class="printTarget_flex">
            <div :span="12" v-for="(item, index) in printData" :key="index">
              <Tags :cdata="item" :BillKey="BillKey"></Tags>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="printData.length && printData.length == 0"
        style="background: #fff; width: 100%; height: 700px; padding-top: 200px"
      >
        <el-empty :description="$t('Generality.Ge_NoPrintData')"></el-empty>
      </div>
    </div>

    <div class="print-setting" style="width: 375px">
      <!-- <PrintSetting />-->
      <div class="print-mod">
        <el-select v-model="printMode" placeholder="请选择">
          <el-option
            v-for="item in printOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="setting-btn-group" style="width: 375px">
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
import Tags from "./cpn/Tags";
import StikyTag from "./cpn/StikyTag.vue";
export default {
  name: "printMachine",
  components: {
    PrintTable,
    PrintBlock,
    PrintSetting,
    Tags,
    StikyTag,
  },
  data() {
    return {
      printData: [],
      BillKey: "",
      printOptions: [
        {
          label: "标签打印",
          value: 1,
        },
        {
          label: "纸张打印",
          value: 2,
        },
      ],
      printMode: 1,
    };
  },
  mounted() {
    this.getPrintGetData();
    // if (this.$route?.query?.fast) {
    //   this.$nextTick(() => {
    //     this.printDemo();
    //   });
    // }
    console.log(this.$route.params, 666655);
    this.printData = this.$route.params.Data;
  },
  methods: {
    ...mapMutations("print", ["HOLD_CONFIG", "RESET_CONFIG"]),
    ...mapActions("print", ["getPirntTemplate"]),

    getPrintGetData() {
      // this.BillKey = this.$route.params.BillKey
      //this.printData = this.$route.params.Ids
    },
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
.print-mod {
  /* margin-top: 110px; */
  height: 1000px;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  margin-top: 400px;
}
.printTarget_flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
