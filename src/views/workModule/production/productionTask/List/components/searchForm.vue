<!--
 * @Author: your name
 * @Date: 2022-01-14 11:19:16
 * @LastEditTime: 2023-02-03 09:50:56
 * @LastEditors: 勿忘 208760845@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\production\productionTask\List\components\searchForm.vue
-->
<template>
  <el-drawer v-bind="$attrs" v-on="$listeners">
    <div class="table-search-form">
      <div class="title">{{ $t("Generality.Ge_SearchForm") }}</div>
      <el-divider />
      <JvForm :formObj="formObj"> </JvForm>
      <div class="btn-footer">
        <!-- 重置 -->
        <el-button style="margin-right: 10px" @click="reset">{{
          $t("Generality.Ge_Reset")
        }}</el-button>
        <!-- 搜索 -->
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-right: 30px"
          @click="search"
          >{{ $t("Generality.Ge_Search") }}</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { enumToList, ProductionTaskState } from "@/enum/workModule";
import { itemList } from "@/api/basicApi/systemSettings/Item";
export default {
  name: "searchForm",
  data() {
    return {
      formObj: {},
    };
  },
  props: {
    searchFormData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.formObj = new Form({
      formSchema: [
        {
          // 关键字
          prop: "Keyword",
          cpn: "FormInput",
          label: this.$t("Generality.Ge_KeyWords"),
        },
        {
          // 类别
          prop: "BillType",
          cpn: "FormSelect",
          label: this.$t("Generality.Ge_Category"),
          options: {
            list: [
              {
                value: "Part",
                label: i18n.t("Generality.Ge_Part"),
              },
              {
                value: "Electrode",
                label: i18n.t("Generality.Ge_Electrode"),
              },
            ]
          }
        },
        {
          // 模具编号
          prop: "ToolingNo",
          label: this.$t("Generality.Ge_ToolingNo"),
          cpn: "AsyncSearch",
          api: itemList,
          apiOptions: {
            keyName: "ItemName",
            showValue: true,
            valueName: "ItemId",
            params: {
              ItemCategory: "Tooling",
            },
          },
        },
        {
          // 状态
          prop: "States",
          label: this.$t("Generality.Ge_State"),
          cpn: "FormSelect",
          type: "multiple",
          options: {
            list: enumToList(ProductionTaskState),
          },
        },
        {
          // 模具编号
          prop: "Remarks",
          cpn: "FormInput",
          label: this.$t("Generality.Ge_Remarks"),
        },
      ],
      baseColProps: {
        span: 24,
      },
    });
    this.formObj.form.ToolingNo = this.searchFormData.ToolingNo;
    this.formObj.form.Keyword = this.searchFormData.Keyword;
    this.formObj.form.Remarks = this.searchFormData.Remarks;
    this.formObj.form.States = this.searchFormData.States;
    this.formObj.form.BillType = this.searchFormData.BillType;
  },
  methods: {
    reset() {
      for (let key in this.formObj.form) {
        this.formObj.form[key] = "";
      }
      this.formObj.form.States = [];
      this.formObj.form.BillType = 'Part';
      this.$emit("search", this.formObj.form);
    },
    search() {
      this.$emit("search", this.formObj.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-search-form {
  position: relative;
  padding: 30px;
  height: 100%;
  .title {
    color: rgb(77, 77, 77);
    font-size: 20px;
  }
  .btn-footer {
    width: 100%;
    height: 75px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: end;
    border-top: 1px solid #ccc;
    padding-top: 20px;
  }
}
.table-search-form .el-form-item__label {
  font-size: 12px;
  // line-height: 20px;
}
</style>
