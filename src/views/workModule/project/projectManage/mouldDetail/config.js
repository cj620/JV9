/*
 * @Author: your name
 * @Date: 2021-11-23 14:02:56
 * @LastEditTime: 2022-04-04 11:42:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\mouldDetail\config.js
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { taskTypeEnum, enumToList } from "@/enum/workModule";
import { single2Double } from "@/views/workModule/sale/saleQuote/utils";
export const detailConfig = [
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  {
    // 模具名称
    prop: "ToolingName",
    label: i18n.t("Generality.Ge_ToolingName"),
  },
  {
    // 描述
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  {
    // 交货日期
    prop: "DeliveryDate",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: "date",
  },
  {
    // 首样日期
    prop: "SampleDate",
    label: i18n.t("Generality.Ge_SampleDate"),
    filter: "date",
  },
  {
    // 客户
    prop: "CustomerName",
    label: i18n.t("menu.Sa_Customer"),
  },
];
// 项目任务
const P_tableSchema = [
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "Pm_ProjectTask_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    },
  },
  /*任务类别*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    custom: true,
  },

  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
    width: "115px",
  },

  /*计划交期*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: "date",
    width: "120px",
  },

  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
    width: "95px",
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "150px",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];

const R_tableSchema = [
  {
    prop: "sort",
    label: "",
    width: 50,
    align: "center",
  },
  /*任务类别*/
  {
    prop: "Process",
    label: "",
  },

  /*状态*/
  {
    prop: "Worker",
    label: "",
  },
];
const T_tableSchema = [
  {
    prop: "sort",
    label: "",
    width: 50,
    align: "center",
  },
  /*任务类别*/
  {
    prop: "SpecName",
    label: "",
  },

  /*状态*/
  {
    prop: "Spec",
    label: "",
  },
];

// 项目任务
export class P_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: P_tableSchema,
      pagination: false,
      height: null,
      data: [],
      tableHeaderShow: false,
      operationCol: false,
      chooseCol: false,
    });
  }
}

export class T_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: single2Double(T_tableSchema),
      pagination: false,
      height: null,
      data: [],
      tableHeaderShow: false,
      operationCol: false,
      chooseCol: false,
      sortCol: false,
      showHeader: false,
      stripe: true,
    });
  }
}
export class R_Table extends BaseTable {
  constructor() {
    super({
      tableSchema: single2Double(R_tableSchema),
      pagination: false,
      height: null,
      data: [],
      tableHeaderShow: false,
      operationCol: false,
      chooseCol: false,
      sortCol: false,
      showHeader: false,
      stripe: true,
    });
  }
}
