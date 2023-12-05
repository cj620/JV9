<template>
  <div>
    <jv-dialog
      :title="$t('device.De_SpotCheck')"
      width="70%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmSpotCheck"
    >
      <!-- 表格 -->
      <JvEditTable ref="BillTable" :table-obj="tableObj">
        <template #SpotCheckResult="{ row }">
          <el-select
            v-model="row.SpotCheckResult.value"
            size="mini"
            style="width: 125px"
          >
            <el-option
              v-for="item in SpotCheckResultEnum"
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
import { EditTable } from "./config"
export default {
  name: "index",
  data() {
    return {
      tableObj: {},
      SpotCheckResultEnum: [
        {
          name: this.$t("device.De_Normal"),
          value: 'Normal'
        },
        {
          name: this.$t("device.De_Abnormal"),
          value: 'Abnormal'
        }
      ]
    };
  },
  props: {
    DetailData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.tableObj = new EditTable()
    this.tableObj.setData(this.DetailData.BillItems);
  },
  methods: {
    confirmSpotCheck() {
      console.log(this.DetailData,123211)
      let arr = this.tableObj.getTableData()
      const obj = {
        Id: this.DetailData.Id,
        PhotoUrl: this.DetailData.PhotoUrl,
        Remarks: this.DetailData.Remarks,
        BillItems: arr,
      }
      this.tableObj.validate((valid) => {
        if (valid) {
          this.$emit("confirmData", obj);
        }
      })
    }
  },
}
</script>
