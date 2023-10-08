import { TableAPI, Table as BaseTable } from "~/class/table";
import { production_programing_task_items } from "@/api/workApi/project/projectTask";
import { taskTypeEnum } from "@/enum/workModule/project/projectTask"
import { enumFilter } from "~/utils/system/enumsPlugin";
class api extends TableAPI {
  // 获取列表
  getData = production_programing_task_items;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableSchema,
      formSchema: formSchema,
      rowId: "Id",
      title: i18n.t('menu.Pa_ProgramProducingTaskReport'),
      api,
      printMod: "Pa_ProgramProducingTaskReport",
      operationWidth: 280,
      printBar: false,
      searchBar: false,
    })
  }}
const tableSchema = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
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
  //   预计工时
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: "140px",
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: "140px",
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
  // 进度
  {
    prop: "Schedule",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
//  搜索表单配置
const formSchema = [];
export const formSchema1 = [
  {
    prop: "ProgramingTaskId",
    label: i18n.t("program.Pr_ProgramingTaskId"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Schedule",
    label: i18n.t("Generality.Ge_Schedule"),
    cpn: "Slider",
    default: 0,
  },
  {
    prop: "ActualStart",
    label: i18n.t("program.Pr_ActualStart"),
    cpn: "SingleDateTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "ActualEnd",
    label: i18n.t("program.Pr_ActualEnd"),
    cpn: "SingleDateTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
export const detailConfig = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  //   预计工时
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
  },
  //   任务类型
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    customFilter: (value) => enumFilter(value, taskTypeEnum),
  }
]
