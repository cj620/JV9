import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
export class api extends TableAPI {
  getData = getOutsourcingrRequirement;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Pu_OutsourcingRequirement"),
      api,
      // searchBar: true,
      // printMod: "Pu_OutsourcingRequirement",
      printBar: false,
    });
  }
}

export const tableConfig = [
  // 模具编号
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
    align: "right",
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
  /*加工单号*/
  {
    prop: "PrTaskBillId",
    label: '加工单号',
    align: "center",
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "ProductionTaskDetails",
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    },
  },
];

export const formSchema = [
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
  },
  //需求类别搜索
  {
    prop: "purchase",
    label: i18n.t("purchase.Pu_RequirementType"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "Part",
          label: i18n.t("production.Pr_PartOutsourcing"),
        },
        {
          value: "Process",
          label: i18n.t("production.Pr_ProcessOutsourcing"),
        },
      ],
    },
  },
  //状态搜索
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "ToBeProcessed",
          label: i18n.t("Generality.Ge_Pending"),
        },
        {
          value: "Processed",
          label: i18n.t("purchase.Pu_Outsourced"),
        },
      ],
    },
  },
];
