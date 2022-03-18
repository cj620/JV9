/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-07 10:35:04
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { designMaterialRequirementItemList } from "@/api/workApi/design/materialRequirement";

export class api extends TableAPI {
  getData = designMaterialRequirementItemList;
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
  /*单据编号*/
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_ID"),
    align: "center",
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },
  /*物料名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "70px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "90px",
    align: "right",
  },

  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
  /*状态*/
  {
    prop: "ItemState",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
  },
  /*单据类型*/
  {
    prop: "Category",
    label: i18n.t("Generality.Ge_DocumentType"),
    custom: true,
  },
];
export const formSchema = [

];
