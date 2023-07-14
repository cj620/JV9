<template>
  <div :style="{backgroundColor:stateMap[state].color,color:stateMap[state].fcolor}">
    <i :class="stateMap[state].icon"></i>

    {{stateMap[state]&&stateMap[state].name}}
    </div>
</template>

<script>
import { taskStateEnum } from "@/enum/workModule";

export default {
  props: {
    state: {
      type: String,
      default: "Fail",
    },
  },
   computed: {
    stateMap() {
      return taskStateEnum;
    },
  },
}
</script>

<style>

</style>
