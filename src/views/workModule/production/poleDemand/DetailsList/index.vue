<!--
 * @Author: C.
 * @Date: 2022-02-22 16:12:01
 * @LastEditTime: 2024-07-18 15:26:00
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
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { Form } from "@/jv_doc/class/form";
import { quickly_create_task } from "@/api/workApi/production/poleProductionDemand";

export default {
  // 页面的标识
  name: "Pr_PoleProductionDemand_Detail_list",
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
