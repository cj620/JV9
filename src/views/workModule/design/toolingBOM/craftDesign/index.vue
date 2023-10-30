<!--工艺设计-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj"> </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
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
              label: $t('project.Pro_AddProcedure'),
              confirm: addProcess,
            },
            {
              label: $t('project.Pro_SelectTemplate'),
              confirm: selectProcessTemplate,
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
        <template #IsCompulsoryInspection="{ row }">
          <el-checkbox v-model="row.IsCompulsoryInspection.value"></el-checkbox>
        </template>
        <template #ProcessPicture="{ row }">
          <div @click="addProcessPicture(row)">
            {{ $t("Generality.Ge_New") }}
          </div>
        </template>
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index),
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

    <!-- 选择工序-->

    <SelectProcess
      :visible.sync="ProcessDialogFormVisible"
      v-if="ProcessDialogFormVisible"
      @selectProcessData="selectProcessData"
    >
    </SelectProcess>
    <SelectProcessTemplate
      :visible.sync="ProcessTemplateDialogFormVisible"
      v-if="ProcessTemplateDialogFormVisible"
      @confirmProcessTemplate="confirmProcessTemplate"
    >
    </SelectProcessTemplate>
    <jv-dialog
       :title="$t('Generality.Ge_AddNewPicture')"
      width="35%"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      :visible.sync="ImgDialogFormVisible"
      v-if="ImgDialogFormVisible"
      @confirm="confirmProcessImg"
    >
      <JvUploadList v-model="ImgDataList" :listType="true"></JvUploadList>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import SelectProcess from "@/components/JVInternal/SelectProcess/index";
import SelectProcessTemplate from "@/components/JVInternal/SelectProcessTemplate/index";
import { temMerge } from "@/jv_doc/utils/handleData/index";
import JvUploadList from "@/components/JVInternal/JvUpload/List";
import {
  getPartProcess,
  savePartProcess,
} from "@/api/workApi/design/toolingBOM";
import { getByProcess } from "@/api/workApi/production/baseData";
import closeTag from "@/utils/closeTag";
import { mapState } from "vuex";
export default {
  name: "CraftDesign",
  data() {
    return {
      formObj: {},
      eTableObj: {},
      ImgDataList: [],
      ProcessDialogFormVisible: false,
      ProcessTemplateDialogFormVisible: false, //工艺模板
      SelectedData: {}, //添加工序图片的时候要确定选择那一道工序用的
      ImgDialogFormVisible: false,
      ProcessContentList: [],
      BillItems: {
        Id: 0,
        BillGui: "",
        Process: "",
        PlanTime: 1,
        ProcessContent: "",
        Resource: "",
        ProgramingProcess: "",
        ProgramingPlanTime: 1,
        ProcessPicture: [],
        customData: [],
        ProcessContentList: [],
        IsCompulsoryInspection: false,
      },
    };
  },
  components: {
    SelectProcess,
    SelectProcessTemplate,
    JvUploadList,
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 6,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.eTableObj = new EditTable();
    if (this.$route.params.data) {
      this.formObj.form = this.$route.params.data[0];
      this.GetData();
    }
  },
  methods: {
    GetData() {
      getPartProcess({ PartNo: this.formObj.form.PartNo }).then((res) => {
        if (res.ProcessList.length > 0) {
          res.ProcessList.forEach((item) => {
            if (item.ProcessContent !== "") {
              item.customData = item.ProcessContent.split(",");
            }
          });
          this.eTableObj.push(temMerge(this.BillItems, res.ProcessList));
        }
      });
    },
    //选择工序后返回的数据
    selectProcessData(e) {
      e.forEach((item) => {
        item.ProcessContent = "";
      });

      this.eTableObj.push(temMerge(this.BillItems, e));
    },
    //选择模板后返回的数据
    confirmProcessTemplate(e) {
      console.log(e);
      e.forEach((item) => {
        item.customData = item.ProcessContent.split(",");
      });
      this.eTableObj.push(temMerge(this.BillItems, e));
      this.ProcessTemplateDialogFormVisible = false;
    },
    //内容下拉框
    changeValue(e, row) {
      console.log(row);
      var arr = [];
      if (e) {
        getByProcess({ Process: row.Process.value }).then((res) => {
          console.log(res);
          res.ProcessContent.split(",").forEach((item) => {
            arr.push({
              value: item,
              label: item,
            });
          });
          row.ProcessContentList.value = arr;
        });
      }
    },
    //选择工序
    addProcess() {
      this.ProcessDialogFormVisible = true;
    },

    //删除工序
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    //选择工艺模板
    selectProcessTemplate() {
      this.ProcessTemplateDialogFormVisible = true;
    },
    //改工序的顺序
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
    //添加工序图片
    addProcessPicture(row) {
      this.SelectedData = row;
      this.ImgDialogFormVisible = true;
      this.ImgDataList = JSON.parse(JSON.stringify(row.ProcessPicture.value));
    },
    //上传图片后返回的数据
    confirmProcessImg(e) {
      this.SelectedData.ProcessPicture.value = JSON.parse(
        JSON.stringify(this.ImgDataList)
      );
      this.ImgDataList = [];
      this.ImgDialogFormVisible = false;
    },
    save() {
      var arr = JSON.parse(JSON.stringify(this.eTableObj.getTableData()));
      arr.forEach((item) => {
        item.ProcessContent = item.customData.toString();
      });

      var str = {
        PartNo: this.formObj.form.PartNo,
        IsFinishedProductInspection: this.formObj.form.IsFinishedProductInspection,
        PartProcesses: arr,
      };
      savePartProcess(str).then((res) => {
        let TagName = {
          path: "/design/toolingBOM",
          name: `ToolingBOM`,
          fullPath: "/design/toolingBOM",
          params:{
            PartNo:this.formObj.form.PartNo
          }
        };
        closeTag(this.current, TagName);
      });
    },
  },
};
</script>

<style scoped></style>
