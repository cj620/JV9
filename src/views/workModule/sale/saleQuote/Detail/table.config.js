/*
 * @Author: your name
 * @Date: 2021-11-25 17:20:07
 * @LastEditTime: 2021-12-28 13:53:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\Detail\table.config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { single2Double } from "../utils";
import { deepClone } from '@/jv_doc/utils/object';
let m_tableConfig = [
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("sale.Sa_QuotationItems"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("sale.Sa_Specifications"),
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "100px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
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
    filter: "amount",
  },
  /*金额*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    align: "right",
    custom: true,
    width: "120px",
    commonConfig: {
      summary: true,
    },
    filter: "amount",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    
  },
];
let c_tableConfig = [
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("menu.Pm_Project"),
  },
  /*比例*/
  {
    prop: "Rate",
    label: i18n.t("sale.Sa_Scale"),
    type: "number",
    align: "right",
    width: "120px",
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
let project_tableConfig=[
  /*序号*/
  {
    prop: "sort",
    label: "",
    width: 50,
    align: "center",
  },
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("menu.Pm_Project"),
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
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
    filter: "amount",
  },
  /*金额*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    align: "right",
    custom: true,
    width: "120px",
    commonConfig: {
      summary: true,
    },
  },
]
export class M_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: changeAmountShow(m_tableConfig),
      pagination: false,
      // sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      height: null,
      tableHeaderShow: false,
      operationCol: false,
      showSummary:true,
    });
  }
}

export class P_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: single2Double(changeAmountShow(project_tableConfig)),
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      height: null,
      tableHeaderShow: false,
      operationCol: false,
      showSummary:true,
    });
  }
}
export class C_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: changeAmountShow(c_tableConfig),
      pagination: false,
      // sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      height: null,
      tableHeaderShow: false,
      operationCol: false,
      showSummary:true,
    });
  }
}
function changeAmountShow(config){
  let configCopy=deepClone(config)
  configCopy.forEach((item,index) => {
      if(item.prop=='Amount'){
        configCopy[index].custom=false
      }
  });
  return configCopy
}

