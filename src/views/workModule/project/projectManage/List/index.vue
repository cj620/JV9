<!--
 * @Author: your name
 * @Date: 2021-11-01 15:42:07
 * @LastEditTime: 2022-03-28 11:25:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\List\index.vue
-->
<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #PhotoUrl="{ record, row }">
        <JvImg
          v-if="row.Flag != 0"
          :state="record"
          :cpnProps="{
            lazy: false,
            preUrl: imgUrlPlugin(''),
            width: '60px',
            height: '60px',
          }"
        ></JvImg>
      </template>
      <template #State="{ record }">
        {{ StateEnum[record] }}
      </template>
      <template #Progress="{ record, row }">
        <el-progress
          v-if="row.Flag != 0"
          :percentage="record"
          :color="getProceeType(row.Flag)"
        ></el-progress>
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction :actions="getTypeAction(row)" />
      </template>
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_Tooling') + $t('project.Pro_Share'),
            confirm: shareTooling,
          },
          {
            label: $t('project.Pro_projectMsgManager'),
            confirm: toProjectMsg,
          },
        ]"
      >
      </Action>
    </JvTable>
    <JvDialog
      :title="$t('Generality.Ge_Tooling') + $t('project.Pro_Share')"
      :visible.sync="toolingShareVisible"
      width="60%"
      @confirm="confirmToolingShare"
    >
      <el-tag
        v-for="tag in shareList"
        :key="tag"
        closable
        style="margin-left: 5px"
      >
        {{ tag }}
      </el-tag>
      <JvTable :table-obj="shareTableObj">
        <template #PhotoUrl="{ record }">
          <JvImg
            :state="record"
            :cpnProps="{
              lazy: false,
              preUrl: imgUrlPlugin(''),
              width: '60px',
              height: '60px',
            }"
          ></JvImg>
        </template>
        <template #State="{ record }">
          {{ StateEnum[record] }}
        </template>
        <template #operation="{ row }">
          <el-button
            type="primary"
            icon="el-icon-plus"
            round
            @click="addTooling(row)"
          ></el-button>
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
import { getCpn } from "@/jv_doc/maps/cpnMaps";
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { ToolTable } from "./tool.share";
const Image = getCpn("Image");
import {
  listTableColBtnModel,
  listTableBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  // 页面的标识
  name: "ProjectManage",
  components: {
    JvImg: Image,
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      // 编辑路由
      EditRoute: "Sa_SaleQuote_Edit",
      // 新增路由
      AddRoute: "Sa_SaleQuote_Add",
      StateEnum: {
        Enable: this.$t("Generality.Ge_Enable"),
        Disable: "未启用",
        null: "",
        ToBeProcessed: this.$t("production.Pr_ToBeProcessed"),
        Processing: this.$t("Generality.Ge_Processing"),
        Processed: this.$t("Generality.Ge_Completed"),
      },
      toolingShareVisible: false,
      shareTableObj: {},
      shareList: [],
    };
  },
  created() {
    this.init();
  },
  methods: {
    imgUrlPlugin,
    init() {
      // 创建表格实例
      this.tableObj = new Table();
      // this.tableObj.getData();
      this.shareTableObj = new ToolTable();
    },
    // 跳转项目进度
    toProjectProcess(row) {
      console.log(row);
      this.$router.push({
        name: "ProjectManage_process_people",
        query: { Project: row.Project },
      });
    },
    toMouldDetail(row) {
      this.$router.push({
        name: "ProjectManage_MouldDetail",
        query: { BillId: row.Id },
      });
    },
    toProductDetail(row) {
      this.$router.push({
        name: "ProductionTaskDetails",
        query: { BillId: row.BillId },
      });
    },
    // toProjrctCost(row) {
    //   this.$router.push({
    //     name: "Pm_ProjectCost",
    //     query: { Project: row.Project },
    //   });
    // },
    toProjrctCost(row) {
      this.$router.push({
        name:'Pm_PivotTable',
        query: { ProjectId: row.Project },
      });
    },
    toShare(row) {
      // this.$router.push({
      //   name: "ProjectManage_Share",
      //   query: { Project: row.Project },
      // });
    },
    shareTooling() {
      this.shareTableObj.getData();
      this.toolingShareVisible = true;
    },
    confirmToolingShare() {
      let ids = this.shareList.slice(0);
      this.shareList = [];
      this.toolingShareVisible = false;
      this.$router.push({
        name: "ProjectManage_Share",
        query: { ToolingNos: ids },
      });
    },
    addTooling(row) {
      // console.log(row);
      let itemId = row.ItemId;
      if (this.shareList.includes(itemId)) return;
      this.shareList.push(itemId);
    },
    // Pm_ProjectCost ProjectManage_Share
    toProjectMsg() {
      this.$router.push({
        name: "Pm_ProjectManagement_Msg",
        // query: { ToolingNos: ids },
      });
    },
  },
  computed: {
    getListTableBtnModel() {
      return listTableBtnModel(this);
    },
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
    getProceeType() {
      return (flag) => {
        if (flag == "0") {
          return "#909399";
        } else if (flag == "1") {
          return "#e6a23c";
        } else if (flag == "2") {
          return "#67c23a";
        }
      };
    },
    getTypeAction() {
      return (row) => {
        let flag = row.Flag;
        if (flag == "0") {
          return [
            {
              label: this.$t("Generality.Ge_Schedule"),
              confirm: this.toProjectProcess.bind(null, row),
            },
            {
              label: this.$t("project.Pro_Cost"),
              confirm: this.toProjrctCost.bind(null, row),
            },
            // {
            //   label: this.$t("project.Pro_Share"),
            //   confirm: this.toShare.bind(null, row),
            // },
          ];
        } else if (flag == "1") {
          return [
            {
              label: this.$t("project.Pro_ToolingDetails"),
              confirm: this.toMouldDetail.bind(null, row),
            },
          ];
        } else if (flag == "2") {
          return [
            {
              label: this.$t("menu.Pr_ProductionTask"),
              disabled: !row.BillId,
              confirm: this.toProductDetail.bind(null, row),
            },
          ];
        }
      };
    },
  },
};
</script>
