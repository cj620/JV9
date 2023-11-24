<template>
  <div>
    <jv-dialog
      :title="$t('device.De_EditDetail')"
      width="70%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmEdit"
    >
      <!-- 表格 -->
      <JvTable
        ref="BillTable"
        :table-obj="tableObj">
        <template #MaintenanceResults="{ row }">
          <el-select
            v-model="row.MaintenanceResults"
            size="mini"
            style="width: 125px"
          >
            <el-option
              v-for="item in MaintenanceResultsEnum"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template #Remarks="{ row }">
          <el-input
            v-model="row.Remarks"
            size="mini"
            style="width: 675px"
          ></el-input>
        </template>
      </JvTable>
    </jv-dialog>
  </div>
</template>
<script>
import { detailTable } from "./config"
export default {
  name: "index",
  data() {
    return {
      tableObj: {},
      MaintenanceResultsEnum: [
        {
          name: this.$t("Generality.Ge_Completed"),
          value: 'Completed'
        },
        {
          name: this.$t("Generality.Ge_Incomplete"),
          value: 'Incomplete'
        }
      ]
    };
  },
  props: {
    DetailData: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.tableObj = new detailTable()
    this.tableObj.setData(this.DetailData);
  },
  methods: {
    confirmEdit() {
      let arr = this.DetailData;
      this.$emit("confirmData", arr);
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
