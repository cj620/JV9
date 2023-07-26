<!--
 * @Author: H.
 * @Date: 2021-11-10 09:48:47
 * @LastEditTime: 2021-12-21 10:06:58
 * @Description: 新增采购订单
-->

<template>
  <AddOutsourcingAccount
    :billData="billData"
    :type="type"
  ></AddOutsourcingAccount>
</template>

<script>
import AddOutsourcingAccount from "../components/index.vue";
export default {
  name: "Pu_OutsourcingAccount_Add",
  components: {
    AddOutsourcingAccount,
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
