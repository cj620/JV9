/*
 * @Author: H.
 * @Date: 2021-12-31 10:07:01
 * @LastEditTime: 2022-01-14 17:15:13
 * @Description:
 */

// 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getUserLogList } from "@/api/basicApi/systemSettings/user";
import { enumFilter } from "~/utils/system/enumsPlugin";
import { itemCategoryEnum } from "@/enum/baseModule";
class api extends TableAPI {
  // 获取列表
  getData = getUserLogList;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 表单配置
      formSchema: formSchema,
      // 行标识
      rowId: "BillId",
      // 表格标题
      title: i18n.t("menu.Se_UserLog"),
      // 接口类
      api,
      operationCol: false,
      printBar: false,
    });
  }
}
//  表格配置
const tableSchema = [
  {
    prop: "UserName",
    label: i18n.t("setup.UserName"),
  },
  {
    prop: "LogType",
    label: i18n.t("setup.RecordCategory"),
    custom: true,
  },
  {
    prop: "LogDate",
    label: i18n.t("Generality.Ge_Date"),
    filter: "time",
  },
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
    customFilter: (value) => {
      console.log(value, i18n.t("menu." + value), 989898);
      return value?i18n.t("menu." + value):value;
    },
  },
  {
    prop: "AssociatedNo",
    label: i18n.t("Generality.Ge_RelatedDocumentNo"),
  },
];
//  搜索表单配置
const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  {
    prop: "LogType",
    label: i18n.t("setup.RecordCategory"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "0",
          label: i18n.t("login.l_LogIn"),
        },
        {
          value: "4",
          label: i18n.t("Generality.Ge_Edit"),
        },
        {
          value: "8",
          label: i18n.t("Generality.Ge_Delete"),
        },
      ],
    },
  },

  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_Date"),
    cpn: "SingleTime",
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
    cpn: "SingleTime",
    hidden: true,
  },
];
