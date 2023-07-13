/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-14 10:52:54
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAuditList } from "@/api/basicApi/systemSettings/auditFlowSetup";

export class api extends TableAPI {
  getData = getAuditList;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillKey",
      title: i18n.t("setup.WithTheAuditor"),
      api,
      pagination: false,
    });
  }
}

export const tableConfig = [
  {
    id: "665487545",
    prop: "BillKey",
    label: i18n.t("Generality.Ge_DocumentName"),
    fixed: false,
    align: "center",
    filter: "default",
    show: true,
    width: "200px",
    custom: true,
  },
  {
    id: "665487545",
    prop: "ApproveNodes",
    label: i18n.t("Generality.Ge_Auditor"),
    fixed: false,
    align: "center",
    filter: "default",
    custom: true,
  },
];
export const formSchema = [
  {
    prop: "departmentId",
    label: i18n.t("Generality.Ge_DepartmentSearch"),
    cpn: "FormInput",
    hidden: true,
  },
];
