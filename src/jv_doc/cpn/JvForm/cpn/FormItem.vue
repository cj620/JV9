<!--
 * @Author: C.
 * @Date: 2021-09-17 09:11:19
 * @LastEditTime: 2022-03-22 17:32:23
 * @Description: file content
-->
<template>
  <span>
    <!-- 输入框 -->
    <template v-if="getCpn === 'FormInput'">
      <el-input
        v-model="getFormProp"
        v-bind="
          Object.assign({}, getBasicInputBind(cdata), getElFormItemProps(cdata))
        "
        :id="getPrefixId"
        @blur="formBlur"
      >
        <template
          slot="prepend"
          v-if="cdata.options && cdata.options.prefixSlot"
          >{{ cdata.options.prefixSlot.label }}</template
        >
        <template
          slot="append"
          v-if="cdata.options && cdata.options.suffixSlot"
          >{{ cdata.options.suffixSlot.label }}</template
        >
      </el-input>
    </template>
    <!-- 静态下拉 -->
    <template v-else-if="getCpn === 'FormSelect'">
      <el-select
        v-model="getFormProp"
        size="mini"
        :id="getPrefixId"
        @visible-change="selcetBlur"
        :automatic-dropdown="isEdit"
        v-bind="getElFormItemProps(cdata)"
      >
        <template v-for="optionItem in cdata.options.list">
          <el-option
            :key="optionItem.value"
            :label="optionItem.label"
            :value="optionItem.value"
          />
        </template>
      </el-select>
    </template>
    <!-- 自定义下拉 -->
    <template v-else-if="getCpn === 'customFormSelect'">
      <el-select
        v-model="getFormProp"
        size="mini"
        :id="getPrefixId"
        @visible-change="selcetBlur"
        :automatic-dropdown="isEdit"
        v-bind="getElFormItemProps(cdata)"
        multiple
      >
        <template v-for="optionItem in form.customData.value">
          <el-option
            :key="optionItem.value"
            :label="optionItem.label"
            :value="optionItem.value"
          />
        </template>
      </el-select>
    </template>
    <!-- 日期选择 -->
    <template v-else-if="getCpn === 'SingleTime'">
      <el-date-picker
        v-model="getFormProp"
        value-format="yyyy-MM-dd"
        type="date"
        size="mini"
        :id="getPrefixId"
        @blur="formBlur"
        v-bind="getElFormItemProps(cdata)"
      />
    </template>
    <!-- 日期时间选择 -->
    <template v-else-if="getCpn === 'SingleDateTime'">
      <el-date-picker
        v-model="getFormProp"
        type="datetime"
        size="mini"
        format="yyyy-MM-dd HH:mm"
        :id="getPrefixId"
        @blur="formBlur"
        v-bind="getElFormItemProps(cdata)"
      />
    </template>
    <!-- 日期范围 -->
    <template v-else-if="getCpn === 'DateRange'">
      <el-date-picker
        v-model="getFormProp"
        size="mini"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="~"
        :start-placeholder="$t('Generality.Ge_StartDate')"
        :end-placeholder="$t('Generality.Ge_EndDate')"
        :id="getPrefixId"
        @blur="formBlur"
        v-bind="getElFormItemProps(cdata)"
      />
    </template>

    <template v-else-if="getCpn === 'TimePicker'">
      <el-time-picker
        size="mini"
        :id="getPrefixId"
        v-model="getFormProp"
        range-separator="~"
        :start-placeholder="$t('Generality.Ge_StartDate')"
        :end-placeholder="$t('Generality.Ge_EndDate')"
        @blur="formBlur"
        v-bind="getElFormItemProps(cdata)"
      >
      </el-time-picker>
    </template>
    <!-- 异步下拉选择 -->
    <template v-else-if="getCpn === 'SyncSelect'">
      <!-- 树形 -->
      <el-select
        v-model="vSelect"
        size="mini"
        :loading="loading"
        @change="change"
        @focus="selectFocus(cdata.api)"
        ref="ElSelect"
        v-if="cdata.apiOptions.tree"
        :id="getPrefixId"
        @visible-change="selcetBlur"
        v-bind="getElFormItemProps(cdata)"
        :automatic-dropdown="isEdit"
      >
        <el-option style="height: auto; padding: 0" :value="optionValue">
          <el-tree
            :data="syncData"
            :expand-on-click-node="false"
            :props="getTreeBind(cdata.apiOptions.treeProps, cdata.prop)"
            @node-click="handleTreeClick"
            accordion
          >
          </el-tree>
        </el-option>
        <el-input v-model="getFormProp" v-show="false"></el-input>
      </el-select>

      <el-select
        v-model="getFormProp"
        size="mini"
        :loading="loading"
        @change="change"
        @focus="selectFocus(cdata.api)"
        ref="ElSelect"
        :multiple="cdata.type == 'multiple'"
        v-else
        :id="getPrefixId"
        @visible-change="selcetBlur"
        v-bind="getElFormItemProps(cdata)"
        :automatic-dropdown="isEdit"
      >
        <el-option
          :key="optionItem.value"
          v-for="optionItem in syncData"
          :label="optionItem[cdata.apiOptions.keyName]"
          :value="optionItem[cdata.apiOptions.valueName]"
        />
      </el-select>
    </template>
    <!-- FormRadio -->
    <template v-else-if="getCpn === 'FormRadio'">
      <el-radio-group v-model="getFormProp" v-bind="getElFormItemProps(cdata)">
        <template v-if="cdata.type == 'button'">
          <el-radio-button
            v-for="optionItem in cdata.options.list"
            :key="optionItem.value"
            :label="optionItem.value"
            >{{ optionItem.label }}</el-radio-button
          >
        </template>
        <template v-else>
          <el-radio
            v-for="optionItem in cdata.options.list"
            :key="optionItem.value"
            :label="optionItem.value"
            >{{ optionItem.label }}</el-radio
          >
        </template>
      </el-radio-group>
    </template>
    <!-- FormCheckBox -->
    <template v-else-if="getCpn === 'FormCheckBox'">
      <el-checkbox-group
        v-model="getFormProp"
        @change="change"
        v-bind="getElFormItemProps(cdata)"
      >
        <template v-if="cdata.type == 'button'">
          <el-checkbox-button
            v-for="optionItem in cdata.options.list"
            :key="optionItem.value"
            :label="optionItem.value"
          >
            {{ optionItem.label }}
          </el-checkbox-button>
        </template>
        <template v-else>
          <el-checkbox
            v-for="optionItem in cdata.options.list"
            :key="optionItem.value"
            :label="optionItem.value"
          >
            {{ optionItem.label }}
          </el-checkbox>
        </template>
      </el-checkbox-group>
    </template>

    <template v-else-if="getCpn === 'Slider'">
      <div style="padding: 0 10px">
        <el-slider
          v-model="getFormProp"
          v-bind="getElFormItemProps(cdata)"
        ></el-slider>
      </div>
    </template>
    <!-- 远程搜索下拉 -->
    <template v-else-if="getCpn === 'AsyncSearch'">
      <el-select
        v-model="getFormProp"
        size="mini"
        :loading="loading"
        filterable
        remote
        reserve-keyword
        :clearable="true"
        v-bind="getElFormItemProps(cdata)"
        :remote-method="remoteMethod"
      >
        <el-option
          :key="optionItem.value"
          v-for="optionItem in syncData"
          :label="optionItem[cdata.apiOptions.keyName]"
          :value="optionItem[cdata.apiOptions.valueName]"
        >
          <span style="float: left">{{
            optionItem[cdata.apiOptions.keyName]
          }}</span>
          <span
            style="float: right; color: #8492a6; font-size: 13px"
            v-if="cdata.apiOptions.showValue"
            >{{ optionItem[cdata.apiOptions.valueName] }}</span
          >
        </el-option>
      </el-select>
    </template>
  </span>
</template>

<script>
import { isArray } from "@/utils/validate";
export default {
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    cdata: {
      type: Object,
      default: () => {},
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    prefix: {
      type: String,
      default: "normal",
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      syncData: [],
      loading: false,
      optionValue: [],
      valueName: "",
      keyName: "",
      vSelect: "",
      propName: "",
    };
  },
  computed: {
    getTreeBind() {
      return (props, propName) => {
        this.valueName = props.valueName;
        this.keyName = props.keyName;
        this.propName = propName;
        return {
          children: props.children,
          label: props.keyName,
        };
      };
    },
    getBasicInputBind() {
      return (field) => {
        return {
          type: field.type,
          size: "mini",
          prefixIcon: field.options?.prefixIcon ?? "",
          suffixIcon: field.options?.suffixIcon ?? "",
          showWordLimit: field.options?.showWordLimit ?? false,
          maxlength: field.options?.maxlength ?? "",
        };
      };
    },
    getElFormItemProps() {
      return (field) => {
        return field?.cpnProps ?? {};
      };
    },
    getFormProp: {
      get() {
        // isEdit
        return this.isEdit
          ? this.form[this.cdata.prop].value
          : this.form[this.cdata.prop];
      },
      set(val) {
        if (this.isEdit) {
          this.form[this.cdata.prop].value = val;
        } else {
          this.form[this.cdata.prop] = val;
        }
      },
    },
    getPrefixId() {
      return this.prefix + "-form-item";
    },
    getCpn() {
      return this.isEdit ? this.cdata.formCpn : this.cdata.cpn;
    },
  },
  created() {
    // console.log(this.form, this.cdata, this.showLabel, this.prefix, this.isEdit,'编辑')
    // 复选框适配 初始值必须为数组
    if (this.cdata.cpn == "FormCheckBox") {
      if (!isArray(this.form[this.cdata.prop])) {
        this.form[this.cdata.prop] = [];
      }
    }
    // 接口适配
    if (
      this.cdata.apiOptions &&
      this.cdata.apiOptions.immediate &&
      this.cdata.api
    ) {
      this.selectFocus(this.cdata.api);
    }
  },
  methods: {
    remoteMethod(e) {
      this.cdata
        .api(
          Object.assign(
            {
              Keyword: e,
              PageSize: 10,
              CurrentPage: 1,
            },
            this.cdata.apiOptions.params ?? {}
          )
        )
        .then((res) => {
          this.syncData = res.Items;
          this.loading = false;
        });
    },
    selectFocus(api) {
      if (this.cdata?.apiOptions?.clearCache) {
        this.syncData = [];
      }
      // console.log(api, 564787498);
      if (this.syncData.length !== 0) return;
      this.loading = true;
      // Object.assign({}, this.cdata.apiOptions.params ?? {})
      api(Object.assign({}, this.cdata.apiOptions.params ?? {})).then((res) => {
        this.syncData = res.Items;
        setTimeout(() => {
          this.loading = false;
        });
      });
    },
    handleTreeClick(e) {
      this.vSelect = e[this.keyName];
      this.form[this.propName] = e[this.valueName];
      this.$refs.ElSelect.blur();
    },
    change(e) {
      console.log(e);
    },
    checkChange(e) {
      console.log(e, "checkbox");
    },
    formBlur() {
      this.$emit("formBlur");
    },
    formFocus(e) {
      this.$emit("formFocus", e);
    },
    selcetBlur(e = true) {
      if (!e) {
        this.formBlur();
      }
    },
  },
  watch: {
    form: {
      handler(n, o) {
        // 如果真实的字段为空 将vSelect置空
        if (!this.form[this.cdata.prop]) {
          this.vSelect = "";
        }
        //树形下拉兼容 用于直接使用对象修改form属性
        if (this.cdata.cpn == "SyncSelect" && this.cdata.apiOptions.tree) {
          this.vSelect = this.form[this.cdata.prop];
        }
      },
      deep: true,
    },
  },
};
</script>

<style></style>
