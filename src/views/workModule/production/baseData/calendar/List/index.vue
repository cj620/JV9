<!--
 * @Author: H.
 * @Date: 2021-11-09 13:03:16
 * @LastEditTime: 2022-01-20 17:15:47
 * @Description: 工厂日历
-->

<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
<!--      <template #WorkType="{ row }">
        <span>{{ WorkTypeEnum[row.WorkType] }}</span>
      </template>-->
      <template #RepeatType="{ row }">
        <span>{{ RepeatTypeEnum[row.RepeatType] }}</span>
      </template>
      <template #StartTime="{ row }">
        <span>{{
          row.RepeatType === "Weekly" ? weekEnum[row.StartTime] : row.StartTime
        }}</span>
      </template>
      <template #EndTime="{ row }">
        <span>{{
          row.RepeatType === "Weekly" ? weekEnum[row.EndTime] : row.EndTime
        }}</span>
      </template>
      <template #Enable="{ row }">
        <el-switch
          v-model="row.Enable"
          :active-value="true"
          :inactive-value="false"
          @change="switchChange(row.Id, row.Enable)"
        >
        </el-switch>
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: editCalendar.bind(null, row),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteCalendar.bind(null, [row.Id]),
              },
            },
          ]"
        ></TableAction
      ></template>
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_New'),
            confirm: add.bind(),
          },
        ]"
      >
      </Action>
    </JvTable>
    <JvDialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :title="dialogTitle"
      @confirm="dialogConfirm"
      width="450px"
    >
      <edit-calendar
        ref="editCalendar"
        :formData.sync="formData"
      ></edit-calendar> </JvDialog
  ></PageWrapper>
</template>

<script>
import { Table } from "./config";
import {
  editCalendarState,
  addCalendar,
  deleteCalendar,
} from "@/api/workApi/production/baseData";
import EditCalendar from "../components/editCalendar.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      tableObj: {},
      dialogTitle: "",
      WorkTypeEnum: {
        Active: this.$t("production.Pr_Use"),
        Deactive: this.$t("production.Pr_StopUse"),
      },
      RepeatTypeEnum: {
        Weekly: this.$t("production.Pr_RepeatWeekly"),
        None: this.$t("production.Pr_NoRepetition"),
      },
      weekEnum: {
        1: this.$t("production.Pr_Monday"),
        2: this.$t("production.Pr_Tuesday"),
        3: this.$t("production.Pr_Wednesday"),
        4: this.$t("production.Pr_Thursday"),
        5: this.$t("production.Pr_Friday"),
        6: this.$t("production.Pr_Saturday"),
        7: this.$t("production.Pr_Sunday"),
      },
      formData: {},
    };
  },
  methods: {
    // 编辑日历
    editCalendar(calendar) {
      this.dialogTitle = this.$t("Generality.Ge_Edit");
      this.formData = calendar;
      this.dialogVisible = true;
    },
    // 删除日历
    deleteCalendar(ids) {
      deleteCalendar(ids).then(() => this.tableObj.getData());
    },
    // 确认编辑/新增日历
    dialogConfirm() {
      if (this.$refs.editCalendar.submit()) {
        addCalendar(this.formData).then(() => {
          this.tableObj.getData();
          this.dialogVisible = false;
        });
      }
    },
    // 新增日历
    add() {
      this.dialogTitle = this.$t("Generality.Ge_New");
      this.formData = {
        WorkType: "",
        RepeatType: "",
        StartTime: "",
        EndTime: "",
        Enable: true,
        EquipmentList: "",
        Id: 0,
      };
      this.dialogVisible = true;
    },
    switchChange(Id, Enable) {
      editCalendarState({ Id, Enable }).then((res) => {
        this.$message.success(res);
      });
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  mounted() {},
  computed: {},
  components: {
    EditCalendar,
  },
};
</script>

<style lang="scss" scoped></style>
