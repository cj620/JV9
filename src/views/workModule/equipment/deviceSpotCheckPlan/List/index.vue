<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Delete'),
              disabled: getActionState(row.State, 'del'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.BillId]),
              },
            },
          ]"
        />
      </template>
      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
            {
            label:$t('Generality.Ge_New'),
            confirm: add,
          },
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
      <template #State="{ record }">
        <el-tag type="success" v-if="record === 'Using'">{{ spotCheckStateEnum[record].name }}</el-tag>
        <el-tag type="danger" v-else>{{ spotCheckStateEnum[record].name }}</el-tag>
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { stateEnum } from "@/enum/workModule";
import { spotCheckStateEnum } from "@/enum/workModule";
export default {
  name: "As_DeviceSpotCheckPlan",
  components:{

  },
  data() {
    return {
      spotCheckStateEnum,
      tableObj: {},
      // 新增路由
      AddRoute: "As_DeviceSpotCheckPlan_Add",
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData()
  },
  computed: {
    // 批量删除
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
    add(){
      this.$router.push({
        name: 'As_DeviceSpotCheckPlan_Add',
      });
    },
    // 删除
    deleteOrder(ids) {
      this.tableObj.api.del({ BillIds: ids }).then((_) => {
        this.tableObj.getData();
      });
    },
    //批量删除单据
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
  }
}

</script>
<style lang="scss" scoped>
.el-tag--light {
  width: 100%;
  max-width: 100px;
  text-align: center;
}
</style>
