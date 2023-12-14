<!--
 * @Author: C.
 * @Date: 2021-09-17 09:11:19
 * @LastEditTime: 2023-07-11 17:07:17
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
        @change="getInputLabel"
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
        @change="getListLabel"
        v-bind="getElFormItemProps(cdata)"
        :multiple="cdata.type == 'multiple'"
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
        :type="cdata.type"
        size="mini"
        :id="getPrefixId"
        @blur="formBlur"
        @change="getInputLabel"
        v-bind="getElFormItemProps(cdata)"
      />
    </template>
    <!-- 日期选择 -->
    <template v-else-if="getCpn === 'TimeSelect'">
      <el-time-select
        v-model="getFormProp"
        size="mini"
        :id="getPrefixId"
        @blur="formBlur"
        @change="getInputLabel"
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
        v-model="getFormProp"
        size="mini"
        :loading="loading"
        @change="getListLabel"
        @focus="apiManager(cdata.api)"
        ref="ElSelect"
        v-if="cdata.apiOptions.tree"
        :id="getPrefixId"
        @visible-change="selcetBlur"
        v-bind="getElFormItemProps(cdata)"
        :automatic-dropdown="isEdit"
      >
        <el-option style="height: auto; padding: 0" :value="optionValue">
          <el-tree
            :data="treeSyncData"
            :expand-on-click-node="false"
            :props="getTreeBind(cdata.apiOptions.treeProps, cdata.prop)"
            @node-click="handleTreeClick"
            accordion
          >
          </el-tree>
        </el-option>
        <!-- <el-input v-model="getFormProp" v-show="false"></el-input> -->
      </el-select>

      <el-select
        v-model="getFormProp"
        size="mini"
        :loading="loading"
        @change="getListLabel"
        @focus="apiManager(cdata.api)"
        ref="ElSelect"
        v-else
        filterable
        :id="getPrefixId"
        @visible-change="selcetBlur"
        v-bind="getElFormItemProps(cdata)"
        :automatic-dropdown="isEdit"
        :multiple="cdata.type == 'multiple'"
      >
        <el-option
          :key="optionItem.value"
          v-for="optionItem in syncData"
          :label="optionItem.label"
          :value="optionItem.value"
        />
      </el-select>
    </template>
    <!-- FormRadio -->
    <template v-else-if="getCpn === 'FormRadio'">
      <el-radio-group
        v-model="getFormProp"
        v-bind="getElFormItemProps(cdata)"
        @change="getListLabel"
      >
        <template v-if="cdata.type == 'button'">
          <el-radio-button
            style="margin-top: 10px"
            v-for="optionItem in cdata.options.list"
            :key="optionItem.value"
            :label="optionItem.value"
            >{{ optionItem.label }}</el-radio-button
          >
        </template>
        <template v-else>
          <el-radio
            style="padding-top: 5px"
            v-for="optionItem in cdata.options.list"
            :key="optionItem.value"
            :label="optionItem.value"
            >{{ optionItem.label }}</el-radio
          >
        </template>
      </el-radio-group>
    </template>
    <!-- FormRadio -->
    <template v-else-if="getCpn === 'FormSingleCheckBox'">
      <el-checkbox v-model="getFormProp">{{
        cdata.options.CheckBoxlabel
      }}</el-checkbox>
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
        @change="getListLabel"
        :id="getPrefixId"
        v-bind="getElFormItemProps(cdata)"
        :remote-method="mixinPageApi"
        @visible-change="selcetBlur"
      >
        <el-option
          :key="optionItem.value"
          v-for="optionItem in syncData"
          :label="optionItem.label"
          :value="optionItem.value"
        >
          <span style="float: left">
            {{ optionItem.value }}
          </span>
          <!-- v-if="cdata.apiOptions.showValue" -->
          <span style="float: right; color: #8492a6; font-size: 13px">
            {{ optionItem.des }}

            <span
              v-if="optionItem.moreDescribe"
              style="color: cornflowerblue"
              >{{ `<${optionItem.moreDescribe}>` }}</span
            >
          </span>
        </el-option>
      </el-select>
    </template>
    <template v-else>
      {{ getFormProp }}
    </template>
  </span>
</template>

<script>
import { isArray } from "@/utils/validate";
import { debounce } from "@/jv_doc/utils/optimization/index";
export default {
  components: {},
  props: {
    form: {
      type: Object,
      default: () => {},
    },
    formObj: {
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

    isTreeEdit: {
      type: Boolean,
      default: false,
    },
    // 接口缓存
    syncDataMap: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      syncData: [],
      treeSyncData: [],
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
        // return field?.cpnProps ?? {};
        if (field.cpnProps) {
          return Object.assign(
            {
              "default-first-option": true,
              clearable: true,
            },
            field.cpnProps
          );
        } else {
          return {
            "default-first-option": true,
            clearable: true,
          };
        }
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
        // console.log(val, this.isEdit, 8989);
        if (this.isEdit) {
          this.form[this.cdata.prop].value = val;
          if (this.cdata.rowChange) {
            this.cdata.rowChange(val, this.form);
          }
        } else {
          console.log(this.treeSyncData, val, "lllll");
          // 获取当前选项
          const currentOption = this.treeSyncData.find(
            (item) => item[this.cdata.prop] === val
          );
          console.log(5);
          this?.formObj?.eventBus.$emit(this.cdata.prop, val, currentOption);
          this.form[this.cdata.prop] = val;
        }
      },
    },
    getPrefixId() {
      return this.prefix + "-form-item";
    },
    getCpn() {
      return this.isEdit || this.isTreeEdit
        ? this.cdata.formCpn
        : this.cdata.cpn;
    },
  },
  created() {
    // 复选框适配 初始值必须为数组
    if (this.cdata.cpn == "FormCheckBox") {
      if (!isArray(this.form[this.cdata.prop])) {
        this.form[this.cdata.prop] = [];
      }
    }
    if (this.syncDataMap?.[this.cdata.prop]) {
      this.syncData = this.syncDataMap[this.cdata.prop];
    }
    // 接口适配
    if (
      this.cdata.apiOptions &&
      this.cdata.apiOptions.immediate &&
      this.cdata.api
    ) {
      // 判断是否需要分页
      if (this.APINeedPagenation()) {
        this.mixinPageApi();
      } else {
        // this.prefix !== "edit" && this.apiManager(this.cdata.api);
        if (this.prefix !== "edit") {
          this.apiManager(this.cdata.api);
        }
      }
      // debounce(
      //   () => {

      //   },
      //   200,
      //   true
      // );
    }
  },
  methods: {
    mixinPageApi(e = "") {
      // console.log(e, 2225555);
      this.apiManager(this.cdata.api, {
        Keyword: e,
        PageSize: 30,
        CurrentPage: 1,
      });
    },

    // selectFocus(api) {
    //   if (this.cdata?.apiOptions?.clearCache) {
    //     this.syncData = [];
    //   }
    //   // 非分页接口数据不进行变动 有数据可以不再进行请求了(针对全量接口)
    //   if (this.syncData.length !== 0) return;
    //   this.loading = true;
    //   api(Object.assign({}, this.cdata.apiOptions.params ?? {})).then((res) => {
    //     this.syncData = this.handleSyncData(res.Items);
    //     setTimeout(() => {
    //       this.loading = false;
    //     });
    //   });
    // },
    apiManager(api, mixinParams = {}) {
      let DynamicParameters = {};
      if (this.cdata?.apiOptions?.clearCache) {
        this.syncData = [];
      }
      if (this.cdata?.apiOptions?.moreDynamicParameters) {
        this.cdata.apiOptions.moreDynamicParameters.forEach((item) => {
          DynamicParameters[item.keyName] = this.getFormPropValue(
            item.valueName
          );
        });
      }
      // 非分页接口数据不进行变动 有数据可以不再进行请求了(针对全量接口)
      if (
        this.syncData.length !== 0 &&
        !this.APINeedPagenation() &&
        !this.cdata?.apiOptions?.immediate
      )
        return;
      this.loading = true;
      api(
        Object.assign(
          {},
          mixinParams,
          DynamicParameters,
          this.keywordCompatible(mixinParams, DynamicParameters),
          this.cdata.apiOptions.params ?? {}
        )
      ).then((res) => {
        this.syncData = this.handleSyncData(res.Items);
        setTimeout(() => {
          this.loading = false;
        });
      });
    },
    APINeedPagenation() {
      // this.cdata.cpn == "FormCheckBox"
      return ["AsyncSearch"].includes(this.getCpn);
    },
    // keyword兼容 如果动态参数有keyword 初始默认为动态参数的keyword  ，输入时使用输入的keyword
    keywordCompatible(mixinParams, DynamicParameters) {
      let Keyword = "";
      if (
        DynamicParameters.hasOwnProperty("Keyword") &&
        mixinParams.Keyword == ""
      ) {
        Keyword = DynamicParameters.Keyword;
      } else {
        Keyword = mixinParams.Keyword;
      }
      return { Keyword };
    },
    handleTreeClick(e) {
      this.vSelect = e[this.keyName];
      this.getFormProp = e[this.valueName];
      this.$refs.ElSelect.blur();
    },
    change(e) {
      console.log(e);
    },
    getListLabel(e) {
      if (this.cdata?.apiOptions?.propChange) {
        let { valueName } = this.cdata.apiOptions;
        // treeSyncData
        let targetItem = {};
        if (this.syncData.length !== 0) {
          targetItem = this.syncData.find((item) => {
            return item[valueName] == e;
          });
        }
        // this.syncData
        this.cdata.apiOptions.propChange(e, this.form, targetItem);
      }

      let list = this.cdata.api ? this.syncData : this.cdata.options.list;
      if (list.length == 0) return;
      list.some((item) => {
        if (e == item.value) {
          this.cdata._label = item.label;
        }
        return e == item.value;
      });
    },
    getInputLabel(label) {
      // console.log(label);
      this.cdata._label = label;
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
    handleSyncData(data = []) {
      // console.log("handleSyncData");
      if (!data) return [];
      this.treeSyncData = data.slice(0);
      let { keyName, valueName, moreDescribeKey } = this.cdata.apiOptions;
      let descriptionOnly = this.cdata.apiOptions.descriptionOnly;
      // console.log(this.cdata.apiOptions,99999999);
      let syncData = data.map((item) => {
        return {
          ...item,
          value: item[valueName],
          label: descriptionOnly ? item[valueName] : item[keyName],
          des: item[keyName],
          moreDescribe: item?.[moreDescribeKey] ?? false,
        };
      });

      // [this.cdata.prop]: syncData,
      this.prefix == "edit" &&
        this.$emit("selectData", this.cdata.prop, syncData);

      return syncData;
    },
    selcetBlur(e = true) {
      if (!e) {
        this.formBlur();
      }
    },
    getFormPropValue(prop) {
      // console.log(this.form, 6655998877);
      return this.isEdit ? this.form[prop].value : this.form[prop];
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
