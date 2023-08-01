/*
 * @Author: your name
 * @Date: 2021-11-05 10:19:55
 * @LastEditTime: 2021-11-10 11:14:58
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\workModule\Generality\stateEnum.js
 */
import i18n from "@/i18n/i18n.js";
/*领料类别枚举*/
export default {
  /// <summary>
  /// 拆
  /// </summary>
  Split: {
    name: i18n.t("stockroom.St_Split"),
    value: "Split",
    color: "#909399",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
  /// <summary>
  /// 补料
  /// </summary>
  Assemble: {
    name: i18n.t("stockroom.St_Assembly"),
    value: "Assemble",
    color: "#909399",
    fcolor: "#fff",
    icon: "",
    operation: {},
  },
};
