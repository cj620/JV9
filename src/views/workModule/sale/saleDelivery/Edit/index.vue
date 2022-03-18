<!--
 * @Author: your name
 * @Date: 2021-11-10 08:52:22
 * @LastEditTime: 2021-12-16 14:17:39
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\sale\saleDelivery\Edit\index.vue
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
  name: "Sa_SaleDelivery_Edit",
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
