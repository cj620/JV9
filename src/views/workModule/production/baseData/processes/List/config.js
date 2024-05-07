/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2022-01-12 14:33:44
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllResource, productionProcessList } from "@/api/workApi/production/baseData";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";

export class api extends TableAPI {
  getData = productionProcessList;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Pr_Process"),
      api,
      operationWidth: 110,
    });
  }
}

export const tableConfig = [
  /*任务工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*工序代号*/
  {
    prop: "ProcessCode",
    label: i18n.t("production.Pr_ProcessCode"),
  },
  /*部门*/
  {
    prop: "Department",
    label: i18n.t("Generality.Ge_Department")
  },
  /*资源组*/
  {
    prop: "Resource",
    label: i18n.t("menu.Pr_Resources"),
  },
  /*加工内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
  },
  // 前置时间
  {
    prop: "LeadTimeOfProcess",
    label: i18n.t("Generality.Ge_LeadTimeOfProcess"),
  },
  // 后置时间
  {
    prop: "PostTimeOfProcess",
    label: i18n.t("Generality.Ge_PostTimeOfProcess"),
  },
  // 是否强制检验
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    customFilter(item) {
      return item ? i18n.t("Generality.Ge_Yes") : i18n.t("Generality.Ge_No")
    }
  },
  // 编程工艺
  {
    prop: "ProgramingProcess",
    label: i18n.t("production.Pr_ProgramingProcess"),
  }
];

export const formSchema = [
  {
    prop: "Keyword",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_KeyWords"),
  },
  {
    prop: "ResourceId",
    label: i18n.t("menu.Pr_Resources"),
    cpn: "SyncSelect",
    api: getAllResource,
    apiOptions: {
      keyName: "ResourceGroup",
      valueName: "ResourceId",
    },
  },
  //部门搜索
  {
    prop: "Department",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
];
