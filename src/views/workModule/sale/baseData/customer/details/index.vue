<!--
 * @Author: H.
 * @Date: 2021-11-04 14:35:16
 * @LastEditTime: 2022-03-04 17:20:49
 * @Description: 销售客户详情页
-->
<template>
  <PageWrapper>
    <JvBlock :title="$t('sale.Sa_UserInformation')">
      <div slot="extra">
        <el-button type="primary" size="mini" @click="edit">{{
          $t("Generality.Ge_Edit")
        }}</el-button>
      </div>
      <div class="customer-details">
        <JvDetail :detailObj="detailObj"></JvDetail>
      </div>
    </JvBlock>
    <JvBlock
      :title="$t('sale.Sa_Contact') + '-' + (index + 1)"
      v-for="(item, index) in dataList"
      :key="index"
    >
      <JvDetail :detailObj="item"></JvDetail>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { getCustomer } from "@/api/workApi/sale/customer";
import { detailConfig, detailItemConfig } from "./detailsConfig";
import Detail from "@/jv_doc/class/detail/Detail";

export default {
  data() {
    return {
      CustomerId: this.$route.query.CustomerId,
      CustomerInfo: {},
      detailObj: {},
      dataList: [],
    };
  },
  methods: {
    getData() {
      getCustomer({ CustomerId: this.CustomerId }).then((res) => {
        this.detailObj.setData(res);
        res.ContactInfo.forEach((item) => {
          this.dataList.push(
            new Detail({
              data: item,
              schema: detailItemConfig,
            })
          );
        });
      });
    },
    edit() {
      this.$router.push({
        name: "Sa_Customer_Edit",
        query: {
          type: "add",
          title: "editCustomer",
          isAdd: false,
          id: this.CustomerId,
        },
      });
    },
  },
  created() {
    if (this.CustomerId) {
      this.getData();
    }
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
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
