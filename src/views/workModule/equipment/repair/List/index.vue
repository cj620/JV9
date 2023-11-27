<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <!-- 状态标签 -->
        <RepairStateTags :state="record" :enum="repairStateEnum"></RepairStateTags>
      </template>
<!--      <template #RepairLevel="{ record }">-->
<!--        &lt;!&ndash; 级别标签 &ndash;&gt;-->
<!--        <RepairStateTags :state="record" :enum="repairLevelEnum"></RepairStateTags>-->
<!--      </template>-->
<!--      <template #RepairCategory="{ record }">-->
<!--        &lt;!&ndash; 类别标签 &ndash;&gt;-->
<!--        <RepairStateTags :state="record" :enum="repairEnum1"></RepairStateTags>-->
<!--      </template>-->
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Copy'),
              confirm: copyBill.bind(null, row)
            },
            {
              label: $t('Generality.Ge_Edit'),
              disabled: row.State !== 'ToBeRepair',
              confirm: editBill.bind(null, row)
            },
            {
              label: $t('Generality.Ge_Delete'),
              disabled: row.State !== 'ToBeRepair' && row.State !== 'BackTo',
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
          {
            label: $t('Generality.Ge_New'),
            confirm: addOrder
          },
          {
            label: $t('Generality.Ge_Delete'),
            disabled: canIsDel,
            popConfirm: {
              title: $t('Generality.Ge_DeleteConfirm'),
              confirm: delBills,
            },
          },
          {
            label: $t('device.De_StartToRepair'),
            disabled: canIsStart,
            confirm: startRepair,
          },
          {
            label: $t('device.De_ReturnRepair'),
            disabled: canIsStart,
            confirm: returnRepair,
          },
          {
            label: $t('device.De_AddItems'),
            disabled: canIsAdd,
            confirm: addItems,
          },
          {
            label: $t('device.De_CompleteRepair'),
            disabled: canIsAdd,
            confirm: completeRepair,
          },
          {
            label: $t('device.De_CheckRepair'),
            disabled: canIsCheck,
            confirm: checkRepair,
          },
        ]"
      >
      </Action>
    </JvTable>
    <JvDialog
        :title="$t('device.De_StartToRepair')"
        v-if="startFormVisible"
        :visible.sync="startFormVisible"
        @confirm="confirmStart"
        width="30%">
      <JvForm :form-obj="startFormObj">
      </JvForm>
    </JvDialog>
    <JvDialog
        :title="$t('device.De_CheckRepair')"
        v-if="checkFormVisible"
        :visible.sync="checkFormVisible"
        @confirm="conformCheck"
        width="30%">
      <JvForm :form-obj="checkFormObj">
      </JvForm>
    </JvDialog>
    <SelectRepairItems
      :visible.sync="ItemsFormVisible"
      v-if="ItemsFormVisible"
      :transferData="transferData"
      @confirmData="confirmData"
    ></SelectRepairItems>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
import { Form } from "@/jv_doc/class/form";
import RepairStateTags from "../components/RepairStateTags.vue";
import { timeFormat } from "~/utils/time";
import { assets_device_repair_updateState, assets_device_repair_saveItems } from "@/api/workApi/equipment/repair";
import {enumToList, repairResultEnum, repairStateEnum, repairLevelEnum, repairEnum1} from "@/enum/workModule";
import SelectRepairItems from "@/views/workModule/equipment/repair/components/SelectRepairItems/SelectRepairItems.vue";
import closeTag from "@/utils/closeTag";
import {mapState} from "vuex";
export default {
  // 页面的标识
  name: "As_DeviceRepair",
  components: {
    RepairStateTags,
    SelectRepairItems,
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      startFormObj: {},
      checkFormObj: {},
      transferData: [],
      editRouterName: "As_DeviceRepairEdit",
      addRouterName: "As_DeviceRepairAdd",
      detailRouteName: "As_DeviceRepairDetail",
      startFormVisible: false,
      checkFormVisible: false,
      ItemsFormVisible: false,
      itemForm: {
        Id: 0,
        BillGui: "",
        ItemId: "",
        ItemName: "",
        Description: "",
        Unit: "",
        Quantity: 0,
        Remarks: "",
      }
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
    this.startFormObj = new Form({
      formSchema: [
        {
          prop: "PlanCompletionDate",
          label: i18n.t('device.De_PlanCompletionDate'),
          cpn: "SingleDateTime",
          rules: [
              {
                  required: true,
                  message: i18n.t("Generality.Ge_PleaseEnter"),
                  trigger: ["change", "blur"],
              },
          ],
        }
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
    this.checkFormObj = new Form({
      formSchema: [
        {
          prop: "RepairResults",
          label: i18n.t('device.De_RepairResults'),
          cpn: "FormSelect",
          options: {
            list: enumToList(repairResultEnum),
          },
          rules: [
              {
                  required: true,
                  message: i18n.t("Generality.Ge_PleaseEnter"),
                  trigger: ["change", "blur"],
              },
          ],
        }
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },
  computed: {
    repairEnum1() {
      return repairEnum1
    },
    repairLevelEnum() {
      return repairLevelEnum
    },
    repairStateEnum() {
      return repairStateEnum
    },
    ...mapState({
      current: (state) => state.page.current,
    }),
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["ToBeRepair", "BackTo"].includes(item.State);
      });
    },
    canIsStart() {
      let { datas } = this.tableObj.selectData;
      if (datas.length !== 1) return true;
      return datas[0].State !== 'ToBeRepair'
    },
    canIsAdd() {
      let { datas } = this.tableObj.selectData;
      if (datas.length !== 1) return true;
      return datas[0].State !== 'Repairing'
    },
    canIsCheck() {
      let { datas } = this.tableObj.selectData;
      if (datas.length !== 1) return true;
      return datas[0].State !== 'Repaired'
    }
  },
  methods: {
    //新增
    addOrder() {
      this.$router.push({
        name: this.addRouterName,
      });
    },
    //删除单据
    deleteOrder(ids) {
      this.tableObj.api.del({ BillIds: ids }).then((_) => {
        this.tableObj.getData();
      });
    },
    //复制
    copyBill(row) {
      let { BillId } = row;
      this.$router.push({
          name: this.addRouterName,
          query: {
              BillId,
              type: 'copy'
          },
      });
    },
    //编辑
    editBill(row) {
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
    // 开始维修
    startRepair() {
      this.startFormVisible = true
    },
    // 确认开始维修
    confirmStart() {
      this.startFormObj.validate((valid) => {
        if (valid) {
          let obj1 = {
            BillId: this.tableObj.selectData.keys[0],
            State: 1,
            PlanCompletionDate: timeFormat(this.startFormObj.form.PlanCompletionDate, "yyyy-MM-dd hh:mm:ss"),
          };
          assets_device_repair_updateState(obj1).then((res) => {
            this.tableObj.getData();
          });
          this.startFormVisible = false;
        }
      })
    },
    // 打回维修
    returnRepair() {
      assets_device_repair_updateState({
        BillId: this.tableObj.selectData.keys[0],
        State: 2,
      }).then((res) => {
        this.tableObj.getData();
      });
    },
    // 添加配件
    addItems() {
      this.ItemsFormVisible = true
      this.transferData = this.tableObj.selectData.datas[0].BillItems
    },
    // 确认添加
    confirmData(e) {
      const obj = {
        BillGui:this.tableObj.selectData.datas[0].BillGui,
        Item: e
      }
      assets_device_repair_saveItems(obj).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { BillId: this.tableObj.selectData.keys[0], },
        };
        closeTag(this.current, TagName);
      })
      this.ItemsFormVisible = false
    },
    // 完成维修
    completeRepair() {
      assets_device_repair_updateState({
        BillId: this.tableObj.selectData.keys[0],
        State: 4,
      }).then((res) => {
        this.tableObj.getData();
      });
    },
    // 验收维修
    checkRepair() {
      this.checkFormVisible = true;
    },
    // 确认验收
    conformCheck() {
      this.checkFormObj.validate((valid) => {
        if (valid) {
          assets_device_repair_updateState({
            BillId: this.tableObj.selectData.keys[0],
            State: 3,
            RepairResults: this.checkFormObj.form.RepairResults
          }).then((res) => {
            this.tableObj.getData();
          });
          this.checkFormVisible = false;
        }
      });
    },
  },
};
</script>
