<!--
 * @Author: H.
 * @Date: 2021-11-10 11:00:04
 * @LastEditTime: 2021-12-29 17:16:57
 * @Description:
-->
<!--编辑销售订单-->
<template>
  <Edit :billData="billData" :type="type"> </Edit>
</template>

<script>
import Edit from "../components/index";
import { releaseEditLock } from "@/api/basicApi/systemSettings/billEditLock";
export default {
  name: "Pu_StockIn_Edit",
  components: {
    Edit,
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
