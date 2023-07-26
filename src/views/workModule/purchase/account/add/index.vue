<!--
 * @Author: H.
 * @Date: 2021-11-10 09:48:47
 * @LastEditTime: 2021-12-21 10:00:20
 * @Description: 新增采购订单
-->

<template>
  <AddAcount :billData="billData" :type="type"></AddAcount>
</template>

<script>
import AddAcount from "../components/index.vue";
export default {
  name: "Pu_Account_Add",
  components: {
    AddAcount,
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
