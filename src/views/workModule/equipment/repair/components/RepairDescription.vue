<template>
    <div>
      <div  v-if= "DesData ===''|| DesData === null" class="noDes-detail" >{{$t('device.De_DescriptionIsNull')}}</div>
      <div v-else class="Des-detail">
        {{ DesData }}
      </div>
    </div>
</template>
<script>
export default {
  name: 'index',
  props:{
    DesData:{
      type:String,
      default:()=>''
    }
  }
}
</script>

<style lang="scss" scoped>
.noDes-detail{
  text-align: center;
  padding: 15px;
}
</style>
