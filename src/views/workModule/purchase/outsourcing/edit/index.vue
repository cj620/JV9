<!--
 * @Author: H.
 * @Date: 2021-11-10 11:00:04
 * @LastEditTime: 2021-12-21 10:03:59
 * @Description:
-->
<!--编辑销售订单-->
<template>
  <EditCom :billData="billData" :type="type"> </EditCom>
</template>

<script>
import EditCom from "../components/index";
import { releaseEditLock } from "@/api/basicApi/systemSettings/billEditLock";
export default {
  name: "Pu_Order_Edit",
  components: {
    EditCom,
  },
  data() {
    return {
      type: "edit",
      billData: "",
    };
  },

  created() {
    this.billData = this.$route.query.BillId;
  },

  //销毁
  beforeDestroy() {
    releaseEditLock({ BillId: this.billData }).then((res) => {});
  },
};
</script>

<style lang="scss" scoped></style>
