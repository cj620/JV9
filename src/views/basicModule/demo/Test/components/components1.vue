<template>
    <div>我是a

    <el-button @click="test">点击</el-button>
    </div>
</template>

<script>
import EventEmitter from './eventBus'
export default {
  name: 'components1',
  methods:{
    test(){

      const eventBus = new EventEmitter()
    const task1 = () => { console.log('task1'); }
    const task2 = () => { console.log('task2'); }
      eventBus.emit('task',task1)
    }
  }
}
</script>

<style scoped>

</style>
