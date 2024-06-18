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
  /// 领料
  /// </summary>
  'Picking': {
    name: i18n.t("stockroom.St_Picking"),
    value: 'Picking',
    color: '#909399',
    fcolor:'#fff',
    icon: '',
    operation: {}
  },
  /// <summary>
  /// 补料
  /// </summary>
  'Supplement': {
    name: i18n.t("stockroom.St_Supplement"),
    value: 'Picking',
    color: '#909399',
    fcolor:'#fff',
    icon: '',
    operation: {}
  },
  /// <summary>
  /// 领料
  /// </summary>
  'TrialTooling': {
    name: i18n.t("stockroom.St_TrialMold"),
    value: 'Picking',
    color: '#909399',
    fcolor:'#fff',
    icon: '',
    operation: {}
  },
  /// <summary>
  /// 返工领料
  /// </summary>
  'ReworkPicking': {
    name: i18n.t("stockroom.St_ReworkPicking"),
    value: 'Picking',
    color: '#ReworkPicking',
    fcolor:'#fff',
    icon: '',
    operation: {}
  },
  /// <summary>
  /// 领料
  /// </summary>
  'OutsourcingPicking': {
    name: i18n.t("stockroom.St_OutsourcingPicking"),
    value: 'Picking',
    color: '#909399',
    fcolor:'#fff',
    icon: '',
    operation: {}
  },
}
