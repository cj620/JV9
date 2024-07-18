<!--
 * @Author: C.
 * @Date: 2022-02-22 16:12:01
 * @LastEditTime: 2024-07-18 15:23:41
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
            label: '撤销申请',
            confirm: cancelReq.bind(null),
            disabled: canCancelReq,
          },
          {
            label: '撤销处理',
            confirm: cancelHandle.bind(null),
            disabled: canCancelHandle,
          },
          {
            label: '生产加工单',
            confirm: newProduct.bind(null),
            disabled: canCreateProduct,
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
    <JvDialog
      title="撤销备注"
      :visible.sync="remarkDialogVisible"
      v-if="remarkDialogVisible"
      @confirm="remarkConfirm"
      width="25%"
      :autoFocus="true"
    >
      <JvForm :formObj="remarkFormObj"> </JvForm>
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
import {
  quickly_create_task,
  update_item_state,
} from "@/api/workApi/production/partProductionDemand";

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
      remarkFormObj: {},
      // 编辑路由
      EditRoute: "",
      // 新增路由
      AddRoute: "",
      editDialogVisible: false,
      remarkDialogVisible: false,
      cancelType: "RevokeApplication",
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
          default: 0,
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
                value: 0,
                label: i18n.t("Generality.Ge_Ordinary"),
              },
              {
                value: 1,
                label: i18n.t("Generality.Ge_Urgent"),
              },
              {
                value: 2,
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
    this.remarkFormObj = new Form({
      formSchema: [
        {
          prop: "Remarks",
          label: "备注",
          cpn: "FormInput",
          type: "textarea",
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseFillIn"),
              trigger: ["change", "blur"],
            },
          ],
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
              PartName: row.ItemName,
            },
          ],
        },
      });
    },
    async remarkConfirm() {
      let { datas } = this.tableObj.selectData;
      const params = {
        Remarks: this.remarkFormObj.form.Remarks,
        State: this.cancelType,
        Ids: datas.map((item) => item.Id),
      };
      await update_item_state(params);
      this.tableObj.tableRef.clearSelection();
      this.tableObj.getData();
      this.remarkDialogVisible = false;
    },
    newProduct() {
      // let { datas } = this.tableObj.selectData;
      // if (datas.length !== 1) {
      //   this.$message({
      //     type: "warning",
      //     message: "请选择一条生产明细！",
      //   });
      //   return;
      // }
      this.editDialogVisible = true;
    },
    cancelReq() {
      this.cancelType = "RevokeApplication";
      this.remarkFormObj.form.Remarks = undefined;
      this.remarkDialogVisible = true;
    },
    cancelHandle() {
      // RevokeApplication
      this.cancelType = "Rescinded";
      this.remarkFormObj.form.Remarks = undefined;
      this.remarkDialogVisible = true;
    },
    async confirm() {
      let { datas } = this.tableObj.selectData;
      const params = {
        Ids: datas.map((item) => item.Id),
        ...this.formObj.form,
      };
      await quickly_create_task(params);
      this.editDialogVisible = false;
      this.tableObj.tableRef.clearSelection();
      this.tableObj.getData();
      // this.$router.push({
      //   name: "AddProductionTask",
      //   params: { data: datas[0], type: "addItem" },
      // });
    },
  },
  computed: {
    canCreateProduct() {
      let { datas } = this.tableObj.selectData;
      if (datas.length == 0) return true;
      let flag = false;
      // ItemState IsPartProcess ToBeProduced
      datas.forEach((item) => {
        if (!item.IsPartProcess || item.ItemState != "ToBeProduced") {
          flag = true;
        }
      });
      return flag;
    },
    canCancelReq() {
      let { datas } = this.tableObj.selectData;
      if (datas.length == 0) return true;
      let flag = false;
      datas.forEach((item) => {
        if (!["ToBeProduced", "PendingApproved"].includes(item.ItemState)) {
          flag = true;
        }
      });
      return flag;
    },
    canCancelHandle() {
      let { datas } = this.tableObj.selectData;
      if (datas.length == 0) return true;
      let flag = false;
      datas.forEach((item) => {
        if (
          !["RevokeApplication"].includes(item.ItemState) ||
          item.ItemState == "Rescinded"
        ) {
          flag = true;
        }
      });
      return flag;
    },
  },
  watch: {
    $route(to, from) {
      // 页面缓存的时候不刷新数据，监听路由刷新数据
      // 判断路由监听的页面是不是本页面
      console.log(to, from);
      if (from.path == "/design/craftDesign") {
        this.tableObj.getData();
      }
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
