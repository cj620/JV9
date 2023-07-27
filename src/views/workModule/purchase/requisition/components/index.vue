<!--新增-->
<!--编辑销售订单-->
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
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_ItemsInfo')">
      <div slot="extra">
        <el-button size="mini" @click="selectItems">{{
          $t("Generality.Ge_SelectItems")
        }}</el-button>
        <el-button size="mini" @click="openDetailsDialog">{{
          $t("Generality.Ge_SelectTheDetails")
        }}</el-button>
      </div>
      <JvEditTable :tableObj="eTableObj">
        <template #operation="{ row, row_index }">
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
      <!-- 提交 -->
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
    <!-- 物料需求明细 -->
    <select-doc-details
      :visible.sync="detailsVisible"
      v-if="detailsVisible"
      :detailedData="detailedData"
      @confirmDetails="confirmDetails"
    >
    </select-doc-details>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import { Table } from "./tableConfig";

import SelectMaterial from "@/components/JVInternal/SelectMaterial";
import SelectDocDetails from "./materialRequirements";

import { API } from "@/api/workApi/purchase/requisition";

import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { demandStatusEnum } from "@/enum/workModule";
import { amountFormat, temMerge } from "@/jv_doc/utils/handleData/index";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { handleBillContent } from "@/jv_doc/utils/system/billHelp";
export default {
  components: {
    SelectMaterial,
    JvUploadFile,
    SelectDocDetails,
  },
  data() {
    return {
      Table,
      formObj: {},
      eTableObj: {},
      ItemsDialogFormVisible: false,
      detailsVisible: false,
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
        State: "",
        Remarks: "",
        BillItems: [],
        BillFiles: [],
        SaveAndSubmit: false,
      },
      BillItems: {
        Id: 0,
        BillGui: "",
        ItemId: "",
        ItemName: "",
        Description: "",
        Unit: "",
        Quantity: 0,
        Remarks: "",
        AssociatedNo: 0,
      },
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    demandStatusMap() {
      return demandStatusEnum;
    },
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
      await this.GetData(this.billData);
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
    //选择提交人确定部门
    changeSubmitter(e) {
      this.SubmitterData.forEach((item) => {
        if (item.UserName === e) {
          this.formObj.form.Department = item.DepartmentName;
        }
      });
    },
    //编辑的时候获取信息
    async GetData(Id) {
      await API.api_get({ BillId: Id }).then((res) => {
        if (this.type === "copy") {
          res = handleBillContent(res);
        }
        this.ruleForm = Object.assign({}, this.ruleForm, res);
        this.formObj.form = this.ruleForm;
        this.eTableObj.setData(res.BillItems);
      });
    },
    //选择物料
    selectItems() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ItemsDialogFormVisible = true;
          this.transferData = this.eTableObj.getTableData();
        }
      });
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    //确认选择物料
    confirmData(e) {
      this.ItemsDialogFormVisible = false;
      console.log(e, this.BillItems, 1235545);
      this.eTableObj.push(temMerge(this.BillItems, e));
    },
    // 确认选择明细
    confirmDetails(e) {
      e.forEach((item) => {
        item.AssociatedNo = item.Id;
        item.Id = 0;
      });
      this.detailsVisible = false;
      this.eTableObj.push(temMerge(this.BillItems, e));
    },
    openDetailsDialog() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.detailsVisible = true;
          this.detailedData = this.eTableObj.getTableData();
        }
      });
    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    //保存销售订单
    IsSave() {
      this.formObj.validate((valid) => {
        if (valid) {
          if (this.eTableObj.getTableData().length > 0) {
            this.ruleForm.BillItems = this.eTableObj.getTableData();
            this.eTableObj.validate((valid1) => {
              if (valid1) {
                API.api_save(
                  Object.assign({}, this.ruleForm, this.formObj.form)
                ).then((res) => {
                  let TagName = {
                    path: "/purchase/Pu_Requisition_Detail",
                    name: `Pu_Requisition_Detail`,
                    meta: { cache: true, title: "采购订单详情" },
                    query: { BillId: res },
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
    //保存并提交销售订单
    saveAndSubmit() {
      this.ruleForm.SaveAndSubmit = true;
      this.IsSave();
    },
    //保存销售订单
    save() {
      this.ruleForm.SaveAndSubmit = false;
      this.IsSave();
    },
  },
  watch: {
    $route(to, from) {
      // 页面缓存的时候不刷新数据，监听路由刷新数据
      // 判断路由监听的页面是不是本页面
      if (to.name !== this.$parent.$options.name) return;
      // 判断传过来的数据不为空并且传过来的数据是一条新的数据
      if (this.$route.query.BillId !== undefined) {
        console.log(to, 7788);
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
