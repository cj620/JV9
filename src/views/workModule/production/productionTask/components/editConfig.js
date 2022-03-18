/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-12 17:06:56
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { ProcessState } from "@/enum/workModule";

export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: "",
      tableHeaderShow: false,
      height: 890,
      operationWidth: 80,
    });
  }
}
// map 转 list
function getProjectTypeList(map) {
  let typeArr = [];
  for (const key in map) {
    typeArr.push({
      label: map[key].name,
      value: map[key].value,
    });
  }
  return typeArr;
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
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    formCpn: "FormSelect",
    width: "140px",
    options: {
      list: getProjectTypeList(ProcessState),
    },
    customFilter: (value) => {
      if (!value) return "";
      return ProcessState[value].name;
    },
  },
  /*加工内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
    custom: true,
    formCpn: "customFormSelect",
    options: {},
  },
  /*资源组*/
  {
    prop: "Resource",
    label: i18n.t("Generality.Ge_Resource"),
    width: "140px",
    editConfig: {
      disabled: true,
    },
  },
  /*工序图片*/
  {
    prop: "ProcessPicture",
    label: i18n.t("Generality.Ge_ProcessPicture"),
    custom: true,
    width: "150px",
    editConfig: {
      disabled: true,
    },
  },
];
