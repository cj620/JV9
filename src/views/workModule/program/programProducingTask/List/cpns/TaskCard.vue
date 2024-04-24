<!--
 * @Author: your name
 * @Date: 2021-11-24 11:16:43
 * @LastEditTime: 2023-02-08 09:11:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\design\designTask\List\cpns\TaskCard.vue
-->
<template>
  <div class="task-card">
    <div class="state-bar" :style="{ background: stateMap.color }">
      <svg-icon icon-class="father" v-if="cdata.ParentId === 0" />
      <svg-icon icon-class="son" v-else />
      <div>
        {{ cdata.PartNo }}
        <el-tooltip
          ref="tlp"
          :content="cdata.ToolingName"
          effect="dark"
          :disabled="!tooltipFlag"
          placement="top-start"
        >
          <span @mouseenter="visibilityChange($event)">
            {{ cdata.ToolingName }}
          </span>
        </el-tooltip>
      </div>
    </div>
    <div class="more-func">
      <!-- 编程加工任务 -->
      <el-dropdown @command="handleCommand" v-if="$route.name === 'ProgramProducingTask'">
        <span>
          <i class="el-icon-more el-icon--right" style="font-size: 20px"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">
            {{ $t('Generality.Ge_Edit') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 非编程加工任务 -->
      <el-dropdown @command="handleCommand" v-else>
        <span>
          <i class="el-icon-more el-icon--right" style="font-size: 20px"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="edit">
            {{ $t('Generality.Ge_Edit') }}
          </el-dropdown-item>
          <el-dropdown-item
            :disabled="!(cdata.ParentId == 0)"
            command="distributionTask"
            >
            {{ $t('project.Pro_DistributionTask') }}
          </el-dropdown-item
          >
          <el-dropdown-item
            :disabled="!(cdata.ParentId == 0)"
            command="viewSubTask"
            >
            {{ $t('project.Pro_ViewSubtasks') }}
          </el-dropdown-item
          >
          <!-- <el-dropdown-item command="downLoadProductImg"
            >下载图纸</el-dropdown-item
          > -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="task-content" @click="cardClick">
      <div class="img-desc">
        <el-image
          style="width: 50px; height: 50px"
          class="img"
          :src="imgUrlPlugin(cdata.PhotoUrl)"
          :preview-src-list="[imgUrlPlugin(cdata.PhotoUrl)]"
          @click.stop="() => {}"
        >
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline error-icon"></i>
          </div>
        </el-image>
        <div class="desc-box">
          <div class="desc-text">
            <i class="el-icon-box"></i>
            {{ cdata.Process }}
          </div>
          <div class="desc-text" v-if="cdata.TaskType">
            <i class="el-icon-folder-checked"></i>
            {{ taskMap.name }}
          </div>
          <div class="desc-text" v-else>
            <i class="el-icon-receiving"></i>
            {{ cdata.ProductionProcess }}
          </div>
        </div>
      </div>
      <div class="time-progress">
        <div style="width: 200px; padding: 2px 0;">
          <i class="el-icon-s-order"></i>
          <span style="margin-left: 5px">{{ cdata.TaskBillId }}</span>
        </div>
        <div style="width: 200px; padding: 2px 0;">
          <i class="el-icon-collection-tag"></i>
          <span style="margin-left: 5px">{{ cdata.Remarks }}</span>
        </div>
        <div class="time">
          <i class="el-icon-date"></i>
          <span>{{ cdata.PlanEnd | timeFormat("yyyy-MM-dd hh:mm") }}</span>
          <span class="hours">{{ cdata.PlanTime }}H</span>
        </div>
        <div>
          <!-- <i class="el-icon-pie-chart"></i> -->
          <el-progress
            v-if="cdata.Progress || cdata.Progress === 0"
            :text-inside="true"
            :stroke-width="15"
            :percentage="Number(cdata.Progress)"
          ></el-progress>
        </div>
      </div>
    </div>
    <!--父级物料弹窗-->
    <addProjectTask
      :visible.sync="addProjectTaskDialogFormVisible"
      v-if="addProjectTaskDialogFormVisible"
      :transferData="transferData"
      :type="type"
      @confirmData="confirmData"
    >
    </addProjectTask>

    <!-- 编程加工编辑 -->
    <editProgramTask
      :visible.sync="editProgramTaskDialogFormVisible"
      v-if="editProgramTaskDialogFormVisible"
      :transferData="transferData"
      @confirmData="confirmData"
      :confirmText="$t('Generality.Ge_Save')">
    </editProgramTask>

    <distributionTaskDialog
      :visible.sync="distributionTaskDialogFormVisible"
      v-if="distributionTaskDialogFormVisible"
      :TaskData="TaskData"
      @confirmData="confirmDistributionTask"
    >
    </distributionTaskDialog>
    <JvDialog
      :visible.sync="viewSubtasksDialogVisible"
      :title="$t('project.Pro_ViewSubtasks')"
      v-if="viewSubtasksDialogVisible"
      @confirm="dialogConfirm"
      width="60%"
    >
      <JvTable :tableObj="viewSubtasksTableObj"> </JvTable>
    </JvDialog>
    <DetailModel
      ref="detailModel"
      :title="$t('project.Pro_MoreInformation')"
      :visible.sync="moreMsgShow"
      width="40%"
      :cdata="cdata"
      @confirm="moreMsgShow = false"
    ></DetailModel>
  </div>
</template>

<script>
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { taskStateEnum, taskTypeEnum } from "@/enum/workModule";
import { ViewSubtasksTableObj } from "./viewSubtasksTableConfig";
import { downLoad } from "@/jv_doc/utils/file";
import addProjectTask from "@/views/workModule/project/projectTask/DetailsList/addProjectTask";
import { project_task_get_children_item } from "@/api/workApi/project/projectTask";
import distributionTaskDialog from "./distributionTaskDialog";
import DetailModel from "./DetailModel/index.vue";
import editProgramTask from "@/views/workModule/program/programProducingTaskList/editProgramTask.vue";
export default {
  components: {
    editProgramTask,
    addProjectTask,
    distributionTaskDialog,
    DetailModel,
  },
  data() {
    return {
      type: "edit",
      moreMsgShow: false,
      addProjectTaskDialogFormVisible: false,
      editProgramTaskDialogFormVisible: false,
      distributionTaskDialogFormVisible: false,
      viewSubtasksDialogVisible: false,
      transferData: {},
      viewSubtasksTableObj: {},
      tooltipFlag: false,
      TaskData: {},
    };
  },
  props: {
    cdata: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.viewSubtasksTableObj = new ViewSubtasksTableObj();
  },
  methods: {
    imgUrlPlugin,
    cardClick() {
      //this.moreMsgShow = true;
    },
    handleCommand(e) {
      if (e == "edit") {
        // alert("edit");
        if (this.$route.name === 'ProgramProducingTask'){
          this.editProgramTaskDialogFormVisible = true;
          this.transferData = this.cdata
        }else {
          this.addProjectTaskDialogFormVisible = true;
          this.transferData = JSON.parse(
            JSON.stringify(
              Object.assign({}, this.cdata, {
                ItemPlanEnd: this.cdata.PlanEnd,
                ItemPlanStart: this.cdata.PlanStart,
              })
            )
          );
        }
        console.log(this.transferData, 66656868);
      } else if (e == "distributionTask") {
        this.distributionTaskDialogFormVisible = true;
        this.TaskData = this.cdata;
      } else if (e == "viewSubTask") {
        this.viewSubtasksDialogVisible = true;
        project_task_get_children_item({ Id: this.cdata.Id }).then((res) => {
          this.viewSubtasksTableObj.setData(res.Items);
        });
      } else if (e == "downLoadProductImg") {
        downLoad({
          params: {
            Version: this.cdata.ProductVersion,
            PartNo: this.cdata.PartNo,
          },
          url: `/files/down_file_ftp`,
        });
      }
    },
    dialogConfirm() {
      this.viewSubtasksDialogVisible = false;
    },
    confirmData() {
      this.addProjectTaskDialogFormVisible = false;
      this.editProgramTaskDialogFormVisible = false;
      // this.tableObj.getData();
      this.toFresh();
    },
    confirmDistributionTask() {
      this.distributionTaskDialogFormVisible = false;
    },
    visibilityChange(event) {
      this.tooltipFlag = true;
    },
    toFresh() {
      this.$emit("toFresh");
    },
  },
  computed: {
    stateMap() {
      return taskStateEnum[this.cdata.State];
    },
    taskMap() {
      return taskTypeEnum[this.cdata.TaskType];
    },
  },
};
</script>

<style lang="scss">
@import "~@/jv_doc/style/mixin.scss";
.task-card {
  // padding: 0 5px;
  width: 210px;
  height: 165px;
  @include shadow;
  position: relative;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  .more-func {
    position: absolute;
    right: 10px;
    top: 0;
  }
  .state-bar {
    // width: 100%;
    height: 20px;
    display: flex;
    border-radius: 10px 10px 0 0;
    background-color: rgb(211, 153, 153);
    width: 210px;
    padding: 1px 5px;

    div {
      margin-left: 5px;
      width: 150px;
      @include ellipsis;
    }
  }
  .task-content {
    height: 95px;
    background-color: #fff;
    width: 210px;
    padding: 0 5px;
    border-radius: 0 0 10px 10px;

    .img-desc {
      width: 200px;
      height: 55px;
      padding-left: 50px;
      position: relative;
      // background-color: rgb(59, 112, 110);
      .img {
        position: absolute;
        left: 0;
        top: 5px;
        background-color: rgb(231, 231, 231);
        .image-slot {
          width: 50px;
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
      .desc-text {
        // margin-top: 5px;
        i {
          margin-right: 5px;
        }
        padding: 5px;
        width: 150px;
        @include ellipsis;
      }
    }
    .time-progress {
      .time {
        width: 200px;
        padding: 5px 0;
        @include ellipsis;
        .hours {
          margin-left: 20px;
        }
        i {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
