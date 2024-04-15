<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">

    <JvBlock :title="$t('Generality.Ge_TemplateInfo')" ref="first">
      <JvForm :formObj="formObj"> </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('device.De_MaintenanceInfo')" ref="second">
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
              confirm: addTPLItem,
            },
          ]"
        >
        </Action>
      </div>
      <JvEditTable :tableObj="M_TableObj">
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delTPLItem.bind(null, row_index),
              },
            ]"
          /> </template
      ></JvEditTable>
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
    </div>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { M_EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";

import { mapState } from "vuex";
// 引入模块API接口
import { API as Maintenance_tpl } from "@/api/workApi/equipment/maintenance_tpl";
import closeTag from "@/utils/closeTag";
import ImgUploader from "@/components/WorkModule/ImgUploader";
export default {
  name: "As_MaintenanceTPLAdd",
  components: {
    JvUploadFile,
    ImgUploader,
  },
  props: {
    billData: {
      type: String,
      default: () => "",
    },
    type: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      cur_Id: this.$route.query.Id,
      formObj: {},
      detailRouteName: "As_MaintenanceTPLDetail",
      fileBillId: "",
      M_TableObj: {},
      ruleForm: {
        Id: "",
        TemplateName: "",
        Creator: "",
        CreationDate: "",
        Description: "",
        BillItems:[]
      },
      Items:{
        Id:'',
        TemplateId:'',
        MaintenanceContent:'',
        SortOrder:'',
      }
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
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
    this.M_TableObj = new M_EditTable();
  },
  mounted() {
    Object.assign(this.formObj.form, this.$route.params);
  },
  methods: {
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    chooseImg(e) {
      this.ruleForm.PhotoUrl = e;
    },
    //保存销售订单
    save(saveAndSubmit) {
      this.ruleForm.SaveAndSubmit = saveAndSubmit;
      this.formObj.submitAll([this.formObj.validate], (valid) => {
        if (valid) {
          Object.assign(this.ruleForm, this.formObj.form);
          this._save();
        }
      });
    },
    _save() {
      this.ruleForm.BillItems = this.M_TableObj.getTableData();
      Maintenance_tpl.api_save(this.ruleForm).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { Id: res },
        };
        closeTag(this.current, TagName);
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    //改工序的顺序
    editSort(isDown = true) {
      if (this.M_TableObj.selectData.datas.length !== 1) return;
      let row_index = this.M_TableObj.selectData.datas[0].row_index;

      if (isDown) {
        if (this.M_TableObj.tableData.lengt <= row_index + 1) return;
        const currRow = this.M_TableObj.tableData.splice(row_index, 1)[0];
        this.M_TableObj.tableData.splice(row_index + 1, 0, currRow);
      } else {
        if (row_index <= 0) return;
        const currRow = this.M_TableObj.tableData.splice(row_index, 1)[0];
        this.M_TableObj.tableData.splice(row_index - 1, 0, currRow);
      }
    },
    addTPLItem() {
      this.M_TableObj.addEmptyRow();
    },
    //删除物料
    delTPLItem(index) {
      this.M_TableObj.delItem(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.sum-text {
  display: inline-block;
  // padding-right: 100px;
  width: 200px;
  text-align: end;
}
.mould-img {
  width: 120px;
  height: 120px;
  // background-color: pink;
  position: absolute;
  left: 10px;
  right: 100px;
}
</style>
