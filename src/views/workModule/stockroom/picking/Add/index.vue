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
    <EditCom :name="name"> </EditCom>
  </div>
</template>

<script>
import EditCom from "../components/index";

export default {
  name: "St_Picking_Add",
  data(){
    return{
      name: 'St_Picking_Add'
    }},
  components: {
    EditCom,
  },

  methods: {},
};
</script>
