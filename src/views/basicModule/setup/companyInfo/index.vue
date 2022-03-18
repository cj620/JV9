<!--
 * @Author: H.
 * @Date: 2021-11-03 11:24:41
 * @LastEditTime: 2022-01-20 17:12:51
 * @Description:
-->
<!--公司信息-->
<template>
  <PageWrapper :footer="false">
    <JvBlock v-if="showForm" :title="$t('menu.Se_CompanyInfo')">
      <JvForm :formObj="formObj"> </JvForm>
    </JvBlock>
    <JvBlock :title="$t('menu.Se_CompanyInfo')" v-else>
      <div slot="extra">
        <el-button type="primary" size="mini" @click="edit">{{
          $t("Generality.Ge_Edit")
        }}</el-button>
      </div>
      <JvDetail :detailObj="detailObj"></JvDetail>
    </JvBlock>
    <div slot="fixedFooter" v-if="showForm">
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Submit")
      }}</el-button>
    </div>
  </PageWrapper>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { formSchema } from "./formConfig";
import Detail from "@/jv_doc/class/detail/Detail";
import { detailConfig } from "./detailConfig";
import { getAll, editCompany } from "@/api/basicApi/systemSettings/company";
export default {
  name: "index",
  data() {
    return {
      formObj: {},
      detailObj: {},
      showForm: true,
      isEdit: false,
    };
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
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      direction: "left",
    });
    this.getCompanyInfo();
  },
  methods: {
    save() {
      this.formObj.validate((valid) => {
        if (valid) {
          editCompany(this.formObj.form).then(() => {
            this.getCompanyInfo();
          });
        }
      });
    },
    getCompanyInfo() {
      getAll().then((res) => {
        if (res.Id) {
          this.detailObj.setData(res);
          this.showForm = false;
        } else {
          this.showForm = true;
        }
      });
    },
    edit() {
      this.formObj.form = Object.assign({}, this.detailObj.detailData);
      this.showForm = true;
      this.isEdit = true;
    },
    test() {
      deleteCompany([this.detailObj.detailData.FullName]).then(() => {
        this.showForm = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
