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
      <div style="width: 14px;">
        <svg-icon icon-class="father" v-if="cdata.ParentId === 0" />
        <svg-icon icon-class="son" v-else />
      </div>
      <div>
        {{ cdata.ToolingNo }}
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
      <el-dropdown @command="handleCommand">
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
        </div>
      </div>
      <div class="time-progress">
        <div class="time" style="padding: 6px 0 4px 0">
          <i class="el-icon-document"></i>
          <span>{{ cdata.ProcessContent }}</span>
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
      width="80%"
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
import { downLoad } from "@/jv_doc/utils/file/index";
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
      } else if (e == "distributionTask") {
        // this.distributionTaskDialogFormVisible = true;
        // this.TaskData = this.cdata;
        this.$router.push({
          name: "As_AssyDistributeTask",
          query: {
            TaskData: this.cdata,
            BillId: this.cdata.BillId,
            BackPath: "assyTask",
          },
        });
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
      this.toFresh();
    },
    visibilityChange(event) {
      this.tooltipFlag = true;
    },
    toFresh() {
      this.$emit("getData");
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

<style lang="scss" scoped>
@import "~@/jv_doc/style/mixin.scss";
.task-card {
  width: 235px;
  height: 155px;
  @include shadow;
  position: relative;
  background-color: #fff;
  font-size: 14px;
  .more-func {
    position: absolute;
    right: 10px;
    top: 0;
    cursor: pointer;
  }
  .state-bar {
    height: 20px;
    display: flex;
    border-radius: 10px 10px 0 0;
    width: 235px;
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
    width: 235px;
    padding: 0 8px;
    border-radius: 0 0 10px 10px;
    .img-desc {
      width: 200px;
      height: 55px;
      padding: 4px 0 0 54px;
      position: relative;
      .img {
        position: absolute;
        left: 0;
        top: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(231, 231, 231);
        .image-slot {
          width: 50px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .error-icon {
            color: rgb(161, 161, 161);
            font-size: 19px;
          }
        }
      }
      .desc-text {
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
