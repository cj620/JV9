<!--
 * @Author: H.
 * @Date: 2021-11-30 15:50:23
 * @LastEditTime: 2022-01-14 15:16:11
 * @Description:
-->
<template>
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button type="primary" size="mini" @click="hanldeNewError">{{
          $t("quality.Qu_CreatFromManufacturingTaskList")
        }}</el-button>
      </div>
      <JvForm :formObj="formObj">
        <template #Worker="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
            @change="userChange"
          >
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.UserName"
              :value="item.UserName"
            >
            </el-option>
          </el-select>
        </template>
        <template #Process="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            @change="processChange"
            :placeholder="$t('Generality.Ge_PleaseSelect')"
          >
            <el-option
              v-for="item in processList"
              :key="item.value"
              :label="item.Process"
              :value="item.Process"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 备注 -->
    <JvBlock :title="$t('Generality.Ge_Remarks')">
      <el-input type="textarea" :rows="2" v-model="ruleForm.Remarks">
      </el-input>
    </JvBlock>
    <!-- 附件 -->
    <JvBlock :title="$t('Generality.Ge_Annex')">
      <div slot="extra">
        <el-button size="mini" @click="(_) => $refs.upLoad.upload()">{{
          $t("Generality.Ge_Upload")
        }}</el-button>
      </div>
      <JvUploadFile
        @returnData="returnData"
        :BillId="fileBillId"
        ref="upLoad"
      ></JvUploadFile>
    </JvBlock>
    <div slot="fixedFooter">
      <!-- 提交 -->
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Submit")
      }}</el-button>
    </div>
    <JvDialog
      :title="$t('quality.Qu_CreatFromManufacturingTaskList')"
      :visible.sync="dialogVisible"
      @confirm="handleConfirm"
      width="40%"
      v-if="dialogVisible"
    >
      <JvTable :table-obj="tableObj"></JvTable>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import debounce from "@/utils/debounce";
import { saveCheckErr } from "@/api/workApi/quality/checkErr";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { Table } from "./config";
import { productionTaskList } from "@/api/workApi/production/productionTask";

export default {
  data() {
    return {
      formObj: {},
      tableObj: {},
      params: {
        ItemCategory: "Tooling",
        PageSize: 100,
        CurrentPage: 1,
        Keyword: "",
      },
      partParams: {
        ItemCategory: "Part",
        PageSize: 100,
        CurrentPage: 1,
        Keyword: "",
      },
      itemList: [],
      partList: [],
      userList: [],
      ruleForm: {
        Remarks: "",
        AttachmentList: [],
      },
      fileBillId: "",
      dialogVisible: false,
      processList: [],
    };
  },
  methods: {
    async getData() {
      await getAllUserData().then((res) => {
        this.userList = res.Items;
      });
      await productionTaskList({
        CurrentPage: 1,
        PageSize: 20,
      }).then((res) => {
        const datas = res.Items.filter(
          (item) =>
            item.State === "Processing" ||
            item.State === "Processed" ||
            item.State === "ToBeProcessed"
        );
        this.tableObj.setData(datas);
      });
    },
    // 选择worker之后自动填充部门
    userChange(e) {
      this.formObj.form.Department = this.userList.find(
        (item) => item.UserName === e
      ).DepartmentName;
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.AttachmentList = fileData;
    },
    save() {
      this.formObj.validate((valid) => {
        if (valid) {
          let data = Object.assign({}, this.ruleForm, this.formObj.form);
          saveCheckErr(data).then((res) => {
            let TagName = {
              name: `QualityError`,
            };
            closeTag(this.current, TagName);
          });
        }
      });
    },
    //打开创建任务加工单dialog
    hanldeNewError() {
      this.dialogVisible = true;
    },
    // 确认从任务加工单创建异常单
    handleConfirm() {
      const { datas } = this.tableObj.selectData;
      if (datas.length === 0)
        return this.$message.warning(
          this.$t("quality.Qu_PleaseSelectADocument")
        );
      this.dialogVisible = false;
      this.setFormData(datas[0]);
    },
    setFormData(data) {
      console.log(data)
      const { ToolingNo, PartNo, PartName, Quantity, Process } = data;
      console.log(PartName)
      this.processList = Process.filter(
        (item) => item.State !== "Received" && item.State !== "ToBeReceived"
      );
      if (this.processList.length === 0)
        return this.$message.error(
          this.$t("quality.Qu_ThereAreNoManufacturedProcesses")
        );
      const obj = {
        ToolingNo,
        PartNo,
        PartName,
        Quantity,
        Process: this.processList[0].Process,
        Department: "",
        CheckResult: "",
        CheckDate: "",
        EstimatedLoss: 0,
        TaskProcessId: this.processList[0].Id,
        CheckRecordId: data.Id ?? 0,
      };
      this.formObj.form = obj;
    },
    processChange(e) {
      this.formObj.form.TaskProcessId = this.processList.find(
        (item) => item.Process === e
      ).Id;
    },
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 8,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.tableObj = new Table();
    this.getData();
    this.tableObj.props.selectType = "radio";
    if (this.$route.params.data) {
      this.setFormData(this.$route.params.data);
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  components: {
    JvUploadFile,
  },
};
</script>

<style lang="scss" scoped></style>
