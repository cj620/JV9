<!--
 * @Author: H.
 * @Date: 2021-11-10 09:48:47
 * @LastEditTime: 2022-01-14 14:19:42
 * @Description: 新增采购订单
-->

<template>
  <AddPuOrder :billData="billData" :type="type"></AddPuOrder>
</template>

<script>
import AddPuOrder from "../components/index.vue";
export default {
  name: "Pu_Order_Add",
  components: {
    AddPuOrder,
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
