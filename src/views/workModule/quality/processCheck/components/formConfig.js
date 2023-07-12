import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import {
  StateEnum,
  ProcessingResult,
  enumToList,
  ProcessCheckTypeEnum,
} from "@/enum/workModule";
import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";

async function ReasonOfUnqualified(e) {
  var DataList = {};
  await getConfigKey(e).then((res) => {
    let arr = [];
    console.log(JSON.parse(res.ConfigValue))
    let dataList = JSON.parse(res.ConfigValue)
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
// 与成品检验共用的字段
export const checkCommonField = [
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
        list:[]
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
  // 不合格原因分析  CauseAnalysisOfNonconformity
  {
    prop: "CauseAnalysisOfNonconformity",
    label: "不合格原因分析",
    cpn: "FormInput",
    cpnProps: {
      type: "textarea",
    },
  },
  {
    prop: "DisposalClassification",
    cpn: "FormInput",
    label: "处置分类",
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
];

export const formSchema = [
  {
    // 加工单
    prop: "PrTaskBillId",
    label: "加工单",
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
    // 零件编号
    prop: "ItemId",
    label: "零件编号",
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 自检工序
    prop: "SelfCheckProcess",
    label: "检验工序",
    cpn: "FormInput",
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["blur"],
      },
    ],
  },
  {
    // 检验类型
    prop: "ProcessCheckType",
    label: "检验类型",
    cpn: "FormSelect",
    options: {
      list: enumToList(ProcessCheckTypeEnum),
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
    // 检验人
    prop: "Operator",
    label: "检验人",
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
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
    // 检验日期
    prop: "OperationDate",
    label: "检验日期",
    cpn: "SingleTime",
    default: new Date(),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["blur"],
      },
    ],
  },
  ...checkCommonField,
];
