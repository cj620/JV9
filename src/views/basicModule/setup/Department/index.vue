<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable
      ref="BillTable"
      :table-obj="tableObj"
      @selectionChange="handleSelectionChange"
    >
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_AddChild'),
              confirm: addSubordinate.bind(null, row),
            },

            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: handleOpen.bind(null, row.Department),
              },
            },
          ]"
        />
      </template>
      <Action slot="btn-list" max="10">
        <el-button size="mini" @click="addDep">
          {{ $t("Generality.Ge_New") }}
        </el-button>
      </Action>
    </JvTable>
    <jv-dialog
      :title="$t('Generality.Ge_New')"
      width="35%"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
      @confirm="confirmAddCategory"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import {
  deleteDepartment,
  editDepartment,
} from "@/api/basicApi/systemSettings/department";
export default {
  data() {
    return {
      // 表格数据
      tableObj: {
        type: "",
        data: "",
      },
      form: {
        SortColumn: "ItemType",
        SortOrder: 4,
      },
      formObj: {},
      dialogFormVisible: false,
    };
  },
  created() {
    this.tableObj = new Table();
    console.log(this.tableObj, 5456465);
    this.tableObj.getData();
    this.formObj = new Form({
      formSchema,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },
  methods: {
    handleSelectionChange(_, keys) {},
    handleOpen(id) {
      deleteDepartment([id]).then((data) => {
        this.tableObj.getData();
      });
    },
    //新增分类
    addDep() {
      this.dialogFormVisible = true;
    },
    //新增下级
    addSubordinate(data) {
      this.dialogFormVisible = true;
      var str = JSON.parse(JSON.stringify(data));
      this.formObj.form.ParentID = str.Department;
    },
    //新增类别确认保存
    confirmAddCategory() {
      this.formObj.validate((valid) => {
        if (valid) {
          editDepartment(this.formObj.form)
            .then((res) => {
              this.dialogFormVisible = false;
              this.formObj.reset();
              this.tableObj.getData();
            })
            .catch((err) => {});
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss"></style>
