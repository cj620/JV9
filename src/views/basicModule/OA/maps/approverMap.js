/*
 * @Author: C.
 * @Date: 2021-10-11 16:25:27
 * @LastEditTime: 2022-06-28 15:52:30
 * @Description: file content
 */
import {  enumToList } from "@/enum/workModule";
export const approverMap={
  // 指定成员
  'Personnel':{
    name:'指定成员',
    value:'Personnel',
  },

  'Role':{
    name:'角色',
    value:'Role',
  },
}

export const approverTypeList=enumToList(approverMap)
