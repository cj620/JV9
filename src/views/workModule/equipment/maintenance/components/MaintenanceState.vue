<template>
  <div   :style="{color:stateMap&&stateMap.color,borderColor:stateMap&&stateMap.color}" class="maintenance_State">
    {{stateMap&&stateMap.name}}
  </div>
</template>
<script>
import { maintenanceStateEnum } from '@/enum/workModule'
export default {
  name: 'index',
  computed:{
    stateMap(){
      return maintenanceStateEnum[this.state]
    }
  },
  props:{
    state:{
      type:String,
      default:()=>''
    }
  }
}
</script>
<style lang="scss" scoped>
.maintenance_State{
  position: absolute;
  right: 40px;
  top: 0;
  font-size: 24px;
  font-weight: 500;
  border: 2px solid #000;
  padding:  5px 10px;
}
</style>
