<!--物料分类-->
<template>
  <PageWrapper>
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
                confirm: handleOpen.bind(null, row.ItemType),
              },
            },
          ]"
        />
      </template>
      <Action slot="btn-list" max="10">
        <el-button size="mini" @click="addCategory">
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
  deleteMaterialCategory,
  addItemType,
} from "@/api/basicApi/systemSettings/ItemType";
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
    handleSelectionChange(_, keys) {
      console.log(keys, 111);
    },
    handleOpen(data) {
      deleteMaterialCategory([data]).then((data) => {
        this.tableObj.getData();
        console.log("110", data);
      });
    },
    //新增分类
    addCategory() {
      this.dialogFormVisible = true;
    },
    //新增下级
    addSubordinate(e) {
      console.log(e);
      this.dialogFormVisible = true;
      var str = JSON.parse(JSON.stringify(e));
      this.formObj.form.ParentID = str.ItemType;
    },
    //新增类别确认保存
    confirmAddCategory() {
      this.formObj.validate((valid) => {
        console.log(valid);
        if (valid) {
          addItemType(this.formObj.form)
            .then((res) => {
              this.dialogFormVisible = false;
              this.formObj.reset();
              this.tableObj.getData();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss"></style>
