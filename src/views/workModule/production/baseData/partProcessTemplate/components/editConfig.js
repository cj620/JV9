/*
 * @Author: H.
 * @Date: 2021-12-01 16:39:19
 * @LastEditTime: 2022-01-04 17:06:36
 * @Description:
 */

/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-02 15:50:53
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { getAllProcess } from "@/api/workApi/production/baseData";
import {getAllProjectProcess} from "@/api/workApi/project/baseData";

export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: true,
      height: 890,
      operationWidth: 80,
    });
  }
}

export const tableConfig = [
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: "150px",
    editConfig: {
      disabled: true,
    },
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    formCpn: "FormInput",
    type: "number",
    width: "140px",
  },
  /*加工内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
    custom: true,
    formCpn: "customFormSelect",
    options: {},
    editConfig: {
      disabled: true,
    },
  },
  /*计划资源*/
  {
    prop: "Resource",
    label: i18n.t("Generality.Ge_Resource"),
    width: "140px",
    editConfig: {
      disabled: true,
    },
  },
  /*是否外协*/
  {
    prop: "IsOutsourced",
    label: i18n.t("production.Pr_IsOutsourced"),
    custom: true,
    editConfig: {
      disabled: true,
    },
  },
  /*是否强制检验*/
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    custom: true,
    editConfig: {
      disabled: true,
    },
  },
  //   编程工艺
  {
    prop: "ProgramingProcess",
    label: i18n.t("production.Pr_ProgramingProcess"),
    formCpn: "SyncSelect",
    api: getAllProjectProcess,
    apiOptions: {
      immediate: true,
      keyName: "Process",
      valueName: "Process",
      fieldFilter: (val) => {
        return val.ProcessType === 'Program'
      }
    }
  },
  /*编程预计工时*/
  {
    prop: "ProgramingPlanTime",
    label: i18n.t("Generality.Ge_ProgramingPlanTime"),
    formCpn: "FormInput",
    type: "number",
    width: "140px",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
];
