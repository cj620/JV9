<!--
 * @Author: your name
 * @Date: 2021-11-29 10:47:35
 * @LastEditTime: 2022-06-02 09:01:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectTask\Detail\c-menu.vue
-->
<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <el-tabs @tab-click="tabClick" slot="sticky-tabs">
      <!-- tab 导航栏  -->
      <el-tab-pane
        v-for="pane in tabPanes"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      ></el-tab-pane>
    </el-tabs>
    <Action slot="sticky-extra" size="small" :actions="btnAction"></Action>

    <JvBlock
      :title="$t('Generality.Ge_BillInfo')"
      ref="first"
      :contentStyle="{
        paddingLeft: '150px',
        height: '280px',

      }"
      style="position: relative"
    >
      <div class="mould-img">
        <el-image
          :preview-src-list="[imgUrlPlugin(detailObj.detailData.PhotoUrl)]"
          style="width: 100%; height: 100%"
          :src="imgUrlPlugin(detailObj.detailData.PhotoUrl)"
          fit="cover"
          class="items-details-Img-error"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
        </JvDetail>
        <RepairState :state="detailObj.detailData.State"></RepairState>
      </div>
    </JvBlock>
    <!--报修配件-->
    <JvBlock :title="$t('device.De_DeviceRepairItem')" ref="second">
      <div slot="extra">
          <el-button size="mini" @click="addItems" :disabled="canAddItems">{{
              $t("device.De_AddItems")
              }}</el-button>
          <el-button size="mini" @click="editNumber" :disabled="canEditItems">{{
              $t("device.De_EditItem")
              }}</el-button>
      </div>
      <JvTable :table-obj="tableObj"> </JvTable>
    </JvBlock>
    <!--问题描述-->
    <JvBlock :title="$t('device.De_ProblemDescription')" ref="third">
      <RepairDescription :DesData="detailObj.detailData.ProblemDescription"></RepairDescription>
    </JvBlock>
    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="fourth">
      <JvRemark :RemarkData="detailObj.detailData.Remarks"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fifth">
      <JvFileExhibit :BillId="cur_Id"></JvFileExhibit>
    </JvBlock>
    <!--开始检修-->
    <JvDialog
        :title="$t('device.De_StartToRepair')"
        v-if="startFormVisible"
        :visible.sync="startFormVisible"
        @confirm="confirmStart"
        width="30%">
      <JvForm :form-obj="startFormObj">
      </JvForm>
    </JvDialog>
    <!--选择配件-->
    <SelectRepairItems
        :visible.sync="ItemsFormVisible"
        v-if="ItemsFormVisible"
        :transferData="transferData"
        @confirmData="confirmData"
    ></SelectRepairItems>
    <!--维修验收-->
    <JvDialog
        :title="$t('device.De_CheckRepair')"
        v-if="checkFormVisible"
        :visible.sync="checkFormVisible"
        @confirm="conformCheck"
        width="30%">
      <JvForm :form-obj="checkFormObj">
      </JvForm>
    </JvDialog>
    <!--编辑配件-->
    <JvDialog
        :title="$t('device.De_EditItem')"
        v-if="editNumVisible"
        :visible.sync="editNumVisible"
        @confirm="confirmToEdit"
        width="45%">
        <JvTable :table-obj="editTableObj">
          <template #operation="{ row }">
            <TableAction
              :actions="[
                {
                  label: $t('Generality.Ge_Delete'),
                  confirm: deleteItems.bind(null, row)
                },
              ]"
            ></TableAction>
          </template>
          <template #Quantity="{ row }">
            <el-input
              v-model="row.Quantity"
              size="mini"
              style="width: 158px"
            ></el-input>
          </template>
        </JvTable>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { mapState } from "vuex";
import {
  API as Repair,
  assets_device_repair_completed,
  assets_device_repair_delete, assets_device_repair_saveItems,
  assets_device_repair_updateState,
} from "@/api/workApi/equipment/repair";
import { detailConfig, itemTableConfig } from "./config";
import Detail from "@/jv_doc/class/detail/Detail";
import {enumToList, repairResultEnum, repairStateEnum} from "@/enum/workModule";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import RepairDescription from "@/views/workModule/equipment/repair/components/RepairDescription.vue";
import RepairState from "../components/RepairState.vue"
import { Table } from "~/class/table";
import closeTag from "@/utils/closeTag";
import { Form } from "@/jv_doc/class/form";
import { timeFormat } from "~/utils/time";
import SelectRepairItems from "@/views/workModule/equipment/repair/components/SelectRepairItems/SelectRepairItems.vue";

export default {
  components: {
    SelectRepairItems,
    JvRemark,
    JvFileExhibit,
    RepairDescription,
    RepairState,
  },
  data() {
    return {
      repairStateEnum,
      cur_Id: this.$route.query.BillId,
      cur_BillGui: 0,
      detailObj: {},
      tableObj: {},
      startFormObj: {},
      editTableObj: {},
      checkFormObj: {},
      btnAction: [],
      state: "",
      BillItems: [],
      transferData: [],//待处理，是否需要判断物料重复
      startFormVisible: false,
      ItemsFormVisible: false,
      checkFormVisible: false,
      editNumVisible: false,
      editRouteName: "As_DeviceRepairEdit",
      addRouterName: "As_DeviceRepairAdd",
      listRouteName: "As_DeviceRepair",
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("device.De_DeviceRepairItem"),
          name: "second",
        },
        {
          label: this.$t('device.De_ProblemDescription'),
          name: "third"
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "fourth",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fifth",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    canAddItems(){
      return this.state !== "Repairing" || this.detailObj.detailData.MaintenancePersonnel !== this.$store.state.user.name
    },
    canEditItems(){
      return this.state !== "Repairing" || this.tableObj.tableData.length === 0 || this.detailObj.detailData.MaintenancePersonnel !== this.$store.state.user.name
    },
  },
  created() {
    this.tableObj = new Table({
      tableSchema: itemTableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    })
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 3,
    });
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
    this.editTableObj = new Table({
      tableSchema: [
        {
          prop: "ItemId",
          label: i18n.t("Generality.Ge_ItemId"),
        },
        {
          prop: "ItemName",
          label: i18n.t("Generality.Ge_ItemName"),
        },
        {
          prop: "Quantity",
          label: i18n.t("Generality.Ge_Quantity"),
          custom: true,
          width: "180px",
        },
      ],
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      operationWidth: 100,
      tableHeaderShow: false,
    })
    this.getData();
  },
  mounted() {},
  methods: {
    imgUrlPlugin,
    getData() {
      Repair.api_get({ BillId: this.cur_Id }).then((res) => {
        this.cur_BillGui = res.BillGui
        this.state = res.State
        this.transferData = res.BillItems
        this.BillItems = res.BillItems.map(item => {
          return {
            ...item
          }
        })
        this.detailObj.setData(res);
        this.tableObj.setData(res.BillItems);
        this.editTableObj.setData(this.BillItems);
        this.btnAction = [
          // 复制
          {
            label: this.$t('Generality.Ge_Copy'),
            confirm: this.copyBill,
          },
          // 编辑
          {
            label: this.$t("Generality.Ge_Edit"),
            disabled: !((res.State === "ToBeRepair" || res.State === "BackTo") &&
                res.RepairApplicant === this.$store.state.user.name),
            confirm: this.editBill,
          },
          // 删除
          {
            label: this.$t("Generality.Ge_Delete"),
            disabled: !((res.State === "ToBeRepair" || res.State === "BackTo") &&
                res.RepairApplicant === this.$store.state.user.name),
            popConfirm: {
              title: this.$t("Generality.Ge_DeleteConfirm"),
              confirm: this.deleteBill
            },
          },
          // 开始维修
          {
            label: this.$t('device.De_StartToRepair'),
            disabled: !(res.State === "ToBeRepair" && res.MaintenancePersonnel === this.$store.state.user.name),
            confirm: this.startRepair,
          },
          // 打回
          {
            label: this.$t('device.De_ReturnRepair'),
            disabled: !(res.State === "ToBeRepair" && res.MaintenancePersonnel === this.$store.state.user.name),
            confirm: this.returnRepair,
          },
          // 维修完成
          {
            label: this.$t('device.De_CompleteRepair'),
            disabled: !(res.State === "Repairing" && res.MaintenancePersonnel === this.$store.state.user.name),
            confirm: this.completeRepair,
          },
          // 维修验收
          {
            label: this.$t('device.De_CheckRepair'),
            disabled: !(res.State === "Repaired" && res.RepairApplicant === this.$store.state.user.name),
            confirm: this.checkRepair,
          },
        ]
      });
    },
    // 复制
    copyBill(){
      this.$router.push({
        name: this.addRouterName,
        query: {
          BillId: this.cur_Id,
          type: 'copy'
        },
      });
    },
    // 编辑
    editBill(){
      this.$router.push({
        name: this.editRouteName,
        query: { BillId: this.cur_Id },
      });
    },
    // 删除
    deleteBill(){
      assets_device_repair_delete({ BillIds: [this.cur_Id] }).then((_) => {
        let TagName = {
          name: this.listRouteName,
        };
        closeTag(this.current, TagName);
      });
    },
    // 开始维修
    startRepair() {
      this.startFormVisible = true
    },
    // 确认开始
    confirmStart() {
      this.startFormObj.validate((valid) => {
        if (valid) {
          let obj1 = {
            BillId: this.cur_Id,
            State: 1,
            PlanCompletionDate: timeFormat(this.startFormObj.form.PlanCompletionDate, "yyyy-MM-dd hh:mm:ss"),
          };
          assets_device_repair_updateState(obj1).then((res) => {
            this.getData();
          });
          this.startFormVisible = false;
        }
      })
    },
    // 打回
    returnRepair() {
      assets_device_repair_updateState({
        BillId: this.cur_Id,
        State: 2,
      }).then((res) => {
        this.getData();
      });
    },
    // 添加物料
    addItems() {
      this.ItemsFormVisible = true
    },
    // 确认物料
    confirmData(e) {
      const obj = {
        BillGui: this.cur_BillGui,
        Item: e
      }
      assets_device_repair_saveItems(obj).then((res) => {
        this.getData();
      })
      this.ItemsFormVisible = false
    },
    // 修改配件
    editNumber() {
      this.editNumVisible = true
      this.editTableObj.setData(this.BillItems);
    },
    // 删除配件
    deleteItems(row) {
      const arr = this.editTableObj.getTableData()
      this.editTableObj.setData(arr.filter(item => item.ItemId !== row.ItemId))
    },
    // 确认修改
    confirmToEdit() {
      const obj = {
        BillGui: this.cur_BillGui,
        Item: this.editTableObj.getTableData()
      }
      assets_device_repair_saveItems(obj).then((res) => {
        this.getData();
      })
      this.editNumVisible = false
    },
    // 完成维修
    completeRepair() {
      assets_device_repair_updateState({
        BillId: this.cur_Id,
        State: 4,
      }).then((res) => {
        this.getData();
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
            BillId: this.cur_Id,
            State: 3,
            RepairResults: this.checkFormObj.form.RepairResults
          }).then((res) => {
            this.getData();
          });
          this.checkFormVisible = false;
        }
      })
    },
    // // 完成单据
    // successOutsourcing() {
    //   assets_device_repair_completed({ BillId: this.cur_Id }).then(() => {
    //     this.getData();
    //   });
    // },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
};
</script>

<style lang="scss" scoped>
.mould-img {
  width: 120px;
  height: 120px;
  // background-color: pink;
  position: absolute;
  left: 10px;
  right: 200px;
}
.items-details-Img-error {
  background-color: rgb(231, 231, 231);
  ::v-deep .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: rgb(161, 161, 161);
    .error-icon {
      color: rgb(161, 161, 161);
      font-size: 19px;
    }
  }
}
</style>
