<!--
 * @Author: H.
 * @Date: 2021-11-10 11:00:04
 * @LastEditTime: 2021-12-21 10:06:20
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
  name: "Pu_OutsourcingAccount_Edit",
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

    console.log(this.billData, "this.billData");
  },

  //销毁
  beforeDestroy() {
    releaseEditLock({ BillId: this.billData }).then((res) => {
      console.log(res, "销毁成功");
    });
  },
};
</script>

<style lang="scss" scoped></style>
