<!--新增-->
<!--编辑-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #Submitter="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            @change="changeSubmitter"
          >
            <el-option
              v-for="item in SubmitterData"
              :key="item.UserName"
              :label="item.UserName"
              :value="item.UserName"
            >
            </el-option>
          </el-select>
        </template>
        <!--领料类别-->
        <template #PickingType="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            @change="changePickingType"
          >
            <el-option
              v-for="item in pickTypeEnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button size="mini" @click="PickingDetails">{{
          $t("Generality.Ge_PickingDetails")
        }}</el-button>
      </div>
      <JvEditTable :tableObj="eTableObj">
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
      <!-- 保存 -->
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Save")
      }}</el-button>
      <!-- 保存并提交 -->
      <el-button type="primary" @click="saveAndSubmit">{{
        $t("Generality.Ge_SaveAndSubmit")
      }}</el-button>
    </div>
    <!--父级物料弹窗-->
    <SelectMaterial
      :visible.sync="ItemsDialogFormVisible"
      v-if="ItemsDialogFormVisible"
      :transferData="transferData"
      @confirmData="confirmData"
    >
    </SelectMaterial>

    <pickingDetails
      :visible.sync="pickingDetailsDialogFormVisible"
      v-if="pickingDetailsDialogFormVisible"
      :detailedData="detailedData"
      @demandConfirmData="demandConfirmData"
    ></pickingDetails>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import SelectMaterial from "@/components/JVInternal/SelectMaterial";
import { API as returnPicking } from "@/api/workApi/stockroom/returnPicking";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { temMerge } from "@/jv_doc/utils/handleData/index";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
// 单据转换逻辑
import { billTransform } from "~/utils/system/editPagePlugin";
import pickingDetails from "./pickingDetails";
import { handleBillContent } from "@/jv_doc/utils/system/billHelp";
import {timeFormat} from "~/utils/time";

export default {
  name: "index",
  components: {
    SelectMaterial,
    pickingDetails,
    JvUploadFile,
  },
  data() {
    return {
      Id: this.$route.query.BillId,
      formObj: {},
      eTableObj: {},
      ItemsDialogFormVisible: false,
      pickingDetailsDialogFormVisible: false,

      transferData: [],
      SubmitterData: [],
      detailedData: [],
      textarea: "",
      fileList: [],
      fileBillId: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        Submitter: "",
        Department: "",
        Stockroom: "",
        State: "",
        Remarks: "",
        ToolingNo: "",
        PmTaskBillId: "",
        SaveAndSubmit: false,
        BillItems: [],
        BillFiles: [],
      },
      BillItems: {
        Id: 0,
        BillGui: "",
        ItemId: "",
        ItemName: "",
        PmTaskBillId: "",
        Description: "",
        Description2: "",
        Unit: "",
        Quantity: 0,
        Remarks: "",
        ToolingNo: "",
        AssociatedNo: 0,
        BatchNo: 0,
        ProductionDate: 0,
      },
      pickTypeEnum: [
        {
          value: "Picking",
          label: i18n.t("stockroom.St_Picking"),
        },
        {
          value: "Supplement",
          label: i18n.t("stockroom.St_Supplement"),
        },
        {
          value: "TrialTooling",
          label: i18n.t("stockroom.St_TrialMold"),
        },
        //返工领料
        {
          value: "ReworkPicking",
          label: i18n.t("stockroom.St_ReworkPicking"),
        },
        //委外领料
        {
          value: "OutsourcingPicking",
          label: i18n.t("stockroom.St_OutsourcingPicking"),
        },
      ],
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
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

  async created() {
    console.log(54321);
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 8,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.eTableObj = new EditTable();
    if (this.type === "edit" || this.type === "copy") {
      this.fileBillId = this.billData;
      await this.GetData(this.fileBillId);
    }
    if (this.$route.params.deliveryData) {
      billTransform(this, "deliveryData", {
        ToolingNo: this.$route.params.deliveryData.ToolingNo,
      });
    }
    await this.Configuration();
  },

  methods: {
    //获取客户Id
    async Configuration() {
      await getAllUserData({}).then((res) => {
        this.SubmitterData = res.Items;
      });
    },
    //编辑的时候获取信息
    async GetData(Id) {
      await returnPicking.api_get({ BillId: Id }).then((res) => {
        if (this.$route.query.type === "copy") {
          res = handleBillContent(res);
        }
        this.ruleForm = Object.assign({}, this.ruleForm, res);
        this.formObj.form = this.ruleForm;
        let list = res.BillItems.map(item => {
          return {
            ...item,
            ProductionDate: timeFormat(item.ProductionDate)
          }
        })
        this.eTableObj.setData(list);
      });
    },

    //选择提交人确定部门
    changeSubmitter(e) {
      this.SubmitterData.forEach((item) => {
        if (item.UserName === e) {
          this.formObj.form.Department = item.DepartmentName;
        }
      });
    },

    //选择物料需求
    PickingDetails() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.pickingDetailsDialogFormVisible = true;
          this.detailedData = this.eTableObj.getTableData();
        }
      });
    },
    //确认物料需求
    demandConfirmData(e) {
      e.forEach((item) => {
        item.AssociatedNo = item.Id;
      });
      this.pickingDetailsDialogFormVisible = false;
      this.eTableObj.push(temMerge(this.BillItems, e));
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    //确认选择物料
    confirmData(e) {
      this.ItemsDialogFormVisible = false;

      this.eTableObj.push(temMerge(this.BillItems, e));
    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    //保存销售订单
    save() {
      this.ruleForm.SaveAndSubmit = false;
      this.IsSave();
    },
    //保存并提交销售订单
    saveAndSubmit() {
      this.ruleForm.SaveAndSubmit = true;
      this.IsSave();
    },
    IsSave() {
      this.formObj.validate((valid) => {
        if (valid) {
          if (this.eTableObj.getTableData().length > 0) {
            this.ruleForm.BillItems = this.eTableObj.getTableData();
            this.eTableObj.validate((valid1) => {
              if (valid1) {
                returnPicking
                  .api_save(Object.assign({}, this.ruleForm, this.formObj.form))
                  .then((res) => {
                    let TagName = {
                      path: "/picking/returnPickingDetails",
                      name: `St_ReturnPicking_Details`,
                      query: { BillId: res },
                      fullPath: "/picking/returnPickingDetails",
                    };
                    closeTag(this.current, TagName);
                  });
              }
            });
          } else {
            /* 请添加明细 */
            this.$message.warning(this.$t("Generality.Ge_PleaseAddItems"));
          }
        }
      });
    },
    // 选中领料类别
    changePickingType(e) {
      if (e === 'TrialTooling' && this.oldPickingType !== 'TrialTooling') { // 非试模改为试模
        if (this.formObj.form.ToolingNo !== '') {
          this.changeToolingNo();
          this.finalTaskListData = this.TaskListData.filter(i => i.TaskType === "TrialTooling");
        }
        this.oldPickingType = e;
      } else if (e !== 'TrialTooling' && this.oldPickingType === 'TrialTooling') { // 试模改为非试模
        this.finalTaskListData = this.TaskListData;
        this.oldPickingType = e;
      }
    },
  },
  watch: {
    $route(to, from) {
      console.log(this, to.name, this.$parent.$options.name, 6666666);
      // 页面缓存的时候不刷新数据，监听路由刷新数据
      // 判断路由监听的页面是不是本页面
      if (to.name !== this.$parent.$options.name) return;
      // 判断传过来的数据不为空并且传过来的数据是一条新的数据
      if (this.$route.query.BillId !== undefined) {
        this.billData = this.$route.query.BillId;
        this.GetData(this.billData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.remarks-info-content {
  padding: 15px;
  .remarks-info-content-remarks {
    margin-bottom: 20px;
  }
}
</style>
