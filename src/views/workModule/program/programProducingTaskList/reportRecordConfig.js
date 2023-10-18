import { TableAPI, Table as BaseTable } from "~/class/table";
import { site_collection_production_task_record } from "@/api/workApi/quality/siteCollection"
class api extends TableAPI{
  getData = site_collection_production_task_record
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableSchema,
      formSchema: formSchema,
      rowId: "Id",
      title: i18n.t('menu.Pa_ProgramProducingTaskReportRecord'),
      api,
      printMod: "Pa_ProgramProducingTaskReportRecord",
      operationCol: false,
      printBar: false,
      // searchBar: false,
    })
  }}
const tableSchema = [
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
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  /*工序名称*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  //   负责人
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
  },
  // 进度
  {
    prop: "Schedule",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
  },
  /*实际开始*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    filter: "time",
    width: "140px",
  },
  /*实际结束*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    filter: "time",
    width: "140px",
  },
  //   实际用时
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]
const formSchema = [
  // 模具编号
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
  },
  // 零件编号
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    cpn: "FormInput",
  },
  // 负责人
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    cpn: "FormInput"
  },

]
