<template>
  <JvDialog v-bind="$attrs" v-on="$listeners" @confirm="complete">
    <div style="padding: 0 30px" class="export-form-wrapper">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <!-- 文件名称 -->
        <el-form-item :label="$t('Generality.Ge_FileName')">
          <el-input style="width: 180px" v-model="form.fileName"></el-input>
        </el-form-item>
        <!-- 保存类型 -->
        <el-form-item :label="$t('Generality.Ge_SaveType')">
          <el-select v-model="form.saveType">
            <el-option
              v-for="item in saveTypeMap"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 选择数据 -->
        <el-form-item :label="$t('Generality.Ge_SelectData')">
          <el-select v-model="form.dataType">
            <el-option
              v-for="item in exportTypeMap"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </JvDialog>
</template>
<script>

import { exportTypeMap, saveTypeMap } from "@/jv_doc/maps/exportMaps"
import { export2ExcelMultiple } from "@/jv_doc/cpn/JvTable/utils/export2ExcelMultiple";
import {timeFormat} from "~/utils/time";
import {taskTypeEnum, ItemToolingStateEnum} from "@/enum/workModule";
export default {
  name: "index",
  props: {
    exportData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      saveTypeMap,
      exportTypeMap,
      columns: {},
      form: {
        fileName: "",
        saveType: "xlsx",
        dataType: "",
        checkData: [],
        multiHeaders: [],
        headers: [],
        propName: [],
        merges: [],
      }
    }
  },
  created() {
    this.init();
  },
  mounted() {
    // console.log(this.exportData)
  },
  methods: {
    // 初始化
    init() {
      this.form.fileName = this.exportData.title;
      this.form.dataType = "PAGE";
      this.columns = this.exportData.tableColumns;
    },
    // 点击确定
    complete() {
      switch (this.form.dataType) {
        case "PAGE":
          this.form.checkData = this.exportData.currentData;
          this.confirmExport();
          break;
        case "SELECTED":
          if (this.exportData.selectedData.length === 0) {
            this.$message({
              type: "warning",
              message: this.$t("setup.DataToBeExportedIsEmpty"),
            });
            return;
          } else {
            // 将表格选中的数据带入
            this.form.checkData = this.exportData.selectedData;
            this.confirmExport();
          }
          break;
        case "ALL":
          this.exportData.api(
            Object.assign({}, this.exportData.searchForm, {
              PageSize: 999,
              CurrentPage: 1,
            })
          ).then((res) => {
            this.form.checkData = res.Items;
            this.confirmExport();
          });
          break;
        case "TEMPLATE":
          this.form.checkData = [];
          this.confirmExport();
          break;
        default:
          break;
      }
    },
    // 确认导出
    confirmExport() {
      console.log('checkData:::', this.form.checkData)
        // 复杂表头
        this.form.multiHeaders = [
          this.$t('project.Pro_ToolingInfo'),
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          this.$t('project.Pro_TechnicalRequirement'),
          "",
          "",
          "",
          "",
          this.$t('menu.De_Design'),
          "",
          "",
          this.$t('menu.Pa_Program'),
          "",
          "",
          this.$t('menu.Pu_Purchase'),
          "",
          "",
          this.$t('menu.Pr_Production'),
          "",
          "",
          this.$t('stockroom.St_Assembly'),
          "",
          "",
          this.$t('production.Pr_TestTooling'),
          "",
          "",
          "",
          "",
          "",
        ];
        // 表头名
        this.form.headers = [
          this.$t('Generality.Ge_PhotoUrl'),
          this.$t('Generality.Ge_State'),
          this.$t('menu.Pm_Project'),
          this.$t('Generality.Ge_ToolingNo'),
          this.$t('Generality.Ge_ToolingName'),
          this.$t('Generality.Ge_Describe'),
          this.$t('menu.Sa_Customer'),
          this.$t('Generality.Ge_DeliveryDate'),
          this.$t('Generality.Ge_SampleDate'),
          this.$t('project.Pro_ToolingType'),

          this.$t('project.Pro_HeatTreatmentSpec'),
          this.$t('project.Pro_PlasticMaterialSpec'),
          this.$t('project.Pro_ShrinkageRateSpec'),
          this.$t('project.Pro_MoldBaseSpec'),
          this.$t('project.Pro_DemouldingCavitySpec'),

          this.$t('project.Pro_Worker'),
          this.$t('Generality.Ge_PlanStart'),
          this.$t('Generality.Ge_ActualStart'),

          this.$t('project.Pro_Worker'),
          this.$t('Generality.Ge_PlanStart'),
          this.$t('Generality.Ge_ActualStart'),

          this.$t('project.Pro_Worker'),
          this.$t('Generality.Ge_PlanStart'),
          this.$t('Generality.Ge_ActualStart'),

          this.$t('project.Pro_Worker'),
          this.$t('Generality.Ge_PlanStart'),
          this.$t('Generality.Ge_ActualStart'),

          this.$t('project.Pro_Worker'),
          this.$t('Generality.Ge_PlanStart'),
          this.$t('Generality.Ge_ActualStart'),

          'T1' + this.$t('project.Pro_Problem'),
          'T1' + this.$t('project.Pro_Solution'),
          'T2' + this.$t('project.Pro_Problem'),
          'T2' + this.$t('project.Pro_Solution'),
          'T3' + this.$t('project.Pro_Problem'),
          'T3' + this.$t('project.Pro_Solution'),
        ];
        // 导出的属性名
        this.form.propName = [
          "PhotoUrl",
          "ToolingState",
          "Project",
          "ToolingNo",
          "ToolingName",
          "Description",
          "CustomerName",
          "TDeliveryDate",
          "TSampleDate",
          "TaskType",

          "HeatTreatmentSpec",
          "PlasticMaterialSpec",
          "ShrinkageRateSpec",
          "MoldBaseSpec",
          "DemouldingCavitySpec",

          "DesignWorker",
          "DesignPlanStart",
          "DesignActualStart",

          "ProgramWorker",
          "ProgramPlanStart",
          "ProgramActualStart",

          "PurchaseWorker",
          "PurchasePlanEnd",
          "PurchaseActualStart",

          "ProductionWorker",
          "ProductionPlanStart",
          "ProductionActualStart",

          "AssyWorker",
          "AssyPlanStart",
          "AssyActualStart",

          "T1Problem",
          "T1Solution",
          "T2Problem",
          "T2Solution",
          "T3Problem",
          "T3Solution",
        ];
        // 合并的单元格
        this.form.merges = [
          "A1:J1",
          "K1:O1",
          "P1:R1",
          "S1:U1",
          "V1:X1",
          "Y1:AA1",
          "AB1:AD1",
          "AE1:AJ1",
        ];
      this.form.checkData.forEach((item) => {
        item.TDeliveryDate = timeFormat(item.TDeliveryDate,'yyyy-MM-dd');
        item.TSampleDate = timeFormat(item.TSampleDate,'yyyy-MM-dd');
        item.DesignPlanStart = timeFormat(item.DesignPlanStart,'yyyy-MM-dd');
        item.DesignActualStart = timeFormat(item.DesignActualStart,'yyyy-MM-dd');
        item.ProgramPlanStart = timeFormat(item.ProgramPlanStart,'yyyy-MM-dd');
        item.ProgramActualStart = timeFormat(item.ProgramActualStart,'yyyy-MM-dd');
        item.PurchasePlanEnd = timeFormat(item.PurchasePlanEnd,'yyyy-MM-dd');
        item.PurchaseActualStart = timeFormat(item.PurchaseActualStart,'yyyy-MM-dd');
        item.ProductionPlanStart = timeFormat(item.ProductionPlanStart,'yyyy-MM-dd');
        item.ProductionActualStart = timeFormat(item.ProductionActualStart,'yyyy-MM-dd');
        item.AssyPlanStart = timeFormat(item.AssyPlanStart,'yyyy-MM-dd');
        item.AssyActualStart = timeFormat(item.AssyActualStart,'yyyy-MM-dd');
        if (taskTypeEnum[item.TaskType]) {
          item.TaskType = taskTypeEnum[item.TaskType].name;
        }
        if (ItemToolingStateEnum[item.ToolingState]) {
          item.ToolingState = ItemToolingStateEnum[item.ToolingState].name;
        }
      })
        export2ExcelMultiple(this.form, this.close)
    },
    // 抛出关闭事件
    close() {
      this.$emit("complete");
    },
  }
}
</script>
