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
import { enumFilter } from '~/utils/system/enumsPlugin'
import { processTypeEnum } from "@/enum/workModule/project/projectTask"
import { EditTable as BaseTable } from "@/jv_doc/class/table";

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
  /*标准费率*/
  {
    prop: "CostRate",
    label: i18n.t("production.Pr_CostRate"),
    formCpn: "FormInput",
    type: "number",
    width: "140px",
  },
  /*开始比例*/
  {
    prop: "StartScale",
    label: i18n.t("production.Pr_StartScale"),
    formCpn: "FormInput",
    type: "number",
  },
  /*结束比例*/
  {
    prop: "EndScale",
    label: i18n.t("production.Pr_EndScale"),
    formCpn: "FormInput",
    type: "number",
  },
  /*部门*/
  {
    prop: "BelongingDepartment",
    label: i18n.t("menu.Se_Department"),
    editConfig: {
      disabled: true,
    },
  },
  /*工序类别*/
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    editConfig: {
      disabled: true,
    },
    customFilter: (value) => enumFilter(value, processTypeEnum),
  },
];
