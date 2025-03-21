import { TableAPI, Table as BaseTable } from "~/class/table";
import { production_programing_task_items } from "@/api/workApi/project/projectTask";
import { site_collection_production_task_record } from "@/api/workApi/quality/siteCollection"
import {ProjectTaskItemInspectionStateEnum, taskTypeEnum} from "@/enum/workModule/project/projectTask"
import { enumFilter } from "~/utils/system/enumsPlugin";
import i18n from "@/i18n/i18n";
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
      printBar: false,
      searchBar: false,
    })
  }}
export class RecordTable extends BaseTable {
  constructor() {
    super({
      tableSchema: recordSchema,
      formSchema: [],
      rowId: "Id",
      title: "",
      height: 400,
      printMod: "Pa_ProgramProducingTaskReportRecord1",
      printBar: false,
      searchBar: false,
      exportBar: false,
      pagination: false,
      colBar: false,
      densityBar: false,
      tableHeaderShow: false,
      chooseCol: false,
      operationCol: false,
    });
  }
}
const tableSchema = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: '140px',
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    width: '140px',
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
    width: '140px',
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
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    width: '200px',
  },
];
//  搜索表单配置
const formSchema = [];
// 报工表单
export const formSchema1 = [
  // {
  //   prop: "ProgramingTaskId",
  //   label: i18n.t("program.Pr_ProgramingTaskId"),
  //   cpn: "FormInput",
  //   cpnProps: {
  //     disabled: true,
  //   },
  // },
  {
    prop: "WorkHour",
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
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    cpn: "Slider",
    default: 0,
  },
  {
    prop: "StartDate",
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
    prop: "EndDate",
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
  {
    // 是否按计划完成
    prop: "IsItCompletedAsPlanned",
    label: i18n.t("Generality.Ge_IsItCompletedAsPlanned"),
    cpn: "FormRadio",
    type: "button",
    default: false,
    options: {
      list: [
        {
          value: false,
          label: i18n.t("Generality.Ge_Incomplete"),
        },
        {
          value: true,
          label: i18n.t("Generality.Ge_Completed"),
        },
      ],
    },
  },
  {
    prop: "ReasonForNotAchievingThePlan1",
    label: i18n.t("Generality.Ge_ReasonForNotAchievingThePlan"),
    cpn: "FormInput",
    custom: true,
  },
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    cpn: "FormInput",
  }
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
const recordSchema = [
  /*进度*/
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
    width: "200px",
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
  /*工时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_WorkHours"),
    width: "120px",
  },
  {
    // 是否按计划完成
    prop: "IsItCompletedAsPlanned",
    label: i18n.t("Generality.Ge_IsItCompletedAsPlanned"),
    custom: true,
    width: "80px"
  },
  {
    prop: "ReasonForNotAchievingThePlan1",
    label: i18n.t("Generality.Ge_ReasonForNotAchievingThePlan1"),
    width: '120px',
  },
  /*作业员*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
    width: "120px",
  },
  /*报工时间*/
  {
    prop: "CreationDate",
    label: i18n.t("setup.ReportedAt"),
    filter: "time",
    width: "150px",
  },
  {
    // 点检状态
    prop: "InspectionState",
    label: i18n.t("project.Pro_InspectionState"),
    customFilter: (value) => enumFilter(value, ProjectTaskItemInspectionStateEnum),
    width: '80px',
  },
  {
    // 点检时间
    prop: "InspectionTime",
    label: i18n.t("project.Pro_InspectionTime"),
    filter: "time",
    width: "140px",
  },
  {
    // 点检人
    prop: "InspectionPersonnel",
    label: i18n.t("project.Pro_InspectionPersonnel"),
    width: '95px',
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  }
]
