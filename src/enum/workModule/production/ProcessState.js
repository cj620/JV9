/*
 * @Author: your name
 * @Date: 2021-11-05 10:19:55
 * @LastEditTime: 2022-03-03 13:22:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\workModule\Generality\stateEnum.js
 */
import i18n from "@/i18n/i18n.js";
/*工序状态枚举*/
export default {
  /// <summary>
  /// 待入站
  /// </summary>
  ToBeReceived: {
    name: i18n.t("Generality.Ge_ToBeReceived"),
    value: "ToBeReceived",
    color: "#f3f3f3",
    _color: "#fff",
    c_color: "#fff",
    fcolor: "#fff",
    icon: "",
    operation: {
      top:true,
      switchDevice:true
    },
  },
  /// <summary>
  /// 已入站
  /// </summary>
  Received: {
    name: i18n.t("production.Pr_AlreadyInStation"),
    value: "Received",
    color: "#22c9df",
    _color: "#fff",
    c_color: "#22c9df",
    fcolor: "#fff",
    icon: "",
    operation: {
      top:true,
      switchDevice:true
    },
  },
  /// <summary>
  /// 加工中
  /// </summary>
  Processing: {
    name: i18n.t("Generality.Ge_Processing"),
    value: "Processing",
    color: "#faad14",
    _color: "#fff",
    c_color: "#faad14",
    fcolor: "#fff",
    icon: "",
    operation: {
      top:false,
      switchDevice:false
    },
  },
  /// <summary>
  /// 已加工
  /// </summary>
  Processed: {
    name: i18n.t("production.Pr_Processed"),
    value: "Processed",
    color: "#2ee438",
    c_color: "#fff",
    _color: "#2ee438",
    fcolor: "#fff",
    icon: "",
    operation: {
      top:true,
      switchDevice:true
    },
  },
  /// <summary>
  /// 暂停中
  /// </summary>
  Pausing: {
    name: i18n.t("Generality.Ge_Pausing"),
    value: "Pausing",
    color: "#8107e4",
    _color: "#fff",
    c_color: "#8107e4",
    fcolor: "#fff",
    icon: "",
    operation: {
      top:true,
      switchDevice:true
    },
  },
  /// <summary>
  /// 外协中
  /// </summary>
  Outsourcing: {
    name: i18n.t("Generality.Ge_Outsourcing"),
    value: "Outsourcing",
    color: "#CCCCFF",
    _color: "#fff",
    c_color: "#CCCCFF",
    fcolor: "#fff",
    icon: "",
    operation: {
      top:true,
      switchDevice:true
    },
  },
  /// <summary>
  /// 外协申请中
  /// </summary>
  OutsourcingApplying: {
    name: i18n.t("Generality.Ge_OutsourcingApplying"),
    value: "Outsourcing",
    color: "#F709F7",
    _color: "#fff",
    c_color: "#F709F7",
    fcolor: "#fff",
    icon: "",
    operation: {
      top:true,
      switchDevice:true
    },
  },
};
