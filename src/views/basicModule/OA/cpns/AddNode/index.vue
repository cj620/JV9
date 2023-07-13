<!--
 * @Author: C.
 * @Date: 2021-10-09 13:03:21
 * @LastEditTime: 2022-06-28 15:51:50
 * @Description: file content
-->
<template>
  <div class="add-node-box">
    <div class="box-btn">
      <div class="btn-pos">
        <!-- <el-popover placement="bottom-start" trigger="click">
          <NodeChoose @click="createNode"></NodeChoose>
          <el-button circle type="primary" size="small" slot="reference">
            <i class="el-icon-plus" style="font-weight: bold"></i>
          </el-button>
        </el-popover> -->
        <el-button circle type="primary" size="small" @click="createNode">
          <i class="el-icon-plus" style="font-weight: bold"></i>
        </el-button>
      </div>
      <div class="guide-line"></div>
    </div>
  </div>
</template>

<script>
import NodeChoose from "./cpns/NodeChoose.vue";
export default {
  props: {
    node: {
      type: Object,
      default: () => {},
    },
    processObj: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    NodeChoose,
  },
  methods: {
    createNode(e) {
      this.processObj.createNode(this.node.nodeId);
    },
  },
};
</script>

<style lang="scss">
.add-node-box {
  width: 220px;
  height: 70px;
  display: flex;
  justify-self: center;
  align-items: center;
  flex-flow: column;
  position: relative;
  .box-btn {
    width: 50px;
    height: 100%;
    // background-color: pink;
  }
  .btn-pos {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
  .guide-line {
    position: absolute;
    width: 2px;
    height: 70px;
    background-color: #ccc;
    left: 50%;
    &::after {
      content: "";
      position: absolute;
      top: 68px;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      width: 0;
      height: 4px;
      border-style: solid;
      border-width: 8px 6px 4px;
      border-color: #cacaca transparent transparent;
      background: #f5f5f7;
    }
  }
}
</style>
