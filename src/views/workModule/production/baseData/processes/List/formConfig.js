/*
 * @Author: H.
 * @Date: 2021-11-19 10:25:28
 * @LastEditTime: 2022-01-24 17:25:01
 * @Description:
 */
import { getAllResource } from "@/api/workApi/production/baseData";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";

export const formSchema = [
  //   工序
  {
    prop: "Process",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Process"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
    custom: true,
  },
    // 工序代号
  {
    prop: "ProcessCode",
    cpn: "FormInput",
    label: i18n.t("production.Pr_ProcessCode"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
    custom: true,
  },
  //部门搜索
  {
    prop: "Department",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      immediate: true,
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
    // 加工内容
  {
    prop: "ProcessContent",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_TaskContent"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
    // 资源组
  {
    prop: "Resource",
    cpn: "SyncSelect",
    label: i18n.t("menu.Pr_Resources"),
    api: getAllResource,
    apiOptions: {
      immediate: true,
      keyName: "Resource",
      valueName: "ResourceId",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
    // 前置时间
  {
    prop: "LeadTimeOfProcess",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_LeadTimeOfProcess"),
  },
    // 后置时间
  {
    prop: "PostTimeOfProcess",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_PostTimeOfProcess"),
  },
  // 是否强制检验
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    cpn: "FormSingleCheckBox",
    options: {
      CheckBoxlabel: ''
    }
  },
  // 加工工艺
  {
    prop: "ProgramingProcess",
    cpn: "FormSelect",
    label: i18n.t("production.Pr_ProgramingProcess"),
    custom: true,
  },
];
