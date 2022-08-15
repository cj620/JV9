<template>
  <PageWrapper :footer="false">

    <JvTable
      ref="BillTable"
      :table-obj="tableObj"
      @selectionChange="handleSelectionChange"
    >

      <template #operation="{ row }">
        <TableAction
          :actions="[
                {
                  label: $t('Generality.Ge_Edit'),
                  confirm: edit.bind(null, row),
                },

                {
                  label: $t('Generality.Ge_Delete'),
                  popConfirm: {
                    title: $t('Generality.Ge_DeleteConfirm'),
                    confirm: delItem.bind(null, row),
                  },
                },
              ]"
        />
      </template>

      <Action slot="btn-list">
        <el-button size="mini" @click="add">
          {{ $t("Generality.Ge_New") }}
        </el-button>
      </Action>
    </JvTable>

    <JvDialog
      :title="$t('Generality.Ge_New')"
      :visible.sync="addDialogVisible"
      v-if="addDialogVisible"
      width="40%"
      @confirm="addConfirm"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
import { Form } from "@/jv_doc/class/form";
import { formSchema } from "./formConfig";
import { SaveSy_DwgDefaultDirectory,DeleteSy_DwgDefaultDirectoryByIds } from "@/api/basicApi/systemSettings/fileManagementSetup";

export default {
  name: 'Se_FileManagementSetup',
  data() {
    return {
      tableObj: {},
      formObj: {},
      form:{
        Id:0,
        FolderName:'',
        SubFolder:'',
        PopedomRead:'',
        PopedomReadName:'',
        PopedomWrite:'',
        PopedomWriteName:'',
        GetLock:true,
        CheckinDel:true,
        DataState:0,
      },
      addDialogVisible: false,
    }
    },
  created() {
    this.tableObj = new Table();
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
  methods:{

    //新增
    add(){
      this.addDialogVisible = true;
    },

    //点击保存
    addConfirm(){
      this.formObj.validate((valid) => {
        if (valid) {
          const str = Object.assign({}, this.form, this.formObj.form)
          SaveSy_DwgDefaultDirectory([str]).then(res=>{
            this.addDialogVisible = false
            this.tableObj.getData();
          })

        }
      });

    },
    //编辑
    edit(row){
      const str = JSON.parse(JSON.stringify(row))
      str.PopedomRead=parseInt(str.PopedomRead)
      str.PopedomWrite=parseInt(str.PopedomWrite)

      this.formObj.form = str
      this.addDialogVisible = true
    },
    //删除
    delItem(row){
      DeleteSy_DwgDefaultDirectoryByIds([row.Id]).then(res=>{
        this.tableObj.getData();
      })
    },
    handleSelectionChange(){}
  }
}
</script>

<style scoped>

</style>
