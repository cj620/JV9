/*
 * @Author: your name
 * @Date: 2021-11-19 09:44:41
 * @LastEditTime: 2022-01-26 10:37:34
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\baseModule\apiEnum.js
 */
export const apiEnum={
  // 查列表  2^0
  1:{
    name:'list',
    type:'post'
  },
  // 查详情  2^1
  2:{
    name:'get',
    type:'get',
    loading:true
  },
  // 删列表 2^2
  4:{
    name:'delete',
    type:'post'
  },
  // 保存 或者 保存且提交  2^3
  8:{
    name:'save',
    type:'post',
    loading:true
  },
  // 提交  2^4
  16:{
    name:'submit',
    type:'post',
    loading:true
  },
  // 审核  2^5
  32:{
    name:'audit',
    type:'post',
    loading:true
  },
  // 撤审  2^6
  64:{
    name:'withdraw',
    type:'post'
  },
  // 拒绝  2^7
  128:{
    name:'reject',
    type:'post'
  },
  // 作废  2^7
  256:{
    name:'discard',
    type:'post'
  },
}
export const apiFuncModule={
  // 全部
  COMMON:511,
  // 增删改查
  CURD:15,
}
