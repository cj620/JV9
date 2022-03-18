<!--
 * @Author: H.
 * @Date: 2021-11-10 11:00:04
 * @LastEditTime: 2022-01-14 14:18:06
 * @Description:
-->
<!--编辑销售订单-->
<template>
  <div>
    <EditCom :billData="billData" :type="type"> </EditCom>
  </div>
</template>

<script>
import EditCom from "../components/index";
import { releaseEditLock } from "@/api/basicApi/systemSettings/billEditLock";
export default {
  name: "Pu_Account_Edit",
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
