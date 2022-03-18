<!--
 * @Author: H.
 * @Date: 2021-11-08 15:03:20
 * @LastEditTime: 2021-11-10 13:12:51
 * @Description: 
-->
<template>
  <customer-form @save="save" type="add"></customer-form>
</template>

<script>
import { addSalesCustomer } from "@/api/workApi/sale/customer";
import CustomerForm from "../component/index.vue";
import closeTag from "@/utils/closeTag";

export default {
  name: "Sa_Customer_Add",
  data() {
    return {};
  },
  methods: {
    save(form, current, TagName) {
      addSalesCustomer(form).then((res) => {
        TagName.query.CustomerId = res;
        closeTag(current, TagName);
      });
    },
  },
  created() {},
  mounted() {},

  components: {
    CustomerForm,
  },
};
</script>

<style lang="scss" scoped></style>
