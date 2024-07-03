<!--
 * @Author: H.
 * @Date: 2021-11-08 14:15:19
 * @LastEditTime: 2024-07-03 10:41:46
 * @Description: 新增、编辑通用组件
-->

<template>
  <PageWrapper>
    <JvBlock :title="$t('Generality.Ge_BasicInformation')">
      <div class="edit-customer-form">
        <JvForm :formObj="formObj">
          <template #SupplierId="{ prop }">
            <el-form-item :prop="prop">
              <el-input
                :disabled="isDisabled"
                v-model="formObj.form[prop]"
              ></el-input>
            </el-form-item>
          </template>
          <template #ShortName="{ prop }">
            <el-form-item :prop="prop">
              <el-input
                :disabled="isDisabled"
                v-model="formObj.form[prop]"
              ></el-input>
            </el-form-item>
          </template>
        </JvForm>
      </div>
    </JvBlock>
    <JvBlock :title="$t('Generality.Ge_DetailedInformation')">
      <div class="edit-customer-form">
        <JvForm :formObj="formObj1"> </JvForm>
      </div>
    </JvBlock>
    <div slot="fixedFooter">
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Save")
      }}</el-button>
    </div>
  </PageWrapper>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { getSupplierDetails } from "@/api/workApi/purchase/supplier";
import { formSchema, formSchema1 } from "./config";
import { mapState } from "vuex";
export default {
  data() {
    return {
      formObj: {},
      formObj1: {},
      isDisabled: false,
    };
  },
  props: {
    SupplierId: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  methods: {
    save() {
      this.formObj.validate((valid) => {
        if (valid) {
          let obj = Object.assign({}, this.formObj.form, this.formObj1.form);
          let TagName = {
            name: `Pu_Supplier_Detail`,
            meta: { cache: true, title: "用户" },
            query: { SupplierId: "" },
          };
          this.type === "add"
            ? this.$emit("save", obj, this.current, TagName)
            : this.$emit("save", obj, this.current, TagName);
        }
      });
    },

    getData() {
      getSupplierDetails({ SupplierId: this.SupplierId }).then((res) => {
        // let { SupplierId, ShortName, FullName, Tax, Currency } = res;
        // let { Address, Contact, Tel, Email, Phone } = res;
        this.formObj.form = res;
        this.formObj1.form = res;
      });
    },
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 8,
      },
      gutter: 40,
      labelWidth: "80px",
      labelPosition: "top",
    });

    this.formObj1 = new Form({
      formSchema: formSchema1,
      baseColProps: {
        span: 8,
      },
      gutter: 40,
      labelWidth: "80px",
      labelPosition: "top",
    });
    if (this.SupplierId) {
      this.isDisabled = true;
      this.getData();
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.edit-customer-form {
  padding: 20px 40px;
}
</style>
