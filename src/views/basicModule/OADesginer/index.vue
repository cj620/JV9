<!--
 * @Author: C.
 * @Date: 2021-10-09 09:10:01
 * @LastEditTime: 2022-01-13 17:29:19
 * @Description: file content
-->
<template>
  <div class="oa-designer">
    <div class="header">
      <div class="header-left">
        <el-button circle icon="el-icon-back" @click="back"></el-button>
        <span class="header-left-title">创建审核流</span>
      </div>
      <div class="header-center"></div>
      <div class="header-right">
        <Action
          size="medium"
          :primary="[
            {
              label: $t('Generality.Ge_OK'),
              confirm: handleOpen,
            },
          ]"
          :actions="[
            {
              label: $t('Generality.Ge_Cancel'),
              confirm: handleOpen,
            },
          ]"
        ></Action>
      </div>
    </div>
    <div class="content">
      <div
        class="node-wrapper"
        v-for="nodeItem in processObj.nodeConfig"
        :key="nodeItem.nodeId"
      >
        <NodeCard :node="nodeItem" :processObj="processObj"></NodeCard>
        <AddNode :node="nodeItem" :processObj="processObj"></AddNode>
      </div>
      <div class="node-wrapper">
        <div class="node-end">流程结束</div>
      </div>
    </div>
  </div>
</template>
<script>
import NodeCard from "./cpns/NodeCard";
import AddNode from "./cpns/AddNode";
import { defaultNodeList } from "../OADesginer/utils/nodeConstructor";
import Process from "../OADesginer/utils/Process";
export default {
  components: {
    NodeCard,
    AddNode,
  },
  data() {
    return {
      activeName: "second",
      nodeList: [],
      processObj: {},
    };
  },
  created() {
    this.processObj = new Process();
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleOpen() {
      // console.log('go back');
      this.processObj.print();
    },
    back() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.oa-designer {
  .header {
    z-index: 11;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 54px;
    padding: 0 20px 0 20px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgb(17 31 44 / 4%);

    &-left {
      &-title {
        margin-left: 10px;
        font-size: 18px;
      }
    }
    &-center {
    }
    &-right {
    }
  }
  .content {
    height: calc(100vh - 54px);
    width: 100%;
    background-color: rgb(245 245 247);
    overflow: auto;
    padding-top: 50px;
    .node-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
    }
    .node-end {
      width: 100px;
      height: 35px;
      border-radius: 20px;
      margin-top: 10px;
      background-color: #ccc;
      z-index: 3;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
