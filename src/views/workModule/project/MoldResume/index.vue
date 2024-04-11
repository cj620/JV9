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
        </div>
<!--        <div class="page-wrapper-header-right">-->
<!--          <el-button type="primary" size="mini" @click="exportSelect">导出</el-button>-->
<!--        </div>-->
      </div>
      <div class="page-wrapper-body">
        <el-table
          :header-cell-style="{
            background: 'rgb(237, 237, 237)',
            borderColor: 'rgb(241, 242, 247)',
            color:'#4f4f4f',
            fontWeight: '500',
            fontSize: '14px'
          }"
          style="width: 100%;"
          height="100%"
          :data="tableData"
          @selection-change="handleSelectionChange"
          border
        >
          <el-table-column label="模具信息">
            <el-table-column prop="PhotoUrl" label="模具图片">
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
            <el-table-column prop="ToolingState" label="状态" width="120">
            </el-table-column>
            <el-table-column prop="Project" label="项目" width="130">
            </el-table-column>
            <el-table-column prop="ToolingNo" label="模具编号" width="140">
            </el-table-column>
            <el-table-column prop="ToolingName" label="模具名称" width="140">
            </el-table-column>
            <el-table-column prop="Description" label="描述" width="130">
            </el-table-column>
            <el-table-column prop="CustomerName" label="客户" width="80">
            </el-table-column>
            <el-table-column prop="TDeliveryDate" label="计划交期" width="100">
              <template slot-scope="scope">
                {{ scope.row.TDeliveryDate | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="TSampleDate" label="首样日期" width="100">
              <template slot-scope="scope">
                {{ scope.row.TDeliveryDate | timeFormat("yyyy-MM-dd") }}
              </template>
            </el-table-column>
            <el-table-column prop="TaskType" label="产品类型" width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="技术要求">
            <el-table-column prop="HeatTreatmentSpec" label="热处理" width="80">
            </el-table-column>
            <el-table-column prop="PlasticMaterialSpec" label="塑料材质" width="80">
            </el-table-column>
            <el-table-column prop="ShrinkageRateSpec" label="收缩率" width="80">
            </el-table-column>
            <el-table-column prop="MoldBaseSpec" label="模架" width="80">
            </el-table-column>
            <el-table-column prop="DemouldingCavitySpec" label="出模穴数" width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="设计">
            <el-table-column prop="DesignWorker" label="负责人" width="80">
            </el-table-column>
            <el-table-column prop="DesignPlanStart" label="计划" width="80">
            </el-table-column>
            <el-table-column prop="DesignActualStart" label="实际" width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="编程">
            <el-table-column prop="ProgramWorker" label="负责人" width="80">
            </el-table-column>
            <el-table-column prop="ProgramPlanStart" label="计划" width="80">
            </el-table-column>
            <el-table-column prop="ProgramActualStart" label="实际" width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="采购">
            <el-table-column prop="PurchaseWorker" label="负责人" width="80">
            </el-table-column>
            <el-table-column prop="PurchasePlanStart" label="计划" width="80">
            </el-table-column>
            <el-table-column prop="PurchaseActualStart" label="实际" width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="加工">
            <el-table-column prop="ProductionWorker" label="负责人" width="80">
            </el-table-column>
            <el-table-column prop="ProductionPlanStart" label="计划" width="80">
            </el-table-column>
            <el-table-column prop="ProductionActualStart" label="实际" width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="装配">
            <el-table-column prop="AssyWorker" label="负责人" width="80">
            </el-table-column>
            <el-table-column prop="AssyPlanStart" label="计划" width="80">
            </el-table-column>
            <el-table-column prop="AssyActualStart" label="实际" width="80">
            </el-table-column>
          </el-table-column>
          <el-table-column label="试模">
            <el-table-column prop="T1Problem" label="T1问题点" width="80">
            </el-table-column>
            <el-table-column prop="T1Solution" label="T1改善对策" width="80">
            </el-table-column>
            <el-table-column prop="T2Problem" label="T2问题点" width="80">
            </el-table-column>
            <el-table-column prop="T2Solution" label="T2改善对策" width="80">
            </el-table-column>
            <el-table-column prop="T3Problem" label="T3问题点" width="80">
            </el-table-column>
            <el-table-column prop="T3Solution" label="T3改善对策" width="80">
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
  </PageWrapper>
</template>
<script>
import { Form } from "~/class/form";
import { toolingSummary } from "@/api/basicApi/systemSettings/Item"
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
export default {
  name: "Pm_ProjectMoldResume",
  data() {
    return {
      searchFormObj: {},
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      totalCount: 0,
    }
  },
  created() {
    this.getData();
    this.searchFormObj = new Form({
      formSchema: [
        { prop: "ToolingNo",},
        { prop: "Project",},
      ],
    })
  },
  methods: {
    imgUrlPlugin,
    getData() {
      toolingSummary({
        PageSize: this.pageSize,
        CurrentPage: this.currentPage,
      }).then((res) => {
        this.tableData = res.Items;
        this.totalCount = res.Count;
      })
    },
    exportSelect() {

    },
    handleSelectionChange(val) {

    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
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
</style>
