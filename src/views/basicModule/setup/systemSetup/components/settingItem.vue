<!--
 * @Author: H.
 * @Date: 2021-11-26 09:08:40
 * @LastEditTime: 2022-08-18 17:12:44
 * @Description:
-->
<template>
  <div class="setting-item">
    <span class="setting-item-title">{{ data && data[0].Category }}</span>
    <div  class="setting-item-content">
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




      <object-array-form
        :title="dialogTitle"
        :visible.sync="ObjectArrayDialogVisible"
        v-if="ObjectArrayDialogVisible"
        width="70%"
        ref="objectArrayForm"
        :ConfigKey="ConfigKey"
        :formData="formObj"
        @ObjectArrayConfirm="ObjectArrayConfirm"
      >
      </object-array-form>

    <array-object-table
      :title="dialogTitle"
      :visible.sync="ArrayObjectDialogVisible"
      v-if="ArrayObjectDialogVisible"
      width="70%"
      ref="objectArrayForm"
      :formData="formObj"
      @ArrayObjectConfirm="ArrayObjectConfirm"
    >
    </array-object-table>

    <select-form
      :title="dialogTitle"
      :visible.sync="selectFormDialogVisible"
      v-if="selectFormDialogVisible"
      width="70%"
      ref="objectArrayForm"
      :ConfigKey="ConfigKey"
      :formData="formObj"
      @StringSelectConfirm="StringSelectConfirm"
    >
    </select-form>
    <string-array-object
      :title="dialogTitle"
      :visible.sync="stringArrayObjectDialogVisible"
      v-if="stringArrayObjectDialogVisible"
      width="70%"
      ref="stringArrayObject"
      :ConfigKey="ConfigKey"
      :formData="formObj"
      @StringArrayObjectConfirm="StringArrayObjectConfirm"
    >

    </string-array-object>
  </div>
</template>

<script>
import { formSchema } from "./itemFormConfig";
import { Form } from "@/jv_doc/class/form";
import SettingForm from "./settingForm.vue";
import objectArrayForm from "./objectArrayForm.vue";
import selectForm from "./selectForm.vue";
import arrayObjectTable from "./arrayObjectTable.vue";
import stringArrayObject from "./stringArrayObject.vue";

export default {
  data() {
    return {
      ConfigList: [],
      dialogTitle: "",
      formObj: {},
      DialogVisible: false,
      ObjectArrayDialogVisible: false,
      ArrayObjectDialogVisible: false,
      selectFormDialogVisible: false,
      stringArrayObjectDialogVisible: false,
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
        item.ConfigValueType === "StringArray" ||
        item.ConfigValueType === "ArrayObject1" ||
        item.ConfigValueType === "StringSelect" ||
        item.ConfigValueType === "StringArrayObject" ||
        item.ConfigValueType === "ObjectArray"
      );
    },
    changeConfigValue(item) {
      this.$emit("update:config", {
        ConfigKey: item.ConfigKey,
        ConfigValue: item.ConfigValue,
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
          this.DialogVisible = true;
        } else {
          // input框类型或者单选下拉框类型
          this.formObj.ConfigValue = JSON.parse(item.ConfigValue).toString();
          this.DialogVisible = true;
        }
      }else if(item.ConfigValueType==='ObjectArray'){
        console.log(item)
        this.ObjectArrayDialogVisible = true
        this.formObj=item

      }else if(item.ConfigValueType==='ArrayObject1'){
        this.ArrayObjectDialogVisible= true
        this.formObj=item
      }else if(item.ConfigValueType==='StringSelect'){
        this.selectFormDialogVisible= true
        this.formObj=item
      }else if(item.ConfigValueType==='StringArrayObject'){
        this.stringArrayObjectDialogVisible= true
        this.formObj=item
      }else {
        this.formObj.ConfigValue = item.ConfigValue;
        this.DialogVisible = true;
      }
      this.curConfig = item;

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
    ObjectArrayConfirm(e){
      console.log(e,9898,this.curConfig);
      this.ObjectArrayDialogVisible= false
      this._Confirm(e)
    },
    ArrayObjectConfirm(e){
      this.ArrayObjectDialogVisible= false
      this._Confirm(e)
    },
    StringSelectConfirm(e){
      this.selectFormDialogVisible= false
      this._Confirm(e)
    },
    StringArrayObjectConfirm(e){
      this.stringArrayObjectDialogVisible= false
      this._Confirm(e)
    },
    _Confirm(e){
      this.changeConfigValue({
        ConfigKey: this.curConfig.ConfigKey,
        ConfigValue: e,
      });
    }
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
    objectArrayForm,
    arrayObjectTable,
    selectForm,
    stringArrayObject,
  },
};
</script>

<style lang="scss" scoped>
.setting-item {
  background: #fff;
  height: calc(100vh - 125px);
  padding: 16px 16px 23px 16px ;

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
  .setting-item-content{
    height: 100%;
      overflow:auto;

  }
</style>
