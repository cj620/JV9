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
  </PageWrapper>
</template>

<script>
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { Form } from "~/class/form";
import { EditTable } from "./editConfig"
import { formSchema } from "./formConfig";
export default {
  name: "Pm_ProjectTask_Add1",
  components: {
    JvUploadFile,
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
      fileBillId: this.$route.query.BillId,
      ruleForm:{
        Remarks:"",
        BillFiles: [],
      },
      BillItems: {
        Id: "",
        BillGui: "",
        ProblemPoints: "",
        SuggestionsImprovement: "",
        Remarks: "",
        BillFiles: "",
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
      this.formObj.form.TestMouldDate = new Date()
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
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
