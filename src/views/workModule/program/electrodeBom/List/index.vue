<!--
 * @Author: H.
 * @Date: 2021-11-09 09:22:38
 * @LastEditTime: 2022-06-03 11:26:10
 * @Description: 模具BOM
-->

<template>
  <PageWrapper :footer="false">
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
            label: $t('Generality.Ge_Import') + ' BOM',
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
			      label: $t('design.De_StateLinkage'),
			      disabled: IsTableEmpty,
			      confirm: synchronizeState.bind(),
          },
        ]"
      >
      </Action>
      <template #titleBar>
        <Popover @confirm="getData" @reset="toolId = ''" style="margin: 0 10px">
          <el-input
            v-model="toolId"
            :placeholder="$t('Generality.Ge_SearchByNumber')"
            size="mini"
          ></el-input>
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

        {{ demandStatusEnum[record] &&demandStatusEnum[record].name }}
      </template>
      <template #operation="{ row, row_index }">
        <TableAction
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
        />
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
        <JvEditTable
      :tableObj="importTableObj"
      highlight-current-row

    >
     <template #operation="{ row, row_index }">
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
  confirmSubmitMaterialRequirement,
  toolingTaskInfoList,
  autoMatchMaterials,
  synchronize_material_state,
} from "@/api/workApi/design/toolingBOM";
import {
  getPoleBomById,
  savePoleBom,
} from "@/api/workApi/program/electrodeBom";
import {  demandStatusEnum } from "@/enum/workModule";

import { uploadImage } from "@/api/workApi/materials/fileUpload";
import Popover from "@/jv_doc/cpn/JvTable/cpn/Popover.vue";
import { export2Excel } from "@/jv_doc/cpn/JvTable/utils/export2Excel";
import { format2source } from "@/jv_doc/class/utils/dataFormat";
import ParseImg from "@/components/JVInternal/ParseImg";
import { temMerge } from "@/jv_doc/utils/handleData/index";
// 获取系统配置接口
import { batch_get } from "@/api/basicApi/systemSettings/sysSettings";
export default {
  name: "ElectrodeBom",
  // 表格数据
  components: {
    Popover,
    ParseImg,
    searchItem,
    selectTask,
    setLevel,
  },
  data() {
    return {
      demandStatusEnum,
      partLevelMap: {
        0: {
          name: this.$t("Generality.Ge_Hide"),
        },
        1: {
          name: this.$t("Generality.Ge_Show"),
        },
      },
      eTableObj: {},
      importTableObj:{},
      toolId: "",
      ToolingNo: "",
      defaultUnit: "",
      currentRow: {},
      cur_toolId: "",
      importShow: false,
      defaultImgUrl: window.global_config.ImgBase_Url,
      searchItemDialogFormVisible: false,
      selectTaskDialogFormVisible: false,
      setLevelDialogFormVisible: false,
      importDialogFormVisible:false,
      GetData: [],
      taskData: [],
      setLevelData: [],
      saveData: {
        PartNo: "",
        PartName: "",
        ItemId: "",
        Description: "",
        Description2: "",
        PartLevel: 1,
        Quantity: 0,
        BOMType: "Electrode",
        PhotoUrl: "",
        ToolingNo: "",
        Creator: "",
        CreationDate: "",
        MaterialRequirementState:'',
        AssociationPartNo: '',
        ElectrodeDescription1: '',
        ElectrodeDescription2: '',
        ElectrodeDescription3: '',
        Remarks: "",
      },
      exportTemplate: [
        /*编号*/
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
        /*数量*/
        {
          prop: "Remarks",
          label: this.$t("Generality.Ge_Remarks"),
        },
        {
          // 电极关联零件
          prop: "AssociationPartNo",
          label: this.$t("program.Pr_AssociationPartNo"),
        },
        {
          //材质（精）
          prop: "ElectrodeDescription1",
          label: this.$t("program.Pr_ElectrodeDescription1"),
        },
        {
          //材质（精）
          prop: "ElectrodeDescription2",
          label: this.$t("program.Pr_ElectrodeDescription2"),
        },
        {
          //材质（精）
          prop: "ElectrodeDescription3",
          label: this.$t("program.Pr_ElectrodeDescription3"),
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
    this.eTableObj = new EditTable();
        this.importTableObj = new importEditTable

    this.defaultConfig();
  },
  computed: {
    IsDisabled() {
      return this.ToolingNo === "";
    },
    IsSelectLength() {
      return this.eTableObj.selectData.datas.length > 0;
    },
    IsTableEmpty() {
      return this.eTableObj.tableData.length === 0;
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
    getData() {
      if (!this.toolId) return;
      getPoleBomById({ ToolingNo: this.toolId }).then((res) => {
        this.GetData = res.Items;
        this.eTableObj.setData(res.Items);
        this.ToolingNo = JSON.parse(JSON.stringify(this.toolId));
        setTimeout(() => {
          this.eTableObj.doLayout();
        }, 200);
      });
    },
    //获取默认配置
    defaultConfig() {
      batch_get({ ConfigKeyList: ["BomDefaultUnit"] }).then((res) => {
        this.defaultUnit = res[0].ConfigValue;
        this.saveData.Unit = this.defaultUnit;
      });
    },
    copy(row, index) {
       let str=JSON.parse(JSON.stringify(row))
       str.ItemId=''
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
      this.eTableObj.push([this.saveData]);
    },
    l_insert(index) {
      let cur_row = this.eTableObj.getEmptyRow();
      cur_row.Quantity = 1;
      cur_row.Unit = this.defaultUnit;
      let targetList = this.mixinToolId([cur_row]);
      this.eTableObj.insert(index, targetList);
    },
    l_delete(row, index) {
      this.eTableObj.delItem(row);
    },
    i_delete(row, index) {
      this.importTableObj.delItem(index);
    },
    l_save() {
    var Boms = temMerge(
        this.saveData,
        this.mixinToolId(this.eTableObj.getTableData())
      );
var saveData ={
  ToolingNo:this.toolId,
  Boms

}

        this.eTableObj.validate((valid) => {
          if (valid) {
            savePoleBom(saveData).then((res) => {
              this.getData();
            });
          } else {
            // alert("fail");
          }
        });

    },
    //批量复制一张单出来
    l_copy() {
      let arr = JSON.parse(JSON.stringify( this.eTableObj.selectData.datas))

            arr.forEach(item=>{
        item.ItemId=''
      })
      this.eTableObj.push(format2source(arr));
    },

    //批量删除
    l_del() {
      this.eTableObj.setData(format2source(this.getNweArr(this.eTableObj.selectData.datas, this.eTableObj.tableData)));

    },
    getNweArr(a,b){
      const arr = [...a,...b];
      const newArr = arr.filter(item => {
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
    //同步物料状态
    synchronizeState() {
      let arr = this.eTableObj.getTableData()
      synchronize_material_state(arr).then((res) => {
        this.getData();
      })
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
        name: "ElectrodeCraftDesign",
        params: { data: format2source(this.eTableObj.selectData.datas) },
      });
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
                console.log(555);
                item.Description.value = Titem.Description;
                item.ItemId.value = Titem.ItemId;
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
        });
      });
    },

    //提交物料需求
    submitItemsDemand() {
      var str = {
        ToolingNo: this.toolId,
        Boms: format2source(this.eTableObj.selectData.datas),
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
            //this.IsSubmitItemsDemand()
            this.confirmTask();
          });
        } else {
          //this.IsSubmitItemsDemand()
          this.confirmTask();
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
        name: "Pa_ElectrodeDemand_Add",
        params: {
          data: format2source(this.eTableObj.selectData.datas),
          AssociateTask: e,
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
      this.importDialogFormVisible = true
      var arr = [];
      e.forEach((Titem) => {
        var str = {};
        this.exportTemplate.forEach((item) => {
          if (Titem[item.label]) {
            str[item.prop] = Titem[item.label];
          }
        });
        arr.push(str);
      });

           this.importTableObj.setData(temMerge(this.saveData, arr));
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
    confirmImportData(){
      if(this.importTableObj.selectData.datas.length>0){
        var arr =  this.eTableObj.getTableData().concat(format2source(this.importTableObj.selectData.datas) )
        console.log(arr)
        var Boms = temMerge(
          this.saveData,
          this.mixinToolId(arr)
        );
        var saveData ={
          ToolingNo:this.toolId,
          Boms
        }
        console.log(saveData)
        savePoleBom(saveData).then((res) => {
          this.getData();
          this.importDialogFormVisible = false
        });
      }else{
        this.$message.error(this.$t("Generality.Ge_PleaseAddData"));

      }


    }
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
</style>
