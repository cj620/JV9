/*
 * @Author: H.
 * @Date: 2021-11-19 10:25:28
 * @LastEditTime: 2024-07-31 11:22:17
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
  // 是否外协
  {
    prop: "IsOutsourced",
    label: i18n.t("production.Pr_IsOutsourced"),
    cpn: "FormSingleCheckBox",
    options: {
      CheckBoxlabel: "",
    },
  },
  // 是否强制检验
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    cpn: "FormSingleCheckBox",
    options: {
      CheckBoxlabel: "",
    },
  },
  // 加工工艺
  {
    prop: "ProgramingProcess",
    cpn: "FormSelect",
    label: i18n.t("production.Pr_ProgramingProcess"),
    custom: true,
  },
  {
    prop: "IsBlanking",
    label: "是否是下料",
    cpn: "FormRadio",
    type: "button",
    default: false,
    options: {
      list: [
        {
          value: true,
          label: "是",
        },
        {
          value: false,
          label: "否",
        },
      ],
    },
  },
];
