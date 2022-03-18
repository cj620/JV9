<!--
 * @Author: H.
 * @Date: 2021-11-26 09:08:40
 * @LastEditTime: 2022-01-25 10:28:41
 * @Description:
-->
<template>
  <div class="setting-item">
    <span class="setting-item-title">{{ data && data[0].Category }}</span>
    <div
      v-for="item in configData"
      :key="item.ConfigKey"
      class="setting-item-config"
    >
      <div class="setting-item-config-left">
        <span class="setting-item-config-configName">{{
          item.ConfigName
        }}</span>
        <span class="setting-item-config-description">{{
          item.Description
        }}</span>
      </div>

      <div style="padding-right: 30px">
        <el-button
          v-if="isDiaolog(item)"
          type="text"
          @click="openDialog(item)"
          >{{ $t("menu.Se_Setup") }}</el-button
        >
        <el-switch
          v-else
          v-model="item.ConfigValue"
          active-value="true"
          inactive-value="false"
          @change="changeConfigValue(item)"
        >
        </el-switch>
      </div>
    </div>
    <JvDialog
      :title="dialogTitle"
      :visible.sync="DialogVisible"
      v-if="DialogVisible"
      width="30%"
      @confirm="confirm"
    >
      <!-- <JvForm :formObj="formObj"> </JvForm> -->
      <setting-form
        ref="settingForm"
        @upadte:form="formObj = $event"
        :ConfigKey="ConfigKey"
        :formData="formObj"
      />
    </JvDialog>
  </div>
</template>

<script>
import { formSchema } from "./itemFormConfig";
import { Form } from "@/jv_doc/class/form";
import SettingForm from "./settingForm.vue";

export default {
  data() {
    return {
      ConfigList: [],
      dialogTitle: "",
      formObj: {},
      DialogVisible: false,
      curConfig: "",
      ConfigKey: "",
    };
  },
  props: {
    configData: {
      type: Array,
      require: true,
    },
  },

  methods: {
    isDiaolog(item) {
      return (
        item.ConfigValueType === "String" ||
        item.ConfigValueType === "Number" ||
        item.ConfigValueType === "StringArray" ||
        item.ConfigValueType === "NumberArray"
      );
    },
    changeConfigValue(item) {
      this.$emit("update:config", {
        configKey: item.ConfigKey,
        configValue: item.ConfigValue,
      });
    },
    openDialog(item) {
      this.dialogTitle = item.ConfigName;
      this.ConfigKey = item.ConfigKey;
      // 数组类型
      if (["StringArray", "NumberArray"].includes(item.ConfigValueType)) {
        // 多选下拉框类型
        if (
          ["UserStation", "ProgramUsers", "DesignUsers"].includes(
            item.ConfigKey
          )
        ) {
          this.formObj.ConfigValue = JSON.parse(item.ConfigValue);
        } else {
          // input框类型或者单选下拉框类型
          this.formObj.ConfigValue = JSON.parse(item.ConfigValue).toString();
        }
      } else {
        this.formObj.ConfigValue = item.ConfigValue;
      }
      this.curConfig = item;
      this.DialogVisible = true;
    },
    confirm() {
      this.$refs.settingForm.updateValue();
      const configKey = this.curConfig.ConfigKey;
      this.DialogVisible = false;
      this.changeConfigValue({
        ConfigKey: configKey,
        ConfigValue: this.ConfigValue,
      });
    },
  },
  computed: {
    data() {
      if (this.configData && this.configData.length > 0) {
        return this.configData;
      }
    },
    ConfigValue() {
      const configType = this.curConfig.ConfigValueType;
      return configType === "StringArray" || configType === "NumberArray"
        ? JSON.stringify(
            ["UserStation", "DesignUsers", "ProgramUsers"].includes(
              this.curConfig.ConfigKey
            )
              ? this.formObj.ConfigValue
              : this.formObj.ConfigValue.split(",")
          )
        : this.formObj.ConfigValue;
    },
  },
  components: {
    SettingForm,
  },
};
</script>

<style lang="scss" scoped>
.setting-item {
  background: #fff;
  height: calc(100vh - 125px);
  padding: 16px;
  &-title {
    font-size: 20px;
    font-weight: 500;
    display: inline-block;
  }
  &-config {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);

    &-left {
      display: flex;
      flex-direction: column;
    }
    &-configName {
      color: rgba(0, 0, 0, 0.65);
      font-weight: 500;
      margin-bottom: 6px;
    }
    &-description {
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>
