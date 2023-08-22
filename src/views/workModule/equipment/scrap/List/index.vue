<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <!-- 状态标签 -->
        <BillStateTags :state="record"></BillStateTags>
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[

            {
              label: $t('Generality.Ge_Delete'),
              disabled: getActionState(row.State, 'del'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.BillId]),
              },
            },
          ]"
        />
      </template>
      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
  // {
  //           label: '类别',
  //           confirm: mnageType,
  //         },
          {
            label: $t('Generality.Ge_Delete'),
            disabled: canIsDel,
            popConfirm: {
              title: $t('Generality.Ge_DeleteConfirm'),
              confirm: delBills,
            },
          }

        ]"
      >
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 引入单据状态的枚举
import { stateEnum } from "@/enum/workModule";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
export default {
  // 页面的标识
  name: "As_DeviceScrap",
  components: {
    // 单据状态组件
    BillStateTags,
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      machineCategory: 'Machine',
      editRouterName: "As_DeviceScrapEdit",
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    console.log(this.$route.params.DeviceNo);
    if (this.$route.params.type == "As_DeviceScrap") {
      this.tableObj.formObj.form.DeviceNo = this.$route.params.DeviceNo;
    }
    this.tableObj.formObj.form.DeviceCategory=this.machineCategory
    this.tableObj.getData();
  },
  computed: {
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Rejected", "Unsubmitted"].includes(item.State);
      });
    },
    // 获取按钮状态
    getActionState() {
      return (state, type) => {
        return !stateEnum[state]?.operation?.[type];
      };
    },
  },
  methods: {

    //删除单据
    deleteOrder(ids) {
      this.tableObj.api.del({ BillIds: ids }).then((_) => {
        this.tableObj.getData();
      });
    },

    //编辑
    editBill(row) {
      console.log(123);
      let { BillId } = row;
      this.$router.push({
        name: this.editRouterName,
        query: { BillId },
      });
    },
    //批量删除单据
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
    //跳转到类别
    mnageType(){
      this.$router.push({
        name: "As_DeviceMaintenanceType",
        query: { type:'ScrapType' },
      });
    }
  },
  watch: {
    // type: "As_DeviceScrap",
    $route(to, from) {
      if (this.$route.params.type == "As_DeviceScrap") {
        this.tableObj.formObj.form.DeviceNo = this.$route.params.DeviceNo;
        this.tableObj.formObj.form.DeviceCategory=this.machineCategory
        this.tableObj.getData();
      }
    },
  },
};
</script>
