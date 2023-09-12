<script>
import timeFormat from "@/jv_doc/utils/time/timeFormat";
export default {
  name: "formattedTime",
  props: {
    format: {
      type: String,
      default: 'yyyy-MM-dd hh:mm:ss'
    },
  },
  data() {
    return {
      formattedTime: '',
      timer: null,
    }
  },
  created() {

  },
  mounted() {
    this.updateTime(); // 初始化时先更新时间
    this.timer = setInterval(this.updateTime, 1000); // 每隔一秒更新一次
  },
  beforeDestroy() {
    clearInterval(this.timer); // 组件销毁时清除定时器
  },
  methods: {
    updateTime() {
      // this.formattedTime = ''
      // const now = new Date();
      this.formattedTime = timeFormat(new Date(), this.format);
      // const date = {
      //   yyyy: now.getFullYear(),
      //   MM: this.padZero(now.getMonth() + 1),
      //   dd: this.padZero(now.getDate()),
      //   hh: this.padZero(now.getHours()),
      //   mm: this.padZero(now.getMinutes()),
      //   ss: this.padZero(now.getSeconds()),
      // }
      // let list = this.format.split(' ')
      // if(this.format.indexOf('-') !== -1) {
      //   list[0].split('-').forEach((item, i) => {
      //     this.formattedTime += date[item] + (i !== list[0].split('-').length - 1 ? '-' : '')
      //   })
      // } else if(this.format.indexOf('/') !== -1) {
      //   list[0].split('/').forEach((item, i)  => {
      //     this.formattedTime += date[item] + (i !== list[0].split('/').length - 1 ? '/' : '')
      //   })
      // }
      // if(!list[1]) return
      // this.formattedTime += ' '
      // list[1].split(':').forEach((item, i)  => {
      //   this.formattedTime += date[item] + (i !== list[1].split(':').length - 1 ? ':' : '')
      // })
    },
    // padZero(value) {
    //   return value.toString().padStart(2, '0');
    // }
  }
}
</script>

<template>
  <div v-bind="$attrs">
    {{ formattedTime }}
  </div>
</template>

<style scoped lang="scss"></style>
