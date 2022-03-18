<!--
 * @Author: C.
 * @Date: 2021-10-11 16:46:28
 * @LastEditTime: 2021-10-14 14:46:09
 * @Description: file content
-->
<template>
  <el-drawer v-bind="$attrs"
             v-on="$listeners">
    <ApproverSet v-if="nodeObj.type=='approver'"
                 :nodeSet="nodeObj.nodeSet"
                 :nodeData="nodeData"></ApproverSet>
  </el-drawer>
</template>

<script>
import ApproverSet from "./cpns/ApproverSet.vue";
export default {
  components: {
    ApproverSet
  },
  props: {
    nodeObj: {
      type: Object,
      default: () => { }
    },
    nodeData: {
      type: Object,
      default: () => { }
    },
  },
}
</script>

<style>
</style>