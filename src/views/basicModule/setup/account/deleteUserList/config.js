/*
 * @Author: H.
 * @Date: 2022-01-20 15:50:55
 * @LastEditTime: 2022-10-27 17:22:36
 * @Description:
 */
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-20 14:56:04
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getUserInfoList } from "@/api/basicApi/systemSettings/user";
// import BillState from '../../../components/Jv_cpn/JvColBillState'
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
export class api extends TableAPI {
  getData = getUserInfoList;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "id",
      title: i18n.t("setup.DeletedUsers"),
      api,
    });
  }
}

export const tableConfig = [
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: "Image",
    width: "60px",
    align: "center",
    cpnProps: {
      lazy: false,
    },
    // 导出配置
    exportConfig: {
      // 禁用这个字段的导出功能
      disabled: true,
    },
  },
  {
    id: "665487545",
    prop: "UserId",
    label: i18n.t("setup.UserId"),
    fixed: false,
    align: "center",
  },
  {
    id: "665487545",
    prop: "UserName",
    label: i18n.t("setup.UserName"),
    fixed: false,
    align: "center",
    filter: "default",
    show: true,
  },
  {
    id: "665487545",
    prop: "Activate",
    label: i18n.t("setup.ActiveState"),
    fixed: false,
    align: "center",
    custom: true,
  },
  {
    id: "6654875455",
    prop: "Mail",
    label: i18n.t("setup.Mail"),
    fixed: false,
  },
  {
    id: "66548754566574",
    prop: "CreateDate",
    label: i18n.t("Generality.Ge_CreateDate"),
    fixed: false,
    align: "center",
    filter: "date",
    show: true,
  },
  {
    id: "665487887787545",
    prop: "DepartmentName",
    label: i18n.t("menu.Se_Department"),
    fixed: false,
    align: "center",
    show: true,
  },
];
export const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  {
    prop: "DepartmentName",
    label: i18n.t("Generality.Ge_DepartmentSearch"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
];
