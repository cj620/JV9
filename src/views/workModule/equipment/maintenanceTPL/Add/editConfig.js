/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-06-03 13:21:49
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
      // operationCol:false,
      selectType: "radio",
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
];
