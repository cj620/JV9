<template>
  <JvDialog
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmData">
    <el-time-picker
      style="width: 100%"
      v-model="value"
      :placeholder="$t('Generality.Ge_PleaseSelect')">
    </el-time-picker>
  </JvDialog>
</template>
<script>

import {timeFormat} from "~/utils/time";

export default {
  name: 'selectTimeForm',
  data(){
    return{
      value: ''
    }
  },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.value = this.formData.ConfigValue;
  },
  methods: {
    confirmData() {
      this.value = timeFormat(this.value,'yyyy-MM-dd hh:mm')
      this.$emit('TimeConfirm',this.value)
    },
  }
}
</script>
