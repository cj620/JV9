<!--
 * @Author: C.
 * @Date: 2021-07-21 18:52:38
 * @LastEditTime: 2021-08-06 16:29:07
 * @Description: file content
-->
<template>
  <div class="table-demo">
    <div v-for="tableItem in table.filter(item=>item.show)"
         :key="tableItem.id"
         class="table-style">
      <!-- 表格标题 -->
      <div class="table-title"
           v-if="tableItem.title.show"
           @click="titleClick(tableItem.title)">
        <PrintLabel :cdata="tableItem.title"></PrintLabel>
      </div>
      <table>
        <thead>
          <!-- 表头 -->
          <th v-for=" headTitle in tableItem.fields.filter(item=>item[0].show)"
              :key="headTitle[0].prop">

            <TableItem :cdata="headTitle[0]"
                       @dragstart="headClickk"></TableItem>
          </th>
        </thead>
        <tbody>

          <tr>
            <td v-for="(titleCol,index) in tableItem.fields.filter(item=>item[0].show)"
                :key="index">
              <!-- <span @click="titleClick(titleCol[1])">[{{titleCol[1].label}}]</span> -->
              <TableDiv :cdata="titleCol[1]"
                        @dragstart="headClickk"></TableDiv>
            </td>
          </tr>

        </tbody>
        <tfoot v-if="tableItem.showSum">
          <th v-for=" headTitle in tableItem.fields.filter(item=>item[0].show)"
              :key="headTitle[0].prop"
              class="sum-tfoot">

          </th>
        </tfoot>

      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import PrintLabel from "../PrintLabel";
import TableItem from "./cpn/TableItem";
import TableDiv from "./cpn/TableDiv";
export default {
  components: {
    PrintLabel,
    TableItem,
    TableDiv
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      table: state => state.print.table
    }),
  },
  mounted () {
    // this.columnDrop()
  },
  methods: {
    ...mapMutations(
      'print', ['SET_ACTIVE_TOGGLE', 'CHANGE_NODES']
    ),
    titleClick (item) {
      this.CHANGE_NODES(item)
      this.SET_ACTIVE_TOGGLE(['font', 'table'])
    },
    headClickk () {
      this.SET_ACTIVE_TOGGLE(['font', 'table'])
    }
  }
}
</script>

<style lang='scss'>
@import "../../../../style/print-table.scss";
</style>