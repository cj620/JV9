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
    <JvBlock :title="$t('Generality.Ge_BillInfo') + BillIdShow" ref="first">
      <JvForm :formObj="formObj"> </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_ProcessInfo')" ref="second">
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
              confirm: addEditRow,
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
                icon: 'el-icon-circle-plus-outline',
                confirm: addItem.bind(null, row_index, M_TableObj),
              },
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index, M_TableObj),
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
import { formSchema } from "./formConfig";
import { M_EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import { timeFormat } from "@/jv_doc/utils/time";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { mapState } from "vuex";
import {
  amountFormat,
  amount2Number,
  temMerge,
} from "@/jv_doc/utils/handleData/index";
// 引入模块API接口
import { API as ProjectTask } from "@/api/workApi/project/projectTask";
import { getAllProjectProcess } from "@/api/workApi/project/baseData";
import closeTag from "@/utils/closeTag";
import {
  pushDoubleCol,
  insertDoubleCol,
  delDoubleCol,
  doubleCol2data,
} from "./utils";
export default {
  name: "Pm_ProjectTask_Add",
  components: {
    JvUploadFile,
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
      cur_Id: this.$route.query.BillId,
      formObj: {},
      // 材料费用
      M_TableObj: {},
      detailRouteName: "Pm_ProjectTask_Detail",
      fileBillId: "",
      ruleForm: {
        TaskType: 0,
        ToolingNo: "",
        PlanStart: "",
        PlanEnd: "",
        State: "",
        Creator: "",
        CreationDate: "",
        Remarks: "",
        SaveAndSubmit: true,
        BillItems: [],
        BillFiles: [],
      },
      BillItems: {
        Process: "",
        Worker: "",
        PlanTime: 1,
        PlanStart: "",
        PlanEnd: "",
        Remarks: "",
        Progress: 0,
      },
      tabPanes: [
        {
          label: this.$t("sale.Sa_MoldQuotation"),
          name: "first",
        },
        {
          label: this.$t("sale.Sa_MaterialCost"),
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
    this.M_TableObj = new M_EditTable();
    // this.ruleForm
  },
  mounted() {
    Object.assign(this.formObj.form, this.$route.params);
  },
  methods: {
    // 新增编辑行
    addEditRow() {
      this.formObj.validate((valid) => {
        if (valid) {
          getAllProjectProcess().then((res) => {
            // 开始时间
            let startBase = new Date(this.formObj.form.PlanStart).getTime();
            // 总的时间区域
            const TimeZone =
              new Date(this.formObj.form.PlanEnd).getTime() -
              new Date(this.formObj.form.PlanStart).getTime();

            const result = res.Items.map((item) => {
              let startDate = timeFormat(
                startBase + item.StartScale * TimeZone
              );
              let endDate = timeFormat(startBase + item.EndScale * TimeZone);
              return Object.assign({}, this.BillItems, item, {
                PlanStart: startDate,
                PlanEnd: endDate,
                Id: "",
              });
            });
            // console.log(result, 555555);
            this.M_TableObj.push(result);
          });
        }
      });
    },
    insertDoubleCol,
    delDoubleCol,
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    //删除物料
    delItem(index, target) {
      target.delItem(index);
    },
    addItem(index, target) {
      let empty_row = target.getEmptyRow();
      target.insert(index, [target.getEmptyRow()]);
    },
    //保存销售订单
    save(saveAndSubmit) {
      this.ruleForm.SaveAndSubmit = saveAndSubmit;
      this.formObj.submitAll(
        [this.formObj.validate, this.M_TableObj.validate],
        (valid) => {
          if (valid) {
            Object.assign(this.ruleForm, this.formObj.form);
            this.ruleForm.BillItems = this.M_TableObj.getTableData();
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
    editSort(isDown = true) {
      // console.log(this.M_TableObj.selectData);
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
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
  watch: {
    "M_TableObj.tableData": {
      handler(newV) {
        newV.forEach((item) => {
          if (parseInt(item.PlanTime.value) < 0) {
            item.PlanTime.value = "0";
            this.$message.warning(
              this.$t("project.Pro_PlanTimeShouldBeGreaterThan0")
            );
            return;
          }
        });
      },
      deep: true,
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
</style>
