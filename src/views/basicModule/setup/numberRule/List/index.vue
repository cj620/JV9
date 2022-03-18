<!--
 * @Author: H.
 * @Date: 2021-12-21 14:03:00
 * @LastEditTime: 2022-01-20 18:50:21
 * @Description:
-->

<!--  页面-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <!-- operation操作列 -->
      <template #BillName="{ row }">
        <span>{{ translation(row.BillKey) }}</span>
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
            },
          ]"
        />
      </template>
    </JvTable>
    <JvDialog
      :title="$t('Generality.Ge_Edit')"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="40%"
      @confirm="dialogConfirm"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </JvDialog>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { updateNumberRule } from "@/api/basicApi/systemSettings/sysSettings";

import i18n from "@/i18n/i18n";

export default {
  // 页面的标识
  name: "",
  props: {},
  data() {
    return {
      tableObj: {},
      formObj: {},
      dialogVisible: false,
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
    edit(row) {
      this.dialogVisible = true;
      this.formObj.form = row;
    },
    dialogConfirm() {
      this.formObj.validate((validate) => {
        if (validate) {
          updateNumberRule(this.formObj.form).then(() => {
            this.tableObj.getData();
            this.dialogVisible = false;
          });
        }
      });
    },
  },
  computed: {
    translation() {
      return (key) => {
        return i18n.t("menu." + key);
      };
    },
  },
};
</script>
