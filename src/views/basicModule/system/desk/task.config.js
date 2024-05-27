/*
 * @Author: C.
 * @Date: 2021-12-16 11:05:57
 * @LastEditTime: 2022-08-22 11:19:15
 * @Description: file content
 */
// 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {
  my_todo_task,
  report_work,
} from "@/api/basicApi/systemSettings/user";
import { taskStateEnum, enumToList } from "@/enum/workModule";
import { Form } from "@/jv_doc/class/form";
class api extends TableAPI {
  // 获取列表
  getData = my_todo_task;
  report_work = report_work;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableSchema,
      formSchema: formSchema,
      rowId: "Id",
      printBar: false,
      title: i18n.t("Generality.Ge_MyTask"),
      api,
      printMod: "",
    });
  }
}
//  表格配置
const tableSchema = [
  /*产品编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "120px"
  },
  /*产品名称*/
  {
    prop: "ToolingName",
    label: i18n.t("Generality.Ge_ToolingName"),
    width: "120px"
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: "80px",
  },
  /*工序内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
    width: '200px'
  },
  /*负责人*/
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    width: "70px",
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "80px",
  },
  {
    // 计划开始
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "date",
    width: "95px"
  },
  {
    // 计划结束
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "date",
    width: "95px"
  },
  /*实际开始*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    filter: "date",
  },
  /*实际结束*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    filter: "date",
  },
  /*实际用时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
  },
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
  },
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
//  搜索表单配置
const formSchema = [
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_MoldId"),
    cpn: "FormInput",
  },
  {
    prop: "TaskState",
    label: i18n.t("Generality.Ge_TaskStatus"),
    cpn: "FormSelect",
    options: {
      list: enumToList(taskStateEnum),
    },
    type: "multiple",
  },
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    cpn: "SingleTime",
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
    cpn: "SingleTime",
  },
];

// 报工表单
const taskFormSchema = [
  {
    prop: "WorkHour",
    label: i18n.t("Generality.Ge_WorkHours"),
    cpn: "FormInput",
    cpnProps: {
      type: "number",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    cpn: "Slider",
    default: 0,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartTime"),
    cpn: "SingleDateTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndTime"),
    cpn: "SingleDateTime",
    default:new Date(),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
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
    default: true,
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
    cpnProps: {
      type: "textarea",
    },
  },
  {
    prop: "ProjectTaskItemId",
    label: "",
    cpn: "FormInput",
    hidden: true,
  },
];
// 报工表单
export class TaskForm extends Form {
  constructor() {
    super({
      formSchema: taskFormSchema,
      baseColProps: {
        span: 24,
      },
    });
  }
}

export const detailConfig=tableSchema.filter(item=>{
  return ['ToolingNo','Process','PlanTime','ProcessContent'].includes(item.prop)
})
