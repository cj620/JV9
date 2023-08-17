<!-- 排程日志弹窗 -->
<template>
  <JvDialog
      width="90%"
      :title="title"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      :IsShowFooterBtn="false"
  >
    <el-table
        ref="BillTable"
        :data="billData"
        border
    >
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
              <el-table-column label="状态" prop="State">
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
      <!--<el-table-column-->
      <!--    :label="$t('Generality.Ge_ResultDescription')"-->
      <!--    prop="ApsRemarks"-->
      <!--&gt;-->
      <!--  <template slot-scope="scope">-->
      <!--    {{ ApsRemarksMap[scope.row.ApsRemarks].name }}-->
      <!--  </template>-->
      <!--</el-table-column>-->
    </el-table>
  </JvDialog>
</template>
<script>
import { ProcessState } from "@/enum/workModule";
import { imgUrlPlugin } from "~/utils/system";

export default {
  props:{
    billData:{
      type:Array,
      default() {
        return null;
      },
    }
  },
  data() {
    return {
      title:"",
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
    };
  },
  created() {
    this.title = this.ApsRemarksMap[this.billData[0].ApsRemarks].name
  },
  computed:{
    ProcessStateMap() {
      return ProcessState;
    },
  },
  methods:{
    imgUrlPlugin,
  }
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
</style>
