<!--生产任务详情-->

<template>
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
    <Action
      slot="sticky-extra"
      size="small"
      :actions="[
        {
          label: $t('Generality.Ge_Edit'),
          confirm: edit.bind(null, detailObj.detailData.BillId),
        },
        {
          label: $t('Generality.Ge_Delete'),

          confirm: del.bind(null, detailObj.detailData.BillId),
        },
        {
          label: $t('Generality.Ge_Print'),
          confirm: print.bind(null, detailObj.detailData.BillId, false),
        },
        {
          label: $t('menu.Pr_LabelPrint'),
          confirm: print.bind(null, detailObj.detailData.BillId, true),
        },
      ]"
    ></Action>
    <!--单据信息-->
    <JvBlock :title="detailObj.detailData.BillId" ref="first">
      <div class="productionTask-details-header">
        <!---->
        <div class="productionTask-details-header-content">
          <JvDetail :detailObj="detailObj">
            <template #Level="{ record }">
              {{ LevelMap[record] && LevelMap[record].name }}
            </template>
          </JvDetail>
        </div>
        <div class="productionTask-details-header-img">
          <el-image
            :preview-src-list="[imgUrlPlugin(detailObj.detailData.PhotoUrl)]"
            class="productionTask-details-img"
            style="width: 150px; height: 150px"
            :src="imgUrlPlugin(detailObj.detailData.PhotoUrl)"
            fit="cover"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline error-icon"></i>
            </div>
          </el-image>
        </div>
      </div>
    </JvBlock>
    <JvBlock ref="second">
      <el-tabs
        v-model="activeName"
        class="productionTask-details-tab"
        @tab-click="handleClick"
      >
        <el-tab-pane :label="$t('Generality.Ge_Process')" name="first">
          <div class="productionTask-details-process-list">
            <div
              class="productionTask-details-process"
              v-for="(item, index) in processData"
              :key="index"
            >
              <div
                class="productionTask-details-process-name"
                :style="{
                  backgroundColor:
                    ProcessStateMap[item.State] &&
                    ProcessStateMap[item.State].color,
                }"
              >
                {{ item.Process }}
              </div>
              <div class="productionTask-details-process-content">
                <div class="productionTask-details-process-content-content">
                  <span>
                    <svg-icon icon-class="calendar" />
                    {{ item.PlanStart | timeFormat("yyyy-MM-dd hh:mm") }}
                  </span>
                  <span>
                    <svg-icon icon-class="calendar" />
                    {{ item.PlanEnd | timeFormat("yyyy-MM-dd hh:mm") }}
                  </span>
                  <span>
                    <svg-icon icon-class="access-alarms" />
                    {{ item.PlanTime }} H
                  </span>
                  <span>
                    <svg-icon icon-class="work-user" />
                    {{ item.Worker }}
                  </span>
                  <span>
                    <svg-icon icon-class="number(1)"></svg-icon>
                    {{ item.ProgressInfo }}
                  </span>
                  <span>
                    <svg-icon icon-class="equipment"></svg-icon>
                    {{ item.DisplayDevice }}
                  </span>
                  <span>
                    {{ item.IsCompulsoryInspection ? $t("setup.CompulsoryInspection") : '' }}
                  </span>
                </div>
                <div>
                  <svg-icon icon-class="processingContent"></svg-icon>
                  {{ item.ProcessContent }}
                </div>
              </div>
              <div class="productionTask-details-process-img">
                <el-image
                  v-for="(TItem, index) in item.ProcessPicture"
                  :key="index"
                  class="details-process-img"
                  style="width: 60px; height: 60px"
                  :src="imgUrlPlugin(TItem)"
                  :preview-src-list="[imgUrlPlugin(TItem)]"
                  fit="cover"
                ></el-image>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('Generality.Ge_Record')" name="second">
          <JvTable :table-obj="tableObj">
            <template #WorkType="{ record }">
              {{
                WorkRecordsStateEnumMap[record] &&
                WorkRecordsStateEnumMap[record].name
              }}
            </template>
          </JvTable>
        </el-tab-pane>
        <el-tab-pane :label="$t('production.Pr_PartDetail')" name="third">
          <JvTable :table-obj="tableObj1"> </JvTable>
        </el-tab-pane>
        <el-tab-pane
          :label="$t('Generality.Ge_WorkingHoursRecord')"
          name="fourth"
        >
          <JvTable :table-obj="tableObj2" ref="BillTable2">
            <template #ActualTime="{ row }">
              <span>{{ row.ActualTime.toFixed(2) }}</span>
            </template>
            <template #operation="{ row }">
              <TableAction
                :actions="[
                  {
                    label: $t('Generality.Ge_Edit'),
                    confirm: editActualEnd.bind(null, row),
                  },
                ]"
              />
            </template>
          </JvTable>
        </el-tab-pane>

        <el-tab-pane label="过程检验" name="Qc_ProcessCheckList">
          <JvTable :table-obj="Qc_ProcessCheckTableObj"> </JvTable>
        </el-tab-pane>
        <el-tab-pane label="成品检验" name="Qc_FinishedProductList">
          <JvTable :table-obj="Qc_FinishedProductTableObj"> </JvTable>
        </el-tab-pane>

        <el-tab-pane :label="$t('Generality.Ge_Dynamic')" name="fifth">
          <DynamicList
            :cdata="ProcessDynamicInfo"
            @fresh="GetData"
          ></DynamicList>
        </el-tab-pane>
      </el-tabs>
    </JvBlock>

    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <JvRemark :RemarkData="RemarkData"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :BillId="fileBillId"></JvFileExhibit>
    </JvBlock>
    <jv-dialog
      :title="$t('Generality.Ge_New')"
      width="35%"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      @confirm="confirmEditActualEnd"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "@/jv_doc/class/table";
import { Form } from "@/jv_doc/class/form";
import { timeFormat } from "@/jv_doc/utils/time";
import {
  tableConfig,
  tableConfig1,
  tableObj2,
  detailConfig,
  Qc_ProcessCheckTable,
  Qc_FinishedProductTable,
} from "./config";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import {
  getProductionTask,
  deleteProductionTask,
  update_record_actual_end,
} from "@/api/workApi/production/productionTask";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import {
  LevelEnum,
  ProcessState,
  ProductionTaskState,
  WorkRecordsStateEnum,
} from "@/enum/workModule";

import { imgUrlPlugin, printPlugin } from "@/jv_doc/utils/system/index.js";
import closeTag from "@/utils/closeTag";
import { mapState } from "vuex";
import DynamicList from "./DynamicList.vue";
export default {
  name: "index",
  data() {
    return {
      detailObj: {},
      tableObj: {},
      tableObj1: {},
      tableObj2: {},
      processData: [],
      activeName: "first",
      RemarkData: "",
      fileBillId: "",
      formObj: {},
      Qc_ProcessCheckTableObj: {},
      Qc_FinishedProductTableObj: {},
      dialogFormVisible: false,
      ProcessDynamicInfo: [],
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_ProcessInfo"),
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "third",
        },
      ],
    };
  },
  components: {
    JvRemark,
    JvFileExhibit,
    DynamicList,
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    LevelMap() {
      return LevelEnum;
    },
    ProcessStateMap() {
      return ProcessState;
    },
    ProductionTaskStateMap() {
      return ProductionTaskState;
    },
    WorkRecordsStateEnumMap() {
      return WorkRecordsStateEnum;
    },
  },
  created() {
    this.fileBillId = this.$route.query.BillId;
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
    });
    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 1650,
    });
    this.tableObj1 = new Table({
      tableSchema: tableConfig1,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 1650,
    });
    this.tableObj2 = new tableObj2();

    this.formObj = new Form({
      formSchema: [
        {
          // 字段名
          prop: "ActualEnd",
          cpn: "SingleDateTime",
          label: i18n.t("Generality.Ge_ActualEnd"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseFillIn"),
              trigger: ["change", "blur"],
            },
          ],
        },
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });

    this.Qc_FinishedProductTableObj = new Qc_FinishedProductTable();
    this.Qc_ProcessCheckTableObj = new Qc_ProcessCheckTable();
    this.GetData();
  },
  methods: {
    imgUrlPlugin,
    GetData() {
      getProductionTask({ BillId: this.$route.query.BillId }).then((res) => {
        this.detailObj.detailData = res;
        this.processData = res.Process;
        this.RemarkData = res.Remarks;
        this.tableObj.setData(res.WorkRecords);
        this.tableObj1.setData(res.Parts);
        this.tableObj2.setData(res.TaskRecords);
        this.ProcessDynamicInfo = res.ProcessDynamicInfo;
        this.Qc_ProcessCheckTableObj.setData(res.ProcessDetails);
        this.Qc_FinishedProductTableObj.setData(res.FinishedDetails);
      });
    },
    //编辑
    edit(Id) {
      editLock({ BillId: Id }).then((res) => {
        this.$router.push({
          name: "EditProductionTask",
          query: { BillId: Id },
        });
      });
    },
    //删除
    del(BillId) {
      this.$confirm(this.$t("Generality.Ge_DeleteConfirm"), {
        confirmButtonText: this.$t("Generality.Ge_OK"),
        cancelButtonText: this.$t("Generality.Ge_Cancel"),
      }).then(() => {
        deleteProductionTask({ BillIds: [BillId] }).then((res) => {
          let TagName = {
            path: "/production/productionTask",
            name: `ProductionTask`,
            fullPath: "/production/productionTask",
          };
          closeTag(this.current, TagName);
        });
      });
    },
    //打印
    print(BillId, isTag) {
      printPlugin({
        ids: [BillId],
        category: "Pr_Task",
        isTag: isTag,
      });
    },

    //编辑实际结束日期
    editActualEnd(row) {
      console.log(row);
      this.dialogFormVisible = true;
      this.formObj.form.Id = row.Id;
      this.formObj.form.ActualEnd = row.ActualEnd;
      console.log(this.formObj.form);
      /*11*/
    },

    //确认修改实际结束日期
    confirmEditActualEnd() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.formObj.form.ActualEnd = timeFormat(
            this.formObj.form.ActualEnd,
            "yyyy-MM-dd hh:mm"
          );
          update_record_actual_end(this.formObj.form).then((res) => {
            this.dialogFormVisible = false;
            this.GetData();
          });
        }
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },

    handleClick(tab, event) {
      console.log(tab.name, event);
      if (tab.name === "fourth") {
        this.$nextTick(() => {
          this.tableObj2.doLayout();
        });
      }
    },
  },
};
</script>

<style lang="scss">
.productionTask-details-header {
  display: flex;
  .productionTask-details-header-content {
    width: 90%;
  }
  .productionTask-details-header-img {
    .productionTask-details-img {
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
  }
}

.productionTask-details-tab {
  // height: 1700px;
}
.productionTask-details-process-list {
  // height: 1650px;
  overflow-y: auto;
  .productionTask-details-process {
    padding-top: 20px;
    position: relative;

    .productionTask-details-process-name {
      width: 120px;
      padding: 5px 3px;
      text-align: center;
      border: 1px solid #eee;
      border-radius: 15px;
      position: absolute;
      top: 5px;
      z-index: 3;
    }
    .productionTask-details-process-content {
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding-left: 20px;

      border: 2px solid #eee;
      height: 70px;

      .productionTask-details-process-content-content {
        padding: 5px 0;
        display: flex;
        align-items: center;
        span {
          margin-right: 20px;
        }
      }
    }
    .productionTask-details-process-img {
      position: absolute;
      top: 5px;
      z-index: 3;
      margin-left: 700px;
      .details-process-img {
        width: 60px;
        height: 60px;
        margin-right: 10px;
        box-shadow: 1px 1px 3px #b6b6b6;
      }
    }
  }
}
</style>
