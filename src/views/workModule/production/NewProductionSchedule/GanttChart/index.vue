<template>
  <PageWrapper :footer="false">
    <div class="action-header">
      <div class="action-header-left">
        <div style="font-size: 12px; line-height: 0">
          {{ $t("Generality.Ge_Unit") }}：
        </div>
        <div style="margin-right: 20px">
          <el-select
            v-model="unitOfTime"
            size="mini"
            style="width: 66px"
            @change="setGanttZoom"
          >
            <el-option
              v-for="item in unitOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input
            @change="searchChange"
            v-model="partNumberValue"
            :placeholder="$t('Generality.Ge_PleaseEnterkey')"
            prefix-icon="el-icon-search"
            size="mini"
            clearable
          >
          </el-input>
        </div>
        <div>
          <el-button
            size="mini"
            style="margin-left: 10px"
            type="primary"
            @click="searchResult"
            >{{ $t("Generality.Ge_Search") }}</el-button
          >
        </div>
        <div>
          <el-button
            size="mini"
            style="margin-left: 10px"
            @click="RefreshGantt"
          >{{ $t("Generality.Ge_Refresh") }}</el-button
          >
        </div>
<!--        <div class="apsVersionNo" style="margin-left: 10px">-->
<!--          {{ $t("production.Pr_Version") }}：{{ ApsVersionNo }}-->
<!--        </div>-->
      </div>
      <div class="action-header-right"></div>
    </div>
    <CustomGantt
      ref="CustomGantt"
      isTaskHover
      isTaskLeftClick
      detailShow
      :menu-items="MenuItems"
      :columns="GanttColumns"
      :loading="loading"
      :result="result"
      :padding="10"
      :floatingWindow="floatingWindow"
      :popoverOptions="popoverOptions"
      :taskInnerHtml="setTaskInnerHtml"
      :ganttContainerHeight="ganttContainerHeight"
      :setTaskBackground="setTaskBackground"
      taskDialogTitle="Process"
      taskRadius="25"
    >
      <template #popover="{ item }">
        <gantt-popover :item="item"></gantt-popover>
      </template>
    </CustomGantt>
    <!-- 分页器 -->
    <div class="custom-pagination">
      <div>
        <!--        <div class="custom-unfold" @click="setFold">-->
        <!--          <i :class="unfold_icon"></i>-->
        <!--        </div>-->
      </div>
      <div class="custom-pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          :page-size="10"
          :total="result.Count"
        >
        </el-pagination>
      </div>
    </div>

    <JvDialog
      :visible.sync="editeVisible"
      v-if="editeVisible"
      :title="editDialogTitle"
      @confirm="updateProcess"
    >
      <JvForm :form-obj="formObj">
        <template #PlanDevice>
          <el-select v-model="formObj.form.PlanDevice" :placeholder="$t('Generality.Ge_PleaseSelect')">
            <el-option
              v-for="item in deviceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import CustomGantt from "@/components/CustomGantt/index.vue";
import GanttPopover from "@/views/workModule/production/productionSchedule/List/components/gantt-popover.vue";
import { GanttColumns } from "./config";
import { simulation_scheduling_list, part_gantt_chart } from "@/api/workApi/production/productionSchedule";
import { production_dispatching_change_device, delete_process, production_dispatching_lock_device } from '@/api/workApi/production/productionDispatch';
import floatingWindow from "./components/floatingWindow.vue";
import { Form } from "@/jv_doc/class/form";
// 引入表单 配置
import { formSchema } from "./formConfig";
import Action from "~/cpn/JvAction/index.vue";
import JvForm from "~/cpn/JvForm/index.vue";
import { getResourceMember } from "@/api/workApi/production/baseData";
import timeFormat from "../../../../../jv_doc/utils/time/timeFormat";
import {addOutsourcingrRequirement} from "@/api/workApi/purchase/outsourcingRequirement";
export default {
  name: "GanttChart",
  components: { JvForm, Action, GanttPopover, CustomGantt },
  data() {
    return {
      editDialogTitle: '',
      editeVisible: false,
      ApsVersionNo: "",
      floatingWindow: floatingWindow,
      GanttColumns,
      formObj: {
        form: {
          PlanDevice: "",
        }
      }, // 表单实例
      deviceOptions: [],
      loading: false,
      AlgorithmType: "ClassicalAlgorithm",
      partNumberValue: "", // 零件编号查询输入框
      result: {},
      popoverOptions: {
        placement: "right",
        width: 670,
        trigger: "hover",
      },
      ganttContainerHeight: 650,
      unitOfTime: "hour", // 默认时间单位
      unitOptions: [
        {
          value: "week",
          label: i18n.t("Generality.Ge_Day"),
        },
        {
          value: "hour",
          label: i18n.t("Generality.Ge__Hour"),
        },
        {
          value: "minute",
          label: i18n.t("Generality.Ge_Minute"),
        },
      ],
      MenuItems: [
          { label: this.$t('Generality.Ge_Edit') },
          { label: this.$t('Generality.Ge_DetailedInformation') },
          { label: this.$t('production.Pr_Outsourcing') },
          { label: this.$t('Generality.Ge_Delete') },
          { label: this.$t('production.Pr_LockMachine') },
          { label: this.$t('production.Pr_Unlock') },
      ],
    };
  },
  created() {
    // 创建表单实例
    this.formObj = new Form({
      formSchema: formSchema,
      baseColProps: {
        span: 24,
      },
      // gutter: 30,
      labelWidth: "80px",
    });
    this.setAlgorithmType();
    this.setMenuItems();
  },
  mounted() {
    let mainContent = document.querySelector(".main-content");
    this.ganttContainerHeight = mainContent.clientHeight - 115;
  },
  methods: {
    RefreshGantt() {
      this.partNumberValue = "";
      this.setAlgorithmType();
    },
    updateProcess() {
      this.formObj.validate((valid) => {
        if (valid) {
          production_dispatching_change_device({
            "DeviceName": this.formObj.form.PlanDevice,
            "PlanStart": this.formObj.form.PlanStart,
            "PlanEnd": this.formObj.form.PlanEnd,
            "TaskProcessId": this.formObj.form.TaskProcessId,
            "IsModifyDate": true,
          }).then(res => {
            this.editeVisible = !this.editeVisible;
            this.setAlgorithmType();
          })
        }
      });
    },
    setMenuItems() {
      // 编辑
      this.MenuItems[0].event = (item) => {
        this.editeVisible = !this.editeVisible;
        this.editDialogTitle = item.Process
        this.deviceOptions = [];
        getResourceMember({ResourceId: item['ResourceGroup'],}).then(res => {
          res['Items'].forEach(item => {
            this.deviceOptions.push({
              value: item.DeviceNo,
              label: item.DeviceNo
            })
          })
          this.formObj.form.PlanDevice = item.PlanDevice
        })
        console.log(item)
        this.formObj.form.TaskProcessId = item.TaskProcessId;
        this.formObj.form.PlanStart = new Date(item.PlanStart);
        this.formObj.form.PlanEnd = new Date(item.PlanEnd);
      }
      // 详细信息
      this.MenuItems[1].event = (item) => {
        console.log(item)
        const h = this.$createElement;
        this.$msgbox({
          title: item.Process,
          message: h('p', null, [
            h('div', null, this.$t('menu.Pr_Resources') + '：' + item.ResourceGroup),
            h('div', null, this.$t('Generality.Ge_ProcessName') + '：' + item.Process),
            h('div', null, this.$t('production.Pr_PlanningDevices') + '：' + item.PlanDevice),
            h('div', null, this.$t('Generality.Ge_PlannedTime') + '：' + item.PlanTime + 'H'),
            h('div', null, this.$t('Generality.Ge_PlanStart') + '：' + timeFormat(item.PlanStart, 'yyyy-MM-dd hh:mm:ss')),
            h('div', null, this.$t('Generality.Ge_PlanEnd') + '：' + timeFormat(item.PlanEnd, 'yyyy-MM-dd hh:mm:ss')),
          ]),
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.$t('Generality.Ge_Cancel'),
        })
      }
      // 外协
      this.MenuItems[2].event = (item) => {
        this.$confirm(this.$t('production.Pr_OutsourcingMsg.str1') + item.Process + this.$t('production.Pr_OutsourcingMsg.str2'),
          this.$t('Generality.Ge_Remind'), {
          confirmButtonText: this.$t('Generality.Ge_OK'),
          cancelButtonText: this.$t('Generality.Ge_Cancel'),
          type: 'warning'
        }).then(() => {
          addOutsourcingrRequirement({"Category":"Process","Items":[{
              KeyId: item.TaskProcessId,
              Remarks: "",
              Quantity: 1
            }]}).then(res => {
            this.setAlgorithmType();
          })
        })
      }
      // 删除
      this.MenuItems[3].event = (item) => {
        this.$confirm(this.$t('production.Pr_DeleteMsg.str1') + item.Process + this.$t('production.Pr_DeleteMsg.str2'),
          this.$t('Generality.Ge_Remind'), {
          confirmButtonText: this.$t('Generality.Ge_OK'),
          cancelButtonText: this.$t('Generality.Ge_Cancel'),
          type: 'warning'
        }).then(() => {
          delete_process([item.TaskProcessId]).then(res => {
            this.setAlgorithmType();
          })
        })
      }
      // 锁定机床
      this.MenuItems[4].event = (item) => {
        this.$confirm(this.$t('production.Pr_LockMsg.str1') + item.Process + this.$t('production.Pr_LockMsg.str2'),
          this.$t('Generality.Ge_Remind'), {
          confirmButtonText: this.$t('Generality.Ge_OK'),
          cancelButtonText: this.$t('Generality.Ge_Cancel'),
          type: 'warning'
        }).then(() => {
          production_dispatching_lock_device({
            "TaskProcessId": item.TaskProcessId,
            "DeviceNo": item.PlanDevice
          }).then(res => {
            this.setAlgorithmType();
          })
        })
      }
      // 锁定机床显示隐藏
      this.MenuItems[4].show = (item) =>{
        return !Boolean(item['FixedProcessingDevice'])
      }
      // 是否禁用
      // this.MenuItems[4].disabled = () => {
      //   return true
      // }
      // 解锁机床
      this.MenuItems[5].event = (item) => {
        this.$confirm(this.$t('production.Pr_UnlockMsg.str1') + item.Process + this.$t('production.Pr_UnlockMsg.str2'),
          this.$t('Generality.Ge_Remind'), {
          confirmButtonText: this.$t('Generality.Ge_OK'),
          cancelButtonText: this.$t('Generality.Ge_Cancel'),
          type: 'warning'
        }).then(() => {
          production_dispatching_lock_device({
            "TaskProcessId": item.TaskProcessId,
            "DeviceNo": null,
          }).then(res => {
            this.setAlgorithmType();
          })
        })
      }
      // 解锁机床显示隐藏
      this.MenuItems[5].show = (item) =>{
        return Boolean(item['FixedProcessingDevice'])
      }
    },
    // 分页切换
    handleCurrentChange(current) {
      this.current = current;
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // 总条数切换
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // 搜索
    searchChange() {
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // 搜索
    searchResult() {
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // 获取甘特图数据
    setAlgorithmType(size = 10, page = 1) {
      // this.loading = true;
      part_gantt_chart({
        AlgorithmType: this.AlgorithmType,
        CurrentPage: page,
        PageSize: size,
        Keyword: this.partNumberValue,
        // SortColumn: "PartNo,PlanStart",
        // SortOrder: 1,
      }).then((res) => {
        this.result = res;
        // this.loading = false;
        this.ApsVersionNo = res.VersionNo;
      });
    },
    // 切换时间
    setGanttZoom(val) {
      this.$refs.CustomGantt.setGanttZoom(val);
    },
    setTaskInnerHtml(item) {
      return `${item.Process}(${item.PlanTime}H) ${item.PlanDevice}`;
    },
    setTaskBackground(item) {
      if (item) {
        return {
          condition: item.PlanDevice.indexOf("[Overload]") !== -1,
          color: "#ffcc33",
        };
      }
    },
    // task弹窗确认事件
    taskDialogConfrim(taskDetail) {
      console.log(taskDetail);
    },
  },
};
</script>

<style scoped lang="scss">
.action-header {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 6px 10px;
  height: 48px;
  border-radius: 4px;
  align-items: center;

  &-left,
  &-right {
    display: flex;
    align-items: center;
  }
}
.custom-pagination {
  height: 40px;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
