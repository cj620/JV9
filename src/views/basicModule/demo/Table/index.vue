<!--
 * @Author: C.
 * @Date: 2021-07-13 10:34:24
 * @LastEditTime: 2022-01-07 10:19:24
 * @Description: file content
-->
<template>
  <PageWrapper>
    <!-- 表格 -->
    <JvTable
      ref="BillTable"
      :table-obj="tableObj"
      @selectionChange="handleSelectionChange"
      @importConfirm="importConfirm"
    >
      <template #name="{ record }">
        <el-tag type="success">{{ record }}</el-tag
        >自定义插槽
      </template>

      <template #age="{ record, row }">
        我叫{{ row.name }},今年{{ record }}岁（获取单元格数据和行数据）
      </template>
      <template #process="{ record }">
        <el-progress :percentage="record * 100"></el-progress>
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: '删除',
              icon: 'el-icon-delete',
              popConfirm: {
                title: '是否删除？',
                confirm: handleOpen.bind(null, row),
              },
            },
            {
              icon: 'el-icon-delete',
              disabled: true,
              popConfirm: {
                title: '是否删除？',
                confirm: handleOpen.bind(null, row),
              },
            },
          ]"
          :dropDownActions="[
            {
              label: '启用',
              popConfirm: {
                title: '是否启用？',
                confirm: handleOpen.bind(null, row),
              },
            },
          ]"
        />
      </template>
      <Action size="mini" slot="btn-list" :actions="actions"> </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";

export default {
  name: "list",
  data() {
    return {
      // 表格数据
      tableObj: {},
      auditForm: {
        Remarks: "",
        BizFormId: "",
        AuditResult: "",
      },
      remarkShow: false,
      chooseList: [],
      actions: [
        {
          label: $t("Generality.Ge_Delete"),
          icon: "el-icon-delete",

          popConfirm: {
            title: "是否删除？",
            confirm: this.handleOpen.bind(null, "456"),
          },
        },
        {
          label: "表格调整",
          confirm: this.doLayout,
        },
        {
          label: this.$t("Generality.Ge_New"),
          confirm: this.addNew,
        },
      ],
    };
  },
  mounted() {
    console.log("mounted", 856449887);
  },
  created() {
    console.log("created", 856449887);
    this.tableObj = new Table();
    this.tableObj.getData();
    // console.log(this.tableObj.props, 5456465);
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  beforeRouteUpdate() {
    console.log("beforeRouteUpdate");
  },
  methods: {
    handleSelectionChange(_, keys) {
      // console.log(keys, 111);
    },
    handleOpen(a) {
      // console.log(a, 8888);
    },
    importConfirm(e) {
      this.$message({
        type: "success",
        message: "导入数据已经打印到控制台，请打开查看",
      });
    },
    doLayout() {
      this.tableObj.doLayout();
    },
    addNew() {
      this.$router.push({
        name: "form",
      });
    },
  },
};
</script>
<style lang="scss">
.page-wrapper {
  // height: 800px;
  width: 100%;
  padding: 20px;
  height: calc(100vh - 84px);
  // background-color: #ccc;
  overflow: auto;
}
</style>
