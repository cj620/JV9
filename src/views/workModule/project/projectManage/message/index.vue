<!--
 * @Author: C.
 * @Date: 2022-03-02 13:20:25
 * @LastEditTime: 2022-06-20 14:38:43
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
             // 生成模具
            {
              label: $t('Generality.Ge_GenerateItems'),
              confirm: generateItems.bind(null, row),
            },
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
            <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_New'),
            confirm: add,
          }

        ]"
      >
      </Action>
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
        <!--生成模具物料-->
    <generateItems
      :visible.sync="generateItemsDialogFormVisible"
      @confirmGenerateItems="confirmGenerateItems"
      ref="generateItems"
    ></generateItems>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { listTableColBtnModel } from "~/utils/system/pagePlugin";
import { Form } from "@/jv_doc/class/form";
import { saveItem } from "@/api/basicApi/systemSettings/Item";
import generateItems from "./generateItems";
export default {
  // 页面的标识
  name: "Pm_ProjectManagement_Msg",
  components: {
    // 单据状态组件
    BillStateTags,
    generateItems,
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
      ProjectData: "",
      formObj: {},
      projectDialogVisible: false,
      generateItemsDialogFormVisible: false,
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
          this.formObj = new Form({
        formSchema: [
          {
            prop: "Project",
            label: i18n.t("menu.Pm_Project"),
            cpn: "FormInput",
            rules: [
              {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: [ "blur"],
              },
            ],
          },
          {
            prop: "Remarks",
            label: i18n.t("Generality.Ge_Remarks"),
            cpn: "FormInput",
            rules: [
              {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: [ "blur"],
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
    add(){
           this.formObj.form={
        Id: 0,
        Project: "",
        Remarks: "",
      }
      this.projectDialogVisible = true;
    },
    generateItems(row){
      console.log(row,999999)
      this.ProjectData = row
       this.generateItemsDialogFormVisible = true;
    },
    l_edit(row) {
      console.log(row,999999)
      const str = JSON.parse(JSON.stringify(row))
       this.formObj.form={
        Id: str.ProjectId,
        Project: str.Project,
        Remarks: str.Description,
      }
      this.projectDialogVisible = true;
    },
    l_delete(row) {
      this.tableObj.api.del([row.Name]).then((_) => {
        this.tableObj.getData();
      });
    },
    //保存模具
    confirmGenerateItems(e){
            e.Project = this.ProjectData.Project;
      e.ItemCategory = "Tooling";
      e.DataState = "Add";
      saveItem(e).then((res) => {
        this.generateItemsDialogFormVisible = false;
        this.$refs.generateItems.formObj.reset();
      });
    },
    saveChanges() {
      console.log(this.formObj.form, 5555555);
      this.tableObj.api.save(this.formObj.form).then((_) => {
        this.projectDialogVisible = false;
        this.tableObj.getData();
         this.formObj.reset();
      });
    },
  },
};
</script>
