<!--
 * @Author: C.
 * @Date: 2021-10-09 10:59:32
 * @LastEditTime: 2022-06-30 17:27:54
 * @Description: file content
-->
<template>
  <div
    class="node-card-cpn"
    :class="nodeObj.canEdit ? 'hover-style' : ''"
    @click="cardClick"
  >
    <div
      class="title"
      :style="{ background: multiplayer[nodeItem.ApproveType].color }"
    >
      <el-row :gutter="20">
        <el-col :span="20">
          <span v-if="!inputShow" @click.stop="editTitle">
            <i :class="nodeCard.icon" style="margin-right: 5px"></i>
            <span class="title-text"
              >{{ nodeItem.Name }} 【{{
                multiplayer[nodeItem.ApproveType].label
              }}】</span
            >
          </span>
          <el-input
            v-model="nodeItem.Name"
            v-else
            @blur="inputShow = false"
            class="title-input"
            ref="titleInput"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <i class="el-icon-delete del-icon" @click.stop="delNode"></i>
        </el-col>
      </el-row>
    </div>
    <div class="content">
      <div class="text">{{ nodeDescription(nodeItem) }}</div>
      <i class="el-icon-arrow-right arrow-icon"></i>
    </div>
    <NodeDrawer
      :visible.sync="drawerShow"
      :title="nodeItem.Name"
      :append-to-body="true"
      :nodeItem="nodeItem"
    >
    </NodeDrawer>
  </div>
</template>

<script>
import { nodeMap } from "../../maps/nodeMap";
import { multiplayer } from "../../maps/auditMap";
import NodeDrawer from "../NodeDrawer";
import { handleDescription } from "../../utils/handleDescription";
export default {
  components: {
    NodeDrawer,
  },
  props: {
    // 节点结构
    nodeItem: {
      type: Object,
      default: () => {},
    },
    // 流程对象
    processObj: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      inputShow: false,
      drawerShow: false,
      multiplayer,
    };
  },
  created() {},
  methods: {
    editTitle() {
      if (!this.nodeObj.canEdit) return;
      this.inputShow = true;
      this.$nextTick(() => {
        this.$refs.titleInput.focus();
      });
    },
    cardClick() {
      this.drawerShow = true;
    },
    delNode() {
      this.processObj.delNode(this.nodeItem.nodeId);
    },
  },
  computed: {
    // 确定节点类型
    nodeObj() {
      return nodeMap[this.nodeItem.nodeType];
    },
    // 节点卡片表现
    nodeCard() {
      return nodeMap["approver"].style;
    },
    // 节点描述
    nodeDescription() {
      return (nodeItem) => {
        return handleDescription(nodeItem);
      };
    },
  },
};
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
    max-height: 80px;
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
