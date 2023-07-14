import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import {
  StateEnum,
  ProcessingResult,
  enumToList,
  ProcessCheckTypeEnum,
} from "@/enum/workModule";
import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";

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
    // 返工工序
    prop: "ReworkProcess",
    label: "返工工序",
    cpn: "FormSelect",
    type: "multiple",
    options: {
      list: [],
    },
  },

  {
    // 检测结果
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
    label: "不合格原因分析人",
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
    prop: "InspectionQty",
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
    prop: "UnqualifiedQty",
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
  // 关联编号
  { prop: "AssociatedNo", label: "关联编号", cpn: "FormInput" },
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
