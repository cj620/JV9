<template>
    <div class="content" @dragover="dragOver" @drop="handleDrop">
      <component
        v-for="item in componentData"
        :key="item.id"
        :is="item.component"
        :style="item.style"
        :propValue="item.propValue"
      />

    </div>
</template>

<script>
export default {
  name: 'main-content',
  data(){
    return{
      componentData:[]
    }
  },
  methods:{
    handleDrop(e) {
      console.log(e,e.target.dataset,'结束1')
       e.preventDefault()
       e.stopPropagation()
     this.componentData.push(
      {
        component: 'el-button', // 组件名称，需要提前注册到 Vue
          label: '文字', // 左侧组件列表中显示的名字
        propValue: '文字', // 组件所使用的值
        icon: 'el-icon-edit', // 左侧组件列表中显示的名字
        animations: [], // 动画列表
        events: {}, // 事件列表
        style: { // 组件样式
          width: 200,
            height: 33,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
        },
      }
     )
      // this.$store.commit('addComponent', component)
    },
    dragOver(e){
      e.preventDefault();
    }
  }
}
</script>

<style scoped>
.content{
  height: 100vh;
}
</style>
