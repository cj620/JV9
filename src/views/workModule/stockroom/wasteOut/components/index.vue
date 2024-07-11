<!--新增-->
<!--编辑-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj"> </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button size="mini" @click="selectItems">{{
          $t("Generality.Ge_SelectItems")
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
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import SelectMaterial from "@/components/JVInternal/SelectMaterial";
import { API as wasteOut } from "@/api/workApi/stockroom/wasteOut";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { temMerge } from "@/jv_doc/utils/handleData/index";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { handleBillContent } from "@/jv_doc/utils/system/billHelp";
export default {
  name: "index",
  components: {
    SelectMaterial,
    JvUploadFile,
  },
  data() {
    return {
      formObj: {},
      eTableObj: {},
      ItemsDialogFormVisible: false,
      transferData: [],
      textarea: "",
      fileList: [],
      fileBillId: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        Stockroom: "",
        State: "",
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
        Description2: "",
        Unit: "",
        Quantity: 0,
        ToolingNo: "",
        Remarks: "",
        BatchNo: "",
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
      await this.GetData(this.fileBillId);
    }
  },

  methods: {
    //编辑的时候获取信息
    async GetData(Id) {
      await wasteOut.api_get({ BillId: Id }).then((res) => {
        if (this.$route.query.type === "copy") {
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
                wasteOut
                  .api_save(Object.assign({}, this.ruleForm, this.formObj.form))
                  .then((res) => {
                    let TagName = {
                      path: "/picking/wasteOutDetails",
                      name: `St_WasteOut_Details`,
                      query: { BillId: res },
                      fullPath: "/picking/wasteOutDetails",
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
