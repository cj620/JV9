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
    <JvBlock :title="$t('Generality.Ge_BillInfo')" ref="first">
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
          <div v-if="row.BillFiles.value.length>0">
            <el-image
                style="width: 50px; height: 50px"
                v-for="(item,index) in row.BillFiles.value"
                :key="index"

                :src="defaultImgUrl +item"
            >
            </el-image>
          </div>

        </template>
        <template #operation="{ row, row_index }">
          <TableAction
              :actions="[
              {
                label: '图片',
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
import { EditTable } from "./editConfig"
import { formSchema } from "./formConfig";
import { API as ProjectTask } from "@/api/workApi/project/projectTask";
import closeTag from "@/utils/closeTag";
import { timeFormat } from "~/utils/time";
export default {
  name: "Pm_ProjectTask_Add1",
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
      detailRouteName: "Pm_ProjectTask_Detail",
      ImgDataList: [],
      tableRow: {},
      fileBillId: this.$route.query.BillId,
      ruleForm:{
        TaskType: 0,
		    ToolingNo: "",
        PlanStart: "",
        PlanEnd: "",
        RelationId: "",
        TestMouldReason: "",
        TestMouldResult: "",
        TestMouldColor: "",
        TestMouldMachine: "",
        TestMouldLocation: "",
        TestMouldDate: "",
        TestMouldUseTime: "",
        TestMouldInfo: "",
		    Remarks: "",
		    SaveAndSubmit: true,
		    BillItems: [],
		    BillFiles: [],
      },
      BillItems: {
        Id: "",
        BillGui: "",
        ProblemPoints: "",
        SuggestionsImprovement: "",
        Remarks: "",
        BillFiles: [],
      },
      tabPanes: [
        {
          label: this.$t('Generality.Ge_BillInfo'),
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
  mounted() {
  },
  methods: {
    //单据信息赋初值
    copyProperties() {
      for (let key in this.formObj.form) {
        if (this.curData.hasOwnProperty(key)) {
          this.formObj.form[key] = this.curData[key];
        }
      }
      this.formObj.form.RelationId = this.curData.BillId
      this.formObj.form.TestMouldDate = timeFormat(new Date(), "yyyy-MM-dd")
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    //新增一行
    addRow() {
      this.tableObj.push([this.BillItems]);
    },
    //删除明细
    delItem(index) {
      this.tableObj.delItem(index);
    },
    //点击添加图片
    addImg(row){
      console.log(row);
      this.dialogImgFormVisible=true
      this.ImgDataList=row.BillFiles.value
      this.tableRow=row
    },
    confirmImg(){
      console.log(this.ImgDataList,this.tableRow);
      this.tableRow.BillFiles.value=this.ImgDataList
      this.dialogImgFormVisible=false
      this.tableRow={}
    },
    save(saveAndSubmit) {
      // this.tableObj.tableData.forEach((item, index) => {
      //   item.Id = item.row_index
      // });
      this.ruleForm.SaveAndSubmit = saveAndSubmit;
      this.formObj.submitAll(
        [this.formObj.validate, this.tableObj.validate],
        (valid) => {
            if (valid) {
              Object.assign(this.ruleForm, this.formObj.form);
              console.log(this.tableObj);
              this.ruleForm.BillItems = this.tableObj.getTableData();
              this.ruleForm.BillItems = this.ruleForm.BillItems.map((item, index) => {
                item.Id = index.toString();
                return item;
              });
              this._save();
            }
        }
      );
    },
    _save() {
      console.log('执行');
      ProjectTask.api_save(this.ruleForm).then((res) => {
        console.log(res)
      });
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
