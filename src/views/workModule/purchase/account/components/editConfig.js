/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-02-21 10:29:09
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import {
  tableConfigWrapper
} from "@/jv_doc/utils/system/taxCount";
export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfigWrapper(tableConfig),
      data: [],
      title: "",
      tableHeaderShow: false,
      height: 350,
      operationWidth: 80,
    });
  }
}

export const tableConfig = [
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
    editConfig: {
      disabled: true,
    },
  },
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
    editConfig: {
      disabled: true,
    },
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
    editConfig: {
      disabled: true,
    },
  },
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
    editConfig: {
      disabled: true,
    },
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    editConfig: {
      disabled: true,
    },
    width: "70px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    type: "number",
    filter: "amount",
    width: "100px",
  },
  /*未税单价*/
  {
    prop: "NoTaxPrice",
    label: i18n.t("Generality.Ge_NoTaxPrice"),
    type: "number",
    align: "right",
    width: "120px",
    formCpn: "FormInput",
    filter: "amount",
  },
  /*单价*/
  {
    prop: "Price",
    label: i18n.t("Generality.Ge_Price"),
    type: "number",
    align: "right",
    width: "120px",
    formCpn: "FormInput",
    filter: "amount",
  },
  /*金额*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    align: "right",
    custom: true,
    width: "120px",
    editConfig: {
      disabled: true,
    },
  },
  /*未税金额*/
  {
    prop: "TDA",
    label: i18n.t("Generality.Ge_TDA"),
    align: "right",
    width: "70px",
    custom: true,
    editConfig: {
      disabled: true,
    },
  },
  /*税率*/
  {
    prop: "Tax",
    label: i18n.t("Generality.Ge_Tax"),
    align: "right",
    width: "70px",
    editConfig: {
      disabled: true,
    },
  },

  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
];
