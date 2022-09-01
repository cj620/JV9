<!--
 * @Author: your name
 * @Date: 2021-10-27 14:55:20
 * @LastEditTime: 2022-09-01 10:28:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \V9_Dev\src\jv_doc\cpn\JvEditTable\index.vue
-->
<template>
  <div class="jv-table-style">
    <!-- 表格操作栏 -->
    <TableHeader
      :tableObj="tableObj"
      @importConfirm="importConfirm"
      exportSourceType="editTable"
      v-if="tableObj.props.tableHeaderShow"
    >
      <div slot="subTitleBar">
        <slot name="titleBar" />
      </div>
      <div slot="subSetingBar">
        <slot name="setingBar" />
      </div>
      <slot name="btn-list" />
    </TableHeader>
    <div class="table-wrapper" v-clickOutside="handleClickOutside">
      <el-Table
        :id="tableObj.id"
        ref="multipleEditTable"
        v-bind="{ ...$attrs, ...getBindProp }"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
        v-on="$listeners"
        @cell-click="cellClickThrottle"
        @row-click="onRowClick"
        @cell-dblclick="onCellDblclick"
        :cell-class-name="TableCellClassName"
        @header-dragend="headerDragend"
        :summary-method="tableObj.getTableSummaries"
      >
        <!-- @cell-click="cellClick" -->
        <!-- 序号 -->
        <el-table-column
          v-if="tableProps.sortCol"
          fixed
          align="center"
          type="index"
          width="50"
        />
        <!-- 开启选择框 -->
        <el-Table-column
          v-if="tableProps.chooseCol"
          fixed
          type="selection"
          width="50"
          align="center"
        />
        <template v-for="item in tableObj.props.tableSchema">
          <template v-if="!item.hidden">
            <el-table-column
              :key="item.prop"
              v-bind="{ ...propsAfterHandle(item) }"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <slot
                  :name="item.prop"
                  :record="dataFilter(item.filter, scope.row[item.prop].value)"
                  :row_index="scope.$index"
                  :row="scope.row"
                  v-if="item.custom"
                  :cdata="item"
                  :formBlur="formBlur"
                  :scope="scope"
                ></slot>
                <span v-else>
                  <FormItem
                    :cdata="item"
                    :form="scope.row"
                    v-if="scope.row[item.prop].edit"
                    :isEdit="true"
                    prefix="edit"
                    @formBlur="formBlur"
                  ></FormItem>
                  <span v-else style="line-height: 28px">{{
                    item.customFilter
                      ? item.customFilter(scope.row[item.prop].value, scope.row)
                      : dataFilter(item.filter, scope.row[item.prop].value)
                  }}</span>
                </span>
              </template>
              <!-- 表头 -->
              <template slot="header">
                <span v-if="isRequired(item)" class="col-required">*</span>
                {{ item.label }}
                <el-tooltip
                  effect="dark"
                  v-if="colMsg(item)"
                  :content="colMsg(item)"
                  placement="top-start"
                >
                  <span class="el-icon-s-opportunity help-msg"></span>
                </el-tooltip>

                <HeaderPopver
                  v-if="item.editConfig && item.editConfig.colInit"
                  @confirm="tableObj.setDefaultColData"
                  @reset="ss"
                  :cdata="item"
                >
                </HeaderPopver>
              </template>
            </el-table-column>
          </template>
        </template>
        <el-table-column
          :label="$t('Generality.Ge_Operate')"
          fixed="right"
          :width="tableObj.props.operationWidth"
          align="center"
          v-if="tableObj.props.operationCol"
        >
          <template slot-scope="scope">
            <slot name="operation" :row="scope.row" :row_index="scope.$index" />
          </template>
        </el-table-column>
      </el-Table>
    </div>
  </div>
</template>

<script>
import { keyBoard } from "./utils/keyBoard";
import { handleProps } from "../JvTable/utils/handleProps";
import { getCowIndex } from "./utils/handleFunc";
import CellDom from "../../class/dom/CellDom";
import { throttle } from "@/jv_doc/utils/optimization";
import { excel2Edit } from "./utils/handleFunc";
import HeaderPopver from "./cpns/HeaderPopver";
import FormItem from "../JvForm/cpn/FormItem.vue";
import { filterMaps } from "../../maps";
import { debounce } from "@/jv_doc/utils/optimization";
import { clickOutside } from "~/utils/common";
import { setTableSchema } from "../../class/utils/editTableHelp";
export default {
  name: "JvEditTable",
  components: {
    FormItem,
    HeaderPopver,
  },
  props: {
    tableObj: {
      type: Object,
    },
  },
  data() {
    return {
      dom_obj: new CellDom(),
      base_col_index: 1,
    };
  },
  mounted() {
    // this.keyupSubmit();
    this.tableObj.tableRef = this.$refs.multipleEditTable;
  },
  beforeDestroy() {
    this.cancelKeyUp();
    this.tableObj.tableRef = null;
  },
  activated() {
    this.tableObj.doLayout();
  },
  deactivated() {
    this.dom_obj.active = false;
  },
  computed: {
    tableProps() {
      return this.tableObj.props;
    },
    getBindProp() {
      return Object.assign(this.tableProps, {
        data: this.tableObj.tableData,
        // rowKey: () => uuid(7),
      });
    },
    propsAfterHandle() {
      return handleProps;
    },
    dataFilter() {
      return (type = "default", data) => {
        return filterMaps[type].func(data);
      };
    },
    isRequired() {
      return (config) => {
        return config?.editConfig?.rules?.required;
      };
    },
    colMsg() {
      return (config) => {
        return config?.editConfig?.rules?.message;
      };
    },
  },
  methods: {
    throttle,
    ss() {},
    handleClickOutside(e) {
      this.changeEditState(false);
    },
    cellClickThrottle(...arg) {
      throttle(this.cellClick(...arg), 500);
    },
    cellClick(row, column, cell, event) {
      if (!column.property) return;
      if (this.dom_obj?.isFocus) return;

      // 获取当前的父节点
      let ali = cell.parentNode.children;
      // console.log(getCowIndex(ali[0].classList[0]), 11111111111);
      // 获取基础index
      this.base_col_index = getCowIndex(ali[0].classList[0]);
      // 设置当前的col索引
      this.dom_obj.col = getCowIndex(column.id) - this.base_col_index;
      // 提取不可编辑列表
      this.dom_obj.disabledArr = this.tableProps.row_disabled_map;
      // 如果当前列被禁用 则不聚焦
      if (this.dom_obj.disabledArr.includes(this.dom_obj.col)) return;
      this.dom_obj.offSet = this.tableProps.offSet;
      // 提取props列表
      this.dom_obj.propsArr = this.tableProps.row_map;
      // 收集数据长度
      this.dom_obj.dataCount = this.tableObj.tableData.length;
      // 收集数据的显示的数据
      this.dom_obj.tableData = this.tableObj.tableData;
      // this.dom_obj.editBlur();
      // 当前节点聚焦
      this.dom_obj.tableId = this.tableObj.id;
      console.log(this.dom_obj.col, this.dom_obj.row, this.dom_obj);
      this.dom_obj.editFocus();
      this.changeEditState(true);
    },
    onCellDblclick(row, column, cell, event) {
      if (!column.property) return;
      if (this.dom_obj?.isFocus) return;
      if (this.dom_obj.disabledArr.includes(this.dom_obj.col)) return;
      this.dom_obj.editFocus();
    },
    changeEditState(bol) {
      // console.log(this.tableObj.id, bol);
      if (bol) {
        this.keyupSubmit();
      }
      this.dom_obj.active = bol;
    },
    keyupSubmit() {
      // keyBoard
      document.onkeydown = (e) => {
        keyBoard(e, this);
      };
    },
    cancelKeyUp() {
      // document.onkeydown = undefined;
    },
    tableRowClassName({ row, rowIndex }) {
      row.row_index = rowIndex;
    },
    onRowClick(row) {
      this.dom_obj.row = row.row_index;
    },
    handleSelectionChange(val) {
      Object.assign(this.tableObj.selectData, {
        keys: [],
        datas: val,
      });
      this.$emit("selectionChange", val);
    },
    TableCellClassName(a) {
      if (
        a.column.property &&
        this.tableProps.row_edit_props_map.includes(a.column.property)
      ) {
        return "jv-edit-table-cell";
      }
    },
    formBlur() {
      console.log(999999);
      // this.dom_obj.editBlur();
      this.dom_obj.editBlur();
    },
    /*    formFocus(e){
      e.currentTarget.select()
    },*/
    importConfirm(e) {
      this.tableObj._addEditRow(excel2Edit(this.tableProps.tableSchema, e));
    },
    // 拖拽的动作
    headerDragend(newWidth, oldWidth, column, event) {
      let schema = this.tableObj.props.tableSchema;
      for (let key in schema) {
        if (schema[key].prop == column.property) {
          schema[key].width = newWidth;
        }
      }
      setTableSchema(this.tableObj.props.tid, this.tableObj.props.tableSchema);
      // console.log(newWidth, 6666555);
      this.$nextTick(() => {
        this.tableObj.doLayout();
      });
    },
  },
  directives: { clickOutside },
  watch: {
    "tableObj.tableData.length": {
      handler() {
        debounce(this.tableObj.borderBlur, 1000, false);
      },
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../style/mixin.scss";
.jv-table-style {
  // border: 15px solid #f3f3f3;
  height: 100%;
  .table-wrapper {
    height: calc(100% - 78px);
    padding: 0 10px;
    background: #fff;
    @import "../../style/cpn/table.scss";
    .col-required {
      color: red;
    }
  }
}
</style>
