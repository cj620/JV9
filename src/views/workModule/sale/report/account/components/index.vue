<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #CustomerId="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            @change="changeCustomerId"
          >
            <el-option
              v-for="item in CustomerData"
              :key="item.CustomerId"
              :label="item.ShortName"
              :value="item.CustomerId"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button size="mini" @click="selectItems">{{
          $t("Generality.Ge_SelectTheDetails")
        }}</el-button>
      </div>
      <JvEditTable :tableObj="eTableObj">
        <!-- 含税金额 -->
        <template #Amount="{ row }">
          {{ getSummary(row, "Amount") }}
        </template>
        <!-- 未税金额 -->
        <template #TDA="{ row }">
          {{ getTDA(row, "TDA") }}
        </template>
        <!-- 单价 -->
        <template #Price="{ row }">
          {{ getPrice(row, "Price") }}
        </template>
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
    <selectItem
      :visible.sync="ItemsDialogFormVisible"
      v-if="ItemsDialogFormVisible"
      :CustomerName="CustomerName"
      :transferData="transferData"
      @confirmData="confirmData"
    >
    </selectItem>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
import selectItem from "./selectItem";
import { API as account } from "@/api/workApi/sale/account";
import { getCustomer } from "@/api/workApi/sale/customer";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { amountFormat, temMerge } from "@/jv_doc/utils/handleData/index";
import {
  getTaxAmount,
  getAmount,
  getPrice,
} from "@/jv_doc/utils/system/taxCount";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
export default {
  name: "index",
  components: {
    selectItem,
    JvUploadFile,
  },
  data() {
    return {
      formObj: {},
      eTableObj: {},
      ItemsDialogFormVisible: false,
      transferData: [],
      CustomerData: [],
      textarea: "",
      CustomerName: "",
      fileList: [],
      fileBillId: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        CustomerId: "",
        CustomerName: "",
        StartDate: "",
        EndDate: "",
        Currency: "",
        State: "",
        ReceiptNumber: "",
        Remarks: "",
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
        Price: 0,
        Amount: 0,
        Tax: 0,
        Remarks: "",
        AssociatedNo: "",
        AssociatedBillGui: "",
        NoTaxPrice: 0,
        TDA: 0,
      },
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    getSummary() {
      return getAmount;
    },
    getTDA() {
      return getTaxAmount;
    },
    getPrice() {
      return getPrice;
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
    if (this.type === "edit") {
      this.fileBillId = this.billData;
      await this.GetData(this.billData);
    }
    await this.Configuration();
  },

  methods: {
    //获取客户Id
    async Configuration() {
      await getAllSalesCustomer({}).then((res) => {
        this.CustomerData = res.Items;
      });
    },
    //编辑的时候获取信息
    async GetData(Id) {
      await account.api_get({ BillId: Id }).then((res) => {
        this.ruleForm = res;
        this.formObj.form = this.ruleForm;

        this.eTableObj.setData(res.BillItems);
      });
    },
    //选择客户确定税率
    changeCustomerId(e) {
      getCustomer({ CustomerId: e }).then((res) => {
        this.ruleForm.CustomerName = res.ShortName;
        this.BillItems.Tax = res.Tax;
        this.changeTax(res.Tax);
      });
    },
    changeTax(val) {
      this.eTableObj.setDefaultColData({
        prop: "Tax",
        value: val,
      });
    },
    //选择物料
    selectItems() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ItemsDialogFormVisible = true;
          this.transferData = this.eTableObj.getTableData();
          this.CustomerName = this.ruleForm.CustomerName;
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
      // e.forEach((item) => {
      //   this.BillItems.ItemId = item.ItemId;
      //   this.BillItems.ItemName = item.ItemName;
      //   this.BillItems.Description = item.Description;
      //   this.BillItems.Unit = item.Unit;
      //   this.BillItems.Quantity = item.Quantity;
      //   this.BillItems.Price = item.Price;
      //   this.BillItems.Amount = item.Amount;
      //   this.BillItems.Tax = item.Tax;
      //   this.BillItems.Remarks = item.Remarks;
      //   this.BillItems.AssociatedNo = item.Id;
      //   this.BillItems.AssociatedBillGui = item.BillGui;
      //   this.eTableObj.push([this.BillItems]);
      // });
      e.forEach((item) => {
        item.AssociatedNo = item.Id;
        item.Id = 0;
      });
      this.detailsVisible = false;
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
    //保存并提交销售对账
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
                account
                  .api_save(Object.assign({}, this.ruleForm, this.formObj.form))
                  .then((res) => {
                    let TagName = {
                      path: "/sale/saleAccountDetails",
                      name: `Sa_AccountChecking_Detail`,
                      query: { BillId: res },
                      fullPath: "/sale/saleAccountDetails",
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
