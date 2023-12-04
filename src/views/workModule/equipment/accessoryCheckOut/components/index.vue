<template>
  <PageWrapper ref="page">
    <!-- 单据信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #DeviceNo="{ prop }">
          <el-select
              v-model="formObj.form[prop]"
              filterable
              remote
              reserve-keyword
              clearable
              :remote-method="remoteMethod"
          >
            <el-option
                v-for="item in ListData"
                :key="item.DeviceNo"
                :label="item.DeviceNo"
                :value="item.DeviceNo"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_ItemsInfo')">
      <div slot="extra">
        <el-button size="mini" @click="addItems">{{
            $t("device.De_AddItems")
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
    <!--选择配件-->
    <SelectRepairItems
        :visible.sync="ItemsFormVisible"
        v-if="ItemsFormVisible"
        :transferData="transferData"
        @confirmData="confirmData"
    ></SelectRepairItems>
  </PageWrapper>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { formSchema, EditTable } from "./config"
import { API as ACK } from "@/api/workApi/equipment/accessoryCheckout";
import { assets_device_list } from "@/api/workApi/equipment/device";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index.vue";
import { mapState } from "vuex";
import { handleBillContent } from "@/jv_doc/utils/system/billHelp";
import SelectRepairItems from "@/views/workModule/equipment/repair/components/SelectRepairItems/SelectRepairItems.vue";
import closeTag from "@/utils/closeTag";

export default {
  components: {SelectRepairItems, JvUploadFile },
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
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  data() {
    return {
      formObj: {},
      eTableObj: {},
      fileBillId: "",
      ListData: [],
      transferData: [],
      ItemsFormVisible: false,
      ruleForm: {
        BillId: "",
        BillGui: "",
        Submitter: "",
        DeviceNo: "",
        Stockroom: "",
        PickingType: "",
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
        Quantity: 1,
        Unit: "",
        AssociatedNo: 0,
        Remarks: "",
      },
    }
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
    this.remoteMethod("");
    if (this.type === "edit" || this.type === "copy") {
      this.fileBillId = this.billData;
      await this.GetData(this.billData);
    }
    if (this.$route.params.type === "Maintenance" || this.$route.params.type === "Repair"){
        this.formObj.form.Submitter = this.$store.state.user.name
        this.formObj.form.DeviceNo = this.$route.params.DeviceNo
        this.formObj.form.PickingType = this.$route.params.type
        this.eTableObj.setData(this.$route.params.ItemData)
    }

  },
  methods: {
    async GetData(Id) {
      await ACK.api_get({ BillId: Id }).then((res) => {
        if (this.type === "copy") {
          res = handleBillContent(res);
        }
        this.transferData = res.BillItems;
        this.ruleForm = Object.assign({}, this.ruleForm, res);
        this.formObj.form = this.ruleForm;
        this.eTableObj.setData(res.BillItems);
      })
    },
    remoteMethod(query){
      const str = {
        Keyword: query,
        PageSize: 20,
        CurrentPage: 1,
      };
      assets_device_list(str).then((res) => {
        this.ListData = res.Items
      })
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    // 添加备件
    addItems() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ItemsFormVisible = true
        }
      })
    },
    // 确认备件
    confirmData(e) {
      e.forEach((item) => {
        if (!item.hasOwnProperty('Remarks')) {
          this.$set(item, 'Remarks', "")
        }
      })
      this.eTableObj.setData(e)
      this.ItemsFormVisible = false
    },
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    //保存单据
    save() {
      this.ruleForm.SaveAndSubmit = false;
      this.IsSave();
    },
    //保存并提交单据
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
                ACK.api_save(Object.assign({}, this.ruleForm, this.formObj.form)).then((res) => {
                  let TagName = {
                    name: `As_AccessoryCheckOutDetail`,
                    query: { BillId: res },
                  };
                  closeTag(this.current, TagName);
                });
              }
            })
          } else {
            this.$message.warning(this.$t("Generality.Ge_PleaseAddItems"));
          }
        }
      })
    }
  },
  watch: {
    $route(to, from) {
      if (to.name !== this.$parent.$options.name) return;
      if (this.$route.query.BillId !== undefined) {
        this.billData = this.$route.query.BillId;
        this.GetData(this.billData);
      }
    },
  }
}
</script>
