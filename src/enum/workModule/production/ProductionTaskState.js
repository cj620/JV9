/*
 * @Author: your name
 * @Date: 2021-11-05 10:19:55
 * @LastEditTime: 2022-01-17 11:13:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\workModule\Generality\stateEnum.js
 */
import i18n from "@/i18n/i18n.js";
/*加工单状态枚举*/
export default {
  /// <summary>
  /// 待加工
  /// </summary>
  ToBeProcessed: {
    name: i18n.t("production.Pr_ToBeProcessed"),
    value: "ToBeProcessed",
    color: "#909399",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 加工中
  /// </summary>
  Processing: {
    name: i18n.t("Generality.Ge_Processing"),
    value: "Processing",
    color: "#ee9403",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 已完成
  /// </summary>
  Processed: {
    name: i18n.t("Generality.Ge_Completed"),
    value: "Processed",
    color: "#faad14",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
};
