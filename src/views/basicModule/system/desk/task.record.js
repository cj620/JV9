/*
 * @Author: C.
 * @Date: 2021-12-16 15:42:49
 * @LastEditTime: 2022-01-17 10:22:39
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {
  my_project_task_record,
} from "@/api/basicApi/systemSettings/user";
import i18n from "@/i18n/i18n";
class api extends TableAPI {
  // 获取列表
  getData = my_project_task_record;
}
//  表格配置
const tableSchema = [
  /*进度*/
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
    width: "250px",
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
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  }
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
      tableHeaderShow: false,
      pagination: false,
    });
  }
}
//  搜索表单配置
const formSchema = [
  {
    prop: "PageSize",
    default: 999,
  },
  {
    prop: "CurrentPage",
    default: 1,
  }
];
