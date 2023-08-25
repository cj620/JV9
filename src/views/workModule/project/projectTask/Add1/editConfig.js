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
// 材料费用表格
export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema,
      data: [],
      title: "",
      tableHeaderShow: false,
      height: null,
      maxHeight: 2000,
      operationWidth: 80,
      chooseCol:false,
    });
  }
}
export const tableSchema = [
  /*编号*/
  // {
  //   prop: "Id",
  //   formCpn: "FormInput",
  //   label: i18n.t("Generality.Ge_ID"),
  //   width: "200px"
  // },
  /*问题点*/
  {
    prop: "ProblemPoints",
    formCpn: "FormInput",
    width: "300px",
    label: "问题点",
  },
  /*改善建议*/
  {
    prop: "SuggestionsImprovement",
    label: "改善建议",
    formCpn: "FormInput",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
  /*图片（多张）*/
  {
    prop: "BillFiles",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    formCpn: "FormInput",
    width: "100px",
  },
];
