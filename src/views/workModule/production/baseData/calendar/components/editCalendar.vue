<!--
 * @Author: H.
 * @Date: 2021-11-29 15:42:49
<<<<<<< HEAD
 * @LastEditTime: 2022-01-17 10:46:51
=======
 * @LastEditTime: 2022-01-10 14:59:17
>>>>>>> d4d34f77979da04e938b20538293ff3cdf84696c
 * @Description:
-->
<template>
  <div>
    <el-form
      :rules="rules"
      ref="ruleForm"
      label-position="top"
      :model="form"
      width="100%"
    >
      <el-form-item
        :label="$t('production.Pr_DevicesList')"
        prop="EquipmentList"
      >
        <template>
          <template>
            <el-input v-model="form.EquipmentList" disabled style="width: 70%">
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="dialogVisible = true"
              ></el-button>
            </el-input>
          </template>
        </template>
      </el-form-item>
      <el-form-item :label="$t('Generality.Ge_UsageStatus')" prop="WorkType">
        <el-select v-model="form.WorkType" style="width: 70%">
          <el-option
            :label="$t('production.Pr_Use')"
            value="Active"
          ></el-option>
          <el-option
            :label="$t('production.Pr_StopUse')"
            value="Deactive"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        :label="$t('production.Pr_RepetitionType')"
        prop="RepeatType"
      >
        <el-select
          v-model="form.RepeatType"
          :placeholder="$t('Generality.Ge_PleaseSelect')"
          style="width: 70%"
          @change="repeatTypeChange"
        >
          <el-option
            :label="$t('production.Pr_RepeatWeekly')"
            value="Weekly"
          ></el-option>
          <el-option
            :label="$t('production.Pr_NoRepetition')"
            value="None"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('Generality.Ge_StartDate')" prop="StartTime">
        <template>
          <el-date-picker
            v-model="form.StartTime"
            type="date"
            v-if="form.RepeatType === 'None' || form.RepeatType === ''"
            value-format="yyyy-MM-dd"
            :placeholder="$t('production.Pr_SelectDate')"
          >
          </el-date-picker>
          <el-select
            v-model="form.StartTime"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
            v-else
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item :label="$t('Generality.Ge_EndDate')" prop="EndTime">
        <template>
          <el-date-picker
            v-model="form.EndTime"
            type="date"
            v-if="form.RepeatType === 'None' || form.RepeatType === ''"
            value-format="yyyy-MM-dd"
            :placeholder="$t('production.Pr_SelectDate')"
          >
          </el-date-picker>
          <el-select
            v-model="form.EndTime"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
            v-else
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item :label="$t('Generality.Ge_Enable')" prop="Enable">
        <el-switch v-model="form.Enable" style="margin-top: -26px"></el-switch>
      </el-form-item>
    </el-form>
    <JvDialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :title="$t('production.Pr_DevicesList')"
      @confirm="dialogConfirm"
      width="35%"
    >
      <JvTable ref="BillTable" :table-obj="tableObj"></JvTable>
    </JvDialog>
  </div>
</template>

<script>
import { Table } from "./config";

export default {
  data() {
    return {
      rules: {
        WorkType: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseSelect"),
            trigger: "blur,change",
          },
        ],
        RepeatType: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseSelect"),
            trigger: "blur,change",
          },
        ],
        StartTime: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseSelect"),
            trigger: "blur,change",
          },
        ],
        EndTime: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseSelect"),
            trigger: "blur,change",
          },
        ],
        Enable: [
          {
            type: "boolean",
            required: true,
            message: this.$t("Generality.Ge_WhetherToStartUsing"),
            trigger: "blur,change",
          },
        ],
        EquipmentList: [
          {
            required: true,
            message: this.$t("Generality.Ge_PleaseSelect"),
            trigger: "blur,change",
          },
        ],
      },
      form: {},
      dialogVisible: false,
      tableObj: {},
      options: [
        { value: 1, label: this.$t("production.Pr_Monday") },
        { value: 2, label: this.$t("production.Pr_Tuesday") },
        { value: 3, label: this.$t("production.Pr_Wednesday") },
        { value: 4, label: this.$t("production.Pr_Thursday") },
        { value: 5, label: this.$t("production.Pr_Friday") },
        { value: 6, label: this.$t("production.Pr_Saturday") },
        { value: 7, label: this.$t("production.Pr_Sunday") },
      ],
    };
  },
  props: {
    formData: {
      type: Object,
    },
  },
  methods: {
    submit() {
      let success = false;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          success = true;
          this.$emit("update:formData", this.form);
          return true;
        } else {
          success = false;
          console.log("error submit!!");
          return false;
        }
      });
      return success;
    },
    dialogConfirm() {
      const { datas } = this.tableObj.selectData;
      let EquipmentList = datas.map((item) => item.DeviceNo);
      this.form.EquipmentList = EquipmentList.toString();
      this.dialogVisible = false;
    },
    repeatTypeChange() {
      this.form.StartTime = "";
      this.form.EndTime = "";
    },
  },
  watch: {
    formData: {
      handler(newV, oldV) {
        if (oldV !== newV) {
          this.form = JSON.parse(JSON.stringify(this.formData));
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  components: {},
};
</script>

<style lang="scss" scoped></style>
