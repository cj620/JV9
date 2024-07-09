<!--
 * @Author: H.
 * @Date: 2021-11-08 15:11:06
 * @LastEditTime: 2024-07-09 15:10:48
 * @Description:
-->
<!--新增-->
<!--新增销售订单-->
<template>
  <div>
    <EditCom> </EditCom>
  </div>
</template>

<script>
import EditCom from "../components/index";

export default {
  name: "Pr_PartProductionDemand_Add",
  components: {
    EditCom,
  },

  methods: {},
  activated() {
    console.log(11111);
  },
};
</script>
