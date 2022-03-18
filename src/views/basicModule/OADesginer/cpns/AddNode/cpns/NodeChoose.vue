<!--
 * @Author: C.
 * @Date: 2021-10-09 16:43:16
 * @LastEditTime: 2021-10-09 17:27:11
 * @Description: file content
-->
<template>
  <div class="node-choose">
    <el-row :gutter="15">
      <el-col :span="12"
              v-for="(nodeItem,index) in nodeMap"
              :key="index">
        <div class="node-type"
             v-if="nodeItem.canCreate"
             @click="btnClick(nodeItem.type)">
          <i :class="nodeItem.card.icon"
             :style="{color:nodeItem.card.color}"
             class="icon-style"></i>
          <span>{{nodeItem.card.title}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { nodeMap } from "../../../maps/nodeMap";
export default {
  data () {
    return {
      nodeMap
    }
  },
  methods: {
    btnClick (e) {
      // console.log();
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss">
.node-choose {
  width: 340px;
  .node-type {
    display: flex;
    align-items: center;
    width: 100%;
    height: 55px;
    margin-bottom: 5px;
    background: rgba(17, 31, 44, 0.02);
    border-radius: 7px;
    &:hover {
      background-color: #fff;
      border: 1px solid rgb(228, 228, 228);
      box-shadow: 0 1px 4px 0 rgb(17 31 44 / 15%);
    }
    .icon-style {
      font-size: 25px;
      padding: 0 20px;
    }
  }
}
</style>