<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj"> </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button size="mini" @click="mergeItems" :disabled="noMergeItems">{{
          $t("design.De_MergeItems")
        }}</el-button>
        <el-button size="mini" @click="selectItems">{{
          $t("Generality.Ge_SelectItems")
        }}</el-button>
      </div>
      <JvEditTable :tableObj="eTableObj" @selection-change="canPick">
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
    <JvDialog
      :title="$t('design.De_MergeItems')"
      v-if="ItemMergeFormVisible"
      :visible.sync="ItemMergeFormVisible"
      @confirm="confirmMerge"
      width="30%"
    >
      <JvForm :formObj="mergeFormObj"> </JvForm>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { formSchema, mergeFormSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import SelectMaterial from "@/components/JVInternal/SelectMaterial";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { API as materialRequirement } from "@/api/workApi/design/materialRequirement";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { temMerge } from "@/jv_doc/utils/handleData/index";

export default {
  name: "index",
  components: {
    SelectMaterial,
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
      formObj: {},
      eTableObj: {},
      mergeFormObj: {},
      noMergeItems: true,
      ItemMergeFormVisible: false,
      ItemsDialogFormVisible: false,
      transferData: [],
      CustomerData: [],
      textarea: "",
      ProjectData: "",
      fileList: [],
      fileBillId: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        ToolingNo: "",
        State: "",
        Remarks: "",
        AssociatedNo: "",
        SaveAndSubmit: false,
        Category: "Part",
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
        Unit: "kg",
        Quantity: 0,
        ToolingNo: "",
        Remarks: "",
        PartNo: "",
        DemandDate: "",
      },
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
        span: 8,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.mergeFormObj = new Form({
      formSchema: mergeFormSchema,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
    this.eTableObj = new EditTable();
    if (this.type === "edit") {
      this.fileBillId = this.billData;
      await this.GetData(this.billData);
    } else if (this.$route.params.data) {
      console.log(this.$route.params);
      this.$route.params.data.forEach((item) => {
        item.ItemName = item.PartName;
      });
      this.formObj.form.ToolingNo = this.$route.params.data[0].ToolingNo;
      this.eTableObj.push(temMerge(this.BillItems, this.$route.params.data));
      this.$route.params.PmTaskBillId
        ? (this.formObj.form.PmTaskBillId = this.$route.params.PmTaskBillId)
        : "";
    }
  },

  methods: {
    //编辑的时候获取信息
    async GetData(Id) {
      await materialRequirement.api_get({ BillId: Id }).then((res) => {
        this.ruleForm = res;
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
    // 合并物料
    mergeItems() {
      this.mergeFormObj.form = Object.keys(
        this.eTableObj.selectData.datas[0]
      ).reduce((acc, key) => {
        if (key !== "row_index") {
          acc[key] = this.eTableObj.selectData.datas[0][key].value;
        }
        return acc;
      }, {});
      this.ItemMergeFormVisible = true;
    },
    // 判断合并按钮是否禁用
    canPick() {
      if (this.eTableObj.selectData.datas.length > 1) {
        this.noMergeItems = !this.eTableObj.selectData.datas.every(
          (item) =>
            item.Description2.value ===
            this.eTableObj.selectData.datas[0].Description2.value && item.Description2.value !== ""
        );
      } else {
        this.noMergeItems = true;
      }
    },
    // 确认合并
    confirmMerge() {
      let ParNoList = "";
      this.eTableObj.selectData.datas.forEach((item) => {
        this.eTableObj.tableData.splice(item.ItemId.value, 1);
        ParNoList += item.PartNo.value + ",";
      });
      this.mergeFormObj.form.PartNo = ParNoList.slice(0, -1);
      console.log(this.mergeFormObj.form);
      this.eTableObj.push(temMerge(this.BillItems, [this.mergeFormObj.form]));
      this.ItemMergeFormVisible = false;
    },
    //上传文件返回的数据
    returnData(fileData) {
      console.log(fileData);
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
                materialRequirement
                  .api_save(Object.assign({}, this.ruleForm, this.formObj.form))
                  .then((res) => {
                    let TagName = {
                      path: "/design/itemsDemandDetails",
                      name: `De_ItemsDemand_Details`,
                      query: { BillId: res },
                      fullPath: "/design/itemsDemandDetails",
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
