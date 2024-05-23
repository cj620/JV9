/*
 * @Author: C.
 * @Date: 2021-12-16 15:42:49
 * @LastEditTime: 2022-01-17 10:22:39
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {
  my_todo_task,
  my_project_task_record,
} from "@/api/basicApi/systemSettings/user";
import { taskStateEnum, taskTypeEnum, enumToList } from "@/enum/workModule";
class api extends TableAPI {
  // 获取列表
  getData = my_project_task_record;
}
//  表格配置
const tableSchema = [
  /*工序*/
  // {
  //   prop: "BillId",
  //   label: '单号',
  //   // pm_ProjectTask_Detail
  // },
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    innerSearch: {
      prop: "BillId",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_BillId"),
    },
    cpnProps: {
      // 路由名称
      routeName: "Pm_ProjectTask_Detail",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    },
  },
  /*负责人*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_DocumentType"),
    customFilter: (val) => {
      return taskTypeEnum[val]&&taskTypeEnum[val].name;
    },
  },
  /*负责人*/
  {
    prop: "ActualTime",
    width: "120px",
    label: i18n.t("Generality.Ge_WorkHours"),
  },
  /*负责人*/
  {
    prop: "CreationDate",
    width: "150px",
    label: i18n.t("setup.ReportedAt"),
    filter: "time",
  },
];
export class ReportWorkTable extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 行标识
      rowId: "Id",
      // 表格标题
      title: "",
      // 接口类
      api,
      // 打印模块标识
      printMod: "",
      // tableHeaderShow:false,
      // 序号列
      sortCol: false,
      // 选择列
      chooseCol: false,
      // 打印按钮
      printBar: false,
      // 表单配置
      formSchema: formSchema,
      height: 300,
      // 操作列
      operationCol: false,
    });
  }
}
//  搜索表单配置
const formSchema = [
  {
    prop: "TaskItemId",
    label: "",
    cpn: "FormInput",
    hidden: true,
  },
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_MoldId"),
    cpn: "FormInput",
  },
];
