/*
 * @Author: C.
 * @Date: 2021-10-09 10:18:39
 * @LastEditTime: 2021-10-14 14:50:09
 * @Description: file content
 */
import { uuid } from "@/jv_doc/utils/common";
import { nodeMap } from "../maps/nodeMap";
export function childNodeConstructor(type='approver'){
  
  return{
    name:nodeMap[type].card.title,
    type:type,
    nodeId:'node-'+type+'-'+uuid(5),
    properties:{
      // 发起人
      start:[],
      // 抄送人
      notifier:[],
      // 审核人列表
      approver:[],
      // 审核主管
      deptDirector:[],
      // 审核角色
      role:[],
      // 审核类型 会签 或签
      auditType:'0',
      // 审核方式 指定人员 主管之类
      auditWay:'0'
    }
  }
}

export function defaultNodeList(){
    return [
      childNodeConstructor('start'),
      childNodeConstructor('approver'),
      childNodeConstructor('notifier'),
    ]
}