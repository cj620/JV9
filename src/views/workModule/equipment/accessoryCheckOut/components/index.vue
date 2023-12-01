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
      <JvEditTable :tableObj="eTableObj">

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

export default {
  components: { JvUploadFile },
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
        Quantity: 0,
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
  },
  methods: {
    async GetData(Id) {
      await ACK.api_get({ BillId: Id }).then((res) => {
        if (this.type === "copy") {
          res = handleBillContent(res);
        }
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
          console.log(1122131)
        }
      })
    }
  }
}
</script>
