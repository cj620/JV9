<template>
  <page-wrapper :footer="false">
    <!-- 顶部操作行 -->
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
      </div>
      <div class="action-header-right"></div>
    </div>
    <CustomGantt
      isTaskHover
      isTaskLeftClick
      :taskRadius="8"
      :tableItemHeight="80"
      :taskHeight="40"
      :menu-items="MenuItems"
      :result="result"
      :columns="columns"
      :popoverInnerHtml="popoverInnerHtml"
      :taskInnerHtml="taskInnerHtml"
      :ganttContainerHeight="ganttHeight"
      ref="CustomGantt"
    ></CustomGantt>
    <!-- 分页器 -->
    <div class="custom-pagination">
      <div></div>
      <div class="custom-pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          :page-size="20"
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
          <el-select v-model="formObj.form.PlanDevice">
            <el-option
              v-for="item in deviceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvDialog>
  </page-wrapper>
</template>

<script>
import { device_gantt_chart } from "@/api/workApi/production/productionSchedule";
import CustomGantt from "@/components/CustomGantt";
import { columns } from "./config1";
import Action from "~/cpn/JvAction/index.vue";
import timeFormat from "@/jv_doc/utils/time/timeFormat";
import { getResourceMember } from "@/api/workApi/production/baseData";
import { addOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";
import {
  delete_process, production_dispatching_change_device,
  production_dispatching_lock_device,
} from "@/api/workApi/production/productionDispatch";
import JvForm from "~/cpn/JvForm/index.vue";
import {Form} from "~/class/form";
import {formSchema} from "@/views/workModule/production/NewProductionSchedule/GanttChart/formConfig";
import {latest_device_gantt_chart} from "@/api/workApi/production/aps";
export default {
  name: "index",
  components: { JvForm, Action, CustomGantt },
  data() {
    return {
      partNumberValue: "",
      editDialogTitle: '',
      editeVisible: false,
      deviceOptions: [],
      result: {},
      columns,
      ganttHeight: 0,
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
      pageSize: 20,
      current: 1,
      formObj: {
        form: {
          PlanDevice: "",
        }
      }, // 表单实例
      MenuItems: [
        { label: this.$t('Generality.Ge_DetailedInformation') },
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
    this.getGanttChart();
    this.setMenuItems();
  },
  mounted() {
    let mainContent = document.querySelector(".main-content");
    this.ganttHeight = mainContent.clientHeight - 120;
  },
  methods: {
    RefreshGantt() {
      this.partNumberValue = "";
      this.getGanttChart();
    },
    // 搜索
    searchResult() {
      this.getGanttChart(this.pageSize, this.current);
    },
    // 搜索
    searchChange() {
      this.getGanttChart(this.pageSize, this.current);
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
            this.getGanttChart();
          })
        }
      });
    },
    taskInnerHtml(item) {
      return (
        item.PartNo + "&nbsp;&nbsp;" + item.ProcessName + `(${item.PlanTime}H)`
      );
    },
    popoverInnerHtml(item) {
      return `
        <div>${ i18n.t('project.Pro_TaskSheetNo') }：${item.BillId}</div>
        <div>${ i18n.t('Generality.Ge_PartNo') }：${item.PartNo}</div>
        <div>${ i18n.t('Generality.Ge_PartName') }：${item.PartName}</div>
        <div>${ i18n.t('Generality.Ge_ProcessName') }：${item.ProcessName}</div>
        <div>${ i18n.t('Generality.Ge_PlanStart') }：${timeFormat(
        item.PlanStart,
        "yyyy-MM-dd hh:mm:ss"
      )}</div>
        <div>${ i18n.t('Generality.Ge_PlanEnd') }：${timeFormat(item.PlanEnd, "yyyy-MM-dd hh:mm:ss")}</div>
      `;
    },
    // 切换时间
    setGanttZoom(val) {
      this.$refs.CustomGantt.setGanttZoom(val);
    },
    // 总条数切换
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getGanttChart(this.pageSize, this.current);
    },
    // 分页切换
    handleCurrentChange(current) {
      this.current = current;
      this.getGanttChart(this.pageSize, this.current);
    },
    // 获取甘特图数据
    getGanttChart() {
      latest_device_gantt_chart({
        Keyword: this.partNumberValue,
        PageSize: this.pageSize,
        CurrentPage: this.current,
      }).then((res) => {
        console.log(res);
        this.result = res;
      });
    },
    // 设置菜单
    setMenuItems() {
      // 详细信息
      this.MenuItems[0].event = (item) => {
        const h = this.$createElement;
        this.$msgbox({
          title: item.Process,
          message: h("p", null, [
            h("div", null, i18n.t('menu.Pr_Resources') +"：" + item.ResourceGroup),
            h("div", null, i18n.t('Generality.Ge_ProcessName') +"：" + item.ProcessName),
            h("div", null, i18n.t('production.Pr_PlanningDevices') +"：" + item.PlanDevice),
            h("div", null, i18n.t('Generality.Ge_PlannedTime') +"：" + item.PlanTime + "H"),
            h(
              "div",
              null,
                i18n.t('Generality.Ge_PlanStart') +"：" + timeFormat(item.PlanStart, "yyyy-MM-dd hh:mm:ss")
            ),
            h(
              "div",
              null,
                i18n.t('Generality.Ge_PlanEnd') +"："  + timeFormat(item.PlanEnd, "yyyy-MM-dd hh:mm:ss")
            ),
          ]),
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: this.$t('Generality.Ge_Cancel'),
        });
      };
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
