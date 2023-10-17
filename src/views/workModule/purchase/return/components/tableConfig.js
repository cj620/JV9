/*
 * @Author: H.
 * @Date: 2021-12-16 08:39:58
 * @LastEditTime: 2022-01-14 15:13:30
 * @Description:
 */
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-09 09:28:46
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getPurchaseReturnDetails } from "@/api/workApi/purchase/return";
export class api extends TableAPI {
  getData = getPurchaseReturnDetails;
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
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
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
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
  },
  /*销售员*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
  /*关联编号*/
  {
    prop: "AssociatedNo",
    label: i18n.t("Generality.Ge_RelatedDocumentNo"),
  },
];
export const formSchema = [];
