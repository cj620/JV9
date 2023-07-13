<!--
 * @Author: C.
 * @Date: 2021-10-09 09:10:01
 * @LastEditTime: 2022-06-29 09:13:32
 * @Description: file content
-->
<template>
  <PageWrapper :title="$t('menu.' + $route.query.BillKey)" content="审核流配置">
    <div class="oa-designer">
      <div class="content">
        <div
          class="node-wrapper"
          v-for="nodeItem in processObj.ApproveNodes"
          :key="nodeItem.nodeId"
        >
          <NodeCard :nodeItem="nodeItem" :processObj="processObj"></NodeCard>
          <AddNode :node="nodeItem" :processObj="processObj"></AddNode>
        </div>
        <div class="node-wrapper">
          <div class="node-end">流程结束</div>
        </div>
      </div>
    </div>

    <div slot="fixedFooter">
      <Action
        size="medium"
        :primary="[
          {
            label: '保存',
            confirm: toSave,
          },
        ]"
      ></Action>
    </div>
  </PageWrapper>
</template>
<script>
import NodeCard from "./cpns/NodeCard";
import AddNode from "./cpns/AddNode";
import Process from "../OA/utils/Process";
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
      title: "审核流配置",
    };
  },
  created() {
    // console.log(this.$route.query.BillKey, "5555555555");
    this.processObj = new Process(this.$route.query.BillKey);
    this.processObj.getProcessData();
  },
  methods: {
    handleClick(tab, event) {},
    handleOpen() {
      this.processObj.print();
    },
    back() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.go(-1);
    },
    toSave() {
      this.processObj.saveAuditProcess().then((res) => {
        this.back();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.oa-designer {
  // .header {
  //   z-index: 11;
  //   position: relative;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   height: 54px;
  //   padding: 0 20px 0 20px;
  //   background: #fff;
  //   box-shadow: 0 1px 4px 0 rgb(17 31 44 / 4%);

  //   &-left {
  //     &-title {
  //       margin-left: 10px;
  //       font-size: 18px;
  //     }
  //   }
  //   &-center {
  //   }
  //   &-right {
  //   }
  // }
  .content {
    height: 100%;
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
