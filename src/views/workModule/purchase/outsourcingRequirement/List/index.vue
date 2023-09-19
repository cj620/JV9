<!--
 * @Author: H.
 * @Date: 2021-12-08 11:00:45
 * @LastEditTime: 2022-08-10 17:20:52
 * @Description:
-->
<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj" @selection-change="canPick">
      <template #Category="{ row }">
        {{ Category[row.Category] }}
      </template>
      <template #State="{ row }">
        {{ State[row.State] }}
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: _delete.bind(null, [row.Id]),
              },
            },
          ]"
        ></TableAction
      ></template>
      <!--<template #PrTaskBillId="{ record }">-->
      <!--  {{ record }}-->
      <!--</template>-->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: '委外',
            confirm: outsourcingBill.bind(),
            disabled: isDisabled1
          },
          {
            label: '完成',
            confirm: completeBill.bind(),
            disabled: isDisabled2
          },
          {
            label: $t('Generality.Ge_New'),
            confirm: add.bind(),
          },
        ]"
      >
      </Action>
    </JvTable>
    <JvDialog
      title="提示"
      :visible.sync="confirmDialogShow"
      v-if="confirmDialogShow"
      @confirm="confirmBill"
      width="30%"
    >
      是否将选中的单据状态改为:{{ newState[dialogTip].name }}
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { deleteOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";
import { Table } from "./config";
export default {
  name:'Pu_OutsourcingRequirement',
  data() {
    return {
      tableObj: {},
      isDisabled1: true,
      isDisabled2: true,
      confirmDialogShow: false,
      dialogTip:"",
      newState:{
        0:{
          name:'已委外',
        },
        1:{
          name:'已完成',
        }
      },
      Category: {
        Part: this.$t("production.Pr_PartOutsourcing"),
        Process: this.$t("production.Pr_ProcessOutsourcing"),
      },
      State: {
        ToBeProcessed: this.$t("Generality.Ge_Pending"),
        Outsourced: this.$t("purchase.Pu_Outsourced"),
      },
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    _delete(id) {
      deleteOutsourcingrRequirement(id).then(() => {
        this.tableObj.getData();
      });
    },
    add() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) {
        return this.$message.warning(
          this.$t("purchase.Pu_PleaseSelectTheOutsourcingRequirements")
        );
      }
      this.$router.push({
        name: "Pu_Outsourcing_Add",
        query: {
          ItemsData: datas,
        },
      });
    },
    outsourcingBill(){
      this.confirmDialogShow = true
      this.dialogTip = 0
    },
    completeBill(){
      this.confirmDialogShow = true
      this.dialogTip = 1
    },
    confirmBill(){
      const arr = this.tableObj.selectData.datas.map(item => item.PrTaskBillId);
      if (this.dialogTip === 0) {
        console.log('需要改为已委外的加工单号：',arr);
      } else if (this.dialogTip === 1){
        console.log('需要改为已完成的加工单号：',arr);
      }
      this.confirmDialogShow = false
    },
    canPick() {
      const { datas } = this.tableObj.selectData;
      this.isDisabled1 = !datas.every(item => item.State === "ToBeProcessed");
      this.isDisabled2 = !datas.every(item => item.State === "Outsourced");
      if (datas.length === 0) {
        this.isDisabled1 = true;
        this.isDisabled2 = true;
      }
    }
  },
};
</script>

<style scoped></style>
