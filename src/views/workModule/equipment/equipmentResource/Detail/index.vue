<!--
 * @Author: your name
 * @Date: 2021-11-29 10:47:35
 * @LastEditTime: 2022-07-14 20:16:37
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
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
      <el-tab-pane v-for="pane in tabPanes" :key="pane.name" :label="pane.label" :name="pane.name"></el-tab-pane>
    </el-tabs>
    <Action slot="sticky-extra" size="small" :actions="[
      {
        label: $t('Generality.Ge_Edit'),
        confirm: editBill,
      },
      {
        label: $t('device.De_CheckScrap'),
        confirm: checkScrap,
      },
      {
        label: $t('quality.Qc_Scrapped'),
        confirm: toScrap,
      },

    ]"></Action>
    <Action slot="sticky-extra" size="small" :actions="btnAction"></Action>
    <JvBlock :title="$t('menu.Pr_Devices')" ref="first" :contentStyle="{
      paddingLeft: '150px',
      height: '140px',
      height: '300px',
    }" style="position: relative">
      <div class="mould-img">
        <el-image :preview-src-list="[imgUrlPlugin(detailObj.detailData.PhotoUrl)]" style="width: 100%; height: 100%"
          :src="imgUrlPlugin(detailObj.detailData.PhotoUrl)" fit="cover" class="items-details-Img-error">
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
          <template #MaintenanceTplId>
            <el-select v-model="Main_tpl" :placeholder="$t('Generality.Ge_PleaseSelect')">
              <el-option v-for="item in Maintenance_tpl_list" :key="item.Id" :label="item.TemplateName" :value="item.Id">
              </el-option>
            </el-select>
            <el-button type="primary" @click="chooseTPL" style="margin-left: 7px">选择</el-button>
          </template>
          <template #DeviceCurrentLife="{ record }">
            {{ record }}
          </template>

        </JvDetail>
      </div>
    </JvBlock>

    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <JvRemark :RemarkData="detailObj.detailData.Remarks"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :BillId="cur_Id"></JvFileExhibit>
    </JvBlock>
    <!-- 保养 -->
    <JvBlock :title="$t('device.De_Maintenance')" ref="maintainance">
      <JvTable :tableObj="maintenanceTableObj"> </JvTable>
      <div slot="extra">
        <el-button size="mini" type="primary" @click="toMaintenance">
            {{ $t('device.De_Maintenance') }}
        </el-button>
      </div>
    </JvBlock>
    <!-- 报修 -->
    <JvBlock :title="$t('device.De_Repair')" ref="repair">
      <JvTable :tableObj="repairTableObj"> </JvTable>
      <div slot="extra">
        <el-button size="mini" type="primary" @click="toRepair">
            {{ $t('device.De_Repair') }}
        </el-button>
      </div>
    </JvBlock>
    <!-- useTableObj -->
    <!-- 使用记录 -->
    <JvBlock :title="$t('device.De_UsageRecord')" ref="usageRecord">
      <JvTable :tableObj="useTableObj">
        <template #operation="{ row }">
          <TableAction :actions="[

            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.Id]),
              },
            },
          ]" />
        </template>
      </JvTable>
      <div slot="extra">
        <el-button size="mini" type="primary" @click="addRecord">
            {{ $t('device.De_AddUsageRecord') }}
        </el-button>
      </div>
    </JvBlock>

    <!-- 出入库记录 -->
    <JvBlock :title="$t('device.De_StockOpsRecord')" ref="stockOpsRecord">
      <JvTable :tableObj="stockOpsTableObj">

      </JvTable>
      <div slot="extra">
        <el-button size="mini" type="primary" @click="addStockOps">
            {{ $t('device.De_AddStockOpsRecord') }}
        </el-button>
      </div>
    </JvBlock>
    <!--添加使用记录弹窗-->
    <jv-dialog :title="$t('Generality.Ge_New')" width="35%" :visible.sync="dialogFormVisible" v-if="dialogFormVisible"
      @confirm="confirmAdd" :autoFocus="true">
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>
    <!--添加出入库记录弹窗-->
    <add-stock-ops :visible.sync="addStockOpsDialogFormVisible" v-if="addStockOpsDialogFormVisible"
      :transferData="stockOpsData" @confirmStockOps="confirmStockOps" :autoFocus="true">

    </add-stock-ops>
  </PageWrapper>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { Table, detailConfig } from "./config";
import {
  MaintenanceTable,
  RepairTable,
  UseTable,
  StockOpsTable,
} from "./jobRecordTableConfig";
import { formSchema } from "./formRecord";
import Detail from "@/jv_doc/class/detail/Detail";
// 引入模块API接口
import {
  API as Maintenance_tpl,
  set_maintenance_tpl,
} from "@/api/workApi/equipment/maintenance_tpl";
import { getJobRecord, } from "@/api/workApi/project/projectTask";
import { API, assets_device_get } from "@/api/workApi/equipment/device";
import { Form } from "@/jv_doc/class/form";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { taskTypeEnum } from "@/enum/workModule";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import { assets_device_usage_record_add, assets_device_usage_record_delete } from "@/api/workApi/equipment/record";
import addStockOps from "./addStockOps";
export default {
  // name: "Pm_ProjectTask_Detail",
  components: {
    JvRemark,
    JvFileExhibit,
    addStockOps,
  },
  data() {
    return {
      cur_Id: this.$route.query.DeviceNo,
      detailObj: {},
      // 工序
      tableObj: {},
      maintenanceTableObj: {},
      repairTableObj: {},
      useTableObj: {},
      stockOpsTableObj: {},
      formObj: {},
      btnAction: [],
      DynamicInfo: [],
      stockOpsData: [],
      // 编辑路由指向 谨慎删除
      editRouteName: "Pm_ProjectTask_Edit",
      printMod: "Pm_ProjectTask",
      dialogFormVisible: false,
      addStockOpsDialogFormVisible: false,
      taskTypeEnum,
      tabPanes: [
        {
          label: this.$t("menu.Pr_Devices"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "third",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
        {
          label: this.$t("device.De_Maintenance"),
          name: "maintenance",
        },
        {
          label: this.$t("device.De_Repair"),
          name: "repair",
        },
        {
          label: this.$t("device.De_UsageRecord"),
          name: "usageRecord",
        },
        {
          label: this.$t("device.De_StockOpsRecord"),
          name: "stockOpsRecord",
        },
      ],
      dynamicShow: false,
      dialogVisible: false,
      Maintenance_tpl_list: [],
      editRouterName: "As_DeviceEdit",
      toRepairRouterName: "As_DeviceRepairAdd",
      toMaintainRouterName: "As_DeviceMaintainAdd",
      toScrapRouterName: "As_DeviceScrapAdd",
      toScrapListRouterName: "As_DeviceScrap",
      Main_tpl: "",
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    ...mapGetters(["name"]),
    BillIdShow() { },
  },
  created() {
    this.ruleForm
    this.tableObj = new Table();
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 3,
    });
    this.maintenanceTableObj = new MaintenanceTable();
    this.repairTableObj = new RepairTable();
    this.useTableObj = new UseTable();
    this.stockOpsTableObj = new StockOpsTable();
    this.maintenanceTableObj.formObj.form.DeviceNo = this.cur_Id

    this.repairTableObj.formObj.form.DeviceNo = this.cur_Id
    this.useTableObj.formObj.form.DeviceNo = this.cur_Id
    this.stockOpsTableObj.formObj.form.DeviceNo = this.cur_Id
    this.getData();
    Maintenance_tpl.api_list({ CurrentPage: 1, PageSize: 99 }).then((res) => {
      console.log(res, 78978978989);
      this.Maintenance_tpl_list = res.Items;
    });
    this.formObj = new Form({
      formSchema,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },

  mounted() { },
  methods: {
    imgUrlPlugin,
    getData() {
      assets_device_get({ DeviceNo: this.cur_Id }).then((res) => {
        this.detailObj.setData(res);
        this.maintenanceTableObj.getData({ States: ["Approved", "Completed"] });
        this.repairTableObj.getData({ States: ["Approved", "Completed"] });
        this.useTableObj.getData({ States: ["Approved", "Completed"] });
        this.stockOpsTableObj.getData({ States: ["Approved", "Completed"] });
        this.Main_tpl = res.MaintenanceTplId;
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    chooseTPL() {
      set_maintenance_tpl({
        DeviceNo: this.detailObj.detailData.DeviceNo,
        TemplateId: this.Main_tpl,
      }).then((res) => {
        console.log(res, 1564545456);
      });
      // alert(this.Main_tpl);
    },
    jobRecordVisiable(row) {
      getJobRecord({ ItemId: row.Id }).then((res) => {
        this.dialogVisible = true;
        this.maintenanceTableObj.setData(res.Items);
        this.repairTableObj.setData(res.Items);
        this.useTableObj.setData(res.Items);
      });
    },
    checkScrap() {
      this.$router.push({
        name: this.toScrapListRouterName,
        params: {
          DeviceNo: this.detailObj.detailData.DeviceNo,
          type: "As_DeviceScrap",
        },
      });
    },
    // 保养
    toMaintenance() {
      this.$router.push({
        name: this.toMaintainRouterName,
        params: {
          type: "toMaintenance",
          cdata: this.detailObj.detailData,
        },
      });
    },
    // 去报修
    toRepair() {
      this.$router.push({
        name: this.toRepairRouterName,
        params: {
          type: "toRepair",
          cdata: this.detailObj.detailData,
        },
      });
    },
    toScrap() {
      this.$router.push({
        name: this.toScrapRouterName,
        params: { cdata: this.detailObj.detailData, type: "As_DeviceScrapAdd" },
      });
    },

    //编辑
    editBill() {
      this.$router.push({
        name: this.editRouterName,
        query: { DeviceNo: this.cur_Id },
      });
    },
    //添加使用记录
    addRecord() {
      this.dialogFormVisible = true
      this.formObj.form.UseDate = new Date()
      this.formObj.form.Operator = this.name
    },

    //添加出入库记录
    addStockOps() {
      this.addStockOpsDialogFormVisible = true
      this.stockOpsData = this.detailObj.detailData
    },

    //删除记录
    deleteOrder(ids) {
      assets_device_usage_record_delete(ids).then((_) => {
        this.useTableObj.getData();
      });
    },
    //保存使用记录
    confirmAdd() {
      console.log(this.formObj.form);
      this.formObj.validate((valid) => {
        console.log(valid, 999);
        if (valid) {
          this.formObj.form.DeviceNo = this.cur_Id
          assets_device_usage_record_add(this.formObj.form).then(res => {
            console.log(res);
            this.useTableObj.getData();
            this.dialogFormVisible = false
          })
        }
      })

    },


    //出入库记录
    confirmStockOps() {
      this.addStockOpsDialogFormVisible = false
      this.stockOpsTableObj.getData();
    }
  },
};
</script>

<style lang="scss" >
.mould-img {
  width: 120px;
  height: 120px;
  // background-color: pink;
  position: absolute;
  left: 10px;
  right: 200px;
}

.sum-text {
  display: inline-block;
  // padding-right: 100px;
  width: 200px;
  text-align: end;
}

.items-details-Img-error {
  background-color: rgb(231, 231, 231);

  .image-slot {
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
