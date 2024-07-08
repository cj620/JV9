/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-07 10:30:57
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { bomList } from "@/api/workApi/design/toolingBOM";

export class api extends TableAPI {
  getData = bomList;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "IdIndex",
      api,
      tableHeaderShow: false,
      height: "400",
      exportBar: false,
      searchBar: true,
      stripe: false,
      operationCol: false,
      sortCol: false,
    });
  }
}

export const tableConfig = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    align: "center",
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },

  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },

  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
  },

  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "90px",
    align: "right",
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const formSchema = [];
