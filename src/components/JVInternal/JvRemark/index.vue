<!--
 * @Author: your name
 * @Date: 2021-11-09 15:23:21
 * @LastEditTime: 2021-11-11 16:52:22
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\components\JVInternal\JvRemark\index.vue
-->
<!--单据备注组件-->
<template>
    <div>
      <!--暂无备注  -->
      <div  v-if="RemarkData===''" class="noRemarks-detail" >{{$t('Generality.Ge_RemarksIsNull')}}</div>
      <div v-else class="Remarks-detail">
        {{RemarkData}}
      </div>
    </div>
</template>

<script>
export default {
  name: 'index',
  props:{
    RemarkData:{
      type:String,
      default:()=>''
    }
  }
}
</script>

<style lang="scss" scoped>
  .noRemarks-detail{
    text-align: center;
    padding: 15px;
  }

</style>
