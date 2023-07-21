/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-05-30 18:08:07
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
      operationCol:false
      // showSummary:true,
      // 选择列
      // chooseCol:false,
    });
  }
}
export const m_tableConfig = [
  /*工序*/
  {
    prop: "MaintenanceContent",
    label: '保养项目',
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  /*负责人*/
  {
    prop: "MaintenanceResults",
    width: "120px",
    label: '保养结果',
    formCpn: "FormInput",
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
