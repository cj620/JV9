
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-08-16 18:25:18
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import {
  tableConfigWrapper
} from "@/jv_doc/utils/system/taxCount";

export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfigWrapper(tableConfig),
      data:[],
      title:'分配任务',
      tableHeaderShow:false,
      sortCol:false,
      chooseCol:false,
      height:350,
      operationWidth:80,
    });
  }
}

export const tableConfig = [
 /*负责人*/
 {
    prop: "Worker",
    formCpn: "SyncSelect",
    width: "120px",
    label: i18n.t("project.Pro_Worker"),
    custom: true,

  },
  /*计划工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    formCpn: "FormInput",
    type: "number",
    width: "120px",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    formCpn: "SingleTime",
    wdith: "120px",
    filter: "date",
    editConfig: {
      colInit: true,
      rules: {
        required: true,
      },
    },
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    formCpn: "SingleTime",
    filter: "date",
    wdith: "120px",
    editConfig: {
      colInit: true,
      rules: {
        required: true,
        message: i18n.t("Generality.Ge_DateComparison"),
        validate: (val, row) => {
          return (
             new Date(row.PlanStart.value).getTime()<=new Date(val).getTime()
          );
        },
      },
    },
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
]