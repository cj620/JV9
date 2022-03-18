<!--
 * @Author: H.
 * @Date: 2021-12-22 13:09:11
 * @LastEditTime: 2022-01-11 10:35:35
 * @Description:
-->
<!--编辑交期-->
<template>
  <div>
    <jv-dialog
      :title="$t('Generality.Ge_Edit')"
      width="90%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmItem"
    >
      <!-- 表格 -->
      <JvTable ref="BillTable" :table-obj="tableObj">
        <template #expand="props">
          <el-table :data="props.expand.dataList" style="width: 100%">
            <el-table-column :label="$t('Generality.Ge_Date')" prop="id">
            </el-table-column>
            <el-table-column :label="$t('Generality.Ge_Date')" prop="name">
            </el-table-column>
            <el-table-column :label="$t('Generality.Ge_Date')" prop="address">
            </el-table-column>
          </el-table>
        </template>
      </JvTable>
    </jv-dialog>
  </div>
</template>

<script>
import { Table } from "@/jv_doc/class/table";
import { tableConfig } from "./editDeliveryTableConfig";
export default {
  name: "editDelivery",
  data() {
    return {
      tableObj: {},
    };
  },
  created() {
    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "江浙小吃、小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333",
          dataList: [
            {
              id: "12987122",
              name: "好滋好味鸡蛋仔",
              category: "江浙小吃、小吃零食",
              desc: "荷兰优质淡奶，奶香浓而不腻",
              address: "上海市普陀区真北路",
              shop: "王小虎夫妻店",
              shopId: "10333",
            },
          ],
        },
      ],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      expand: true,
      height: 350,
    });
  },
  methods: {
    confirmItem() {},
  },
};
</script>

<style scoped></style>
