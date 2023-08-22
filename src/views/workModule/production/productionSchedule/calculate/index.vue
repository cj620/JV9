<template>
  <PageWrapper :footer="false">
    <div class="calculate-result">
      <Action
          class="calculate-result-btn"
          size="mini"
          :actions="[
            {
              label: $t('production.Pr_Calculate'),
              confirm: recalculate.bind(null),
            },
            {
              label: $t('Generality.Ge_FinishSchedule'),
              confirm: endSchedule.bind(null),
            },
            {
              label: $t('production.Pr_EditDeliveryDate'),
              confirm: editDeliveryDate.bind(null),
            },
            {
              label: $t('production.Pr_OneClickProcessing'),
              confirm: oneClick.bind(null),
            },
          ]"
      >
      </Action>

      <!-- 表格 -->
      <div class="calculate-result-table">
        <el-table
          ref="BillTable"
          :data="tableData"
          border
          height="90%"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="center" width="55">
          </el-table-column>

          <el-table-column type="expand">
            <template slot-scope="props">
              <div style="padding: 0 40px">
                <el-table :data="props.row.Process" style="width: 100%" border>
                  <el-table-column
                    :label="$t('Generality.Ge_Process')"
                    prop="Process"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('Generality.Ge_PlanTime')"
                    prop="PlanTime"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('Generality.Ge_PlanStart')"
                    prop="PlanStart"
                    width="160"
                  >
                    <template slot-scope="scope">
                      {{
                        scope.row.PlanStart | timeFormat("yyyy-MM-dd hh:mm:ss")
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('Generality.Ge_PlanEnd')"
                    prop="PlanEnd"
                    width="160"
                  >
                    <template slot-scope="scope">
                      {{
                        scope.row.PlanEnd | timeFormat("yyyy-MM-dd hh:mm:ss")
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('Generality.Ge_State')" prop="State">
                    <template slot-scope="scope">
                      {{
                        ProcessStateMap[scope.row.State] &&
                        ProcessStateMap[scope.row.State].name
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('production.Pr_SchedulingResults')"
                    prop="ApsState"
                  >
                    <template slot-scope="scope">
                      {{
                        ApsStateMap[scope.row.ApsState] &&
                        ApsStateMap[scope.row.ApsState].name
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('production.Pr_PlanSource')"
                    prop="ApsSource"
                  >
                    <template slot-scope="scope">
                      {{
                        ApsSourceMap[scope.row.ApsSource] &&
                        ApsSourceMap[scope.row.ApsSource].name
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('production.Pr_PlanningDevices')"
                    prop="PlanDevice"
                  >
                  </el-table-column>
                  <el-table-column
                    :label="$t('Generality.Ge_Operate')"
                    width="120px"
                  >
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        @click="editOverload(scope.$index, scope.row)"
                        >{{ $t("Generality.Ge_Edit") }}</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t('Generality.Ge_BillId')" prop="BillId">
          </el-table-column>
          <el-table-column :label="$t('Generality.Ge_PhotoUrl')" prop="PhotoUrl">
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
          <el-table-column :label="$t('Generality.Ge_PartNo')" prop="PartNo">
          </el-table-column>
          <el-table-column
            :label="$t('Generality.Ge_PlanStart')"
            prop="PlanStart"
          >
            <template slot-scope="scope">
              {{ scope.row.PlanStart | timeFormat("yyyy-MM-dd hh:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('Generality.Ge_PlanEnd')" prop="PlanEnd">
            <template slot-scope="scope">
              {{ scope.row.PlanEnd | timeFormat("yyyy-MM-dd hh:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('Generality.Ge_ResultDescription')"
            prop="ApsRemarks"
          >
            <template slot-scope="scope">
              {{ ApsRemarksMap[scope.row.ApsRemarks].name }}
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('Generality.Ge_Operate')"
            width="100px"
            prop=""
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="editDate(scope.$index, scope.row)"
                >{{ $t("production.Pr_EditDeliveryDate") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <editDelivery
      :visible.sync="editDeliveryDialogFormVisible"
      v-if="editDeliveryDialogFormVisible"
      :editDeliveryData="editDeliveryData"
      :editDeliveryType="editDeliveryType"
      @cancel="cancel"
    ></editDelivery>
    <editOverload
      :visible.sync="editOverloadDialogFormVisible"
      v-if="editOverloadDialogFormVisible"
      :editOverloadData="editOverloadData"
      @editOverloadCancel="editOverloadCancel"
    ></editOverload>
  </PageWrapper>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import closeTag from "@/utils/closeTag";
import { LevelEnum, ProcessState } from "@/enum/workModule";
import editDelivery from "./components/editDelivery";
import editOverload from "./components/editOverload";
import { do_aps ,one_click_processing } from "@/api/workApi/production/aps";
import { mapState } from "vuex";
export default {
  name: "ProductionScheduleCalculate",
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      editDeliveryData: {},
      editOverloadData: {},
      ApsRemarksMap: {
        Overdue: {
          name: this.$t("production.Pr_OverDeliveryDate"),
        },
        Overload: {
          name: this.$t("production.Pr_Overload"),
        },
      },
      ApsSourceMap: {
        Auto: {
          name: this.$t("production.Pr_Automatic"),
        },
        Manual: {
          name: this.$t("production.Pr_ManualScheduling"),
        },
      },
      ApsStateMap: {
        Normal: {
          name: this.$t("production.Pr_Normal"),
        },
        Error: {
          name: this.$t("production.Pr_Error"),
        },
      },
      editDeliveryDialogFormVisible: false,
      editOverloadDialogFormVisible: false,
      editDeliveryType:'noBatch'
    };
  },
  components: {
    editDelivery,
    editOverload,
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    ProcessStateMap() {
      return ProcessState;
    },
  },
  created() {
    console.log(this.$route.params.data,this.$route.params.SchedulingType);
    this.tableData = this.$route.params.data;
  },
  methods: {
	  imgUrlPlugin,
    add() {},
        //批量修改交期
        editDeliveryDate(){
      if (this.multipleSelection.length > 0) {
        this.editDeliveryDialogFormVisible = true;
        this.editDeliveryType = 'batch'
        this.editDeliveryData =this.multipleSelection
      }else {
        this.$message.warning(this.$t("Generality.Ge_CheckDetails"));
      }
    },
    //修改交期
    editDate(index, row) {
      this.editDeliveryDialogFormVisible = true;
      this.editDeliveryType = 'noBatch'
      this.editDeliveryData = [row];
    },
    //取消修改交期弹窗
    cancel() {
      this.editDeliveryDialogFormVisible = false;
    },
    //一键处理
    oneClick(){
		  one_click_processing(this.tableData).then(()=>{
        let TagName = {
          name: "ProductionSchedule",
        };
        closeTag(this.current, TagName);
		  })
    },
    //编辑负荷
    editOverload(index, row) {
      console.log(index, row);
      this.editOverloadDialogFormVisible = true;
      this.editOverloadData = row;
    },
    editOverloadCancel() {
      this.editOverloadDialogFormVisible = false;
    },
    //重新计算排程
    recalculate() {
      if (this.multipleSelection.length > 0) {
        const str = {
          StartDate: this.$route.params.time,
			    SchedulingType: this.$route.params.SchedulingType,
          Append: true,
          BillIds: this.multipleSelection.map((x) => x.BillId),
        };
        do_aps(str).then((res) => {
          if (res.OverloadBills.length > 0) {
            this.tableData = res.OverloadBills;
          } else {
            let TagName = {
              name: "ProductionSchedule",
            };
            closeTag(this.current, TagName);
          }
        });
      } else {
        this.$message.warning(this.$t("Generality.Ge_CheckDetails"));
      }
    },

    //结束排程
    endSchedule() {
      let TagName = {
        name: "ProductionSchedule",
      };
      closeTag(this.current, TagName);
    },
    //勾选要排程的数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="scss">
.items-details-Img-error {
  display: flex;
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
.calculate-result {
  background: #fff;
  height: 95%;
  .calculate-result-btn {
    padding: 10px 10px;
  }
  .calculate-result-table {
    padding: 0px 10px 0 10px;
    height: 100%;
    @import "../../../../../jv_doc/style/cpn/table.scss";
  }
}
</style>
