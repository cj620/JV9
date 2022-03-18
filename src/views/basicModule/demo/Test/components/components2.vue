<template>
    <div>我是b</div>
</template>

<script>
import EventEmitter from './eventBus'
export default {
  name: 'components1',
  mounted() {
    const eventBus = new EventEmitter()
    eventBus.emit('task',(res)=>{
      console.log(res)
    })
  }
}
</script>

<style scoped>

</style>
