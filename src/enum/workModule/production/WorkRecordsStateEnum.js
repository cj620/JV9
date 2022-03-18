/*
 * @Author: your name
 * @Date: 2021-11-05 10:19:55
 * @LastEditTime: 2022-01-25 09:46:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\workModule\Generality\stateEnum.js
 */
import i18n from "@/i18n/i18n.js";
/*工序状态枚举*/
export default {
  /// <summary>
  /// 已入站
  /// </summary>
  Receive: {
    name: i18n.t("production.Pr_AlreadyInStation"),
    value: "Receive",
    color: "#fff",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 开始
  /// </summary>
  Start: {
    name: i18n.t("Generality.Ge_Start"),
    value: "Start",
    color: "#22c9df",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 完成
  /// </summary>
  Finish: {
    name: i18n.t("Generality.Ge_Finished"),
    value: "Finish",
    color: "#faad14",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },

  /// <summary>
  /// 暂停
  /// </summary>
  Pause: {
    name: i18n.t("Generality.Ge_Pausing"),
    value: "Pause",
    color: "#8107e4",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
};
