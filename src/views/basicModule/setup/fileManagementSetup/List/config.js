/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-14 10:52:54
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { GetSy_DwgDefaultDirectory } from "@/api/basicApi/systemSettings/fileManagementSetup";

export class api extends TableAPI {
  getData = GetSy_DwgDefaultDirectory;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillKey",
      title: i18n.t("menu.Se_FileManagementSetup"),
      api,
      pagination: false,
    });
  }
}

export const tableConfig = [
  {
    id: "665487545",
    prop: "FolderName",
    label: i18n.t("setup.FolderName"),
    fixed: false,
    align: "center",
    filter: "default",
    show: true,
  },
  {
    id: "665487545",
    prop: "SubFolder",
    label: i18n.t("setup.SubFolderName"),
    fixed: false,
    align: "center",
    filter: "default",
  },
  {
    id: "665487545",
    prop: "PopedomReadName",
    label: i18n.t("setup.ReadOnlyRights"),
    fixed: false,
    align: "center",
    filter: "default",
  },
  {
    id: "665487545",
    prop: "PopedomWriteName",
    label: i18n.t("setup.EditPermissions"),
    fixed: false,
    align: "center",
    filter: "default",
  },
  {
    id: "6654875451",
    prop: "ApproveName",
    label: i18n.t("Generality.Ge_AuditAuthority"),
    fixed: false,
    align: "center",
    filter: "default",
  },
];
export const formSchema = [];
