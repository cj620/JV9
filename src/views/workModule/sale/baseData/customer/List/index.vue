<!--
 * @Author: your name
 * @Date: 2021-11-01 09:26:46
 * @LastEditTime: 2022-03-31 16:36:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\views\workModule\sale\baseData\customer\List\index.vue
-->
<!--客户-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable
      ref="BillTable"
      :table-obj="tableObj"
      @selectionChange="handleSelectionChange"
    >
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row.CustomerId),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteCustomer.bind(null, row.CustomerId),
              },
            },
          ]"
        />
      </template>

      <Action slot="btn-list" max="10">
        <el-button size="mini" @click="add">
          {{ $t("Generality.Ge_New") }}
        </el-button>
         <el-button size="mini" @click="downExport2Excel">
              {{$t('design.De_DownloadTemplate')}}
            </el-button>
             <el-button size="mini" @click="Import">
{{$t("Generality.Ge_Import")}}
            </el-button>
      </Action>
    </JvTable>
     <!-- 导入数据 -->
    <Import
      :visible.sync="importShow"
      width="28%"
      :title="$t('Generality.Ge_Import')"
      @complete="importComplete"
    ></Import>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { deleteSalesCustomer,sales_customer_batch_import } from "@/api/workApi/sale/customer";
import { export2Excel } from "@/jv_doc/cpn/JvTable/utils/export2Excel";

export default {
  data() {
    return {
      // 表格数据
      tableObj: {
        type: "",
        data: "",
      },
       importData: {},
       importShow: false,
         exportTemplate: [
        {
          prop: "CustomerId",
          label: this.$t("sale.Sa_CustomerId"),
        },

        /*名称*/
        {
          prop: "ShortName",
          label: this.$t("sale.Sa_ShortName"),
        },
        /*描述*/
        {
          prop: "FullName",
          label: this.$t("sale.Sa_FullName"),
        },
        /*地址*/
        {
           prop: "Address",
    label: i18n.t("sale.Sa_Address") /* 地址 */,
        },
        /*地址*/
        {
           prop: "Contact",
        label: i18n.t("sale.Sa_Contact") /* 联系人 */,        },
        /*地址*/
        {
           prop: "Tel",
        label: i18n.t("setup.Tel") /* 电话 */,  
          },
     
             {
             prop: "Phone",
            label: i18n.t("setup.Phone") /* 手机 */, 
           },
            {
           prop: "Email",
          label: i18n.t("setup.Mail") /* 邮箱 */,
           },
            {
           prop: "Tax",
          label: i18n.t("sale.Sa_Tax") /* 税率 */,
           },
            {
           prop: "Currency",
    label: i18n.t("sale.Sa_Currency") /* 货币 */,
           },
           {
           prop: "Code",
    label: i18n.t("sale.Sa_Code") /* 简码 */,
           },
      ],
      exportTemplateData: {
        checkData: [],
        checkedFields: [],
        sourceType: "editTable",
        dataType: "TEMPLATE",
        saveType: "xlsx",
        title: "",
        fileName: this.$t("menu.Sa_Customer"),
      },
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    handleSelectionChange(id) {
      console.log(keys, 111);
    },

    // 删除客户
    deleteCustomer(id) {
      deleteSalesCustomer([id]).then(() => {
        this.tableObj.getData();
      });
    },

    // 编辑客户
    edit(id) {
      this.$router.push({
        name: "Sa_Customer_Edit",
        query: { type: "add", title: "editCustomer", isAdd: false, id },
      });
    },

    // 新建客户
    add() {
      this.$router.push({
        name: "Sa_Customer_Add",
        query: { type: "add", title: "addCustomer", isAdd: true },
      });
    },
     //下载导入模板
    downExport2Excel() {
      var arr = [];
      this.tableObj.props.tableSchema.forEach((item) =>
        this.exportTemplate.forEach((Titem) => {
          if (item.label === Titem.label) {
            arr.push(item);
          }
        })
      );
      console.log(arr);
      this.exportTemplateData.checkedFields = arr;
      export2Excel(this.exportTemplateData);
    },
      Import(){
       this.importShow = true;
    },
    //导入成功
     importComplete(e) {
      this.importShow = false;

       var arr = [];
      e.forEach((Titem) => {
        var str = {};
        this.exportTemplate.forEach((item) => {
          if (Titem[item.label]) {
            str[item.prop] = Titem[item.label];
          }
        });
        arr.push(str);
      });
      console.log(arr);

       sales_customer_batch_import(arr).then((res) => {
         this.tableObj.getData();
       });
    },
  },
};
</script>
<style lang="scss"></style>
