import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import {
  ProcessingResult,
  enumToList,
  AbnormalCategoryEnum,
} from "@/enum/workModule";

// import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";

// async function ReasonOfUnqualified(e) {
//   var DataList = {};
//   await getConfigKey(e).then((res) => {
//     let arr = [];
//     console.log(JSON.parse(res.ConfigValue));
//     let dataList = JSON.parse(res.ConfigValue);
//     Object.keys(dataList).forEach((item) => {
//       arr.push({
//         value: item,
//         label: item,
//       });
//     });
//     DataList.Items = arr;
//   });
//   return DataList;
// }

export const formSchema = [
  {
    // 加工单
    prop: "PrTaskBillId",
    label: i18n.t("Generality.Ge_PrTaskBillId"),
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["blur"],
      },
    ],
  },
  {
    // 检测结果
    prop: "ProcessingResult",
    label: i18n.t("quality.Qc_CheckResult"),
    cpn: "FormSelect",
    options: {
      list: enumToList(ProcessingResult),
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["blur"],
      },
    ],
  },
  {
    // 返工工序
    prop: "ReworkProcess",
    label: i18n.t("quality.Qc_ReworkProcess"),
    cpn: "FormSelect",
    type: "multiple",
    cpnProps: {
      disabled: true,
    },
    options: {
      list: [],
    },
  },

  {
    // 负责人
    prop: "PersonInCharge",
    label: i18n.t("project.Pro_Worker"),
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  // 异常类别
  {
    prop: "AbnormalCategory",
    label: i18n.t("quality.Qc_AbnormalCategory"),
    cpn: "FormSelect",
    options: {
      list: enumToList(AbnormalCategoryEnum),
    },
  },
  /*不合格原因*/
  {
    prop: "AbnormalCause",
    label: i18n.t("quality.Qc_AbnormalCause"),
    cpn: "FormInput",
    // cpn: "SyncSelect",
    // api: ReasonOfUnqualified,
    // type: "multiple",
    // apiOptions: {
    //   params: { ConfigKey: "ReasonForUnqualifiedProcessInspection" },
    //   keyName: "label",
    //   valueName: "value",
    // },
  },
  // 不合格原因分析人
  {
    prop: "Analyst",
    label: i18n.t("quality.Qc_AbnormalCauseAnalyst"),
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  //   送检数量  QuantitySubmittedForInspection
  {
    prop: "SubmittedForInspectionQty",
    label: i18n.t("quality.Qc_SubmittedForInspectionQty"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["blur"],
      },
    ],
    cpnProps: {
      type: "number",
    },
  },
  // 检验数量  InspectionQuantity
  {
    prop: "InspectionQty",
    label: i18n.t("quality.Qc_InspectionQty"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["blur"],
      },
    ],
    cpnProps: {
      type: "number",
    },
  },
  // 不合格数量  UnqualifiedQuantity
  {
    prop: "UnqualifiedQty",
    label: i18n.t("quality.Qc_UnqualifiedQty"),
    cpn: "FormInput",
    default: "0",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["blur"],
      },
    ],
    cpnProps: {
      type: "number",
    },
  },
  // 备注  Remarks
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    cpn: "FormInput",
    cpnProps: {
      type: "textarea",
    },
  },
];
