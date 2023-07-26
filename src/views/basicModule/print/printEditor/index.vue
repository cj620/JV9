<!--
 * @Author: C.
 * @Date: 2021-07-21 15:01:15
 * @LastEditTime: 2022-01-17 09:44:56
 * @Description: file content
-->
<template>
  <div class="print" ref="printWrapper">
    <div class="print-wrapper">
      <div class="print-box" :style="paperSize" ref="printPage">
        <div ref="printTarget">
          <table style="width: 100%">
            <thead>
              <th style="position: relative">
                <PrintBlock name="header" ref="printHeader"></PrintBlock>
              </th>
            </thead>

            <tbody>
              <tr>
                <td style="position: relative">
                  <PrintBlock name="body" ref="printBody"></PrintBlock>
                </td>
              </tr>
              <tr>
                <td>
                  <!-- 表格 -->
                  <PrintTable :style="{ minHeight: autoHeight }"></PrintTable>
                </td>
              </tr>
              <tr>
                <td style="position: relative">
                  <PrintBlock name="footer" ref="printFooter"></PrintBlock>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="print-setting">
      <div>{{ $t("Generality.Ge_PrintEditor") }}</div>

      <PrintSetting @quit="editor" />

      <div class="setting-btn-group">
        <el-button type="primary" @click="holdConfig">{{
          $t("Generality.Ge_Save")
        }}</el-button>
        <Action
          :actions="[
            {
              label: $t('Generality.Ge_Back'),
              confirm: getBack,
            },
            {
              label: $t('Generality.Ge_Delete'),
              confirm: delTmp,
            },
          ]"
          :dropDownActions="[
            {
              icon: 'el-icon-refresh',
              label: $t('Generality.Ge_Reset'),
              confirm: RESET_CONFIG,
            },
            {
              label: $t('Generality.Ge_EditingMode'),
              icon: 'el-icon-full-screen',
              confirm: editor,
            },
          ]"
        ></Action>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import PrintTable from "./cpn/PrintCpn/PrintTable";
import PrintSetting from "./cpn/PrintSetting";
import PrintBlock from "./cpn/PrintCpn/PrintBlock";
import { DelById } from "@/api/basicApi/systemSettings/print";
import { fullScreen } from "@/jv_doc/utils/system";
export default {
  components: {
    PrintTable,

    PrintSetting,

    PrintBlock,
  },
  data() {
    return {
      tableHeight: 100,
    };
  },
  mounted() {},
  methods: {
    ...mapMutations("print", ["HOLD_CONFIG", "RESET_CONFIG"]),
    getBack() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    delTmp() {
      DelById(this.CurTmp.Id).then((res) => {
        this.getBack();
      });
    },
    editor() {
      fullScreen(this.$refs.printWrapper);
    },
    quit() {},
    holdConfig() {
      this.HOLD_CONFIG(this.getBack);
    },
  },
  computed: {
    ...mapState({
      paperStyle: (state) => state.print.paperStyle,
      CurTmp: (state) => state.print.CurTmp,
    }),
    ...mapGetters("print", ["paperSize"]),
    autoHeight() {
      // console.log(this.tableHeight,5467864356);
      return this.tableHeight + "px";
    },
  },
};
</script>

<style lang="scss">
@import "../style/print.scss";
</style>
