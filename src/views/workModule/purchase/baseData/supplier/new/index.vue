<!--
 * @Author: H.
 * @Date: 2021-11-08 15:03:20
 * @LastEditTime: 2021-11-10 13:13:52
 * @Description:
-->
<template>
  <supplier-form @save="save" type="add"></supplier-form>
</template>

<script>
import { addSupplier } from "@/api/workApi/purchase/supplier";
import supplierForm from "../component/index.vue";
import closeTag from "@/utils/closeTag";

export default {
  name: "Pu_Supplier_Add",
  data() {
    return {};
  },
  methods: {
    save(form, current, TagName) {
      addSupplier(form).then((res) => {
        TagName.query.SupplierId = res;
        closeTag(current, TagName);
      });
    },
  },
  created() {},
  mounted() {},

  components: {
    supplierForm,
  },
};
</script>

<style lang="scss" scoped></style>
