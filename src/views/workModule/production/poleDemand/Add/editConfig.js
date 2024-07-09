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
      Height: 400,
      operationWidth: 80,
      chooseCol:false,
    });
  }
}
export const tableSchema = [
  /*问题点*/
  {
    prop: "ProblemPoints",
    formCpn: "FormInput",
    width: "300px",
    label: i18n.t("project.Pro_ProblemPoints"),
  },
  /*改善建议*/
  {
    prop: "SuggestionsImprovement",
    label: i18n.t("project.Pro_SuggestionsImprovement"),
    formCpn: "FormInput",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
  },
  /*图片*/
  {
    prop: "BillFiles",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    custom: true,
    editConfig:{
      disabled:true,
    }
  },
];
