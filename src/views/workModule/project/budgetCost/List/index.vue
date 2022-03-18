<!--
 * @Author: your name
 * @Date: 2021-10-27 14:48:56
 * @LastEditTime: 2022-01-20 17:18:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edivv
 * @FilePath: \V9_Dev\src\views\basicModule\demo\EditTable\index.vue
-->
<template>
  <PageWrapper :footer="false">
    <JvEditTable :tableObj="eTableObj">
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            disabled: !cur_toolId,
            label: $t('project.Pro_FromQuotation'),
            confirm: getSaleQuote,
          },
          {
            // 校验
            disabled: !cur_toolId,
            label: $t('Generality.Ge_New'),
            confirm: addProcess,
          },
          {
            // 校验
            disabled: !cur_toolId,
            label: $t('Generality.Ge_Save'),
            confirm: l_save,
          },
        ]"
        actionType="primary"
      >
      </Action>
      <template #titleBar>
        <Popover @confirm="getData" @reset="toolId = ''" style="margin: 0 10px">
          <el-input
            v-model="toolId"
            :placeholder="$t('Generality.Ge_SearchByNumber')"
            size="mini"
          ></el-input>
        </Popover>
        <span>{{ toolId }}</span>
      </template>
      <template #setingBar>
        <div class="setting-icon el-icon-refresh-right" @click="getData"></div>
      </template>
      <template #Amount="{ row }">
        {{ getSummary(row, "Amount") }}
      </template>
      <template #operation="{ row_index }">
        <TableAction
          :actions="[
            {
              icon: 'el-icon-circle-plus-outline',
              confirm: l_insert.bind(null, row_index),
            },
            {
              icon: 'el-icon-delete',
              confirm: l_delete.bind(null, row_index),
            },
          ]"
        />
      </template>
    </JvEditTable>
    <JvDialog
      :title="$t('project.Pro_QuotationList')"
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      width="55%"
      @confirm="chooseConfirm"
      :autoFocus="true"
    >
      <div style="height: 400px">
        <JvTable :tableObj="quoteTableObj"></JvTable>
      </div>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { EditTable, QuoteTable } from "./config";
// 获取列表接口
import {
  getBudgetCostById,
  saveBudgetCost,
} from "@/api/workApi/project/budgetCost";
import { API as Quotation } from "@/api/workApi/sale/quotation";
import { amountFormat } from "@/jv_doc/utils/handleData/index";
import { getAllProjectProcess } from "@/api/workApi/project/baseData";
import Popover from "@/jv_doc/cpn/JvTable/cpn/Popover.vue";
import { uniqueMerge } from "~/utils/object";
export default {
  name: "Pm_BudgetCost",
  // 表格数据
  components: {
    Popover,
  },
  data() {
    return {
      eTableObj: {},
      quoteTableObj: {},
      toolId: "",
      cur_toolId: "",
      dialogVisible: false,
      actions: [
        {
          disabled: !!this.cur_toolId,
          // 校验
          label: this.$t("project.Pro_FromQuotation"),
          confirm: this.getSaleQuote,
        },
        {
          // 校验
          label: this.$t("Generality.Ge_New"),
          confirm: this.addProcess,
        },
        {
          // 校验
          label: this.$t("Generality.Ge_Save"),
          confirm: this.l_save,
        },
      ],
    };
  },
  methods: {
    getData() {
      if (!this.toolId) return;
      getBudgetCostById({ ToolingNo: this.toolId }).then((res) => {
        this.eTableObj.setData(res.Items);
        this.cur_toolId = JSON.parse(JSON.stringify(this.toolId));
        setTimeout(() => {
          this.eTableObj.doLayout();
        }, 200);
      });
    },
    getSaleQuote() {
      this.dialogVisible = true;
      this.quoteTableObj.getData();
      setTimeout(() => {
        this.quoteTableObj.doLayout();
      }, 200);
    },
    // 新增编辑行
    addProcess() {
      getAllProjectProcess().then((res) => {
        // uniqueMerge
        let targetArr = uniqueMerge(
          this.eTableObj.getTableData(),
          res.Items.map((item) => {
            return Object.assign(this.eTableObj.getEmptyRow(), {
              ItemName: item.Process,
            });
          }),
          "ItemName"
        );
        this.eTableObj.push(targetArr);
      });
    },
    l_insert(index) {
      let cur_row = this.eTableObj.getEmptyRow();
      let targetList = this.mixinToolId([cur_row]);
      this.eTableObj.insert(index, targetList);
    },
    l_delete(index) {
      this.eTableObj.delItem(index);
    },
    l_save() {
      this.eTableObj.validate((valid) => {
        if (valid) {
          if (!this.toolId) return;
          saveBudgetCost(this.mixinToolId(this.eTableObj.getTableData())).then(
            (_) => {
              this.getData();
            }
          );
        } else {
          // alert("fail");
        }
      });
    },
    // 混入ToolingNo
    mixinToolId(list) {
      // ToolingNo
      return list.map((item) => {
        item["ToolingNo"] = this.cur_toolId;
        return item;
      });
    },
    chooseConfirm() {
      Quotation.api_get({ BillId: this.quoteTableObj.selectData.keys[0] }).then(
        (res) => {
          this.dialogVisible = false;
          // 合并去重
          let targetArr = uniqueMerge(
            this.eTableObj.getTableData(),
            res.ProductionCost,
            "ItemName"
          );
          // 混入更新日期
          this.eTableObj.push(
            targetArr.map((item) => {
              return Object.assign(this.eTableObj.getEmptyRow(), item);
            })
          );
        }
      );
    },
  },
  computed: {
    getSummary() {
      return (row, key) => {
        row[key].value = row.Price.value * row.Quantity.value;
        return amountFormat(row[key].value);
      };
    },
  },
  created() {
    this.eTableObj = new EditTable();
    this.quoteTableObj = new QuoteTable();
  },
};
</script>

<style></style>
