/*
 * @Author: H.
 * @Date: 2021-12-01 14:53:05
 * @LastEditTime: 2022-01-14 10:32:50
 * @Description:
 */

// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllProcessTemplate } from "@/api/workApi/production/baseData";

export class api extends TableAPI {
  getData = getAllProcessTemplate;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("production.Pr_ProcessTemplate"),
      api,
      operationWidth: 110,
    });
  }
}

export const tableConfig = [
  /*模板名称*/
  {
    prop: "Template",
    label: i18n.t("Generality.Ge_TemplateName"),
    custom: true,
  },

  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];

export const formSchema = [
  {
    prop: "BillId",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_BillId"),
  },
];
