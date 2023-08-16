/*
 * @Author: your name
 * @Date: 2021-11-30 16:09:33
 * @LastEditTime: 2022-01-20 18:43:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectManage\SkillReq\config.js
 */
import { EditTable as BaseTable } from "@/jv_doc/class/table";
export class EditTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      title: i18n.t("project.Pro_MoldSpecification"),
      data: [],
    });
  }
}
const tableConfig = [
  {
    prop: "SpecName",
    label: i18n.t("project.Pro_RequirementItem"),
    formCpn: "FormInput",
  },
  {
    prop: "Spec",
    label: i18n.t("Generality.Ge_Describe"),
    formCpn: "FormInput",
  },
];
