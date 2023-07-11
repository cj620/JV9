<!--
 * @Author: C.
 * @Date: 2021-07-20 15:47:56
 * @LastEditTime: 2023-07-11 17:00:06
 * @LastEditTime: 2021-11-08 16:07:49
 * @Description: file content
-->
<template>
  <div class="table-header">
    <div class="table-title">
      <div class="title">
        <span class="item" v-if="tableProps.title">{{ tableProps.title }}</span>

        <slot name="subTitleBar"></slot>
        <el-tooltip
          class="item"
          effect="dark"
          :content="$t('Generality.Ge_Filter')"
          placement="top-start"
          v-if="tableProps.searchBar"
        >
          <div
            class="setting-icon el-icon-search"
            style="font-weight: bold; font-size: 18px; margin-left: 15px"
            @click="$emit('openSearch')"
          />
        </el-tooltip>

        <!-- <div v-if="remark" class="table-remark">{{ remark }}</div> -->
      </div>
      <KeywordDisplay
        v-if="tableObj.formObj"
        style="flex: 1"
        :formObj="tableObj.formObj"
        @fresh="$emit('fresh')"
      >
        <SelectTag
          :tableObj="tableObj"
          v-if="tableObj.selectData.keys.length !== 0"
        ></SelectTag>
      </KeywordDisplay>
      <div class="oprations">
        <slot />
      </div>
    </div>

    <div class="table-setting">
      <slot name="subSetingBar"></slot>
      <!-- 刷新 -->
      <el-tooltip
        class="item"
        effect="dark"
        :content="$t('Generality.Ge_Refresh')"
        placement="top-start"
        v-if="tableProps.freshBar"
      >
        <div
          :class="[
            'setting-icon',
            tableObj.loading ? 'el-icon-loading' : 'el-icon-refresh-right',
          ]"
          @click="$emit('countFresh')"
        />
      </el-tooltip>

      <el-tooltip
        class="item"
        effect="dark"
        :content="$t('setup.FullScreen')"
        placement="top-start"
        v-if="tableProps.fullScreenBar"
      >
        <div
          class="setting-icon el-icon-full-screen"
          @click="$emit('fullScreen')"
        />
      </el-tooltip>
      <!-- <Screenfull></Screenfull> -->

      <!-- 导出按钮 -->
      <el-tooltip
        class="item"
        effect="dark"
        :content="$t('Generality.Ge_Export')"
        placement="top-start"
        v-if="tableProps.exportBar"
      >
        <i class="setting-icon el-icon-upload2" @click="exportShow = true" />
      </el-tooltip>
      <!-- 导入按钮 -->
      <el-tooltip
        class="item"
        effect="dark"
        :content="$t('Generality.Ge_Import')"
        placement="top-start"
        v-if="tableProps.importBar"
      >
        <i class="setting-icon el-icon-download" @click="importShow = true" />
      </el-tooltip>
      <!-- 打印 -->
      <el-tooltip
        class="item"
        effect="dark"
        :content="$t('Generality.Ge_Print')"
        placement="top-start"
        v-if="tableProps.printBar"
      >
        <i
          class="setting-icon el-icon-printer"
          :style="{ color: tableProps.printMod ? '' : '#C0C4CC' }"
          @click="toPrint"
        />
      </el-tooltip>

      <!-- 表格设置 -->
      <el-dropdown @command="dropdownClick" v-if="tableProps.settingBar">
        <el-tooltip
          class="item"
          effect="dark"
          :content="$t('Generality.Ge_Settings')"
          placement="top-start"
        >
          <i class="setting-icon el-icon-setting" />
        </el-tooltip>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="border">{{
            $t("Generality.Ge_Frame")
          }}</el-dropdown-item>
          <el-dropdown-item command="stripe">{{
            $t("Generality.Ge_DottedLine")
          }}</el-dropdown-item>
          <el-dropdown-item command="autoSize">{{
            $t("Generality.Ge_Fit")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 密度设置 -->
      <el-dropdown @command="densityClick" v-if="tableProps.densityBar">
        <el-tooltip
          class="item"
          effect="dark"
          :content="$t('setup.Density')"
          placement="top-start"
        >
          <i class="setting-icon el-icon-sort" />
        </el-tooltip>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="mini">{{
            $t("Generality.Ge_Default")
          }}</el-dropdown-item>
          <el-dropdown-item command="small">{{
            $t("setup.Medium")
          }}</el-dropdown-item>
          <el-dropdown-item command="medium">{{
            $t("setup.Loose")
          }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-popover
        v-model="visible"
        placement="bottom-end"
        width="400"
        v-if="tableProps.colBar"
      >
        <SortList
          :tableProps="tableProps"
          @rerender="tableObj.reRender"
        ></SortList>
        <i slot="reference" class="setting-icon el-icon-s-operation" />
      </el-popover>
    </div>

    <!-- 导出数据 -->
    <Export
      :visible.sync="exportShow"
      v-if="tableProps.exportBar"
      :sourceType="exportSourceType"
      width="35%"
      :title="$t('Generality.Ge_Export')"
      :tableObj="tableObj"
      @complete="exportShow = false"
    ></Export>
    <!-- 导入数据 -->
    <Import
      :visible.sync="importShow"
      v-if="tableProps.importBar"
      width="28%"
      :title="$t('Generality.Ge_Import')"
      @complete="importComplete"
    ></Import>
  </div>
</template>

<script>
import SortList from "../SortList.vue";
import Export from "../Export.vue";
import SelectTag from "./SelectTag.vue";
import { checkImport } from "../../utils/importHelp";
// import Screenfull from "@/components/Screenfull";
import { printPlugin } from "@/jv_doc/utils/system/printPlugin";
import KeywordDisplay from "./KeywordDisplay.vue";
export default {
  name: "TableHeader",
  components: {
    SortList,
    Export,
    KeywordDisplay,
    SelectTag,
    //  Screenfull
  },
  data() {
    return {
      visible: false,
      // 导出弹框
      exportShow: false,
      // 导入弹框
      importShow: false,
    };
  },
  props: {
    tableObj: {
      type: Object,
      default: () => {},
    },
    exportSourceType: {
      type: String,
      default: "default",
    },
    remark: {
      type: String,
      default: "",
    },
  },
  methods: {
    dropdownClick(e) {
      switch (e) {
        case "border":
          this.tableProps.border = !this.tableProps.border;
          break;
        case "stripe":
          this.tableProps.stripe = !this.tableProps.stripe;
          break;
        case "autoSize":
          // this.tableProps.stripe=!this.tableProps.stripe
          if (this.tableProps.height == "100%") {
            this.tableProps.height = "";
          } else {
            this.tableProps.height == "100%";
          }
          this.reRender();
          break;
        default:
          break;
      }
    },
    densityClick(e) {
      this.reRender();
      this.tableProps.size = e;
    },
    confirm() {
      // console.log(this.tableProps.tableSchema, 8);
    },
    reRender() {
      // this.$emit("rerender");
      this.$nextTick(() => {
        this.tableObj.doLayout();
      });
    },
    importComplete(e) {
      if (e.length == 0) {
        this.$message({
          type: "warning",
          message: this.$t("setup.ChooseFile"),
        });
      } else {
        if (true) {
          this.importShow = false;
          this.$emit("importConfirm", e);
        } else {
          this.$message({
            type: "error",
            message: this.$t("setup.FileFormatErrorPleaseCheckAndTryAgain"),
          });
        }
      }
    },
    toPrint() {
      printPlugin({
        ids: this.tableObj.selectData.keys,
        category: this.tableProps.printMod,
      });
    },
  },
  computed: {
    tableProps() {
      return this.tableObj.props;
    },
  },
};
</script>

<style lang="scss">
@import "../../../../style/mixin.scss";
.table-header {
  width: 100%;
  height: 45px;
  padding: 5px 10px;
  background-color: #fff;
  @include flexBox($jc: space-between);
  .table-title {
    // width: 100px;
    height: 100%;
    // padding: 3px 10px;
    // display: flex;
    @include flexBox($jc: space-between);
    flex: 1;
    // background-color: pink;
    .title {
      height: 100%;
      font-size: 18px;
      @include flexBox($jc: flex-start);
      padding-right: 20px;
      .table-remark {
        margin-left: 10px;
        font-size: 12px;
        color: rgb(102, 102, 102);
        // @include flexBox($jc: flex-start);
        // align-items: flex-end;
        margin-top: 9px;
      }
    }
    .oprations {
      // flex: 1;
      height: 100%;
      @include flexBox($jc: flex-end);
      // background-color: pink;
    }
  }
  .table-setting {
    // width: 100px;
    height: 100%;
    @include flexBox($jc: flex-end);
    // background-color: pink;
    padding-left: 10px;
    font-size: 22px;
    &::before {
      content: "|";
      font-size: 15px;
      color: rgb(199, 199, 199);
    }
  }
  .setting-icon {
    margin: 3px 5px;
    cursor: pointer;
    font-size: 22px;
  }
}
</style>
