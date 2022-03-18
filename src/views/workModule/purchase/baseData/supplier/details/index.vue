<!--
 * @Author: H.
 * @Date: 2021-11-04 14:35:16
 * @LastEditTime: 2022-01-14 11:23:11
 * @Description: 销售客户详情页
-->
<template>
  <PageWrapper>
    <JvBlock :title="$t('purchase.Pu_SupplierInformation')">
      <div slot="extra">
        <el-button type="primary" size="mini" @click="edit">{{
          $t("Generality.Ge_Edit")
        }}</el-button>
      </div>
      <div class="customer-details">
        <JvDetail :detailObj="detailObj"></JvDetail>
      </div>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { getSupplierDetails } from "@/api/workApi/purchase/supplier";
import { detailConfig } from "./detailsConfig";
import Detail from "@/jv_doc/class/detail/Detail";

export default {
  data() {
    return {
      SupplierId: this.$route.query.SupplierId,
      CustomerInfo: {},
      detailObj: {},
    };
  },
  methods: {
    getData() {
      getSupplierDetails({ SupplierId: this.SupplierId }).then((res) => {
        this.detailObj.setData(res);
      });
    },
    edit() {
      this.$router.push({
        name: "Pu_Supplier_Edit",
        query: {
          type: "edit",
          title: "editSupplier",
          isAdd: false,
          SupplierId: this.SupplierId,
        },
      });
    },
  },
  created() {
    if (this.SupplierId) {
      this.getData();
    }
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      direction: "left",
    });
  },
  mounted() {},
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped>
.customer-details {
  padding: 20px;
}
</style>
