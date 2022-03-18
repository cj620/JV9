<!--
 * @Author: C.
 * @Date: 2021-07-12 15:12:53
 * @LastEditTime: 2021-09-24 12:58:11
 * @Description: file content
-->
<template>
  <el-form>
    <!-- <JvForm :formObj="formObj"></JvForm> -->
    <FormItem :cdata="cdata"
              :form="formObj.form"
              :showLabel="false"></FormItem>
  </el-form>
</template>

<script>
import FormItem from "../../JvForm/cpn/FormItem.vue";
export default {
  name: 'InnerForm',
  components: {
    FormItem
  },
  props: {
    cdata: {
      type: Object,
      default: () => { }
    },
    formObj: {
      type: Object,
      default: () => { }
    },
  },
  data () {
    return {
    }
  },

}
</script>

<style lang="scss">
</style>
