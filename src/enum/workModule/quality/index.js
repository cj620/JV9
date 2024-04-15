/*
 * @Author: C.
 * @Date: 2022-06-09 14:11:26
 * @LastEditTime: 2023-06-02 13:12:19
 * @Description: file content
 */
import i18n from "@/i18n/i18n.js";
export const StateEnum = {
  //   合格 OK
  // NG

  OK: {
    name: "OK",
    value: "OK",
  },
  // NG
  NG: {
    name: "NG",
    value: "NG",
  },
};

// 过程检验类型
export const ProcessCheckTypeEnum = {
  //   自检  SelfCheck
  // 巡检  NormalCheck
  // 首检  FirstInspection

  SelfCheck: {
    name: i18n.t("quality.Qc_SelfCheck"),
    value: "SelfCheck",
  },
  // NG
  NormalCheck: {
    name: i18n.t("quality.Qc_NormalCheck"),
    value: "NormalCheck",
  },
  // NG
  FirstInspection: {
    name: i18n.t("quality.Qc_FirstInspection"),
    value: "FirstInspection",
  },
};
// 零件成品检验类型
export const FinishedProductCheckType = {
  FirstInspection: {
    name: i18n.t("quality.Qc_FirstInspection"),
    value: "FirstInspection",
  },
};
export const ProcessingResult = {
  //   Qualified 合格
  // Rework 返工
  // Scrap 报废
  // AcceptOnDeviation 特采
  // Pending 待定

  Qualified: {
    name: i18n.t("quality.Qc_Qualified"),
    value: "Qualified",
  },
  // 返工
  Rework: {
    name: i18n.t("quality.Qc_Rework"),
    value: "Rework",
  },
  // 报废
  Scrap: {
    name: i18n.t("quality.Qc_Scrapped"),
    value: "Scrap",
  },
  // 特采
  AcceptOnDeviation: {
    name: i18n.t("quality.Qc_AcceptOnDeviation"),
    value: "AcceptOnDeviation",
  },
  // 待定
  Pending: {
    name: i18n.t("Generality.Ge_Pending1"),
    value: "Pending",
  }
};

export const CheckResulteEnum = {
  Qualified: {
    name: i18n.t("quality.Qc_Qualified"),
    value: "Qualified",
  },
  TobeChecked: {
    name: i18n.t("quality.Qc_ToBeTested"),
    value: "TobeChecked",
  },
  Unqualified: {
    name: i18n.t("quality.Qc_Unqualified"),
    value: "Unqualified",
  },
  Completed: {
    name: i18n.t("Generality.Ge_Completed"),
    value: "Completed",
  },
  InspectionExemption: {
    name: i18n.t("quality.Qc_InspectionExemption"),
    value: "InspectionExemption",
  },
};

export const gageStateEnum = {
  Unreturn: {
    name: i18n.t("quality.Qc_UnReturn"),
    value: "Unreturn",
  },
  // 返工
  Return: {
    name: i18n.t("quality.Qc_Return"),
    value: "Return",
  },
};
//质检类型
export const QcType = {
  //过程检验
  Qc_ProcessCheck: {
    name: i18n.t("menu.Qc_ProcessCheck"),
    value: "Qc_ProcessCheck",
  },
  // 零件成品检验
  Qc_FinishedProduct: {
    name: i18n.t("menu.Qc_FinishedProduct"),
    value: "Qc_FinishedProduct",
  },
};

// 异常类别枚举
export const AbnormalCategoryEnum = {
  // 人员
  Personnel: {
    name: i18n.t("Generality.Ge_Personnel"),
    value: "Personnel",
  },
  // 尺寸
  Size: {
    name: i18n.t("quality.Qc_Size"),
    value: "Size",
  },
  // 外观
  Exterior: {
    name: i18n.t("quality.Qc_Exterior"),
    value: "Exterior",
  },
  // 其它
  Other: {
    name: i18n.t("quality.Qc_Other"),
    value: "Other",
  },
}
