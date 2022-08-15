<!--
 * @Author: H.
 * @Date: 2021-11-09 09:47:32
 * @LastEditTime: 2022-08-10 17:18:25
 * @Description: 采购退货
-->

<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <BillStateTags :state="record"></BillStateTags>
      </template>

      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
              disabled: !(
                stateEnum[row.State] && stateEnum[row.State].operation.edit
              ),
            },
            {
              label: $t('Generality.Ge_Delete'),
              disabled: !(
                stateEnum[row.State] && stateEnum[row.State].operation.del
              ),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.BillId]),
              },
            },
          ]"
        />
      </template>
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_New'),

            confirm: add.bind(),
          },
          {
            label: $t('Generality.Ge_Delete'),
            disabled: canIsDel,
            popConfirm: {
              title: $t('Generality.Ge_DeleteConfirm'),
              confirm: del.bind(),
            },
          },
        ]"
      >
      </Action>
    </JvTable>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
import { stateEnum } from "@/enum/workModule";
import { API } from "@/api/workApi/purchase/return";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import BillStateTags from "@/components/WorkModule/BillStateTags";
export default {
  name:'Pu_Return',
  data() {
    return {
      stateEnum,
      // 表格数据
      tableObj: {
        type: "",
        data: "",
      },
      transferData: {
        type: "",
        data: "",
      },
      form: {
        SortColumn: "ItemType",
        SortOrder: 4,
      },
      auditForm: {
        Remarks: "",
        BizFormId: "",
        AuditResult: "",
      },
      remarkShow: false,
      dialogFormVisible: false,
      chooseList: [],
    };
  },
  methods: {
    toDetailsList() {
      this.$router.push({
        name: "Pu_Return_Detail_list",
      });
    },
    //删除单据
    deleteOrder(id) {
      API.api_delete({ BillIds: id }).then((data) => {
        this.tableObj.getData();
      });
    },
    //新增分类
    add() {
      this.$router.push({
        name: "Pu_Return_Add",
        params: { type: "add" },
      });
    },

    //编辑
    edit(e) {
      editLock({ BillId: e.BillId }).then((res) => {
        this.$router.push({
          name: "Pu_Return_Edit",
          query: { BillId: e.BillId },
        });
      });
    },
    //批量删除单据
    del() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  mounted() {},
  computed: {
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Rejected", "Unsubmitted"].includes(item.State);
      });
    },
  },
  components: {
    BillStateTags,
  },
};
</script>

<style lang="scss" scoped></style>
