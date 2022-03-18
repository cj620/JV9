<template>
  <div >


      <el-collapse >
        <el-collapse-item title="基础字段" name="1" >
          <div  class="component-list">
            <div  @dragstart="handleDragStart"
                  @dragend="dragEnd"
                  v-for="(item, index) in componentList"
                  :key="index"
                  draggable
                  :data-index="index"
                  class="field-widget-item"
            >
              {{item.label}}
            </div>
          </div>


        </el-collapse-item>
      </el-collapse>




  </div>
</template>

<script>
import {componentList} from './LeftContentConfig'
export default {
  name: 'left-content',
  data(){
    return{
      componentList


    }
  },
  methods:{
    handleDragStart(e) {
      e.dataTransfer.setData('index', e.target.dataset.index)
      console.log(e,e.target.dataset)
    },
    dragEnd(e){
      console.log(e,'结束')
    },

  }

}
</script>

<style lang="scss" scoped>
.component-list{
  display: flex;
  .field-widget-item{
    width: 115px;
    cursor: move;
    margin: 2px 6px 6px 0 ;
    background: #f1f2f3;
    height: 28px;
    line-height: 28px;
    padding-left: 10px;
  }
}
</style>
