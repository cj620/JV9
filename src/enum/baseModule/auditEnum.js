/*
 * @Author: your name
 * @Date: 2021-11-09 10:17:35
 * @LastEditTime: 2022-01-04 16:25:53
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\baseModule\auditEnum.js
 */
export const auditEnum={
  /// <summary>
        /// 待处理
        /// </summary>
        'WaitToProcess': {
          name: i18n.t("Generality.Ge_Pending"),
          value: 'WaitToProcess',
          color: '#E6A23C',
          fcolor:'#fff',
          icon: 'el-icon-s-check',
          operation: { }
        },
        /// <summary>
        /// 已同意
        /// </summary>
        'Approved': {
          name: i18n.t("Generality.Ge_Approved"),
          value: 'Approved',
          color: '#67C23A',
          fcolor:'#fff',
          icon: 'el-icon-circle-check',
          operation: { }
        },
        /// <summary>
        /// 已拒绝
        /// </summary>    
        'Rejected': {
          name: i18n.t("Generality.Ge_Rejected"),
          value: 'Rejected',
          color: '#F56C6C',
          fcolor:'#fff',
          icon: 'el-icon-circle-close',
          operation: { }
        },
         /// <summary>
        /// 已撤审
        /// </summary>    
        'Revoked': {
          name: i18n.t("Generality.Ge_Revoked"),
          value: 'Revoked',
          color: '#CCC',
          fcolor:'#fff',
          icon: 'el-icon-refresh-left',
          operation: { }
        },
        
}