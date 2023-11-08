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
        <div class="apsVersionNo" style="margin-left: 10px">
          {{ $t("production.Pr_Version") }}：{{ ApsVersionNo }}
        </div>
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
          <el-select v-model="formObj.form.PlanDevice" placeholder="请选择">
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
import { simulation_scheduling_list } from "@/api/workApi/production/productionSchedule";
import { production_dispatching_change_device } from '@/api/workApi/production/productionDispatch';
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
          label: i18n.t("Generality.Ge_Week"),
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
        { label: "编辑"},
        { label: "详细信息"},
        { label: "外协"},
        { label: "删除"},
        { label: "锁定机床"},
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
    updateProcess() {
      this.formObj.validate((valid) => {
        if (valid) {
          production_dispatching_change_device({
            "DeviceName": this.formObj.form.PlanDevice,
            "PlanStart": this.formObj.form.PlanStart,
            "PlanEnd": this.formObj.form.PlanEnd,
            "TaskProcessId": this.formObj.form.TaskProcessId,
            "IsModifyDate": true,
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
        this.formObj.form.PlanStart = item.PlanStart;
        this.formObj.form.PlanEnd = item.PlanEnd;
      }
      // 详细信息
      this.MenuItems[1].event = (item) => {
        const h = this.$createElement;
        this.$msgbox({
          title: item.Process,
          message: h('p', null, [
            h('div', null, '资源组：' + item.ResourceGroup),
            h('div', null, '工序名称：' + item.Process),
            h('div', null, '计划设备：' + item.PlanDevice),
            h('div', null, '计划工时：' + item.PlanTime + 'H'),
            h('div', null, '计划开始：' + timeFormat(item.PlanStart, 'yyyy-MM-dd hh:mm:ss')),
            h('div', null, '计划结束：' + timeFormat(item.PlanEnd, 'yyyy-MM-dd hh:mm:ss')),
          ]),
          showCancelButton: true,
          showConfirmButton: false,
          cancelButtonText: '取消',
        })
      }
      // 外协
      this.MenuItems[2].event = (item) => {
        this.$confirm('确认是否将此工件外协？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          addOutsourcingrRequirement({"Category":"Process","Items":[{
              KeyId: item.Id,
              Remarks: "",
              Quantity: 1
            }]}).then(res => {
            console.log(res, '外协成功')
          })
        })
      }
      // 删除
      this.MenuItems[3].event = (item) => {
        this.$confirm('此操作将删除该道工件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
      }
      // 锁定机床
      this.MenuItems[4].event = (item) => {console.log(5)}
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
    // 获取排程结果
    setAlgorithmType(size = 10, page = 1) {
      this.loading = true;
      simulation_scheduling_list({
        AlgorithmType: this.AlgorithmType,
        CurrentPage: page,
        PageSize: size,
        Keyword: this.partNumberValue,
        // SortColumn: "PartNo,PlanStart",
        // SortOrder: 1,
      }).then((res) => {
        this.result = res;
        this.loading = false;
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
          is: item.PlanDevice.indexOf("[Overload]") !== -1,
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
