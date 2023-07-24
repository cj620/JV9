/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-14 09:46:50
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { single2Double } from "../utils";

// 材料费用表格
export class M_EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: m_tableConfig,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationWidth: 80,
      showSummary: true,
      height: null,
      // 选择列
      chooseCol: false,
    });
  }
}
export const m_tableConfig = [
  /*名称*/
  {
    prop: "ItemName",
    formCpn: "FormInput",
    label: i18n.t("sale.Sa_QuotationItems"),
  },
  /*描述*/
  {
    prop: "Description",
    formCpn: "FormInput",
    label: i18n.t("sale.Sa_Specifications"),
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    formCpn: "FormInput",
    width: "70px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    width: "100px",
    type: "number",
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
    commonConfig: {
      summary: true,
    },
    filter: "amount",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
];
// 加工费用及项目费用
export class P_EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: single2Double(p_tableConfig),
      data: [],
      title: "",
      tableHeaderShow: false,
      operationWidth: 80,
      showSummary: true,
      height: null,
      // 序号列
      sortCol: false,
      // 选择列
      chooseCol: false,
    });
  }
}

export const p_tableConfig = [
  /*序号*/
  {
    prop: "sort",
    label: "",
    width: 50,
    align: "center",
    editConfig: {
      disabled: true,
    },
  },
  /*名称*/
  {
    prop: "ItemName",
    formCpn: "FormInput",
    label: i18n.t("menu.Pm_Project"),
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    width: "100px",
    type: "number",
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
    commonConfig: {
      summary: true,
    },
  },
];
// 成本合计表格
export class C_EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: c_tableConfig,
      data: [],
      title: "",
      height: null,
      tableHeaderShow: false,
      operationWidth: 80,
      showSummary: true,
      // 选择列
      chooseCol: false,
    });
  }
}
export const c_tableConfig = [
  /*名称*/
  {
    prop: "ItemName",
    formCpn: "FormInput",
    label: i18n.t("menu.Pm_Project"),
  },
  /*比例*/
  {
    prop: "Rate",
    label: i18n.t("sale.Sa_Scale"),
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
    commonConfig: {
      summary: true,
    },
  },
];
