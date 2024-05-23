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
  my_project_task_record,
  report_work,
} from "@/api/basicApi/systemSettings/user";
import { taskStateEnum, enumToList,taskTypeEnum,enumFilter } from "@/enum/workModule";
import { Form } from "@/jv_doc/class/form";
class api extends TableAPI {
  // 获取列表
  getData = my_todo_task;
  report_work = report_work;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 表单配置
      formSchema: formSchema,
      // 行标识
      rowId: "Id",
      // 打印按钮
      printBar: false,
      // 表格标题
      title: i18n.t("Generality.Ge_MyTask"),
      // 接口类
      api,
      // 打印模块标识
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
  },
  /*产品名称*/
  {
    prop: "ToolingName",
    label: i18n.t("Generality.Ge_ToolingName"),
  },
  /*工序*/
  /*任务类型*/
  // {
  //   prop: "TaskType",
  //   label: '任务类型',
  //   // taskTypeEnum,enumFilter
  //   customFilter:(value)=>enumFilter(value,taskTypeEnum)
  //   // enumFilter(taskTypeEnum)
  // },
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
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
    width: "120px",
    label: i18n.t("project.Pro_Worker"),
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: 100,
  },
  {
    // 计划开始
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: 140
  },
  {
    // 计划结束
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: 140
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
