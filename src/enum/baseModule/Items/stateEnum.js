/*
 * @Author: your name
 * @Date: 2021-11-03 13:44:39
 * @LastEditTime: 2021-11-09 14:49:58
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\enum\baseModule\Items\stateEnum.js
 */
/*物料状态枚举*/
import i18n from "@/i18n/i18n.js";
export default {
  /// <summary>
  /// 禁用
  /// </summary>
  'Disable': {
    name: i18n.t("Generality.Ge_Disable"),
    value: 'Disable',
    color: '#39B54A',
    icon: '',
    operation: { }

  },
  /// <summary>
  /// 启用
  /// </summary>
  'Enable': {
    name: i18n.t("Generality.Ge_Enable"),
    value: 'Enable',
    color: '#39B54A',
    icon: '',
    operation: {}
  },
}
