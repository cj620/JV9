<!--
 * @Author: C.
 * @Date: 2021-07-21 18:52:38
 * @LastEditTime: 2021-12-31 15:37:56
 * @Description: file content
-->
<template>
  <div class="table-demo">
    <div
      v-for="tableItem in table.filter((item) => item.show)"
      :key="tableItem.id"
      class="table-style"
    >
      <div class="table-title" v-if="tableItem.title.show">
        <PrintLabel :cdata="tableItem.title"></PrintLabel>
      </div>
      <table>
        <thead>
          <th
            v-for="headTitle in tableItem.fields.filter((item) => item[0].show)"
            :key="headTitle[0].id"
          >
            <TableItem :cdata="headTitle[0]"></TableItem>
          </th>
        </thead>
        <tbody>
          <tr v-for="DataCol in data[tableItem.prop]" :key="DataCol.id">
            <td
              v-for="(titleCol, index) in tableItem.fields.filter(
                (item) => item[0].show
              )"
              :key="index"
            >
              <TableDiv :cdata="titleCol[1]" :data="DataCol"></TableDiv>
            </td>
          </tr>
        </tbody>
        <tfoot style="padding: 50px">
          <template v-if="tableItem.showSum">
            <th
              v-for="headTitle in tableItem.fields.filter(
                (item) => item[0].show
              )"
              :key="headTitle[0].prop"
              class="sum-tfoot"
            >
              {{ sum(data[tableItem.prop], headTitle[1].prop) }}
            </th>
          </template>

          <th style="border: none" v-else>
            <div style="height: 10px"></div>
          </th>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PrintLabel from "../PrintLabel";
import TableItem from "./cpn/TableItem";
import { filterEnums } from "../../../../enums";
import { tableSum } from "../../../../utils";
import TableDiv from "./cpn/TableDiv";
export default {
  components: {
    PrintLabel,
    TableItem,
    TableDiv,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      table: (state) => state.print.table,
    }),
    dataFilter() {
      return (titleCol, dataCol) => {
        return filterEnums[titleCol.filter].func(dataCol[titleCol.prop]);
      };
    },
    sum() {
      return tableSum;
    },
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    // console.log(tableSum, '123');
    // this.columnDrop()
  },
  methods: {},
};
</script>

<style lang="scss">
@import "../../../../style/print-table.scss";
</style>
