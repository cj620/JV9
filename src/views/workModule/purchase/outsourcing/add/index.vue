<!--
 * @Author: H.
 * @Date: 2021-11-10 09:48:47
 * @LastEditTime: 2022-01-14 14:22:25
 * @Description: 新增采购订单
-->

<template>
  <ArrOutsourcing :billData="billData" :type="type"></ArrOutsourcing>
</template>

<script>
import ArrOutsourcing from "../components/index.vue";
export default {
  name: "Pu_Outsourcing_Add",
  components: {
    ArrOutsourcing,
  },
  data() {
    return {
      type: undefined,
      billData: "",
    };
  },
  methods: {},
  created() {
    console.log(this.$route.query);
    this.billData = this.$route.query.BillId;
    this.type = this.$route.query.type;
  },
};
</script>

<style lang="scss" scoped></style>
