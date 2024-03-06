/*
 * @Author: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Date: 2022-06-20 12:56:50
 * @LastEditors: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @LastEditTime: 2022-08-22 14:50:00
 * @FilePath: \jvmmsv9-1front\src\views\workModule\quality\machiningCheckList\components\editConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { tableConfigWrapper } from "@/jv_doc/utils/system/taxCount";
export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfigWrapper(tableConfig),
      data: [],
      title: "",
      tableHeaderShow: false,
      height: null,
      chooseCol: false,
      // 操作列
      operationWidth: 80,
    });
  }
}

export const tableConfig = [
  // // 序号
  // {
  //   prop: "SortOrder",
  //   label: i18n.t("production.Pr_SortOrder"),
  //   formCpn: "FormInput",
  // },
  /*理论值*/
  {
    prop: "TheoreticalValue",
    label: i18n.t("quality.Qc_TheoreticalValue"),
    formCpn: "FormInput",
    type: "number",
  },
  /*上公差*/
  {
    prop: "UpperTolerance",
    label: i18n.t("quality.Qc_UpperTolerance"),
    formCpn: "FormInput",
    type: "number",
  },
  /*下公差*/
  {
    prop: "LowerTolerance",
    label: i18n.t("quality.Qc_LowerTolerance"),
    formCpn: "FormInput",
    type: "number",
  },
  /*实测值*/
  {
    prop: "MeasuredValue",
    label: i18n.t("quality.Qc_MeasuredValue"),
    formCpn: "FormInput",
    type: "number",
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
    editConfig: {
      disabled: true,
    },
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
    // editConfig:{
    //   disabled:true,
    // }
  },
];
