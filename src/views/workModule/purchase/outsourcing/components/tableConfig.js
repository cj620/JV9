/*
 * @Author: H.
 * @Date: 2021-12-16 08:39:58
 * @LastEditTime: 2022-01-14 11:17:18
 * @Description:
 */
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-09 09:28:46
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";
export class api extends TableAPI {
  getData = getOutsourcingrRequirement;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: "",
      api,
      operationWidth: 110,
      exportBar: false,
      searchBar: false,
      printBar: false,
      operationCol: false,
      settingBar: false,
      // freshBar: false,
      densityBar: false,
      colBar: false,
      height: "400px",
    });
  }
}

export const tableConfig = [
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
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
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*需要类别*/
  {
    prop: "Category",
    label: i18n.t("purchase.Pu_RequiredCategory"),
    custom: true,
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const formSchema = [];
