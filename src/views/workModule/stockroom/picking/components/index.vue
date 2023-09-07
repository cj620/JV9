<!--
 * @Author: your name
 * @Date: 2021-11-12 10:35:08
 * @LastEditTime: 2022-01-20 16:38:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\picking\components\index.vue
-->
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
        <!--模具编号-->
        <template #ToolingNo="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
            @change="changeToolingNo"
            :disabled="editDisabled"
          >
            <el-option
              v-for="item in MouldListData"
              :key="item.ItemId"
              :label="item.ItemId"
              :value="item.ItemId"
            >
            </el-option>
          </el-select>
        </template>
        <!--任务单号-->
        <template #PmTaskBillId="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            @change="changeSubmitter"
            :disabled="editDisabled"
          >
            <el-option
              v-for="item in TaskListData"
              :key="item.BillId"
              :label="
                item.BillId + '(' + taskTypeEnum[item.TaskType].name + ')'
              "
              :value="item.BillId"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button size="mini" @click="materialRequirements">{{
          $t("menu.De_ItemsDemand")
        }}</el-button>
        <el-button size="mini" @click="selectItems">{{
          $t("Generality.Ge_SelectItems")
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
    <materialRequirements
      :visible.sync="materialRequirementsDialogFormVisible"
      v-if="materialRequirementsDialogFormVisible"
      :detailedData="detailedData"
      :ToolingNo="ToolingNo"
      @demandConfirmData="demandConfirmData"
    ></materialRequirements>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import SelectMaterial from "@/components/JVInternal/SelectMaterial";
import materialRequirements from "./materialRequirements";
import { API as picking } from "@/api/workApi/stockroom/picking";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { amountFormat, temMerge } from "@/jv_doc/utils/handleData/index";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { billTransform } from "~/utils/system/editPagePlugin";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { toolingTaskInfoList } from "@/api/workApi/design/toolingBOM";
import { taskTypeEnum } from "@/enum/workModule";
import { handleBillContent } from "@/jv_doc/utils/system/billHelp";
export default {
  name: "index",
  components: {
    SelectMaterial,
    JvUploadFile,
    materialRequirements,
  },
  data() {
    return {
      Id: this.$route.query.BillId,
      taskTypeEnum,
      formObj: {},
      eTableObj: {},
      ItemsDialogFormVisible: false,
      materialRequirementsDialogFormVisible: false,
      loading: false,
      editDisabled: false,
      transferData: [],
      SubmitterData: [],
      MouldListData: [],
      TaskListData: [],
      detailedData: [],
      textarea: "",
      fileList: [],
      fileBillId: "",
      ToolingNo: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        Submitter: "",
        Department: "",
        Stockroom: "",
        PickingType: "",
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
        Description: "",
        Unit: "",
        Quantity: 0,
        Remarks: "",
        PurchaseStockInItemId: "",
        AssociatedNo: 0,
      },
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
    name: {
      type: String,
      default: () => "",
    },
  },

  async created() {
    console.log(12345);
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
      this.editDisabled = true;
      await this.GetData(this.fileBillId);
    }
    if (this.$route.params.deliveryData) {
      billTransform(this, "deliveryData", {
        ToolingNo: this.$route.params.deliveryData.ToolingNo,
      });
    } else if (this.$route.params.stockInData) {
      console.log(this.$route.params.stockInData.BillItems);
      this.$route.params.stockInData.BillItems.forEach((item) => {
        item.PurchaseStockInItemId = item.Id;
      });
      this.eTableObj.push(
        temMerge(this.BillItems, this.$route.params.stockInData.BillItems)
      );
    } else if (this.$route.params.trialToolingData) {
      this.formObj.form.PickingType = "TrialTooling";
      this.formObj.form.PmTaskBillId = this.$route.params.trialToolingData.BillId
      this.formObj.form.ToolingNo = this.$route.params.trialToolingData.ToolingNo
      this.editDisabled = true;
    } else if (this.$route.params.itemDemandData){
      this.formObj.form.PmTaskBillId = this.$route.params.itemDemandData.PmTaskBillId
      this.formObj.form.ToolingNo = this.$route.params.itemDemandData.ToolingNo
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
      await picking.api_get({ BillId: Id }).then((res) => {
        if (this.$route.query.type === "copy") {
          res = handleBillContent(res);
        }
        this.ruleForm = Object.assign({}, this.ruleForm, res);
        this.formObj.form = this.ruleForm;

        this.eTableObj.setData(res.BillItems);
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
    //选择物料
    selectItems() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ItemsDialogFormVisible = true;
          this.transferData = this.eTableObj.getTableData();
        }
      });
    },
    //选择物料需求
    materialRequirements() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.materialRequirementsDialogFormVisible = true;
          this.ToolingNo = this.formObj.form.ToolingNo;
          this.detailedData = this.eTableObj.getTableData();
        }
      });
    },
    //模糊查询模号
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        const str = {
          Keyword: query,
          ItemType: "",
          ItemCategory: "Tooling",
          PageSize: 20,
          CurrentPage: 1,
        };
        itemList(str).then((res) => {
          console.log(res);
          this.MouldListData = res.Items;
          this.loading = false;
        });
      }
    },

    //根据模号搜索任务单
    changeToolingNo() {
      var str = {
        ToolingNo: this.formObj.form.ToolingNo,
        SelectType: 0,
      };
      toolingTaskInfoList(str).then((res) => {
        if (res.Items.length === 1) {
          this.formObj.form.PmTaskBillId = res.Items[0].BillId;
        } else if (res.Items.length === 0) {
          this.formObj.form.PmTaskBillId = "";
        }
        this.TaskListData = res.Items;
        //判断说明不只一个任务单
      });
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
    //确认物料需求
    demandConfirmData(e) {
      e.forEach((item) => {
        item.AssociatedNo = item.Id;
      });
      this.materialRequirementsDialogFormVisible = false;
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
                picking
                  .api_save(Object.assign({}, this.ruleForm, this.formObj.form))
                  .then((res) => {
                    let TagName = {
                      path: "/picking/St_Picking_Details",
                      name: `St_Picking_Details`,
                      query: { BillId: res },
                      fullPath: "/picking/St_Picking_Details",
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
  },
  watch: {
    $route(to, from) {
      // 页面缓存的时候不刷新数据，监听路由刷新数据
      // 判断路由监听的页面是不是本页面
      if (to.name !== this.$parent.$options.name) return;
      // 判断传过来的数据不为空并且传过来的数据是一条新的数据
      if (this.$route.query.BillId !== undefined) {
        console.log(555);
        this.billData = this.$route.query.BillId;
        this.GetData(this.billData);
        this.editDisabled = true;
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
