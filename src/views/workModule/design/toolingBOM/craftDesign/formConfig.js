/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-01-07 10:34:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
export const formSchema = [
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 零件编号
    prop: "PartNo",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_PartNo"),
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 零件名称
    prop: "PartName",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_PartName"),
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 描述
    prop: "Description",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Describe"),
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 数量
    prop: "Quantity",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Quantity"),
    cpnProps: {
      disabled: true,
    },
  },
];
