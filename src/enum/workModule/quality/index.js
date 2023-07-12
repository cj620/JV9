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
    name: "自检",
    value: "SelfCheck",
  },
  // NG
  NormalCheck: {
    name: "巡检",
    value: "NormalCheck",
  },
  // NG
  FirstInspection: {
    name: "首检",
    value: "FirstInspection",
  },
};
// 成品检验类型
export const FinishedProductCheckType = {
  FirstInspection: {
    name: "首检",
    value: "FirstInspection",
  },
};
export const ProcessingResult = {
  //   Normal 正常
  // Rework 返工
  // Scrap 报废
  // AcceptOnDeviation 特采

  Normal: {
    name: "正常",
    value: "Normal",
  },
  // 返工
  Rework: {
    name: "返工",
    value: "Rework",
  },
  // 报废
  Scrap: {
    name: "报废",
    value: "Scrap",
  },
  // 特采
  AcceptOnDeviation: {
    name: "特采",
    value: "AcceptOnDeviation",
  },
  // 过程返工
  NormalRework: {
    name: "过程返工",
    value: "NormalRework",
  },
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
    name: "已完成",
    value: "Completed",
  },
  InspectionExemption: {
    name: "免检",
    value: "InspectionExemption",
  },
};

export const gageStateEnum = {
  Unreturn: {
    name: "未归还",
    value: "Unreturn",
  },
  // 返工
  Return: {
    name: "归还",
    value: "Return",
  },
};
//质检类型
export const QcType = {
  Qc_ProcessCheck: {
    name: "过程检验单",
    value: "Qc_ProcessCheck",
  },
  // 返工
  Qc_FinishedProduct: {
    name: "成品检验",
    value: "Qc_FinishedProduct",
  },
};
