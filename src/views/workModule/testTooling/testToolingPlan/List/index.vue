<template>
  <PageWrapper :footer="false">
    <div class="custom-button">
      <el-button size="mini" @click="toRecord">
        {{ $t("project.Pro_TaskRecord") }}
      </el-button>
      <el-badge
        v-if="DelayCount && DelayCount !== 0"
        :value="DelayCount"
        class="button-badge"
      >
        <el-button size="mini" @click="delayedTasks">
          {{ $t('project.Pro_DelayedTasks') }}
        </el-button>
      </el-badge>
      <el-button v-else size="mini" @click="delayedTasks">
        {{ $t('project.Pro_DelayedTasks') }}
      </el-button>
    </div>
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #ItemState="{ record }">
        {{ stateMap[record].name }}
      </template>
      <template #TaskType="{ record }">
        <!-- 状态标签 -->
        {{ taskTypeEnum[record].name }}
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('testTooling.Tt_StartTrial'),
              confirm: startTrial.bind(null, row),
              disabled: row.ItemState !== 'NotStarted',
            },
          ]"
        />
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { taskStateEnum, taskTypeEnum } from "@/enum/workModule";
import { item_delay_list } from "@/api/workApi/project/projectTask";

export default {
  name: "Tt_TestToolingPlan",
  data() {
    return {
      taskTypeEnum,
      tableObj: {},
      recordRouteName: "TestToolingTask_Record",
      DelayCount: null,
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.States = ["Approved", "Completed"];
    this.getDelayCount();
    this.tableObj.getData();
  },
  computed: {
    stateMap() {
      return taskStateEnum;
    },
  },
  methods: {
    getDelayCount() {
      item_delay_list({
        SelctChildrenType: 2,
        ProcessType: "TrialTooling",
        PageSize: 1,
        CurrentPage: 1,
      }).then((res) => {
        this.DelayCount = res.Count;
      })
    },
    toRecord() {
      this.$router.push({
        name: this.recordRouteName,
      });
    },
    delayedTasks() {
      this.$router.push({
        name: "Tt_TestToolingDelayedTasks",
      });
    },
    startTrial(row) {
      this.$router.push({
        name: "Tt_TestToolingTask_Add",
        query: row,
      })
    }
  }
}
</script>
<style scoped lang="scss">
.custom-button {
  position:absolute;
  height: 45px;
  display:flex;
  align-items: center;
  right: 220px
}
</style>
