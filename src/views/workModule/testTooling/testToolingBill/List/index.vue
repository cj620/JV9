<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <!-- 状态标签 -->
        <BillStateTags :state="record"></BillStateTags>
      </template>
      <template #operation="{ row }">
        <TableAction :actions="getListTableColBtnModel(row)" />
      </template>
      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_Delete'),
            disabled: canIsDel,
            popConfirm: {
              title: $t('Generality.Ge_DeleteConfirm'),
              confirm: delBills,
            },
          }
        ]"
      >
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config"
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { listTableColBtnModel } from "@/jv_doc/utils/system/pagePlugin";
import { stateEnum } from "@/enum/workModule";
export default {
  name: "Tt_TestToolingBill",
  components: { BillStateTags },
  data() {
    return {
      tableObj: {},
      EditRoute: "Tt_TestToolingBill_Edit",
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.TaskType = 'TrialTooling';
    this.tableObj.getData();
  },
  computed: {
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Rejected", "Unsubmitted"].includes(item.State);
      });
    },
    // 获取按钮状态
    getActionState() {
      return (state, type) => {
        return !stateEnum[state]?.operation?.[type];
      };
    },
  },
  methods: {
    //批量删除单据
    delBills() {
      this.tableObj.api.del({ BillIds: this.tableObj.selectData.keys }).then((_) => {
        this.tableObj.getData();
      });
    },
  },
}

</script>
<style scoped lang="scss">

</style>
