<template>
  <PageWrapper ref="page" :footer="false">
    <JvBlock
      :title="curBillId"
      :contentStyle="{
        paddingLeft: '150px',
        height: '180px',
      }"
      style="position: relative"
    >
      <div class="mould-img">
        <el-image
          :preview-src-list="[imgUrlPlugin(detailObj.detailData.PhotoUrl)]"
          :src="imgUrlPlugin(detailObj.detailData.PhotoUrl)"
          fit="cover"
          class="items-details-Img-error"
        >
          <div slot="error" class="image-slot1">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
          <template #TaskType="{ record }">
            <!-- 状态标签 -->
            {{ taskTypeEnum[record] ? taskTypeEnum[record].name : "--" }}
          </template>
        </JvDetail>
      </div>
    </JvBlock>
    <JvBlock :title="$t('Generality.Ge_ProcessInfo')">
      <div slot="extra">
        <Action
          size="mini"
          slot="extra"
          :actions="[
            {
              icon: 'el-icon-caret-top',
              confirm: editSort.bind(null, false),
            },
            {
              icon: 'el-icon-caret-bottom',
              confirm: editSort.bind(null, true),
            },
          ]"
          :primary="[
            {
              label: $t('Generality.Ge_New'),
              confirm: addProcess,
            },
            {
              label: $t('project.Pro_SelectTemplate'),
              confirm: selectTemplate,
            },
          ]"
        >
        </Action>
      </div>
      <JvEditTable :tableObj="eTableObj">
        <template #ProcessContent="{ row }">
          <el-select
            v-model="row.customData.value"
            style="width: 100%"
            multiple
            filterable
            allow-create
            default-first-option
            @visible-change="changeValue($event, row)"
          >
            <el-option
              v-for="item in row.ProcessContentList.value"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                popConfirm: {
                  title: $t('Generality.Ge_DeleteConfirm'),
                  confirm: delItem.bind(null, row_index),
                },
              },
            ]"
          />
        </template>
      </JvEditTable>
    </JvBlock>
    <div slot="fixedFooter">
      <!-- 保存 -->
      <el-button type="primary" @click="save">{{
          $t("Generality.Ge_Save")
        }}</el-button>
    </div>
    <SelectProjectProcessTemplate
      :visible.sync="ProcessTemplateDialogFormVisible"
      v-if="ProcessTemplateDialogFormVisible"
      @confirmProcessTemplate="confirmProcessTemplate"
    >
    </SelectProjectProcessTemplate>
  </PageWrapper>
</template>
<script>
import { mapState } from "vuex";
import { taskTypeEnum } from "@/enum/workModule";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { API as ProjectTask, project_task_save_item } from "@/api/workApi/project/projectTask";
import { getAllProjectProcess } from "@/api/workApi/project/baseData";
import Detail from "@/jv_doc/class/detail/Detail";
import { detailConfig } from "./detailConfig";
import { EditTable } from "./editConfig";
import SelectProjectProcessTemplate from "@/components/JVInternal/SelectProjectProcessTemplate/index.vue";
import { timeFormat } from "~/utils/time";
import { temMerge } from "~/utils/handleData";
import closeTag from "@/utils/closeTag";

export default {
  name: "Tt_TestToolingDistributeTask",
  components: { SelectProjectProcessTemplate },
  data() {
    return {
      detailObj: {},
      eTableObj: {},
      curBillId: "",
      backPath: "",
      taskTypeEnum,
      TaskData: {},
      ProcessTemplateDialogFormVisible: false,
      BillItems: {
        Id: 0,
        Project: "",
        BelongingDepartment: "",
        Process: "",
        Worker: "",
        ToolingNo: "",
        PlanTime: "",
        PlanStart: "",
        PlanEnd: "",
        Remarks: "",
        ParentId: "",
        ProcessContent: "",
        ProcessContentList: [],
        customData: [],
      },
    }
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  created() {
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 4,
    });
    this.eTableObj = new EditTable();
    this.getData();
  },
  methods: {
    imgUrlPlugin,
    getData() {
      this.TaskData = this.$route.query.TaskData;
      this.curBillId = this.$route.query.BillId;
      this.backPath = this.$route.query.BackPath;
      this.BillItems.ParentId = this.TaskData.Id;
      this.BillItems.Project = this.TaskData.Project;
      this.BillItems.ToolingNo = this.TaskData.ToolingNo;
      ProjectTask.api_get({ BillId: this.$route.query.BillId }).then((res) => {
        this.TaskData = res;
        this.detailObj.setData({
          PlanTime: this.$route.query.TaskData.PlanTime,
          Process: this.$route.query.TaskData.Process,
          ProcessContent: this.$route.query.TaskData.ProcessContent,
          ...res,
        });
      })
    },
    addProcess() {
      this.BillItems.Process = this.TaskData.Process;
      this.BillItems.BelongingDepartment = this.TaskData.BelongingDepartment;
      this.eTableObj.push([this.BillItems]);
    },
    selectTemplate() {
      this.ProcessTemplateDialogFormVisible = true;
    },
    confirmProcessTemplate(e) {
      let startBase = new Date(this.detailObj.detailData.PlanStart).getTime();
      const TimeZone =
        new Date(this.detailObj.detailData.PlanEnd).getTime() -
        new Date(this.detailObj.detailData.PlanStart).getTime();
      e.forEach((item) => {
        item.Id = 0;
        item.PlanStart = timeFormat(
          startBase + item.StartScale * TimeZone
        );
        item.PlanEnd = timeFormat(startBase + item.EndScale * TimeZone);
        item.customData = [];
        if(item.ProcessContent && item.ProcessContent !== "") {
          item.ProcessContent.split(/[,，]/).forEach((trim) => {
            item.customData.push(trim)
          });
        }
      })
      this.eTableObj.push(temMerge(this.BillItems, e));
      this.ProcessTemplateDialogFormVisible = false;
    },
    changeValue(e, row) {
      var arr = [];
      if (e) {
        getAllProjectProcess({Process: row.Process.value}).then((res) => {
          if(res.Items.length) {
            if(res.Items[0].ProcessContent !== null) {
              res.Items[0].ProcessContent.split(/[,，]/).forEach((item) => {
                arr.push({
                  value: item,
                  label: item,
                });
              });
            }
          }
          row.ProcessContentList.value = arr;
        });
      }
    },
    editSort(isDown = true) {
      if (this.eTableObj.selectData.datas.length !== 1) return;
      let row_index = this.eTableObj.selectData.datas[0].row_index;

      if (isDown) {
        if (this.eTableObj.tableData.lengt <= row_index + 1) return;
        const currRow = this.eTableObj.tableData.splice(row_index, 1)[0];
        this.eTableObj.tableData.splice(row_index + 1, 0, currRow);
      } else {
        if (row_index <= 0) return;
        const currRow = this.eTableObj.tableData.splice(row_index, 1)[0];
        this.eTableObj.tableData.splice(row_index - 1, 0, currRow);
      }
    },
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    save() {
      this.eTableObj.validate((valid) => {
        if (valid) {
          let arr = this.eTableObj.getTableData()
          arr.forEach(item => {
            item.ProcessContent = item.customData.join();
          })
          project_task_save_item(arr).then(() => {
            let TagName = {
              path: this.backPath,
            };
            closeTag(this.current, TagName);
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.mould-img {
  width: 120px;
  height: 120px;
  position: absolute;
  left: 10px;
  right: 200px;
}
.items-details-Img-error {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(231, 231, 231);
  ::v-deep .image-slot {
    width: 100%;
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
::v-deep .el-table {
  min-height: 450px !important;
}
</style>
