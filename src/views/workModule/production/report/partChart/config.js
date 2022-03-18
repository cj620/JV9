import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getPartWork } from "@/api/workApi/production/dataReport";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
export class api extends TableAPI {
  getData = getPartWork;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Pr_PartChart"),
      api,
      // searchBar: true,
      operationCol: false,
    });
  }
}

export const tableConfig = [

  /*作业员*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),

  },
  /*部门*/
  {
    prop: "Department",
    label: i18n.t("menu.Se_Department"),
    width: 100,
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  // 任务工序
  {
    prop: "TaskProcess",
    label: i18n.t("production.Pr_TaskProcess"),
    width: 100,
  },

  /*实际用时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
    align: "right",
    custom: true,

  },
  /*预计用时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    align: "right",

  },
  /*超时*/
  {
    prop: "Overtime",
    label: i18n.t("Generality.Ge_OverTime"),
    align: "right",
    custom: true,

  },

];

export const formSchema = [
  //作业员搜索
  {
    prop: "UserName",
    label: i18n.t("Generality.Ge_Worker"),
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  //部门搜索
  {
    prop: "Department",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
  {
    prop: "StartTime",
    label: i18n.t("Generality.Ge_StartDate"),
    cpn: "SingleTime",
  },
  {
    prop: "EndTime",
    label: i18n.t("Generality.Ge_EndDate"),
    cpn: "SingleTime",
  },
];
