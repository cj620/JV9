<!--
 * @Author: C.
 * @Date: 2021-09-13 16:59:03
 * @LastEditTime: 2021-11-12 09:30:11
 * @Description: file content
-->
<template>
  <PageWrapper
    title="详情页"
    content=" 表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    :isBack="false"
    ref="page"
  >
    <el-tabs @tab-click="tabClick" slot="sticky-tabs">
      <el-tab-pane
        v-for="pane in tabPanes"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      ></el-tab-pane>
    </el-tabs>
    <div slot="sticky-extra">
      <el-button @click="print">打印</el-button>
      <el-button @click="back">返回</el-button>
      <el-button type="primary">主操作</el-button>
    </div>
    <JvBlock
      title="用户信息"
      ref="first"
      :headerStyle="{
        color: 'pink',
      }"
      :contentStyle="{
        padding: '30px',
      }"
      helpMsg="这是一个提示"
    >
      <div slot="extra">
        <el-button size="mini">操作一</el-button>
        <el-button size="mini">操作二</el-button>
        <el-button type="primary" size="mini">主操作</el-button>
      </div>

      <JvDetail :detailObj="detailObj">
        <template #sex="{ record }">
          <el-tag>
            {{ record }}
          </el-tag>
        </template>
      </JvDetail>
    </JvBlock>
    <JvBlock ref="fourth">
      <JvTable :table-obj="tableObj">
        <div slot="btn-list">
          <el-button @click="insertData">插入数据</el-button>
        </div>
      </JvTable>
    </JvBlock>
    <JvBlock title="审核流">
      <AuditProcess></AuditProcess>
    </JvBlock>
    <!-- <JvBlock v-for="i in 20" :key="i" title="i">
      <div style="width: 100%; height: 100px"></div>
    </JvBlock> -->
  </PageWrapper>
</template>

<script>
import { tableConfig, detailConfig } from "./config";
import { Table } from "@/jv_doc/class/table";
import Detail from "@/jv_doc/class/detail/Detail";
import { Data, detailData } from "./data";
import AuditProcess from "@/components/BasicModule/AuditProcess";
import { printPlugin } from "@/jv_doc/utils/system/printPlugin";
export default {
  components: {
    AuditProcess,
  },
  data() {
    return {
      tableObj: {},
      detailObj: {},
      tabPanes: [
        {
          label: "用户信息",
          name: "first",
        },
        {
          label: "带边框列表",
          name: "second",
        },
        {
          label: "进度",
          name: "third",
        },
        {
          label: "表格",
          name: "fourth",
        },
      ],
    };
  },
  created() {
    // console.log(Data.items, 654545646);
    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      // data: [],
      title: "明细列表",
      searchBar: false,
      freshBar: false,
      settingBar: false,
      height: "200px",
    });
    this.detailObj = new Detail({
      data: detailData,
      schema: detailConfig,
      // border 是否带有边框
      // column 一行  Item 的数量
      // direction 排列的方向
      // size 列表的尺寸
      // title 标题文本，显示在左上方
      // extra 操作区文本，显示在右上方
      // colon 	是否显示冒号
      // labelClassName 	自定义标签类名
      // contentClassName 自定义内容类名
      // labelStyle 自定义标签样式
      // contentStyle 自定义内容样式
    });
  },
  methods: {
    back() {
      this.$refs.page.back();
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    insertData() {
      // Data
      this.tableObj.setData(Data.Items);
      console.log(this.tableObj);
    },
    print() {
      printPlugin({
        // 单据的Id集合
        ids: ["JV54548789"],
        // 所属的打印模块 同一种单据的category一定要相同，否则找不到相对应的模板
        category: "detail-demo",
      });
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss"></style>
