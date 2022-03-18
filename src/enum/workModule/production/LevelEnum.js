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
  /// 普通
  /// </summary>
  'Ordinary': {
    name: i18n.t("Generality.Ge_Ordinary"),
    value: 'Ordinary',
    color: '#909399',
    fcolor:'#98FFA1',
    icon: '',
    operation: {

    }
  },
  /// <summary>
  /// 紧急
  /// </summary>
  'Urgent': {
    name: i18n.t("Generality.Ge_Urgent"),
    value: 'Urgent',
    color: '#faad14',
    fcolor:'#FAD2A2',
    icon: '',
    operation: {
    }
  },
  /// <summary>
  /// 特急
  /// </summary>
  'ExtraUrgent': {
    name: i18n.t("Generality.Ge_ExtraUrgent"),
    value: 'ExtraUrgent',
    color: '#faad14',
    fcolor:'#F89194',
    icon: '',
    operation: {
    }
  },
}
