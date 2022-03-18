<!--
 * @Author: H.
 * @Date: 2021-11-15 14:22:05
 * @LastEditTime: 2021-12-10 09:23:51
 * @Description:
-->
<!--编辑采购退货单-->
<template>
  <EditCom :billData="billData" :type="type"> </EditCom>
</template>

<script>
import EditCom from "../components/index";
import { releaseEditLock } from "@/api/basicApi/systemSettings/billEditLock";
export default {
  name: "Pu_Return_Edit",
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
    releaseEditLock({ BillId: this.billData }).then((res) => {
      console.log(res, "销毁成功");
    });
  },
};
</script>

<style lang="scss" scoped></style>
