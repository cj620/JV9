<!--
 * @Author: your name
 * @Date: 2021-11-12 15:34:15
 * @LastEditTime: 2022-01-20 17:21:57
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\otherIn\List\index.vue
-->
<!--
 * @Author: H.
 * @Date: 2021-11-09 13:10:18
 * @LastEditTime: 2021-11-09 13:10:18
 * @Description: 其它入库
-->

<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction :actions="getListTableColBtnModel(row)" />
      </template>
      <!-- 表格操作行 -->
      <Action size="mini" slot="btn-list" :actions="getListTableBtnModel">
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { stateEnum } from "@/enum/workModule";
import { deleteStockOtherIn } from "@/api/workApi/stockroom/otherIn";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  name: "OtherIn",
  components: {
    BillStateTags,
  },
  data() {
    return {
      stateEnum,
      // 表格数据
      tableObj: {
        type: "",
        data: "",
      },
      transferData: {
        type: "",
        data: "",
      },
      form: {
        SortColumn: "ItemType",
        SortOrder: 4,
      },
      auditForm: {
        Remarks: "",
        BizFormId: "",
        AuditResult: "",
      },
      remarkShow: false,
      IsState: false,
      dialogFormVisible: false,
      // 编辑路由
      EditRoute: "St_OtherIn_Edit",
      // 新增路由
      AddRoute: "St_OtherIn_Add",
      chooseList: [],
    };
  },
  created() {
    this.tableObj = new Table();

    this.tableObj.getData();
  },
  computed: {
    // 表格操作模块
    getListTableBtnModel() {
      return [
        ...listTableBtnModel(this),
        {
          label: i18n.t("project.Pro_CheckDetails"),
          confirm: this.toDetailsList,
        },
      ];
    },
    // 表格操作列按钮
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
  },
  methods: {
    toDetailsList() {
      this.$router.push({
        name: "St_OtherIn_Detail_list",
      });
    },
  },
};
</script>
<style lang="scss"></style>
