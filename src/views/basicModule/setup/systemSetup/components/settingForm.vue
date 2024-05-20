<!--
 * @Author: H.
 * @Date: 2021-12-06 17:02:24
 * @LastEditTime: 2022-08-17 10:05:28
 * @Description:
-->

<template>
  <div>
    <el-form
      class="setting-form"
      ref="form"
      :model="form"
      label-width="60px"
      style="width: 100%"
      label-position="top"
    >
      <el-form-item :label="$t('Generality.Ge_ConfigurationValue')">
        <template v-if="isShowSelect">
          <el-select
            style="width: 100%"
            v-model="form.ConfigValue"
            :multiple="isMultiple"
            filterable
            :placeholder="$t('Generality.Ge_PleaseSelect')"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item[label]"
              :value="item[value]"
            >
            </el-option>
          </el-select>
        </template>
        <template v-else>
          <el-input :type="inputType" v-model="form.ConfigValue"></el-input>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAllProcess, getAllResource } from "@/api/workApi/production/baseData";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getAllUnit } from "@/api/basicApi/systemSettings/unit";
import { department_tile_get_all } from "@/api/basicApi/systemSettings/department";

export default {
  created() {
    this.getData();
    if (this.formData.ConfigValue) {
      this.form = JSON.parse(JSON.stringify(this.formData));
    }
    if (this.ConfigKey === "StandardEmployeeWorkTime" || "SuggestOverallOutsourcingPercentage") {
      this.inputType = "number";
    } else if (this.ConfigKey === "ProgrammingDefaultResponsiblePerson") {
      this.form = JSON.parse(JSON.stringify(this.formData));
      this.form.ConfigValue = JSON.parse(this.form.ConfigValue)[0];
    }
  },
  data() {
    return {
      form: {
        ConfigValue: "",
      },
      options: [],
      label: "Process",
      value: "Process",
      isMultiple: true,
      inputType: "text",
      ConfigItems: {
        UserStation: { api: getAllProcess, value: "Process", isMultiple: true },
        AssyUsers: {
          api: getAllUserData,
          value: "UserName",
          isMultiple: true,
        },
        ProgramUsers: {
          api: getAllUserData,
          value: "UserName",
          isMultiple: true,
        },
        DesignUsers: {
          api: getAllUserData,
          value: "UserName",
          isMultiple: true,
        },
        DefaultProductionDepartment: {
          api: department_tile_get_all,
          value: "Department",
          isMultiple: true,
        },
        MeanwhileDownProcessConfig: {
          api: getAllProcess,
          value: "Process",
          isMultiple: true,
        },
        ProhibitSkipStationProcesses: {
          api: getAllProcess,
          value: "Process",
          isMultiple: true,
        },
        DashboardResourcesConfiguration: {
          api: getAllResource,
          value: "ResourceId",
          isMultiple: true,
        },
        BomDefaultUnit: {
          api: getAllUnit,
          value: "Unit",
          isMultiple: false,
        },
        ProgrammingDefaultResponsiblePerson: {
          api: getAllUserData,
          value: "UserName",
          isMultiple: false,
        }
      },
    };
  },
  props: {
    ConfigKey: {
      type: String,
      default: "",
    },
    formData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getData() {
      if (
        [
          "UserStation",
          "AssyUsers",
          "ProgramUsers",
          "DesignUsers",
          "DefaultProductionDepartment",
          "MeanwhileDownProcessConfig",
          "ProhibitSkipStationProcesses",
          "DashboardResourcesConfiguration",
          "BomDefaultUnit",
          "ProgrammingDefaultResponsiblePerson",
        ].includes(this.ConfigKey)
      ) {
        this.isMultiple = this.ConfigItems[this.ConfigKey].isMultiple;
        this.ConfigItems[this.ConfigKey].api().then((res) => {
          this.options = res.Items;
          this.label = this.ConfigItems[this.ConfigKey].value;
          this.value = this.ConfigItems[this.ConfigKey].value;
        });
      }
    },
    updateValue() {
      this.$emit("upadte:form", this.form);
    },
  },
  computed: {
    isShowSelect() {
      // 是否展示下拉选择框
      return [
        "UserStation",
        "AssyUsers",
        "ProgramUsers",
        "DesignUsers",
        "DefaultProductionDepartment",
        "MeanwhileDownProcessConfig",
        "ProhibitSkipStationProcesses",
        "DashboardResourcesConfiguration",
        "BomDefaultUnit",
        "ProgrammingDefaultResponsiblePerson",
      ].includes(this.ConfigKey);
    },
  },
  watch: {
    "form.ConfigValue": {
      handler(newV) {
        if (
          this.ConfigKey === "StandardEmployeeWorkTime" &&
          (newV <= 0 || newV > 24)
        ) {
          if (newV < 0) {
            this.form.ConfigValue = 1;
          } else if (newV > 24) {
            this.form.ConfigValue = 24;
          }
          return this.$message.warning(this.$t("Generality.Ge_TimeRange"));
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
