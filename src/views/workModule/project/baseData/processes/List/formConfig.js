/*
 * @Author: H.
 * @Date: 2021-11-24 13:57:10
 * @LastEditTime: 2022-03-24 09:56:03
 * @Description:
 */
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAll } from "@/api/basicApi/systemSettings/currency";
import {enumToList} from "~/utils/system/enumsPlugin";
import {processTypeEnum} from "@/enum/workModule";
export const formSchema = [
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
    custom: true,
  },
  {
    prop: "SortOrder",
    label: i18n.t("production.Pr_SortOrder"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
    cpn: "FormInput",
  },
  {
    prop: "CostRate",
    label: i18n.t("production.Pr_CostRate"),
    cpn: "FormInput",
  },
  {
    prop: "StartScale",
    label: i18n.t("production.Pr_StartScale"),
    cpn: "FormInput",
  },
  {
    prop: "EndScale",
    label: i18n.t("production.Pr_EndScale"),
    cpn: "FormInput",
  },
  {
    prop: "BelongingDepartment",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(processTypeEnum),
    },
  },
];
