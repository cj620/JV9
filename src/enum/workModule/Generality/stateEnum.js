/*
 * @Author: your name
 * @Date: 2021-11-05 10:19:55
 * @LastEditTime: 2022-01-17 11:11:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\workModule\Generality\stateEnum.js
 */
import i18n from "@/i18n/i18n.js";
/*物料状态枚举*/
export default {
  /// <summary>
  /// 未提交
  /// </summary>
  Unsubmitted: {
    name: i18n.t("Generality.Ge_Unsubmitted"),
    value: "Unsubmitted",
    color: "#909399",
    fcolor: "#fff",
    icon: "",
    operation: {
      submit: true,
      edit: true,
      del: true,
      discarded: true,
    },
  },
  /// <summary>
  /// 已提交
  /// </summary>
  Submitted: {
    name: i18n.t("Generality.Ge_Submitted"),
    value: "Submitted",
    color: "#faad14",
    fcolor: "#fff",
    icon: "",
    operation: {
      edit: false,
      del: false,
      audit: true,
      reject: true,
      withdraw: true,
      Discarded: true,
    },
  },
  /// <summary>
  /// 审核中
  /// </summary>
  Approving: {
    name: i18n.t("Generality.Ge_Approving"),
    value: "Approving",
    color: "#faad14",
    fcolor: "#fff",
    icon: "",
    operation: {
      edit: true,
      del: true,
      audit: true,
      reject: true,
      withdraw: true,
      discarded: true,
    },
  },
  /// <summary>
  /// 已审核
  /// </summary>
  Approved: {
    name: i18n.t("Generality.Ge_Approved"),
    value: "Approved",
    color: "#FE222D",
    fcolor: "#fff",
    icon: "",
    operation: {
      edit: false,
      del: false,
      audit: false,
      reject: true,
      withdraw: true,
      discarded: true,
      // 转单据
      transform: true,
    },
  },
  /// <summary>
  /// 已拒绝
  /// </summary>
  Rejected: {
    name: i18n.t("Generality.Ge_Rejected"),
    value: "Rejected",
    color: "#000000",
    fcolor: "#fff",
    icon: "",
    operation: {
      submit: true,
      edit: true,
      del: true,
      discarded: true,
    },
  },
  /// <summary>
  /// 已完成
  /// </summary>
  Completed: {
    name: i18n.t("Generality.Ge_Completed"),
    value: "Completed",
    color: "#39B54A",
    fcolor: "#fff",
    icon: "",
    operation: {
      edit: false,
      del: false,
      audit: false,
      reject: false,
      withdraw: false,
      discarded: true,
    },
  },
  /// <summary>
  /// 废弃
  /// </summary>
  Discarded: {
    name: i18n.t("Generality.Ge_Discarded"),
    value: "Discarded",
    color: "#39B54A",
    fcolor: "#fff",
    icon: "",
    operation: {
      edit: false,
      del: false,
      audit: false,
      reject: false,
      withdraw: false,
      discarded: false,
    },
  },
  // 错误状态
  Fail: {
    name: '错误',
    value: "Completed",
    color: "#39B54A",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
};
