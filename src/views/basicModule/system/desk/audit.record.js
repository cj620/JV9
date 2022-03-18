/*
 * @Author: C.
 * @Date: 2021-12-16 15:47:59
 * @LastEditTime: 2022-01-17 10:07:51
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { my_audit_record } from "@/api/basicApi/systemSettings/user";
import { taskStateEnum, enumToList } from "@/enum/workModule";
import { auditEnum } from "@/enum/baseModule/auditEnum";
class api extends TableAPI {
  // 获取列表
  getData = my_audit_record;
}
//  表格配置
const tableSchema = [
  /*工序*/
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    custom: true,
  },
  /*负责人*/
  {
    prop: "BillKey",
    label: i18n.t("Generality.Ge_DocumentType"),
    custom: true,
  },
  /*负责人*/
  {
    prop: "AuditState",
    width: "120px",
    label: i18n.t("setup.ResultOfAuditing"),
    custom: true,
  },
  /*负责人*/
  {
    prop: "AuditedAt",
    width: "150px",
    label: i18n.t("setup.AuditTime"),
    filter: "time",
  },
];
export class AuditRecordTable extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      formSchema,
      // 行标识
      rowId: "BillId",
      // 表格标题
      title: "",
      height: 300,
      // 接口类
      api,
      // 打印模块标识
      printMod: "",
      tableHeaderShow: false,
      // 序号列
      sortCol: false,
      // 选择列
      chooseCol: false,
      // 操作列
      operationCol: false,
    });
  }
}

//  搜索表单配置
const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
];
