/*
 * @Author: your name
 * @Date: 2021-11-05 10:19:55
 * @LastEditTime: 2021-11-25 16:35:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\workModule\Generality\stateEnum.js
 */
import i18n from "@/i18n/i18n.js";
/*物料需求状态枚举*/
export default {
  /// <summary>
  /// 待处理
  /// </summary>
  Pending: {
    name: i18n.t("Generality.Ge_Pending"),
    value: "Pending",
    color: "#909399",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 已处理
  /// </summary>
  Processed: {
    name: i18n.t("Generality.Ge_Processed"),
    value: "Processed",
    color: "#faad14",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 采购申请中
  /// </summary>
  InRequisition: {
    name: i18n.t("Generality.Ge_InRequisition"),
    value: "InRequisition",
    color: "	#F5F5F5",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 采购中
  /// </summary>
  InProcurement: {
    name: i18n.t("Generality.Ge_InProcurement"),
    value: "InProcurement",
    color: "#FE222D",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 已入库
  /// </summary>
  Stored: {
    name: i18n.t("Generality.Ge_Stored"),
    value: "Stored",
    color: "#000000",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 已领用
  /// </summary>
  HaveRecipients: {
    name: i18n.t("Generality.Ge_HaveRecipients"),
    value: "HaveRecipients",
    color: "#39B54A",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
};
