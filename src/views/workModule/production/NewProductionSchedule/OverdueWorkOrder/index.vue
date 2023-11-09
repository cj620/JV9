<template>
  <page-wrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="obsoleteTableObj">
<!--      <template #titleBar-->
<!--        ><div class="subTitle">总计：{{ obsCount }}</div></template-->
<!--      >-->
      <template #LastReportingDays="{ record }">
        <div style="color: red; font-size: 20px; font-weight: bold">
          {{ record }}
        </div></template
      >
      <template #btn-list>
        <Action
          size="mini"
          :actions="[
          {
            label: $t('production.Pr_EditTheJobAsCompleted'),
            confirm: EditTheJobAsCompleted
          }
        ]"></Action>
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: obsoleteEdit.bind(null, row),
            },
          ]"
        />
      </template>
    </JvTable>
    <!-- 修改超期工单计划结束时间 -->
    <JvDialog
      :title="$t('production.Pr_ModifyPlanEndTime')"
      :visible.sync="UpdatePlanEndFormVisible"
      width="30%"
      @confirm="updatePlanEnd"
    >
      <el-date-picker
        v-model="planData.planEnd"
        type="date"
        :placeholder="$t('production.Pr_SelectDate')"
      >
      </el-date-picker>
    </JvDialog>
  </page-wrapper>
</template>

<script>
import Action from "~/cpn/JvAction/index.vue";
import {ObsoleteTable} from "@/views/workModule/production/productionSchedule/List/config";
import {
  update_plan_end,
  update_state
} from "@/api/workApi/production/productionTask";

export default {
  name: "index",
  components: { Action },
  data() {
    return {
      obsoleteTableObj: {}, // 超期表格
      obsCount:0,
      UpdatePlanEndFormVisible: false,
      planData: {
        planEnd: null,
        billId: null,
      },
    }
  },
  created() {
    this.obsoleteTableObj = new ObsoleteTable();
    this.obsoleteTableObj.getData()
  },
  methods: {
    // 编辑工单为已完成
    EditTheJobAsCompleted() {
      update_state({BillIds: this.obsoleteTableObj.selectData.keys, State: 'Processed'}).then(res => {
        this.obsoleteTableObj.getData()
      })
    },
    // 编辑
    obsoleteEdit(val) {
      this.UpdatePlanEndFormVisible = true;
      this.planData.planEnd = val.PlanEnd;
      this.planData.billId = val.BillId;
    },
    // 修改超交期工单计划结束日期
    updatePlanEnd() {
      // this.loading = true;
      update_plan_end({
        BillIds: [this.planData.billId],
        PlanEnd: this.planData.planEnd,
      })
        .then(() => {
          // this.loading = false;
          this.obsoleteTableObj.getData();
        })
        .catch(() => {
          // this.loading = false;
        });
      this.UpdatePlanEndFormVisible = false;
      this.planData = {
        planEnd: null,
        billId: null,
      };
    },
  }
};
</script>

<style scoped lang="scss"></style>
