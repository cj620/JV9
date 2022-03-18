<!--
 * @Author: C.
 * @Date: 2021-10-09 10:59:32
 * @LastEditTime: 2021-10-15 15:53:21
 * @Description: file content
-->
<template>
  <div class="node-card-cpn"
       :class="this.nodeObj.canEdit?'hover-style':''"
       @click="cardClick">
    <div class="title"
         :style="{background:nodeCard.color}">
      <el-row :gutter="20">
        <el-col :span="20">
          <span @click.stop="editTitle"
                v-if="!inputShow">
            <i :class="nodeCard.icon"
               style="margin-right:5px"></i>
            <span class="title-text">{{node.name}}</span>
          </span>
          <el-input v-model="node.name"
                    v-else
                    @blur="inputShow=false"
                    class="title-input"
                    ref="titleInput"></el-input>

        </el-col>
        <el-col :span="4"> <i class="el-icon-delete del-icon"
             @click.stop="delNode"></i> </el-col>
      </el-row>

    </div>
    <div class="content">
      <div class="text"> {{nodeDescription(node,nodeObj)}}</div>
      <i class="el-icon-arrow-right arrow-icon"></i>
    </div>
    <NodeDrawer :visible.sync="drawerShow"
                :title="node.name"
                :append-to-body="true"
                :nodeObj="nodeObj"
                :nodeData="node">
    </NodeDrawer>
  </div>
</template>

<script>
import { nodeMap } from "../../maps/nodeMap";
import NodeDrawer from "../NodeDrawer";
import { handleDescription } from "../../utils/handleDescription";
export default {
  components: {
    NodeDrawer
  },
  props: {
    node: {
      type: Object,
      default: () => { }
    },
    processObj: {
      type: Object,
      default: () => { }
    },
  },
  data () {
    return {
      inputShow: false,
      drawerShow: false
    }
  },
  created () {
    // console.log(nodeMap[this.node.type], 6549649846);
  },
  methods: {
    editTitle () {
      if (!this.nodeObj.canEdit) return
      this.inputShow = true
      this.$nextTick(() => {
        this.$refs.titleInput.focus()
      })
    },
    cardClick () {
      console.log(this.node, 78765);
      this.drawerShow = true
    },
    delNode () {
      this.processObj.delNode(this.node.nodeId)
    }
  },
  computed: {
    nodeObj () {
      return nodeMap[this.node.type]
    },
    nodeCard () {
      return nodeMap[this.node.type].card
    },
    nodeDescription () {
      return (node, nodeMap) => {
        // console.log(handleDescription(node, nodeMap), 564564898798);
        console.log(node, nodeMap, 564564898798);
        // return 'hhhhhh'
        return handleDescription(node, nodeMap)
      }
    }
  }

}
</script>

<style lang="scss">
.node-card-cpn {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  width: 220px;
  min-height: 72px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  box-shadow: 0 1px 4px 0 rgb(17 31 44 / 15%);
  overflow: hidden;
  border: 1px solid #fdfdfd00;
  &:hover {
    border: 1px solid #409eff;
  }
  .title {
    width: 100%;
    padding: 6px 10px;
    font-size: 12px;
    color: #fff;
    // height: 28px;
    .del-icon {
      display: none;
    }
    .el-input--medium .el-input__inner {
      height: 17px;
      font-size: 12px;
      line-height: 17px;
    }
  }
  .content {
    width: 100%;
    height: 48px;
    padding: 16px;
    padding-right: 30px;
    font-size: 13px;
    position: relative;
    .text {
      padding: 5px 0;
    }
    .arrow-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 14px;
      font-size: 18px;
      color: #979797;
    }
  }
}
.hover-style {
  &:hover {
    .title-text {
      border-bottom: 1px dashed #fff;
    }
    .title .del-icon {
      display: block;
    }
    border: 1px solid #409eff;
  }
}
</style>