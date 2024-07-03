<!--
 * @Author: H.
 * @Date: 2021-11-08 14:15:19
 * @LastEditTime: 2024-07-03 10:41:13
 * @Description: 新增、编辑通用组件
-->

<template>
  <PageWrapper>
    <JvBlock :title="$t('Generality.Ge_BasicInformation')">
      <div class="edit-customer-form">
        <JvForm :formObj="formObj">
          <template #CustomerId="{ prop }">
            <el-input
              :disabled="isDisabled"
              v-model="formObj.form[prop]"
            ></el-input>
          </template>
          <template #ShortName="{ prop }">
            <el-input
              :disabled="isDisabled"
              v-model="formObj.form[prop]"
            ></el-input>
          </template>
        </JvForm>
      </div>
    </JvBlock>
    <JvBlock
      :title="$t('sale.Sa_Contact') + '-' + (index + 1)"
      v-for="(item, index) in dataList"
      :key="index"
    >
      <div class="edit-customer-form">
        <JvForm :formObj="item"> </JvForm>
      </div>
    </JvBlock>
    <JvBlock>
      <div class="add-new">
        <el-button icon="el-icon-plus" @click="addNewContact">{{
          $t("Generality.Ge_New") + $t("sale.Sa_Address")
        }}</el-button>
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
import { getCustomer } from "@/api/workApi/sale/customer";
import { formSchema, formSchema1 } from "./config";
import { mapState } from "vuex";
export default {
  data() {
    return {
      formObj: {},
      isDisabled: false,
      dataList: [],
    };
  },
  props: {
    CustomerId: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  methods: {
    save() {
      this.formObj.submitAll([this.formObj.validate], (valid) => {
        if (valid) {
          let obj = Object.assign({}, this.formObj.form, {
            ContactInfo: this.dataList.map((item) => item.form),
          });
          let TagName = {
            name: `Sa_Customer_Detail`,
            meta: { cache: true, title: "用户" },
            query: { CustomerId: "" },
          };

          this.type === "add"
            ? this.$emit("save", obj, this.current, TagName)
            : this.$emit("save", obj, this.current, TagName);
        }
      });
    },

    getData() {
      getCustomer({ CustomerId: this.CustomerId }).then((res) => {
        // let { CustomerId, ShortName, FullName, Tax, Currency } = res;
        this.formObj.form = res;
        res.ContactInfo.forEach((item) => {
          this.dataList.push(
            new Form({
              formSchema: formSchema1,
              baseColProps: {
                span: 8,
              },
              gutter: 40,
              defaultForm: item,
            })
          );
        });
      });
    },
    addNewContact() {
      this.dataList.push(
        new Form({
          formSchema: formSchema1,
          baseColProps: {
            span: 8,
          },
          gutter: 40,
        })
      );
    },
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 8,
      },
      gutter: 40,
    });
    if (this.CustomerId) {
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
.add-new {
  width: 100%;
  // height: 50px;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>
