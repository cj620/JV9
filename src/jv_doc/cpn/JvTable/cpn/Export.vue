<!--
 * @Author: C.
 * @Date: 2021-09-23 09:37:31
 * @LastEditTime: 2022-03-08 14:07:14
 * @Description: file content
-->
<template>
  <JvDialog v-bind="$attrs" v-on="$listeners" @confirm="complete">
    <div style="padding: 0 30px" class="export-form-wrapper">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <!-- 文件名称 -->
        <el-form-item :label="$t('Generality.Ge_FileName')">
          <el-input v-model="form.fileName"></el-input>
        </el-form-item>
        <!-- options: ['xlsx', 'csv', 'txt'] -->
        <!-- 保存类型 -->
        <el-form-item :label="$t('Generality.Ge_SaveType')">
          <el-select v-model="form.saveType">
            <el-option
              v-for="item in saveTypeMap"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 选择数据 -->
        <el-form-item :label="$t('Generality.Ge_SelectData')">
          <el-select v-model="form.dataType">
            <el-option
              v-for="item in exportTypeMap"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 选择数据 -->
        <el-form-item :label="$t('Generality.Ge_SelectColumn')">
          <div class="fields-box">
            <div class="all-checkbox">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
                style="width: 100%"
                >{{ $t("Generality.Ge_SelectAll") }}</el-checkbox
              >
            </div>
            <div class="all-fields">
              <el-checkbox-group
                v-model="form.checkedFields"
                @change="handleCheckedChange"
              >
                <!-- ({{filterName(item.filter)}}) exportConfig-->
                <el-checkbox
                  v-for="item in tableProps.tableSchema"
                  :label="item"
                  :key="item.prop"
                  class="field-item"
                  :disabled="item.exportConfig && item.exportConfig.disabled"
                >
                  <div>
                    <span>
                      {{ item.label }}
                    </span>
                    <span v-if="filterName(item.filter)">
                      ({{ filterName(item.filter) }})
                    </span>
                  </div>
                </el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </JvDialog>
</template>

<script>
import { export2Excel } from "../utils/export2Excel";
import { saveTypeMap, filterMaps, exportTypeMap } from "../../../maps";
export default {
  props: {
    tableObj: {
      type: Object,
      default: () => {},
    },
    sourceType: {
      type: String,
      default: "default",
    },
  },
  data() {
    // saveType,
    return {
      saveTypeMap,
      exportTypeMap,
      form: {
        fileName: "",
        saveType: "xlsx",
        dataType: "",
        checkData: [],
        checkedFields: [],
        // 数据来源 区分编辑表格和普通表格
        sourceType: this.sourceType,
      },
      checkAll: false,
      isIndeterminate: false,
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.handleCheckAllChange(true);
    this.isIndeterminate = true;
  },
  methods: {
    // 初始化
    init() {
      let { title } = this.tableObj.props;
      this.form.title = title;
      this.form.fileName = title;
      this.form.dataType = "PAGE";
    },
    // 点击确认导入
    complete() {
      switch (this.form.dataType) {
        case "PAGE":
          // 将表格数据带入
          this.form.checkData = this.tableObj.tableData;
          this.export2Excel();
          break;
        case "SELECTED":
          if (this.tableObj.selectData.datas.length == 0) {
            this.$message({
              type: "warning",
              message: this.$t("setup.DataToBeExportedIsEmpty"),
            });
            return;
          } else {
            // 将表格选中的数据带入
            this.form.checkData = this.tableObj.selectData.datas;
            this.export2Excel();
          }
          break;
        case "ALL":
          // 将表格选中的数据带入
          //
          this.tableObj.api.getData
            .call(
              null,
              Object.assign({}, this.tableObj.formObj.form, {
                PageSize: this.tableObj.pager.Total,
                CurrentPage: 1,
              })
            )
            .then((res) => {
              this.form.checkData = res.Items;
              this.export2Excel();
            });
          break;
        case "TEMPLATE":
          // 将表格选中的数据带入
          this.form.checkData = [];
          this.export2Excel();
          break;

        default:
          break;
      }
    },
    // 处理全选
    handleCheckAllChange(val) {
      this.form.checkedFields = val ? this.checkBoxList : [];
      this.isIndeterminate = false;
    },
    // 处理选择变更
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.tableProps.tableSchema.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.tableProps.tableSchema.length;
    },
    // 抛出关闭事件
    close() {
      this.$emit("complete");
    },
    // 导出功能
    export2Excel() {
      export2Excel(this.form, this.close);
    },
  },
  computed: {
    // 表格props
    tableProps() {
      return this.tableObj.props;
    },
    // 过滤器名称
    filterName() {
      return (type) => {
        if (type == "default") return "";
        return filterMaps[type].name;
      };
    },
    checkBoxList() {
      return this.tableProps.tableSchema.filter((item) => {
        return !item?.exportConfig?.disabled;
      });
      // return this.tableProps.tableSchema;
    },
  },
};
</script>

<style lang="scss" scoped>
.export-form-wrapper {
  .el-select {
    width: 100%;
  }
  .fields-box {
    width: 100%;
    .all-checkbox {
      width: 100%;
      background-color: #f5f7fa;
      padding-left: 10px;
      border: 1px solid rgb(230, 230, 230);
      border-bottom: none;
    }
    .all-fields {
      width: 100%;
      height: 200px;
      overflow: auto;
      border: 1px solid rgb(230, 230, 230);

      .field-item {
        padding-left: 10px;
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
