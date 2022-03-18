<!--
 * @Author: C.
 * @Date: 2022-03-02 13:20:25
 * @LastEditTime: 2022-03-02 14:58:10
 * @Description: file content
-->
<!-- 项目信息 页面-->
<template>
  <PageWrapper :footer="false">
    <!-- 项目信息表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <!-- 状态标签 -->
      <template #State="{ record }">
        <BillStateTags :state="record"></BillStateTags>
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            // 编辑按钮
            {
              label: $t('Generality.Ge_Edit'),
              confirm: l_edit.bind(null, row),
            },
            // 删除按钮
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: l_delete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </JvTable>
    <JvDialog
      :title="$t('Generality.Ge_Edit')"
      :visible.sync="projectDialogVisible"
      width="30%"
      @confirm="saveChanges"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </JvDialog>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { listTableColBtnModel } from "~/utils/system/pagePlugin";
import { Form } from "@/jv_doc/class/form";
export default {
  // 页面的标识
  name: "Pm_ProjectManagement_Msg",
  components: {
    // 单据状态组件
    BillStateTags,
  },
  props: {},
  data() {
    return {
      // 表格实例
      tableObj: {},
      // 编辑路由
      EditRoute: "",
      // 新增路由
      AddRoute: "",
      formObj: {},
      projectDialogVisible: false,
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  computed: {
    // 表格行
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
  },
  methods: {
    l_edit(row) {
      this.formObj = new Form({
        formSchema: [
          {
            prop: "Id",
            label: "",
            cpn: "FormInput",
            default: row.ProjectId,
            hidden: true,
            rules: [
              {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["change", "blur"],
              },
            ],
          },
          {
            prop: "Project",
            label: i18n.t("menu.Pm_Project"),
            cpn: "FormInput",
            default: row.Project,
            rules: [
              {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["change", "blur"],
              },
            ],
          },
          {
            prop: "Remarks",
            label: i18n.t("Generality.Ge_Remarks"),
            cpn: "FormInput",
            default: row.Description,
            rules: [
              {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["change", "blur"],
              },
            ],
          },
        ],
        baseColProps: {
          span: 24,
        },
        gutter: 40,
        labelPosition: "top",
        // 是否自动聚焦
        autoFocus: true,
      });
      this.projectDialogVisible = true;
    },
    l_delete(row) {
      this.tableObj.api.del([row.Name]).then((_) => {
        this.tableObj.getData();
      });
    },
    saveChanges() {
      // console.log(this.formObj.form, 5555555);
      this.tableObj.api.save(this.formObj.form).then((_) => {
        this.projectDialogVisible = false;
        this.tableObj.getData();
      });
    },
  },
};
</script>
