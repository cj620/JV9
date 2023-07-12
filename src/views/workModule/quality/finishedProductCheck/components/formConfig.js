/*
 * @Author: C.
 * @Date: 2022-08-31 10:41:53
 */
import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import {
  ProcessingResult,
  enumToList,
  FinishedProductCheckType,
} from "@/enum/workModule";
async function ReasonOfUnqualified(e) {
  var DataList = {};
  await getConfigKey(e).then((res) => {
    let arr = [];
    console.log(JSON.parse(res.ConfigValue));
    let dataList = JSON.parse(res.ConfigValue);
    Object.keys(dataList).forEach((item) => {
      arr.push({
        value: item,
        label: item,
      });
    });
    DataList.Items = arr;
  });
  return DataList;
}

export const formSchema = [
  {
    // 加工单
    prop: "PrTaskBillId",
    cpn: "FormInput",
    label: "加工单",
    cpnProps: {
      disabled: true,
    },
  },

  {
    // 需求单
    prop: "PrDemandBillId",
    cpn: "SyncSelect",
    label: "需求单",
    custom: true,
    cpnProps: {
      disabled: true,
    },
    rules: [
      {
        required: false,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 计划交期
    prop: "DeliveryDate",
    cpn: "SingleTime",
    cpnProps: {
      disabled: true,
    },
    label: i18n.t("Generality.Ge_DeliveryDate"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 处理结果
    prop: "ProcessingResult",
    label: "检测结果",
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
    label: "返工工序",
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
    label: "负责人",
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  /*不合格原因*/
  {
    prop: "AbnormalCause",
    label: "不合格原因",
    cpn: "SyncSelect",
    api: ReasonOfUnqualified,
    type: "multiple",
    apiOptions: {
      params: { ConfigKey: "ReasonForUnqualifiedProcessInspection" },
      keyName: "label",
      valueName: "value",
    },
  },
  /*不合格原因子项*/
  {
    prop: "AbnormalCauseItem",
    label: "不合格原因子项",
    cpn: "FormSelect",
    type: "multiple",
    options: {
      list: [],
    },
  },
  // Reviewer
  {
    // 评审人 multiple
    prop: "Reviewer",
    label: "评审人",
    cpn: "SyncSelect",
    api: getAllUserData,
    type: "multiple",
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
    cpnProps: {
      multiple: true,
    },
  },

  //   送检数量  QuantitySubmittedForInspection
  {
    prop: "QuantitySubmittedForInspection",
    label: "送检数量",
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
    prop: "InspectionQuantity",
    label: "检验数量",
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
    prop: "UnqualifiedQuantity",
    label: "不合格数量",
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
  // 主要不良点  MainDefects
  {
    prop: "MainDefects",
    label: "主要不良点",
    cpn: "FormInput",
    cpnProps: {
      type: "textarea",
    },
  },
  // 不合格原因分析人  Analyst
  {
    prop: "Analyst",
    label: "不合格原因分析人",
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  /*   // 不合格原因分析  CauseAnalysisOfNonconformity
  {
    prop: "CauseAnalysisOfNonconformity",
    label: "不合格原因分析",
    cpn: "FormInput",
    cpnProps: {
      type: "textarea",
    },
  }, */
  {
    prop: "DisposalClassification",
    cpn: "FormInput",
    label: "处置分类",
  },
  {
    // 检验类型
    prop: "FinishedProductCheckType",
    label: "检验类型",
    cpn: "FormSelect",
    options: {
      list: enumToList(FinishedProductCheckType),
    },
  },
  // 备注  Remarks
  {
    prop: "Remarks",
    label: "备注",
    cpn: "FormInput",
    cpnProps: {
      type: "textarea",
    },
  },
  // 不合格原因分析  CauseAnalysisOfNonconformity
];
