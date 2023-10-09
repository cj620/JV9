<!--
 * @Author: H.
 * @Date: 2021-11-09 09:22:38
 * @LastEditTime: 2023-09-21 15:45:48
 * @Description: 模具BOM
-->

<template>
  <PageWrapper :footer="false" v-loading="uploadLoading">
    <JvEditTable
      :tableObj="eTableObj"
      highlight-current-row
      @current-change="handleCurrentChange"
    >
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            /*新增*/
            label: $t('Generality.Ge_New'),
            disabled: IsDisabled,
            confirm: l_addRow.bind(),
          },
          {
            // 校验
            label: $t('Generality.Ge_Save'),
            disabled: IsDisabled,
            confirm: l_save.bind(),
          },
          {
            // 校验
            label: $t('Generality.Ge_Copy'),
            disabled: !IsSelectLength,
            confirm: l_copy.bind(),
          },
          {
            // 校验
            label: $t('Generality.Ge_Delete'),
            disabled: !IsSelectLength,
            confirm: l_del.bind(),
          },
          {
            // 创建生产任务
            label: $t('Generality.Ge_CreateProductionTask'),
            disabled: !IsCreateTask,
            confirm: l_createTask.bind(),
          },
        ]"
        actionType="primary"
        :dropDownActions="[
          {
            /*设置级别*/
            label: $t('design.De_SetLevel'),
            confirm: l_setLevel.bind(),
          },
          {
            label: $t('design.De_DownloadTemplate'),
            confirm: downExport2Excel.bind(),
          },
          {
            label: $t('Generality.Ge_MassUpload'),
            confirm: setShowMassUpload.bind(),
          },
          {
            label: $t('design.De_LeadingInBOM'),
            disabled: IsDisabled,
            confirm: ImportBOM.bind(),
          },
          {
            label: $t('design.De_CheckItem'),
            disabled: IsTableDisabled,
            confirm: controlMaterial.bind(),
          },
          {
            label: $t('design.De_SearchItem'),
            disabled: !IsSearchItemDisabled,
            confirm: searchItem.bind(),
          },
          // 提交物料需求
          {
            label: $t('design.De_SubmitDemand'),
            disabled: IsTableDisabled,
            confirm: submitItemsDemand.bind(),
          },
          {
            label: $t('program.Pr_ProcessPlanning'),
            disabled: !IsSearchItemDisabled,
            confirm: CraftDesign.bind(),
          },
          {
            label: $t('design.De_InfoLinkage'),
            disabled: IsTableDisabled,
            confirm: synchronizePart.bind(),
          },
        ]"
      >
      </Action>

      <template #titleBar>
        <Popover @confirm="getData" @reset="toolId = ''" style="margin: 0 10px">
          <el-select
            v-model="toolId"
            filterable
            remote
            clearable
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in MouldListData"
              :key="item.ItemId"
              :label="item.ItemId"
              :value="item.ItemId"
            >
            </el-option>
          </el-select>
        </Popover>
        <span>{{ $t("Generality.Ge_ToolingNo") }}：{{ ToolingNo }}</span>
      </template>
      <template #setingBar>
        <div class="setting-icon el-icon-refresh-right" @click="getData"></div>
      </template>
      <template #PhotoUrl="{ row }">
        <div class="upload-partRes-Img">
          <el-image
            style="width: 50px; height: 50px"
            :src="defaultImgUrl + row.PhotoUrl.value"
            fit="fill"
            :preview-src-list="[defaultImgUrl + row.PhotoUrl.value]"
            class="upload-partRes-Img-error"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture error-icon"></i>
            </div>
          </el-image>
          <el-button type="text" size="mini">
            <el-upload
              action=""
              :show-file-list="false"
              :http-request="changeHandle"
            >
              <i class="el-icon-plus avatar-uploader-icon1"></i>
            </el-upload>
          </el-button>
          <!--@handlePasteData="handlePasteData"-->
          <parse-img
            @handlePasteData="handlePasteData"
            class="edit-partRes-uploadIcons"
            :title="$t('Generality.Ge_Paste')"
          >
          </parse-img>
        </div>
      </template>
      <template #PartLevel="{ record }">
        {{ partLevelMap[record] && partLevelMap[record].name }}
      </template>
      <template #MaterialRequirementState="{ record }">
        {{ demandStatusEnum[record] && demandStatusEnum[record].name }}
      </template>
      <template #operation="{ row, row_index }">
        <!--        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Copy'),
              confirm: copy.bind(null, row, row_index),
            },
            {
              label: $t('Generality.Ge_Insert'),
              confirm: l_insert.bind(null, row_index),
            },
            {
              label: $t('Generality.Ge_Delete'),
              confirm: l_delete.bind(null, row_index),
            },
          ]"
        />-->
        <div class="bom-action">
          <span @click="copy(row, row_index)"  class="action-item">{{
            $t("Generality.Ge_Copy")
          }}</span>
          <span @click="l_insert(row_index)"  class="action-item">{{
            $t("Generality.Ge_Insert")
          }}</span>
          <span @click="l_delete(row_index)"  class="action-item">{{
            $t("Generality.Ge_Delete")
          }}</span>
            <span  class="action-item">
                <el-badge :is-dot="row.IsPartProcess.value">
            <span @click="CraftDesign1(row)">{{
                $t("program.Pr_ProcessPlanning")
                }}</span>
                </el-badge>
            </span>
        </div>
      </template>
    </JvEditTable>
    <!-- 导入数据 -->
    <Import
      :visible.sync="importShow"
      width="28%"
      :title="$t('Generality.Ge_Import')"
      @complete="importComplete"
    ></Import>
    <!--搜索物料-->
    <search-item
      :visible.sync="searchItemDialogFormVisible"
      v-if="searchItemDialogFormVisible"
      @manualControlMaterial="manualControlMaterial"
    ></search-item>
    <!--选择任务-->
    <selectTask
      :visible.sync="selectTaskDialogFormVisible"
      v-if="selectTaskDialogFormVisible"
      :taskData="taskData"
      @confirmTask="confirmTask"
    >
    </selectTask>
    <!--设置级别-->
    <setLevel
      :visible.sync="setLevelDialogFormVisible"
      v-if="setLevelDialogFormVisible"
      :setLevelData="setLevelData"
      @confirmSetLevel="confirmSetLevel"
    ></setLevel>

    <!-- 导入数据 -->

    <jv-dialog
      :title="$t('Generality.Ge_Import')"
      width="60%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      :visible.sync="importDialogFormVisible"
      v-if="importDialogFormVisible"
      @confirm="confirmImportData"
      :autoFocus="true"
    >
      <JvEditTable :tableObj="importTableObj" highlight-current-row>
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                label: $t('Generality.Ge_Delete'),
                confirm: i_delete.bind(null, row_index),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </jv-dialog>
    <JvDialog
      :visible.sync="showMassUpload"
      destroy-on-close
      :title="$t('design.De_DownloadTemplate')"
      width="960px"
      @confirm="MassUpload"
    >
      <custom-upload ref="customUploadRef"></custom-upload>
    </JvDialog>
    <JvDialog
      v-if="selectProjectFormVisible"
      :visible.sync="selectProjectFormVisible"
      destroy-on-close
      :title="$t('project.Pro_TaskSheetNo')"
      width="30%"
      @confirm="confirmItem"
    >
      <JvForm :formObj="formObj">
        <template #PmTaskBillId="{ prop }">
          <el-select v-model="formObj.form[prop]" filterable>
            <el-option
              v-for="item in TaskListData"
              :key="item.BillId"
              :label="
                item.BillId + '(' + taskTypeEnum[item.TaskType].name + ')'
              "
              :value="item.BillId"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvDialog>
    <JvDialog
      v-if="createTaskVisible"
      :visible.sync="createTaskVisible"
      destroy-on-close
      :title="$t('Generality.Ge_CreateProductionTask')"
      width="30%"
      @confirm="createTaskConfirm"
    >
      <JvForm :formObj="createTaskFormObj">
        <!--任务单号-->
        <template #PmTaskBillId="{ prop }">
          <el-select
            v-model="createTaskFormObj.form[prop]"
            filterable
            :disabled="editDisabled"
            @change="changePmTaskBillId"
          >
            <el-option
              v-for="item in TaskListData1"
              :key="item.BillId"
              :label="
                item.BillId + '(' + taskTypeEnum[item.TaskType].name + ')'
              "
              :value="item.BillId"
            >
            </el-option>
          </el-select>
        </template>
        <template #PlanStart="{ prop }">
          <el-date-picker
            v-model="createTaskFormObj.form[prop]"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </template>

        <template #PlanEnd="{ prop }">
          <el-date-picker
            v-model="createTaskFormObj.form[prop]"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
          ></el-date-picker>
        </template>
      </JvForm>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import searchItem from "./components/searchItem";
import selectTask from "./components/selectTask";
import setLevel from "./components/setLevel";
import { EditTable } from "./config";
import { importEditTable } from "./importConfig";
// 获取列表接口
import {
  getPartBomById,
  savePartBom,
  confirmSubmitMaterialRequirement,
  toolingTaskInfoList,
  autoMatchMaterials,
  synchronizePart,
  quickly_create_task,
} from "@/api/workApi/design/toolingBOM";
// 获取系统配置接口
import { batch_get } from "@/api/basicApi/systemSettings/sysSettings";
import { demandStatusEnum, taskTypeEnum } from "@/enum/workModule";

import { uploadImage } from "@/api/workApi/materials/fileUpload";
import Popover from "@/jv_doc/cpn/JvTable/cpn/Popover.vue";
import { export2Excel } from "@/jv_doc/cpn/JvTable/utils/export2Excel";
import { format2source } from "@/jv_doc/class/utils/dataFormat";
import ParseImg from "@/components/JVInternal/ParseImg";
import { temMerge } from "@/jv_doc/utils/handleData/index";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import JvDialog from "~/cpn/JvDialog/index.vue";
import customUpload from "@/components/customUpload/index.vue";
import request from "@/utils/request";
import { Form } from "@/jv_doc/class/form";
import { formSchema } from "@/views/workModule/production/productionTask/components/formConfig";
import { createTaskFormSchema } from "./formConfig";
export default {
  name: "ToolingBOM",
  // 表格数据
  components: {
    JvDialog,
    Popover,
    ParseImg,
    searchItem,
    selectTask,
    setLevel,
    customUpload,
  },
  data() {
    return {
      taskTypeEnum,
      demandStatusEnum,
      PmTaskData: {},
      TaskListData1: [],
      editDisabled: false,
      uploadLoading: false, // 上传loading
      showMassUpload: false, // 批量上传弹窗
      createTaskFormObj: {
        form: {
          PmTaskBillId: "",
          PlanStart: new Date(),
          PlanEnd: "",
          Level: "",
          Parts: [],
        },
      },
      partLevelMap: {
        0: {
          name: this.$t("Generality.Ge_Hide"),
        },
        1: {
          name: this.$t("Generality.Ge_Show"),
        },
      },
      formObj: {},
      eTableObj: {},
      importTableObj: {},
      toolId: "",
      ToolingNo: "",
      currentRow: {},
      cur_toolId: "",
      TaskListData: [],
      importShow: false,
      loading: false,
      selectProjectFormVisible: false,
      searchItemDialogFormVisible: false,
      selectTaskDialogFormVisible: false,
      setLevelDialogFormVisible: false,
      importDialogFormVisible: false,
      createTaskVisible: false,
      GetData: [],
      taskData: [],
      setLevelData: [],
      MouldListData: [],
      defaultImgUrl: window.global_config.ImgBase_Url,
      defaultUnit: "",
      saveData: {
        PartNo: "",
        PartName: "",
        ItemId: "",
        Description: "",
        Description2: "",
        Quantity: 0,
        PartLevel: 1,
        BOMType: "Part",
        PhotoUrl: "",
        Unit: "",
        ItemCategory: "Part",
        ToolingNo: "",
        SupplierName: "",
        MaterialRequirementState: "",
        Creator: "",
        CreationDate: "",
        Remarks: "",
      },
      exportTemplate: [
        {
          prop: "PartNo",
          label: this.$t("Generality.Ge_ID"),
        },

        /*名称*/
        {
          prop: "PartName",
          label: this.$t("Generality.Ge_ItemName"),
        },
        /*描述*/
        {
          prop: "Description",
          label: this.$t("Generality.Ge_Describe"),
        },
        /*描述*/
        {
          prop: "Description2",
          label: this.$t("design.De_Description2"),
        },
        /*数量*/
        {
          prop: "Quantity",
          label: this.$t("Generality.Ge_Quantity"),
        },
        /*单位*/
        {
          prop: "Unit",
          label: this.$t("Generality.Ge_Unit"),
        },
        /*备注*/
        {
          prop: "Remarks",
          label: this.$t("Generality.Ge_Remarks"),
        },
      ],
      exportTemplateData: {
        checkData: [],
        checkedFields: [],
        sourceType: "editTable",
        dataType: "TEMPLATE",
        saveType: "xlsx",
        title: "",
        fileName: this.$t("Generality.Ge_ImportBOM"),
      },
    };
  },
  created() {
    this.formObj = new Form({
      formSchema: [
        {
          prop: "PmTaskBillId",
          cpn: "SyncSelect",
          label: i18n.t("project.Pro_TaskSheetNo"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["change", "blur"],
            },
          ],
          custom: true,
        },
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
    this.createForm();
    this.eTableObj = new EditTable();
    this.importTableObj = new importEditTable();
    this.defaultConfig();
    this.remoteMethod("");
  },
  computed: {
    IsCreateTask() {
      let flag1 = this.eTableObj.selectData.datas.every((item) => {
        return item.ItemCategory.value === "Part";
      });
      let flag2 = this.eTableObj.selectData.datas.every((item) => {
        return item.IsPartProcess.value;
      });
      console.log(flag1, flag2, this.IsSelectLength);
      return this.IsSelectLength && flag1 && flag2;
    },
    IsDisabled() {
      return this.ToolingNo === "";
    },
    IsSelectLength() {
      return this.eTableObj.selectData.datas.length > 0;
    },
    IsTableDisabled() {
      var IsHas = false;
      var IsHas1 = false;
      if (this.eTableObj.selectData.datas.length > 0) {
        var arr = this.eTableObj.selectData.datas.map((x) => x.PartNo.value);
        var arr1 = this.GetData.map((x) => x.PartNo);
        arr.forEach((item) => {
          IsHas1 = !arr1.includes(item);
        });
        if (IsHas1) {
          IsHas = true;
        }
      } else {
        IsHas = true;
      }
      return IsHas;
    },
    IsSearchItemDisabled() {
      return this.eTableObj.selectData.datas.length === 1;
    },
  },
  methods: {
    setShowMassUpload() {
      this.showMassUpload = !this.showMassUpload;
    },
    MassUpload() {
      this.uploadLoading = true;
      let files = this.$refs.customUploadRef.files;
      let promiseAll = [];
      files.forEach((item) => {
        let formData = new FormData();
        formData.append("file", item);
        formData.append("IsUpdateOwner", "true");
        promiseAll.push(
          new Promise((resolve, reject) => {
            uploadImage(formData)
              .then((res) => {
                resolve(res);
              })
              .catch((err) => {
                reject(err);
              });
          })
        );
      });

      const allSettledPromise = Promise.allSettled(promiseAll);

      allSettledPromise.then((results) => {
        this.uploadLoading = false;
        let state = results.filter((item) => {
          return item.status === "fulfilled";
        });
        // 如果全部上传成功则关闭
        this.showMassUpload = state.length !== results.length;
        this.$notify({
          title: "上传完毕",
          message: `一共上传${results.length}张图片，成功${
            state.length
          }张, 失败${results.length - state.length}张`,
          type: state.length === results.length ? "success" : "warning",
        });
        this.getData();
      });
    },
    getData() {
      this.closeTooltip();
      if (!this.toolId) return;
      getPartBomById({ ToolingNo: this.toolId }).then((res) => {
        this.GetData = res.Items;
        this.eTableObj.setData(res.Items);
        this.ToolingNo = JSON.parse(JSON.stringify(this.toolId));
        setTimeout(() => {
          this.eTableObj.doLayout();
        }, 200);
      });
    },
    closeTooltip() {
      let list = document.getElementsByClassName("el-select-dropdown");
      if (list.length > 0) {
        list[list.length - 1].style.display = "none";
      }
    },
    //获取默认配置
    defaultConfig() {
      batch_get({ ConfigKeyList: ["BomDefaultUnit"] }).then((res) => {
        this.defaultUnit = res[0].ConfigValue;
        this.saveData.Unit = this.defaultUnit;
      });
    },
    remoteMethod(query) {
      this.loading = true;
      const str = {
        Keyword: query,
        ItemType: "",
        ItemCategory: "Tooling",
        PageSize: 20,
        CurrentPage: 1,
      };
      itemList(str).then((res) => {
        this.MouldListData = res.Items;
        this.loading = false;
      });
    },
    /*    getToolData(){
      const str = {
        Keyword: query,
        ItemType: "",
        ItemCategory: "Tooling",
        PageSize: 20,
        CurrentPage: 1,
      };
      itemList(str).then((res) => {

        this.MouldListData = res.Items;
        this.loading = false;
      });
    },*/
    copy(row, index) {
      let str = JSON.parse(JSON.stringify(row));
      str.ItemId = "";
      this.eTableObj.insert(index, format2source([str]));
    },

    //设置级别弹窗
    l_setLevel() {
      if (this.eTableObj.selectData.datas.length > 0) {
        this.setLevelData = this.eTableObj.selectData.datas;
        this.setLevelDialogFormVisible = true;
      } else {
        this.$message.warning(this.$t("Generality.Ge_ChooseAtLeastOneItem"));
      }
    },
    confirmSetLevel(e) {
      this.setLevelDialogFormVisible = e;
      this.getData();
    },

    // 新增编辑行
    l_addRow() {
      /*this.l_insert(-1);*/
      this.saveData.Quantity = 1;
      console.log(this.saveData);
      this.eTableObj.push([this.saveData]);
    },
    l_insert(index) {
      let cur_row = this.eTableObj.getEmptyRow();
      cur_row.Quantity = 1;
      cur_row.Unit = this.defaultUnit;
      let targetList = this.mixinToolId([cur_row]);
      this.eTableObj.insert(index, targetList);
    },
    l_delete(index) {
      this.eTableObj.delItem(index);
    },
    i_delete(row, index) {
      this.importTableObj.delItem(row);
    },
    l_save() {
      var Boms = temMerge(
        this.saveData,
        this.mixinToolId(this.eTableObj.getTableData())
      );
      var saveData = {
        ToolingNo: this.toolId,
        Boms,
      };
      this.eTableObj.validate((valid) => {
        if (valid) {
          savePartBom(saveData).then((res) => {
            this.getData();
          });
        } else {
          // alert("fail");
        }
      });
    },

    //批量复制一张单出来
    l_copy() {
      let arr = JSON.parse(JSON.stringify(this.eTableObj.selectData.datas));

      arr.forEach((item) => {
        item.ItemId = "";
      });
      this.eTableObj.push(format2source(arr));
    },

    //批量删除
    l_del() {
      this.eTableObj.setData(
        format2source(
          this.getNweArr(
            this.eTableObj.selectData.datas,
            this.eTableObj.tableData
          )
        )
      );
    },
    // 创建生产任务
    l_createTask() {
      this.createTaskFormObj.form.Parts = [];
      this.createTaskVisible = true;
      this.searchTaskInfo();
      this.createTaskFormObj.form.Level = "Ordinary";
      this.createTaskFormObj.form.PlanStart = new Date();
      this.eTableObj.selectData.datas.forEach((item) => {
        this.createTaskFormObj.form.Parts.push({
          PartNo: item.PartNo.value,
          PartName: item.PartName.value,
          Description: item.Description.value,
          Unit: item.Unit.value,
          Quantity: item.Quantity.value,
          ToolingNo: item.ToolingNo.value,
        });
      });
      console.log(this.eTableObj.selectData.datas);
    },
    // 确认创建生产任务
    createTaskConfirm() {
      this.createTaskFormObj.validate((valid) => {
        if (valid) {
          quickly_create_task(this.createTaskFormObj.form).then((res) => {
            this.createTaskVisible = false;
          });
        }
      });
    },
    searchTaskInfo() {
      var str = {
        ToolingNo: this.ToolingNo,
        SelectType: 0,
      };
      toolingTaskInfoList(str).then((res) => {
        this.PmTaskData = res.Items;
        if (res.Items.length === 1) {
          this.createTaskFormObj.form.PmTaskBillId = res.Items[0].BillId;
          this.createTaskFormObj.form.PlanEnd = res.Items[0].PlanEnd;
        } else if (res.Items.length === 0) {
          this.createTaskFormObj.form.PmTaskBillId = "";
        }
        this.TaskListData1 = res.Items;

        //判断说明不只一个任务单
      });
    },
    createForm() {
      console.log(createTaskFormSchema);
      this.createTaskFormObj = new Form({
        formSchema: createTaskFormSchema,
        labelPosition: "top",
        baseColProps: {
          span: 24,
        },
        labelWidth: "80px",
      });
    },
    changePmTaskBillId() {
      this.PmTaskData.forEach((item) => {
        console.log(item.BillId)
        if (this.createTaskFormObj.form.PmTaskBillId === item.BillId) {
          this.createTaskFormObj.form.PlanEnd = item.PlanEnd;
        }
      });
      console.log(this.createTaskFormObj.form, this.createTaskFormObj.form.PmTaskBillId);
    },
    getNweArr(a, b) {
      const arr = [...a, ...b];
      const newArr = arr.filter((item) => {
        return !(a.includes(item) && b.includes(item));
      });
      return newArr;
    },
    //点击更多操作
    handleCommand(command) {
      switch (command) {
        case 1:
          this.downExport2Excel();
          break;
        case 2:
          this.importShow = true;
          break;
      }
    },

    //下载导入模板
    downExport2Excel() {
      var arr = [];
      this.eTableObj.props.tableSchema.forEach((item) =>
        this.exportTemplate.forEach((Titem) => {
          if (item.label === Titem.label) {
            arr.push(item);
          }
        })
      );
      this.exportTemplateData.checkedFields = arr;
      export2Excel(this.exportTemplateData);
    },
    //工艺设计
    CraftDesign() {
      this.$router.push({
        name: "CraftDesign",
        params: { data: format2source(this.eTableObj.selectData.datas) },
      });
    },
    CraftDesign1(row) {
      this.$router.push({
        name: "CraftDesign",
        params: { data: format2source([row]) },
      });
    },
    //同步零件信息
    synchronizePart() {
      synchronizePart(format2source(this.eTableObj.selectData.datas)).then(
        (res) => {
          console.log(res);
        }
      );
    },
    //导入BOM
    ImportBOM() {
      this.importShow = true;
    },
    //对照物料
    controlMaterial() {
      autoMatchMaterials(format2source(this.eTableObj.selectData.datas)).then(
        (res) => {
          this.eTableObj.selectData.datas.forEach((item) => {
            res.forEach((Titem) => {
              //判断相同的零件
              if (item.PartNo.value === Titem.PartNo) {
                item.Description.value = Titem.Description;
                item.ItemId.value = Titem.ItemId;
                item.ItemCategory.value = Titem.ItemCategory;
              }
            });
          });
        }
      );
    },
    //自动对照物料和手动对照物料
    manualControlMaterial(e) {
      this.eTableObj.selectData.datas.forEach((item) => {
        e.forEach((Titem) => {
          item.Description.value = Titem.Description;
          item.ItemId.value = Titem.ItemId;
          item.ItemCategory.value = "Standard";
        });
      });
    },
    //提交物料需求
    submitItemsDemand() {
      var str = {
        ToolingNo: this.ToolingNo,
        SelectType: 0,
      };
      toolingTaskInfoList(str).then((res) => {
        if (res.Count === 1) {
          this.formObj.form.PmTaskBillId = res.Items[0].BillId;
        }
        this.TaskListData = res.Items;
        this.selectProjectFormVisible = true;
      });
    },
    confirmItem() {
      var str = {
        ToolingNo: this.toolId,
        Boms: format2source(this.eTableObj.selectData.datas),
        PmTaskBillId: this.formObj.form.PmTaskBillId,
      };
      confirmSubmitMaterialRequirement(str).then((res) => {
        //判断有没有提交过物料需求
        if (res.length > 0) {
          this.$confirm(
            res.toString() + this.$t("Generality.Ge_ContinueOrNot"),
            {
              confirmButtonText: this.$t("Generality.Ge_OK"),
              cancelButtonText: this.$t("Generality.Ge_Cancel"),
              type: "warning",
            }
          ).then(() => {
            // this.IsSubmitItemsDemand()
            this.confirmTask();
            this.selectProjectFormVisible = false;
          });
        } else {
          // this.IsSubmitItemsDemand()
          this.confirmTask();
          this.selectProjectFormVisible = false;
        }
      });
    },
    //判断需要关联的任务
    IsSubmitItemsDemand() {
      this.confirmTask(res.Items);
    },

    //跳转到物料需求
    confirmTask(e) {
      this.$router.push({
        name: "De_ItemsDemand_Add",
        params: {
          data: format2source(this.eTableObj.selectData.datas),
          AssociateTask: e,
          PmTaskBillId: this.formObj.form.PmTaskBillId,
        },
      });
    },

    //搜索物料
    searchItem() {
      this.searchItemDialogFormVisible = true;
    },

    //导入数据
    importComplete(e) {
      this.importShow = false;
      this.importDialogFormVisible = true;

      let arr = this.handleExcelData(e);
      console.log(arr, "arr");
      // var arr = [];
      // e.forEach((Titem) => {
      //   var str = {};
      //   this.exportTemplate.forEach((item) => {
      //     if (Titem[item.label]) {
      //       str[item.prop] = Titem[item.label];
      //     }
      //   });
      //   arr.push(str);
      // });
      this.importTableObj.setData(temMerge(this.saveData, arr));
    },
    handleExcelData(res = []) {
      let endIndex = res.findIndex((item) => {
        return !item["__EMPTY"] && !item["__EMPTY_1"];
      });
      let data = res.slice(4, endIndex - 1);
      let result = data.map((item) => {
        return {
          PartNo: item["__EMPTY_1"] || "",
          PartName: item["__EMPTY"] || "",
          Description2: item["__EMPTY_2"] || "",
          Quantity: item["__EMPTY_3"] || "",
          Description: this.handleDescription([
            item["__EMPTY_4"],
            item["__EMPTY_5"],
            item["__EMPTY_6"],
          ]),
          SupplierName: item["__EMPTY_7"] || "",
          Remarks: item["__EMPTY_8"] || "",
        };
      });
      return result;
    },
    handleDescription(descArr = []) {
      let arr = descArr.filter((item) => !!item);
      return arr.join("*");
    },

    //上传图片
    changeHandle(file) {
      var formData = new FormData();
      formData.append("file", file.file);
      uploadImage(formData).then((res) => {
        this.currentRow.PhotoUrl.value = res;
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    //粘贴图片
    handlePasteData(e) {
      this.changeHandle({ file: e });
    },
    // 混入ToolingNo
    mixinToolId(list) {
      // ToolingNo
      return list.map((item) => {
        item["ToolingNo"] = this.ToolingNo;
        // item["Unit"] = "pcs";
        return item;
      });
    },
    //确定导入的数据
    confirmImportData() {
      if (this.importTableObj.selectData.datas.length > 0) {
        this.importTableObj.validate((valid) => {
          if (valid) {
            var arr = this.eTableObj
              .getTableData()
              .concat(format2source(this.importTableObj.selectData.datas));
            var Boms = temMerge(this.saveData, this.mixinToolId(arr));
            var saveData = {
              ToolingNo: this.toolId,
              Boms,
            };
            savePartBom(saveData).then((res) => {
              this.getData();
              this.importDialogFormVisible = false;
            });
          } else {
            // alert("fail");
          }
        });
      } else {
        this.$message.error(this.$t("Generality.Ge_PleaseAddData"));
      }
    },
  },
};
</script>

<style lang="scss">
.upload-partRes-Img {
  display: flex;
  align-items: center;
  .upload-partRes-Img-error {
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
  .edit-partRes-uploadIcons {
    width: 30px;
    height: 30px;
    top: 10px;
    background: url("./paste.png") no-repeat 0px 0px;
  }
}

.avatar-uploader-icon1 {
  color: #8c939d;
  width: 15px;
  height: 10px;
  line-height: 10px;
  text-align: center;
}
.el-table--scrollable-y .el-table__body-wrapper {
  //overflow-y: hidden;
}

.action-item {
  color: #0960bd;
  padding-right: 10px;
  font-size: 15px;
  cursor: pointer;
}
</style>
