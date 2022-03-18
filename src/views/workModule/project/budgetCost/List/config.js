/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-17 11:26:38
 * @Description: file content
 */
import { EditTable as BaseTable, Table as STable } from "@/jv_doc/class/table";
import { projectTypeEnum } from "@/enum/workModule";
// 报价单表格
import { tableProps } from "../../../sale/saleQuote/List/config";
import project from "@/router/workModule/project";
// map 转 list
function getProjectTypeList(map) {
  let typeArr = [];
  for (const key in map) {
    typeArr.push({
      label: map[key].name,
      value: map[key].value,
    });
  }
  return typeArr;
}

export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: i18n.t("menu.Pm_BudgetCost"),
      showSummary: true,
      chooseCol: false,
      operationWidth: 80,
      // sortCol:false
    });
  }
}

export const tableConfig = [
  {
    prop: "ItemName",
    label: i18n.t("menu.Pm_Project"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    type: "number",
    filter: "amount",
    align: "right",
    width: 120,
    editConfig: {
      colInit: true,
      rules: {
        required: true,
        message: i18n.t("project.Pro_QuantityShouldBeGreaterThan1"),
        // 自定义校验 返回bool值
        validate: (val) => {
          return val >= 1;
        },
      },
    },
  },
  {
    prop: "Price",
    label: i18n.t("Generality.Ge_Price"),
    type: "number",
    formCpn: "FormInput",
    filter: "amount",
    align: "right",
    width: 120,
    editConfig: {
      rules: {
        required: true,
      },
      colInit: true,
    },
  },
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    align: "right",
    width: 120,
    custom: true,
    editConfig: {
      disabled: true,
    },
    commonConfig: {
      summary: true,
    },
  },
  {
    prop: "UpdateDate",
    label: i18n.t("project.Pro_UpdateDate"),
    formCpn: "FormInput",
    filter: "time",
    width: 200,
    editConfig: {
      disabled: true,
    },
  },
  {
    prop: "ItemType",
    label: i18n.t("project.Pro_ItemType"),
    formCpn: "FormSelect",
    options: {
      list: getProjectTypeList(projectTypeEnum),
    },
    customFilter: (value) => {
      if (!value) return "";
      return projectTypeEnum[value].name;
    },
  },
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
];

function handleTableSchema(tableProps) {
  let tableschema = tableProps.tableSchema.filter((item) => {
    return ["BillId", "State", "CustomerName", "Project"].includes(item.prop);
  });
  return tableschema;
}

export class QuoteTable extends STable {
  constructor() {
    super(
      Object.assign({}, tableProps, {
        tableSchema: handleTableSchema(tableProps),
        // 操作列
        operationCol: false,
        // height:400
        // 表格头部展示
        tableHeaderShow: false,
        selectType: "radio",
      })
    );
  }
}
