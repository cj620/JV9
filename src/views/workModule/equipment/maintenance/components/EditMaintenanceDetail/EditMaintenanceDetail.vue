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
      <JvEditTable ref="BillTable" :table-obj="tableObj">
        <template #MaintenanceResults="{ row }">
          <el-select
            v-model="row.MaintenanceResults.value"
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
      </JvEditTable>
    </jv-dialog>
  </div>
</template>
<script>
// import { detailTable } from "./config"
import { EditTable } from "./config"
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
    this.tableObj = new EditTable()
    this.tableObj.setData(this.DetailData);
  },
  methods: {
    confirmEdit() {
      let arr = this.tableObj.getTableData()
      this.tableObj.validate((valid) => {
        if (valid) {
          this.$emit("confirmData", arr);
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
