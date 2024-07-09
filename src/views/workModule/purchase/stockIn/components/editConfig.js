/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-02-21 09:14:31
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
    width: "100px",
    filter: "amount",
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
  /*扣税金额*/
  {
    prop: "TDA",
    label: i18n.t("Generality.Ge_TDA"),
    align: "right",
    width: "120px",
    custom: true,
    editConfig: {
      disabled: true,
    },
  },
  /*辅助数量*/
  {
    prop: "AuxiliaryQty",
    label: i18n.t("Generality.Ge_AuxiliaryQty"),
    align: "right",
    width: "100px",
    formCpn: "FormInput",
  },
  /*辅助单价*/
  {
    prop: "AuxiliaryPrice",
    label: i18n.t("Generality.Ge_AuxiliaryPrice"),
    align: "right",
    width: "100px",
    formCpn: "FormInput",
  },
  /*其他费用*/
  {
    prop: "OtherExpenses",
    label: "其他费用",
    align: "right",
    width: "100px",
    formCpn: "FormInput",
    cpnProps: {
      type: 'number'
    }
  },
  /*批号*/
  {
    prop: "BatchNo",
    label: '批号',
    align: "right",
    width: "100px",
    formCpn: "FormInput",
  },
  /*生产日期*/
  {
    prop: "ProductionDate",
    label: '生产日期',
    align: "right",
    width: "100px",
    formCpn: "SingleTime",
  },
  /*有效期*/
  {
    prop: "Effective",
    label: '有效期',
    align: "right",
    width: "100px",
    formCpn: "FormInput",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
];
