<!--
 * @Author: C.
 * @Date: 2021-07-14 08:59:00
 * @LastEditTime: 2022-02-28 13:31:46
 * @Description: file content
-->
<template>
  <div ref="jvTable" class="jv-table-style">
    <!-- 表格操作栏 -->
    <TableHeader
      @fresh="tableObj.getData"
      @openSearch="showSearchForm = true"
      v-if="tableObj.props.tableHeaderShow"
      :tableObj="tableObj"
      @importConfirm="importConfirm"
      @fullScreen="fullScreen"
    >
      <div slot="subTitleBar">
        <slot name="titleBar" />
      </div>
      <div slot="subSetingBar">
        <slot name="setingBar" />
      </div>
      <slot name="btn-list" />
    </TableHeader>
    <!-- 表格主题 -->
    <div class="table-wrapper">
      <el-Table
        ref="multipleTable"
        v-loading="tableObj.loading"
        v-bind="{ ...$attrs, ...getBindProp }"
        style="width: 100%"
        v-on="$listeners"
        @selection-change="handleSelectionChange"
        @header-dragend="headerDragend"
        @current-change="currentChange"
        @select="handleSelect"
        v-if="tableObj.tableShow"
        :summary-method="tableObj.getTableSummaries"
      >
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
          :reserve-selection="!!tableObj.props.rowId"
        />
        <el-table-column v-if="tableProps.expand" type="expand">
          <template slot-scope="scope">
            <slot name="expand" :expand="scope.row" />
          </template>
        </el-table-column>

        <template v-for="item in tableObj.props.tableSchema">
          <el-table-column
            v-if="item.show"
            :key="item.prop"
            v-bind="{ ...propsAfterHandle(item) }"
            :show-overflow-tooltip="item.showOverflowTooltip ? false : true"
          >
            <template slot-scope="scope">
              <slot
                :name="item.prop"
                :record="scope.row[item.prop]"
                :row="scope.row"
                v-if="item.custom"
              ></slot>

              <span v-else>
                <CpnContainer
                  v-if="item.cpn"
                  :cpn="item.cpn"
                  :params="{
                    state: scope.row[item.prop],
                    rowData: scope.row,
                    cpnProps: item.cpnProps,
                  }"
                />
                <span v-else>
                  <span>{{
                    item.customFilter
                      ? item.customFilter(scope.row[item.prop], scope.row)
                      : dataFilter(item.filter, scope.row[item.prop])
                  }}</span>
                </span>
              </span>
            </template>

            <template slot="header">
              {{ item.label }}
              <Popover
                v-if="item.innerSearch"
                @confirm="tableObj.getData()"
                @reset="tableObj.reset()"
              >
                <InnerForm
                  :cdata="item.innerSearch"
                  :form-obj="tableObj.formObj"
                />
              </Popover>
            </template>
          </el-table-column>
        </template>

        <el-table-column
          :label="$t('Generality.Ge_Operate')"
          fixed="right"
          :width="tableObj.props.operationWidth"
          align="center"
          v-if="tableObj.props.operationCol"
        >
          <template slot-scope="scope">
            <slot name="operation" :row="scope.row" />
          </template>
        </el-table-column>
      </el-Table>
    </div>
    <!-- 表格分页器 -->
    <JvPagination
      v-if="tableProps.pagination"
      :page-sizes="tableObj.pager.Sizes"
      :page-size="tableObj.pager.pageSize"
      :current-page.sync="tableObj.pager.CurrentPage"
      :layout="tableObj.pager.Layout"
      :total="tableObj.pager.Total"
      @size-change="tablePageSizeChange"
      @current-change="tableObj.pager.currentChange"
      background
    />
    <!-- 表单搜索抽屉 -->
    <SearchForm
      v-if="tableObj.props.searchBar"
      :title="$t('Generality.Ge_SearchForm')"
      :visible.sync="showSearchForm"
      :form-obj="tableObj.formObj"
      @search="formSubmit('search')"
      @reset="formSubmit('reset')"
    />
  </div>
</template>

<script>
import JvPagination from "../JvPagination";
import TableHeader from "./cpn/TableHeader";
import { filterMaps } from "../../maps";
import CpnContainer from "./cpn/CpnContainer";
import { handleProps } from "./utils";
import InnerForm from "./cpn/InnerForm";
import Popover from "./cpn/Popover.vue";
import SearchForm from "./cpn/SearchForm";
import { fullScreen } from "@/jv_doc/utils/system";
import { debounce } from "@/jv_doc/utils/optimization";
import { setTableSchema, setPageSize } from "../../class/utils/tableHelp";
export default {
  name: "JvTable",
  components: {
    TableHeader,
    JvPagination,
    CpnContainer,
    InnerForm,
    Popover,
    SearchForm,
  },
  props: {
    tableObj: {
      type: Object,
    },
  },

  data() {
    return {
      // 展示搜索组件
      showSearchForm: false,
      // tableConfigColumn: [],
    };
  },
  mounted() {
    this.tableObj.tableRef = this.$refs.multipleTable;

    window.addEventListener("resize", () =>
      debounce(this.screenChange, 500, false)
    );
  },
  beforeDestroy() {
    this.tableObj.tableRef = null;
    window.removeEventListener("resize", () => this.screenChange(), false);
  },
  update() {
    console.log("update");
  },
  activated() {
    console.log("activated");
    this.$nextTick(() => {
      this.tableObj.doLayout();
    });
  },
  computed: {
    // filterEnums
    dataFilter() {
      return (type = "default", data) => filterMaps[type].func(data);
    },
    propsAfterHandle() {
      return handleProps;
    },
    tableProps() {
      return this.tableObj.props;
    },
    getBindProp() {
      return Object.assign(this.tableProps, {
        data: this.tableObj.tableData,
        rowKey: (row) => row[this.tableObj.props.rowId],
      });
    },
    isRadio() {
      return this.tableObj.props.selectType == "radio";
    },
  },
  methods: {
    // 处理多选
    handleSelectionChange(val) {
      // console.log(val);
      if (this.isRadio) {
        if (val.length == 1) {
          this.handleSelectData(val);
        }
      } else {
        this.handleSelectData(val);
      }
    },
    handleSelectData(val) {
      const Keys = [];
      val.forEach((item) => {
        Keys.push(item[this.tableObj.props.rowId]);
      });
      Object.assign(this.tableObj.selectData, {
        keys: Keys,
        datas: val,
      });
      // console.log(this.isRadio);
      this.$emit("selectionChange", val, Keys);
    },
    // 获取当前的表格引用
    getTableRef() {
      return this.$refs.multipleTable;
    },
    // 拖拽的动作
    headerDragend(newWidth, oldWidth, column, event) {
      let schema = this.tableObj.props.tableSchema;
      for (let key in schema) {
        if (schema[key].prop == column.property) {
          schema[key].width = newWidth;
        }
      }
      setTableSchema(
        this.tableObj.props.printMod,
        this.tableObj.props.tableSchema
      );
      this.$nextTick(() => {
        this.tableObj.doLayout();
      });
    },
    formSubmit(type) {
      if (type == "reset") {
        this.tableObj.reset();
      } else {
        this.tableObj.getData();
      }
      this.showSearchForm = false;
    },
    importConfirm(e) {
      this.$emit("importConfirm", e);
    },
    // 处理单选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    currentChange(currentRow, oldCurrentRow) {
      if (this.isRadio) {
        this.clearSelection();
        this.toggleSelection([currentRow]);
      } else {
        // this.toggleSelection([currentRow]);
      }
    },
    // 清空选项
    clearSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    change(row) {
      // console.log(e);
      this.toggleSelection([e]);
    },
    handleSelect(selection, row) {
      if (!this.isRadio) return;
      this.clearSelection();
      this.toggleSelection([row]);
    },
    fullScreen() {
      fullScreen(this.$refs.jvTable);
    },
    screenChange() {
      this.$nextTick(() => {
        this.tableObj.doLayout();
      });
    },
    tablePageSizeChange(size) {
      this.tableObj.pager.sizeChange(size);
      setPageSize(this.tableObj.props.printMod, size);
    },
  },
  watch: {
    showSearchForm: {
      handler(n, o) {
        if (n) {
          document.onkeyup = (e) => {
            if (window.event.keyCode == 13) {
              this.formSubmit("search");
            }
          };
        } else {
          document.onkeyup = undefined;
        }
      },
    },
  },
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
.jv-table-style {
  // border: 15px solid #f3f3f3;
  height: 100%;
  .table-wrapper {
    height: calc(100% - 78px);
    padding: 0 10px;
    background: #fff;
    @import "../../style/cpn/table.scss";
    .filter-icon {
      display: inline-block;
      margin-left: 10px;
      font-weight: bold;
    }
  }
  .inner-search-group {
    margin: 5px 0;
    width: 100%;
    @include flexBox($jc: space-between);
  }
}
</style>
