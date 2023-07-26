<!--
 * @Author: H.
 * @Date: 2021-11-08 15:11:06
 * @LastEditTime: 2021-11-08 15:11:40
 * @Description:
-->
<!--新增-->
<!--新增销售订单-->
<template>
  <div>
    <EditCom :billData="billData" :type="type"> </EditCom>
  </div>
</template>

<script>
import EditCom from "../components/index";

export default {
  name: "Sa_SaleReturn_Add",
  components: {
    EditCom,
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
