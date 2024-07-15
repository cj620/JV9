<!--
 * @Author: C.
 * @Date: 2022-02-22 16:12:01
 * @LastEditTime: 2024-07-15 13:51:15
 * @Description: file content
-->
<!-- 销售订单 明细 页面-->
<template>
  <PageWrapper :footer="false">
    <!-- 销售订单 明细表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <template #operation="{ row }">
        <span class="action-item">
          <el-badge :is-dot="row.IsPartProcess">
            <span @click="CraftDesign1(row)">{{
              $t("program.Pr_ProcessPlanning")
            }}</span>
          </el-badge>
        </span>
      </template>
      <Action
        slot="btn-list"
        :actions="[
          {
            label: '生产加工单',
            confirm: newProduct.bind(null),
          },
        ]"
        size="mini"
      >
      </Action>
    </JvTable>
    <JvDialog
      title="工单级别"
      :visible.sync="editDialogVisible"
      v-if="editDialogVisible"
      @confirm="confirm"
      width="25%"
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
import { Form } from "@/jv_doc/class/form";
import { format2source } from "@/jv_doc/class/utils/dataFormat";

export default {
  // 页面的标识
  name: "Pr_PartProductionDemand_Detail_list",
  components: {
    // 单据状态组件
    BillStateTags,
  },
  props: {},
  data() {
    return {
      // 表格实例
      tableObj: {},
      formObj: {},
      // 编辑路由
      EditRoute: "",
      // 新增路由
      AddRoute: "",
      editDialogVisible: false,
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
    this.formObj = new Form({
      formSchema: [
        {
          prop: "Level",
          label: "级别",
          cpn: "FormSelect",
          default: "Ordinary",
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseFillIn"),
              trigger: ["change", "blur"],
            },
          ],
          options: {
            list: [
              {
                value: "Ordinary",
                label: i18n.t("Generality.Ge_Ordinary"),
              },
              {
                value: "Urgent",
                label: i18n.t("Generality.Ge_Urgent"),
              },
              {
                value: "ExtraUrgent",
                label: i18n.t("Generality.Ge_ExtraUrgent"),
              },
            ],
          },
        },
      ],
      baseColProps: {
        span: 24,
      },
      labelPosition: "top",
      labelWidth: "100px",
    });
  },
  methods: {
    CraftDesign1(row) {
      this.$router.push({
        name: "CraftDesign",
        params: {
          data: [
            {
              ...row,
              PartNo: row.ItemId,
            },
          ],
        },
      });
    },
    newProduct() {
      let { datas } = this.tableObj.selectData;
      if (datas.length !== 1) {
        this.$message({
          type: "warning",
          message: "请选择一条生产明细！",
        });
        return;
      }
      this.editDialogVisible = true;
    },
    confirm() {
      let { datas } = this.tableObj.selectData;
      this.editDialogVisible = false;
      this.$router.push({
        name: "AddProductionTask",
        params: { data: datas[0], type: "addItem" },
      });
    },
  },
};
</script>
<style>
.action-item {
  color: #0960bd;
  padding-right: 10px;
  font-size: 15px;
  cursor: pointer;
}
.el-badge__content.is-fixed.is-dot {
  right: 5px;
  top: 2px;
}
</style>
