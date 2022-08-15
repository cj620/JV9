<!--
 * @Author: your name
 * @Date: 2021-10-29 15:06:43
 * @LastEditTime: 2022-08-10 17:29:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \keitoolv9\src\views\basicModule\setup\currency\index.vue
-->
<!--货币-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable
      ref="BillTable"
      :table-obj="tableObj"
      @selectionChange="handleSelectionChange"
    >
      <template #LocalCurrency="{ row }">
        <el-checkbox v-model="row.LocalCurrency" disabled></el-checkbox>
      </template>

      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: handleOpen.bind(null, row),
              },
            },
          ]"
        />
      </template>

      <Action slot="btn-list">
        <el-button size="mini" @click="addCurrency">
          {{ $t("Generality.Ge_New") }}
        </el-button>
      </Action>
    </JvTable>
    <JvDialog
      :title="$t('Generality.Ge_New')"
      :visible.sync="addDialogVisible"
      v-if="addDialogVisible"
      width="40%"
      @confirm="addAccountConfirm"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </JvDialog>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import {
  addCurrency,
  deleteCurrency,
} from "@/api/basicApi/systemSettings/currency";
export default {
  name:'Currency',
  data() {
    return {
      // 表格数据
      tableObj: {
        type: "",
        data: "",
      },
      formObj: {},
      addDialogVisible: false,
    };
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
  methods: {
    handleSelectionChange(_, keys) {},
    //新增货币
    addCurrency() {
      this.addDialogVisible = true;
    },
    //删除货币
    handleOpen(data) {
      let arr = [];
      arr.push(data.Currency);
      deleteCurrency(arr).then((data) => {
        this.tableObj.getData();
      });
    },
    // 确认新增用户
    addAccountConfirm() {
      this.formObj.validate((valid) => {
        if (valid) {
          addCurrency(
            Object.assign({}, this.formObj.form, {
              LocalCurrency: !!this.formObj.form.LocalCurrency[0],
            })
          ).then((data) => {
            this.addDialogVisible = false;
            this.formObj.reset();
            this.tableObj.getData();
          });
        }
      });
    },
  },
};
</script>
<style lang="scss"></style>
