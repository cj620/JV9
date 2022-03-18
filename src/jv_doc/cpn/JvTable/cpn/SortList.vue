<!--
 * @Author: C.
 * @Date: 2021-09-13 15:14:53
 * @LastEditTime: 2022-01-18 13:22:31
 * @Description: file content
-->
<template>
  <div class="table-sort-list">
    <div style="text-align: right; margin: 0">
      <div style="border-bottom: 1px solid #ccc">
        <el-checkbox v-model="tableProps.sortCol">{{
          $t("Generality.Ge_NumberColumn")
        }}</el-checkbox>
        <el-checkbox
          v-model="tableProps.chooseCol"
          style="margin-right: 120px"
          >{{ $t("Generality.Ge_SelectCol") }}</el-checkbox
        >
        <el-button size="mini" type="text" @click="reset">{{
          $t("Generality.Ge_Reset")
        }}</el-button>
        <!-- <el-button size="mini" type="text" @click="saveChange">{{
          $t("Generality.Ge_OK")
        }}</el-button> -->
      </div>
    </div>
    <div class="drag-box">
      <el-row
        :gutter="10"
        v-for="item in tableProps.tableSchema"
        :key="item.prop"
        class="drag-item"
      >
        <el-col :span="4">
          <div class="handle">
            <i class="el-icon-rank" style="font-size: 16px"></i>
            <el-checkbox
              v-model="item.show"
              style="padding: 0 8px"
              @change="checkboxChange"
            ></el-checkbox>
          </div>
        </el-col>
        <el-col :span="15">
          <div class="list-prop-name">{{ item.label }}</div>
        </el-col>
        <el-col :span="5">
          <div>
            <i
              class="el-icon-back"
              :class="{ 'active-fixed': item.fixed == 'left' }"
              @click="changeFixed(item, 'left')"
            ></i>
            <span style="color: #f4f4f4; padding: 0 5px">|</span>
            <i
              class="el-icon-right"
              :class="{ 'active-fixed': item.fixed == 'right' }"
              @click="changeFixed(item, 'right')"
            ></i>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Sortable from "sortablejs";
import { setTableSchema, resetCache } from "../../../class/utils/tableHelp";
export default {
  props: {
    tableProps: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    saveChange() {
      setTableSchema(this.tableProps.printMod, this.tableProps.tableSchema);
    },
    changeFixed(item, type) {
      if (item.fixed == type) {
        item.fixed = false;
      } else {
        item.fixed = type;
      }
      this.saveChange();
    },
    reRender() {
      this.$emit("rerender");
    },
    checkboxChange(e) {
      if (e) {
        this.reRender();
      }
      this.saveChange();
    },
    reset() {
      this.$confirm(
        this.$t("setup.IsResetCache"),
        this.$t("Generality.Ge_Remind"),
        {
          confirmButtonText: this.$t("Generality.Ge_OK"),
          cancelButtonText: this.$t("Generality.Ge_Cancel"),
          type: "warning",
        }
      ).then(() => {
        resetCache(this.tableProps.printMod);
        this.$store.dispatch("tagsView/delCachedView", this.$route).then(() => {
          const { fullPath } = this.$route;
          this.$nextTick(() => {
            this.$router.replace({
              path: "/redirect" + fullPath,
            });
          });
        });
      });
    },
  },
  mounted() {
    const tbody = document.querySelector(".table-sort-list .drag-box");
    const _this = this;
    new Sortable(tbody, {
      handle: ".handle", // handle's class
      draggable: ".drag-item",
      animation: 150,
      onEnd({ newIndex, oldIndex }) {
        const currRow = _this.tableProps.tableSchema.splice(oldIndex, 1)[0];
        _this.tableProps.tableSchema.splice(newIndex, 0, currRow);
        _this.reRender();
        _this.saveChange();
      },
    });
    // 兼容 选择列出现不响应
    const currRow = _this.tableProps.tableSchema.splice(1, 1)[0];
    _this.tableProps.tableSchema.splice(1, 0, currRow);
  },
};
</script>

<style lang="scss">
.table-sort-list {
  padding-top: 3px;
  width: 370px;
  .drag-box {
    min-height: 100px;
    max-height: 150px;
    overflow: auto;
    .drag-item {
      width: 100%;
      font-size: 15px;
      color: black;
    }
  }

  .list-prop-name {
    width: 240px;
    display: inline-block;
  }
  .active-fixed {
    color: #409eff;
  }
}
</style>
