<!--
 * @Author: H.
 * @Date: 2021-11-04 14:06:50
 * @LastEditTime: 2022-01-20 16:38:28
 * @Description: 销售客户编辑页
-->
<template>
  <customer-form
    :CustomerId="CustomerId"
    @save="save"
    type="edit"
  ></customer-form>
</template>

<script>
import CustomerForm from "../component/index.vue";
import { editSalesCustomer } from "@/api/workApi/sale/customer";
import closeTag from "@/utils/closeTag";

export default {
  name: "Sa_Customer_Edit",
  data() {
    return {
      CustomerId: this.$route.query.id,
    };
  },
  methods: {
    save(form, current, TagName) {
      editSalesCustomer(form).then((res) => {
 

        TagName.query.CustomerId = res;


        closeTag(current, TagName);

      });
    },
  },

  computed: {},
  components: {
    CustomerForm,
  },
};
</script>

<style lang="scss" scoped></style>
