<!--
 * @Author: your name
 * @Date: 2021-11-24 14:00:16
 * @LastEditTime: 2022-01-20 16:19:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\jv_doc\cpn\JvFooter\c-menu.vue
-->
<template>
  <div class="jv-footer">
    <div>@JvMms</div>
  </div>
</template>

<script>
export default {
  // name:'JvFooter'
};
</script>

<style lang="scss">
@import "../../style/mixin.scss";
.jv-footer {
  height: 300px;
  color: rgb(122, 122, 122);
  @include flexBox($ff: column);
}
</style>
