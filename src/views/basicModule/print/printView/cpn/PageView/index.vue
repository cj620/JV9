<!--
 * @Author: C.
 * @Date: 2021-10-08 15:52:56
 * @LastEditTime: 2021-12-31 15:16:20
 * @Description: file content
-->
<template>
  <div
    :style="{ width: paperSize.width, minHeight: paperSize.height }"
    class="print-box-only-read page-break"
    ref="printPage"
    style="margin-bottom: 10px"
  >
    <table>
      <thead>
        <th style="position: relative">
          <PrintBlock
            :data="printData"
            ref="printHeader"
            name="header"
          ></PrintBlock>
        </th>
      </thead>

      <tbody>
        <tr>
          <td style="position: relative">
            <PrintBlock
              :data="printData"
              name="body"
              ref="printBody"
            ></PrintBlock>
          </td>
        </tr>
        <tr>
          <td>
            <!-- 表格 -->
            <PrintTable
              :data="printData"
              ref="printTable"
              :style="{ minHeight: autoHeight }"
            ></PrintTable>
          </td>
        </tr>
        <tr>
          <td style="position: relative">
            <PrintBlock
              :data="printData"
              name="footer"
              ref="printFooter"
            ></PrintBlock>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PrintBlock from "../PrintCpn/PrintBlock";
import PrintTable from "../PrintCpn/PrintTable";
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
export default {
  components: {
    PrintBlock,
    PrintTable,
  },
  props: {
    printData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      tableHeight: 100,
    };
  },
  computed: {
    ...mapGetters("print", ["paperSize"]),
    autoHeight() {
      return this.tableHeight + "px";
    },
  },
};
</script>

<style lang="scss">
@import "../../../style/print.scss";
</style>
