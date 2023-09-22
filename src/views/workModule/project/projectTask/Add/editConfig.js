/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-03-22 15:14:49
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { getAllProjectProcess } from "@/api/workApi/project/baseData";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { Data } from "@/views/basicModule/demo/Detail/data";
import countEndDate from '@/jv_doc/utils/time/countEndDate';
let index = 0;
function getRowChange(value, form){
  form.PlanEnd.value = countEndDate(form.PlanStart.value, Number(form.PlanTime.value))
  index = form.row_index;
  let timer = setTimeout(() => {
    index = null;
    clearTimeout(timer)
  }, 10)
}
export function getRowIndex() {
  return index
}
// 材料费用表格
export class M_EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: m_tableConfig,
      data: [],
      title: "",
      tableHeaderShow: false,
      height: "",
      maxHeight: 2000,
      operationWidth: 80,
      // showSummary:true,
      // 选择列
      // chooseCol:false,
    });
  }
}
export const m_tableConfig = [
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    formCpn: "SyncSelect",
    api: getAllProjectProcess,
    apiOptions: {
      keyName: "Process",
      valueName: "Process",
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
    width: "120px",
    label: i18n.t("project.Pro_Worker"),
    custom: true,
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
    rowChange:(value, form)=>{
      getRowChange(value, form)
    }
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
    rowChange:(value, form)=>{
      getRowChange(value, form)
    }
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
          console.log(new Date(val).getTime() , new Date(row.PlanStart.value).getTime())
          return (
            new Date(val).getTime() >= new Date(row.PlanStart.value).getTime()
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
];
