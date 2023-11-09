// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 获取列表接口
import { query_aps_version } from "@/api/workApi/production/aps";

export class api extends TableAPI {
  // 获取列表
  getData = query_aps_version;
}

export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema,
      // 表头显示
      tableHeaderShow:false,
      chooseCol: false,

      // 行标识
      rowId: "Id",
      // 表格标题
      title: i18n.t("production.Pr_APSLog"),
      // 接口类
      api,
      // 操作列宽度
      operationCol: false,
      // 打印模块标识
      printMod: "apsLog",
      height:400,
    });
  }
}
//  表格配置
export const tableConfig = [
  /*排程版本号*/
  {
    prop: "VersionNo",
    // label: i18n.t("production.Pr_WorkSheetNo"),
    label: i18n.t("production.Pr_VersionNo"),
  },
  /*计算时间*/
  {
    prop: "CreationDate",
    label: i18n.t("production.Pr_CalculateTime"),
    filter: "time",
  },
  /*计算人员*/
  {
    prop: "Creator",
    label: i18n.t("production.Pr_Calculator"),
  },
  /*发布时间*/
  {
    prop: "ReleasedDate",
    label: i18n.t("production.Pr_ReleaseTime"),
    filter: "time",
    width: '140px'
  },

  /*发布人员*/
  {
    prop: "ReleasedBy",
    label: i18n.t("production.Pr_ReleaseBy"),
  },
];
// 表单配置
export const formSchema = [
  //单号搜索
  {
    prop: "VersionNo",
    label: i18n.t("production.Pr_VersionNo"),
    cpn: "FormInput",
  },
];
