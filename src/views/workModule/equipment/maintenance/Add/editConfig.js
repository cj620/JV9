/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-11-02 17:08:30
 * @Description: file content
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { getAllProjectProcess } from "@/api/workApi/project/baseData";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { Data } from "@/views/basicModule/demo/Detail/data";
// 材料费用表格
export class M_EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: m_tableConfig,
      data: [],
      title: "",
      tableHeaderShow: false,
      height: null,
      maxHeight: 2000,
      operationWidth: 80,
      operationCol: false,
      // showSummary:true,
      // 选择列
      // chooseCol:false,
    });
  }
}
export const m_tableConfig = [
  /*保养内容*/
  {
    prop: "MaintenanceContent",
    label: i18n.t("device.De_MaintenanceContent"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  /*保养结果*/
  {
    prop: "MaintenanceResults",
    width: "120px",
    label: i18n.t("device.De_MaintenanceResults"),
    formCpn: "FormSelect",
    default: "true",
    options: {
      list: [
        {
          label: "是",
          value: "true",
        },
        {
          label: "否",
          value: "false",
        },
      ],
    },
    customFilter: (value, row) => {
      if (!value) return "";
      if (value === "true") {
        return "是";
      } else if (value === "false") {
        return "否";
      }
    },
    editConfig: {
      rules: {
        required: true,
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
