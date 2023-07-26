<!--
 * @Author: H.
 * @Date: 2021-11-08 15:11:06
 * @LastEditTime: 2021-12-10 09:23:39
 * @Description:
-->
<!--新增-->
<!--新增采购退货单-->
<template>
  <EditCom :billData="billData" :type="type"> </EditCom>
</template>

<script>
import EditCom from "../components/index";

export default {
  name: "Pu_Return_Add",
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
