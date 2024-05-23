// 引入表格表格类和表格API类
import { Table as BaseTable } from "@/jv_doc/class/table";
import { processTypeEnum } from "@/enum/workModule/project/projectTask";

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      data: [],
      searchBar: false,
      chooseCol: false,
      operationCol: false,
      tableHeaderShow: false,
      pagination: false,
    });
  }
}

export const tableConfig = [
  /*任务工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: 100,
  },
  /*工作内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
  },
  /*标准费率*/
  {
    prop: "CostRate",
    label: i18n.t("production.Pr_CostRate"),
    width: 100,
  },
  /*部门*/
  {
    prop: "BelongingDepartment",
    label: i18n.t("menu.Se_Department"),
    width: 100,
  },
  /*工序类别*/
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    customFilter: (value) => processTypeEnum[value].name,
    width: 100,
  },
  /*开始比例*/
  {
    prop: 'StartScale',
    label: i18n.t("production.Pr_StartScale"),
    width: 100,
  },
  /*结束比例*/
  {
    prop: "EndScale",
    label: i18n.t("production.Pr_EndScale"),
    width: 100,
  },
];

export const formSchema = [];
