import i18n from "@/i18n/i18n";
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { data_report_part_summary } from "@/api/workApi/production/dataReport";
import { taskTypeEnum, ProcessState } from "@/enum/workModule";

export class api extends TableAPI {
  getData = data_report_part_summary;
}
export class partTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      api,
      height: '500',
      printBar: false,
      searchBar: false,
      operationCol: false,
      printMod: "Pr_PartHoursDetail",
    });
  }
}
export const tableConfig = [
  {
    //编号
    prop: "Id",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    //预计总加工时间
    prop: "PlanTotalTime",
    label: i18n.t("production.Pr_PlanTotalTime"),
  },
  {
    //预计未完工时间
    prop: "PlanIncompleteTime",
    label: i18n.t("production.Pr_PlanIncompleteTime"),
  },
  {
    //预计已完工时间
    prop: "PlanCompletedTime",
    label: i18n.t("production.Pr_PlanCompletedTime"),
  },
  {
    //实际加工时间
    prop: "ActualTime",
    label: i18n.t("production.Pr_ActualTime"),
    customFilter: (value) => {
      return value.toFixed(2);
    },
  },
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "Link",
    width: "130px",
    cpnProps: {
      routeName: "ProductionTaskDetails",
      methods: "query",
      parameterKey: "BillId",
    },
  },
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    customFilter: (value) => {
      if (!value) return "";
      return ProcessState[value].name;
    },
  },
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    customFilter: (value) => {
      if (!value) return "";
      return taskTypeEnum[value].name;
    },
  }
]
export const formSchema = []
