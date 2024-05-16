import i18n from "@/i18n/i18n";
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { data_report_tooling_summary } from "@/api/workApi/production/dataReport";
import { itemList } from "@/api/basicApi/systemSettings/Item";

export class api extends TableAPI {
  getData = data_report_tooling_summary;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Pr_ToolingHoursSummary"),
      api,
      printBar: false,
      printMod: "Pr_ToolingHoursSummary",
    });
  }
}

export const tableConfig = [
  {
    //编号
    prop: "Id",
    label: i18n.t("Generality.Ge_ID"),
  },
  {
    //名称
    prop: "Name",
    label: i18n.t("Generality.Ge_ItemName"),
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
  }
]
export const formSchema = [
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      showValue: true,
      valueName: "ItemId",
      params: {
        ItemCategory: "Tooling",
      },
    },
  },
]
