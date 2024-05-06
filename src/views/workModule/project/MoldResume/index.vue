<template>
  <PageWrapper ref="page" :footer="false">
    <div class="mold-resume-page">
      <div class="page-wrapper-header">
        <div class="page-wrapper-header-left">
          <div class="page-wrapper-header-left-items">
            <div class="page-wrapper-header-left-items-desc">
              {{ $t("Generality.Ge_ToolingNo") }}:
            </div>
            <el-input :placeholder="$t('Generality.Ge_PleaseEnter')" size="mini" v-model="searchFormObj.form.ToolingNo"></el-input>
          </div>
          <div class="page-wrapper-header-left-items">
            <div class="page-wrapper-header-left-items-desc">
              {{ $t("menu.Pm_Project") }}:
            </div>
            <el-input :placeholder="$t('Generality.Ge_PleaseEnter')" size="mini" v-model="searchFormObj.form.Project"></el-input>
          </div>
          <div class="page-wrapper-header-left-items">
            <div class="page-wrapper-header-left-items-desc">
              {{ $t("menu.Sa_Customer") }}:
            </div>
            <el-input :placeholder="$t('Generality.Ge_PleaseEnter')" size="mini" v-model="searchFormObj.form.CustomerName"></el-input>
          </div>
          <div class="page-wrapper-header-left-items">
            <div class="page-wrapper-header-left-items-desc">
              {{ $t("project.Pro_ToolingType") }}:
            </div>
            <el-select :placeholder="$t('Generality.Ge_PleaseSelect')" size="mini" v-model="searchFormObj.form.TaskType" clearable>
              <el-option
                v-for="item in enumToList(taskTypeEnum)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="page-wrapper-header-left-items">
            <div class="page-wrapper-header-left-items-desc">
              {{ $t("Generality.Ge_State") }}:
            </div>
            <el-select :placeholder="$t('Generality.Ge_PleaseSelect')" size="mini" v-model="searchFormObj.form.ToolingState" clearable>
              <el-option
                v-for="item in enumToList(ItemToolingStateEnum)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="page-wrapper-header-left-items">
            <el-button type="primary" size="mini" @click="search">{{ $t('Generality.Ge_Search') }}</el-button>
            <el-button size="mini" @click="clear">{{ $t('Generality.Ge_Clear') }}</el-button>
          </div>
        </div>
        <div class="page-wrapper-header-right">
          <el-button type="primary" size="mini" @click="exportSelect">{{ $t('Generality.Ge_Export') }}</el-button>
        </div>
      </div>
      <div class="page-wrapper-body">
        <el-table
          :header-cell-style="{
            background: 'rgb(237, 237, 237)',
            borderColor: 'rgb(241, 242, 247)',
            color:'#4f4f4f',
            fontWeight: '500',
            fontSize: '14px',
          }"
          style="width: 100%;"
          height="100%"
          :data="tableData"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column
            type="selection"
            align="center"
            fixed
            width="55">
          </el-table-column>
          <el-table-column :label="$t('project.Pro_ToolingInfo')">
            <el-table-column prop="PhotoUrl" :label="$t('Generality.Ge_PhotoUrl')">
              <template slot-scope="scope">
                <el-image
                  :src="imgUrlPlugin(scope.row.PhotoUrl)"
                  style="height: 38px;width: 38px;"
                  :preview-src-list="[imgUrlPlugin(scope.row.PhotoUrl)]"
                  fit="cover"
                  class="items-details-Img-error"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="ToolingState" :label="$t('Generality.Ge_State')" width="80">
              <template slot-scope="scope">
                <!-- 状态标签 -->
                {{ ItemToolingStateEnum[scope.row.ToolingState] ? ItemToolingStateEnum[scope.row.ToolingState].name : '--' }}
              </template>
            </el-table-column>
            <el-table-column prop="Project" :label="$t('menu.Pm_Project')" :show-overflow-tooltip="true" width="130">
            </el-table-column>
            <el-table-column prop="ToolingNo" :label="$t('Generality.Ge_ToolingNo')" :show-overflow-tooltip="true" width="140">
              <template slot-scope="scope">
                <el-button size="mini" style="font-size: 13px" type="text" @click="toToolingDetail(scope.row.ToolingNo)"> {{ scope.row.ToolingNo }} </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="ToolingName" :label="$t('Generality.Ge_ToolingName')" :show-overflow-tooltip="true" width="140">
            </el-table-column>
            <el-table-column prop="Description" :label="$t('Generality.Ge_Describe')" :show-overflow-tooltip="true" width="130">
            </el-table-column>
            <el-table-column prop="CustomerName" :label="$t('menu.Sa_Customer')" width="120">
            </el-table-column>
            <el-table-column prop="TDeliveryDate" :label="$t('Generality.Ge_DeliveryDate')" width="100">
              <template slot-scope="scope">
                {{ scope.row.TDeliveryDate | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="TSampleDate" :label="$t('Generality.Ge_SampleDate')" width="100">
              <template slot-scope="scope">
                {{ scope.row.TDeliveryDate | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="TaskType" :label="$t('project.Pro_ToolingType')" width="80">
              <template slot-scope="scope">
                <!-- 状态标签 -->
                {{ taskTypeEnum[scope.row.TaskType].name }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('project.Pro_TechnicalRequirement')">
            <el-table-column prop="HeatTreatmentSpec" :label="$t('project.Pro_HeatTreatmentSpec')" width="80">
            </el-table-column>
            <el-table-column prop="PlasticMaterialSpec" :label="$t('project.Pro_PlasticMaterialSpec')" width="80">
            </el-table-column>
            <el-table-column prop="ShrinkageRateSpec" :label="$t('project.Pro_ShrinkageRateSpec')" width="80">
            </el-table-column>
            <el-table-column prop="MoldBaseSpec" :label="$t('project.Pro_MoldBaseSpec')" width="80">
            </el-table-column>
            <el-table-column prop="DemouldingCavitySpec" :label="$t('project.Pro_DemouldingCavitySpec')" width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('menu.De_Design')">
            <el-table-column prop="DesignWorker" :label="$t('project.Pro_Worker')" width="120">
            </el-table-column>
            <el-table-column prop="DesignPlanStart" :label="$t('Generality.Ge_PlanStart')" width="100">
              <template slot-scope="scope">
                {{ scope.row.DesignPlanStart | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="DesignActualStart" :label="$t('Generality.Ge_ActualStart')" width="100">
              <template slot-scope="scope">
                {{ scope.row.DesignActualStart | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('menu.Pa_Program')">
            <el-table-column prop="ProgramWorker" :label="$t('project.Pro_Worker')" width="120">
            </el-table-column>
            <el-table-column prop="ProgramPlanStart" :label="$t('Generality.Ge_PlanStart')" width="100">
              <template slot-scope="scope">
                {{ scope.row.ProgramPlanStart | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="ProgramActualStart" :label="$t('Generality.Ge_ActualStart')" width="100">
              <template slot-scope="scope">
                {{ scope.row.ProgramActualStart | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('menu.Pu_Purchase')">
            <el-table-column prop="PurchaseWorker" :label="$t('project.Pro_Worker')" width="120">
            </el-table-column>
            <el-table-column prop="PurchasePlanEnd" :label="$t('Generality.Ge_PlanEnd')" width="100">
              <template slot-scope="scope">
                {{ scope.row.PurchasePlanEnd | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="PurchaseActualStart" :label="$t('Generality.Ge_ActualStart')" width="100">
              <template slot-scope="scope">
                {{ scope.row.PurchaseActualStart | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('menu.Pr_Production')">
            <el-table-column prop="ProductionWorker" :label="$t('project.Pro_Worker')" width="120">
            </el-table-column>
            <el-table-column prop="ProductionPlanStart" :label="$t('Generality.Ge_PlanStart')" width="100">
              <template slot-scope="scope">
                {{ scope.row.ProductionPlanStart | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="ProductionActualStart" :label="$t('Generality.Ge_ActualStart')" width="100">
              <template slot-scope="scope">
                {{ scope.row.ProductionActualStart | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('stockroom.St_Assembly')">
            <el-table-column prop="AssyWorker" :label="$t('project.Pro_Worker')" width="120">
            </el-table-column>
            <el-table-column prop="AssyPlanStart" :label="$t('Generality.Ge_PlanStart')" width="100">
              <template slot-scope="scope">
                {{ scope.row.AssyPlanStart | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="AssyActualStart" :label="$t('Generality.Ge_ActualStart')" width="100">
              <template slot-scope="scope">
                {{ scope.row.AssyActualStart | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column :label="$t('production.Pr_TestTooling')">
            <el-table-column prop="T1Problem" :label="'T1' + $t('project.Pro_Problem')" :show-overflow-tooltip="true" width="150">
            </el-table-column>
            <el-table-column prop="T1Solution" :label="'T1' + $t('project.Pro_Solution')" :show-overflow-tooltip="true" width="150">
            </el-table-column>
            <el-table-column prop="T2Problem" :label="'T2' + $t('project.Pro_Problem')" :show-overflow-tooltip="true" width="150">
            </el-table-column>
            <el-table-column prop="T2Solution" :label="'T2' + $t('project.Pro_Solution')" :show-overflow-tooltip="true" width="150">
            </el-table-column>
            <el-table-column prop="T3Problem" :label="'T3' + $t('project.Pro_Problem')" :show-overflow-tooltip="true" width="150">
            </el-table-column>
            <el-table-column prop="T3Solution" :label="'T3' + $t('project.Pro_Solution')" :show-overflow-tooltip="true" width="150">
            </el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="page-wrapper-footer">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20, 30, 50]"
          :page-size="pageSize"
          layout="sizes, total, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <ExportSelect
      v-if="exportDialogShow"
      :visible.sync="exportDialogShow"
      :title="$t('Generality.Ge_Export')"
      :exportData="exportData"
      width="400px"
      @complete="exportDialogShow = false"
    ></ExportSelect>
  </PageWrapper>
</template>
<script>
import { Form } from "~/class/form";
import { toolingSummary } from "@/api/basicApi/systemSettings/Item"
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { enumToList, taskTypeEnum, ItemToolingStateEnum } from "@/enum/workModule";
import ExportSelect from "./components/exportSelect.vue";
export default {
  name: "Pm_ProjectMoldResume",
  components: {
    ExportSelect,
  },
  data() {
    return {
      taskTypeEnum,
      ItemToolingStateEnum,
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
      searchFormObj: {},
      exportDialogShow: false,
      exportData: {
        title: this.$t("menu.Pm_ProjectMoldResume"),
        selectedData: [],
        currentData: [],
        api: toolingSummary,
        searchForm: {},
        tableColumns: [
          {
            label: this.$t('project.Pro_ToolingInfo'),
            children: [
              // { label: this.$t('Generality.Ge_PhotoUrl'), prop: 'PhotoUrl' },
              { label: this.$t('Generality.Ge_State'), prop: 'ToolingState' },
              { label: this.$t('menu.Pm_Project'), prop: 'Project' },
              { label: this.$t('Generality.Ge_ToolingNo'), prop: 'ToolingNo' },
              { label: this.$t('Generality.Ge_ToolingName'), prop: 'ToolingName' },
              { label: this.$t('Generality.Ge_Describe'), prop: 'Description' },
              { label: this.$t('menu.Sa_Customer'), prop: 'CustomerName' },
              { label: this.$t('Generality.Ge_DeliveryDate'), prop: 'TDeliveryDate' },
              { label: this.$t('Generality.Ge_SampleDate'), prop: 'TSampleDate' },
              { label: this.$t('project.Pro_ToolingType'), prop: 'TaskType' },
            ]
          },
          {
            label: this.$t('project.Pro_TechnicalRequirement'),
            children: [
              { label: this.$t('project.Pro_HeatTreatmentSpec'), prop: 'HeatTreatmentSpec' },
              { label: this.$t('project.Pro_PlasticMaterialSpec'), prop: 'PlasticMaterialSpec' },
              { label: this.$t('project.Pro_ShrinkageRateSpec'), prop: 'ShrinkageRateSpec' },
              { label: this.$t('project.Pro_MoldBaseSpec'), prop: 'MoldBaseSpec' },
              { label: this.$t('project.Pro_DemouldingCavitySpec'), prop: 'DemouldingCavitySpec' },
            ]
          },
          {
            label: this.$t('menu.De_Design'),
            children: [
              { label: this.$t('project.Pro_Worker'), prop: 'DesignWorker' },
              { label: this.$t('Generality.Ge_PlanStart'), prop: 'DesignPlanStart' },
              { label: this.$t('Generality.Ge_ActualStart'), prop: 'DesignActualStart' },
            ]
          },
          {
            label: this.$t('menu.Pa_Program'),
            children: [
              { label: this.$t('project.Pro_Worker'), prop: 'ProgramWorker' },
              { label: this.$t('Generality.Ge_PlanStart'), prop: 'ProgramPlanStart' },
              { label: this.$t('Generality.Ge_ActualStart'), prop: 'ProgramActualStart' },
            ]
          },
          {
            label: this.$t('menu.Pu_Purchase'),
            children: [
              { label: this.$t('project.Pro_Worker'), prop: 'PurchaseWorker' },
              { label: this.$t('Generality.Ge_PlanStart'), prop: 'PurchasePlanEnd' },
              { label: this.$t('Generality.Ge_ActualStart'), prop: 'PurchaseActualStart' },
            ]
          },
          {
            label: this.$t('menu.Pr_Production'),
            children: [
              { label: this.$t('project.Pro_Worker'), prop: 'ProductionWorker' },
              { label: this.$t('Generality.Ge_PlanStart'), prop: 'ProductionPlanStart' },
              { label: this.$t('Generality.Ge_ActualStart'), prop: 'ProductionActualStart' },
            ]
          },
          {
            label: this.$t('stockroom.St_Assembly'),
            children: [
              { label: this.$t('project.Pro_Worker'), prop: 'AssyWorker' },
              { label: this.$t('Generality.Ge_PlanStart'), prop: 'AssyPlanStart' },
              { label: this.$t('Generality.Ge_ActualStart'), prop: 'AssyActualStart' },
            ]
          },
          {
            label: this.$t('production.Pr_TestTooling'),
            children: [
              { label: 'T1' + this.$t('project.Pro_Problem'), prop: 'T1Problem' },
              { label: 'T1' + this.$t('project.Pro_Solution'), prop: 'T1Solution' },
              { label: 'T2' + this.$t('project.Pro_Problem'), prop: 'T2Problem' },
              { label: 'T2' + this.$t('project.Pro_Solution'), prop: 'T2Solution' },
              { label: 'T3' + this.$t('project.Pro_Problem'), prop: 'T3Problem' },
              { label: 'T3' + this.$t('project.Pro_Solution'), prop: 'T3Solution' },
            ]
          }
        ]
      }
    }
  },
  created() {
    this.searchFormObj = new Form({
      formSchema: [
        { prop: "ToolingNo",},
        { prop: "Project",},
        { prop: "CustomerName",},
        { prop: "TaskType",},
        { prop: "ToolingState",},
      ],
    })
    this.getData();
  },
  methods: {
    enumToList,
    imgUrlPlugin,
    getData() {
      toolingSummary({
        PageSize: this.pageSize,
        CurrentPage: this.currentPage,
        ...this.searchFormObj.form,
      }).then((res) => {
        this.tableData = res.Items;
        this.totalCount = res.Count;
        this.exportData.currentData = res.Items;
      })
    },
    exportSelect() {
      this.exportData.searchForm = this.searchFormObj.form;
      this.exportDialogShow = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleSelectionChange(val) {
      this.exportData.selectedData = val;
    },
    search() {
      toolingSummary({
        PageSize: 20,
        CurrentPage: 1,
        ...this.searchFormObj.form,
      }).then((res) => {
        this.tableData = res.Items;
        this.totalCount = res.Count;
        this.exportData.currentData = res.Items;
      })
    },
    clear() {
      this.searchFormObj.reset();
      this.search();
    },
    toToolingDetail(e) {
      this.$router.push({
        name: "ProjectManage_MouldDetail",
        query: { BillId: e },
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.items-details-Img-error {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .error-icon {
      font-size: 19px;
    }
  }
}
.mold-resume-page {
  height: 100%;
  background-color: #ffffff;
  padding: 5px 15px 0 15px;
  .page-wrapper-header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .page-wrapper-header-left {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .page-wrapper-header-left-items {
        display: flex;
        align-items: center;
        margin-right: 20px;
        .page-wrapper-header-left-items-desc {
          white-space: nowrap;
          margin-right: 10px;
        }
      }
    }
  }
  .page-wrapper-body {
    width: 100%;
    height: calc(100% - 85px);
    padding-top: 5px;
  }
  .page-wrapper-footer {
    height: 40px;
    display: flex;
    justify-content: right;
    align-items: center;
  }
}

::v-deep th {
  padding: 5px 0 !important;
}
::v-deep td {
  padding: 5px 0 !important;
}

</style>
