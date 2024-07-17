<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <el-tabs @tab-click="tabClick" slot="sticky-tabs">
      <!-- tab 导航栏  -->
      <el-tab-pane
        v-for="pane in tabPanes"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      ></el-tab-pane>
    </el-tabs>

    <!--单据信息-->
    <JvBlock :title="$t('Generality.Ge_BillInfo') + BillIdShow" ref="first">
      <JvForm :formObj="formObj"> </JvForm>
    </JvBlock>

    <!-- 试模问题点 -->
    <JvBlock :title="$t('project.Pro_TestMouldProblemPoints')" ref="second">
      <div slot="extra">
        <el-button size="mini" @click="addRow">{{
          $t("Generality.Ge_New")
        }}</el-button>
      </div>
      <JvEditTable :tableObj="tableObj">
        <template #BillFiles="{ row }">
          <div v-if="row.BillFiles.value.length > 0">
            <el-image
              style="width: 50px; height: 50px"
              v-for="(item, index) in row.BillFiles.value"
              :key="index"
              :src="defaultImgUrl + item"
            >
            </el-image>
          </div>
        </template>
        <template #operation="{ row, row_index }">
          <TableAction
            :actions="[
              {
                label: $t('Generality.Ge_PhotoUrl'),
                confirm: addImg.bind(null, row),
              },
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </JvBlock>

    <!-- 备注 -->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <el-input type="textarea" :rows="2" v-model="ruleForm.Remarks">
      </el-input>
    </JvBlock>

    <!-- 附件 -->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <div slot="extra">
        <el-button
          size="mini"
          type="primary"
          @click="(_) => $refs.upLoad.upload()"
          >{{ $t("Generality.Ge_Upload") }}</el-button
        >
      </div>
      <JvUploadFile
        @returnData="returnData"
        :BillId="fileBillId"
        ref="upLoad"
      ></JvUploadFile>
    </JvBlock>

    <div slot="fixedFooter">
      <!-- 保存 -->
      <el-button type="primary" @click="save(false)">{{
        $t("Generality.Ge_Save")
      }}</el-button>
      <!-- 保存并提交 -->
      <el-button type="primary" @click="save(true)">{{
        $t("Generality.Ge_SaveAndSubmit")
      }}</el-button>
    </div>

    <jv-dialog
      :title="$t('Generality.Ge_AddNewPicture')"
      width="35%"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :append-to-body="false"
      :visible.sync="dialogImgFormVisible"
      v-if="dialogImgFormVisible"
      @confirm="confirmImg"
    >
      <JvUploadList v-model="ImgDataList" :listType="true"></JvUploadList>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import JvUploadList from "@/components/JVInternal/JvUpload/List";
import { Form } from "~/class/form";
import { EditTable } from "./editConfig";
import { formSchema } from "./formConfig";
import { API as ProjectTask } from "@/api/workApi/project/projectTask";
import closeTag from "@/utils/closeTag";
import { timeFormat } from "~/utils/time";
import { mapState } from "vuex";
export default {
  name: "Pm_TrialTask_Add",
  components: {
    JvUploadFile,
    JvUploadList,
  },
  props: {
    billData: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      curData: this.$route.query,
      formObj: {},
      tableObj: {},
      dialogImgFormVisible: false,
      defaultImgUrl: window.global_config.ImgBase_Url,
      detailRouteName: "Pm_TrialTask_Detail",
      ImgDataList: [],
      tableRow: {},
      fileBillId: this.$route.query.BillId,
      ruleForm:{
        BillId: "",
        BillGui: "",
        TaskType: 0,
        ToolingNo: "",
        PlanStart: "",
        PlanEnd: "",
        State: "",
        Remarks: "",
        BillItems: [],
        TrialToolingDynamicData: {
          RelationId: "",
          TestMouldQuantity: "",
          TestMouldReason: "",
          TestMouldResult: "",
          TestMouldColor: "",
          TestMouldMachine: "",
          TestMouldLocation: "",
          TestMouldDate: "",
          TestMouldUseTime: "",
          TestMouldInfo: "",
          TestMouldProblemPoints: [],
        },
        SaveAndSubmit: true,
        BillFiles: [],
      },
      TestMouldProblemPoints: {
        Id: 0,
        ProblemPoints: "",
        SuggestionsImprovement: "",
        Remarks: "",
        BillFiles: [],
      },
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("project.Pro_TestMouldProblemPoints"),
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "third",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    BillIdShow() {
      return this.cur_Id ? `:  ${this.cur_Id}` : "";
    },
  },
  async created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 6,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.copyProperties();
    this.tableObj = new EditTable();
  },
  mounted() {},
  methods: {
    //单据信息赋初值
    copyProperties() {
      for (let key in this.formObj.form) {
        if (this.curData.hasOwnProperty(key)) {
          this.formObj.form[key] = this.curData[key];
        }
      }
      // 新建单据时
      if (this.formObj.form.TaskType !== "TrialTooling"){
        this.formObj.form.TaskType = "TrialTooling"
        this.formObj.form.RelationId = this.curData.BillId
        this.formObj.form.PlanStart = timeFormat(new Date(), "yyyy-MM-dd")
        let planEnd = new Date(this.formObj.form.PlanStart);
        planEnd.setDate(planEnd.getDate() + 7);
        this.formObj.form.PlanEnd = timeFormat(planEnd, "yyyy-MM-dd");
        this.formObj.form.TestMouldDate = timeFormat(new Date(), "yyyy-MM-dd")
      }
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    //新增一行
    addRow() {
      this.tableObj.push([this.TestMouldProblemPoints]);
    },
    //删除明细
    delItem(index) {
      this.tableObj.delItem(index);
    },
    //点击添加图片
    addImg(row) {
      this.dialogImgFormVisible = true;
      this.ImgDataList = [...row.BillFiles.value];
      this.tableRow = row;
    },
    confirmImg() {
      this.tableRow.BillFiles.value = this.ImgDataList;
      this.dialogImgFormVisible = false;
      this.tableRow = {};
    },
    save(saveAndSubmit) {
      this.ruleForm.SaveAndSubmit = saveAndSubmit;
      this.formObj.submitAll(
        [this.formObj.validate, this.tableObj.validate],
        (valid) => {
          if (valid) {
            for (let key in this.formObj.form) {
              if (this.ruleForm.hasOwnProperty(key)) {
                this.ruleForm[key] = this.formObj.form[key];
              }
              if (this.ruleForm.TrialToolingDynamicData.hasOwnProperty(key)) {
                this.ruleForm.TrialToolingDynamicData[key] =
                  this.formObj.form[key];
              }
            }
            this.ruleForm.TrialToolingDynamicData.TestMouldProblemPoints =
              this.tableObj.getTableData().map((item, index) => ({
                ...item,
                Id: index,
              }));
            this._save();
          }
        }
      );
    },
    _save() {
      ProjectTask.api_save(this.ruleForm).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { BillId: res },
        };
        closeTag(this.current, TagName);
      });
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
  },
};
</script>

<style lang="scss" scoped></style>
