<!--
 * @Author: H.
 * @Date: 2021-11-04 14:06:50
 * @LastEditTime: 2021-11-10 11:35:07
 * @Description: 销售客户编辑页
-->
<template>
  <customer-form
    :SupplierId="SupplierId"
    @save="save"
    type="edit"
  ></customer-form>
</template>

<script>
import CustomerForm from "../component/index.vue";
import { editSupplier } from "@/api/workApi/purchase/supplier";
import closeTag from "@/utils/closeTag";

export default {
  name: "Sa_Customer_Edit",
  data() {
    return {
      SupplierId: this.$route.query.SupplierId,
    };
  },
  methods: {
    save(form, current, TagName) {
      editSupplier(form).then((res) => {
        TagName.query.SupplierId = res;
        closeTag(current, TagName);
      });
    },
  },
  mounted() {
    console.log(this.SupplierId, "SupplierId");
  },
  computed: {},
  components: {
    CustomerForm,
  },
};
</script>

<style lang="scss" scoped></style>
