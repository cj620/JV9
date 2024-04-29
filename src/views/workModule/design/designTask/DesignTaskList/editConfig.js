
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-08-16 18:25:18
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { project_process_get_by_type } from "@/api/workApi/project/baseData";
import { get_by_department } from "@/api/basicApi/systemSettings/user";
import {
  tableConfigWrapper
} from "@/jv_doc/utils/system/taxCount";

export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfigWrapper(tableConfig),
      data:[],
      title:i18n.t('project.Pro_DistributionTask'),
      tableHeaderShow:false,
      sortCol:false,
      chooseCol:false,
      height:350,
      operationWidth:80,
    });
  }
}

export const tableConfig = [
  {
    prop: "Process",
    formCpn: "SyncSelect",
    label: i18n.t("Generality.Ge_Process"),
    width: "150px",
    api: project_process_get_by_type,
    apiOptions: {
      keyName: "Process",
      valueName: "Process",
      params: {
        ProcessType: 0
      },
      propChange(val,item,res) {
        item.BelongingDepartment.value = res.BelongingDepartment;
      }
    },
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
 /*负责人*/
  {
    prop: "Worker",
    formCpn: "SyncSelect",
    width: "135px",
    label: i18n.t("project.Pro_Worker"),
    api: get_by_department,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
      moreDynamicParameters: [
        {
          keyName: "Department",
          valueName: "BelongingDepartment",
        },
      ],
    },
    editConfig: {
      rules: {
        required: true,
      },
    },
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
    width: "180px",
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
    width: "180px",
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
