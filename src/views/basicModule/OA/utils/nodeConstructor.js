/*
 * @Author: C.
 * @Date: 2021-10-09 10:18:39
 * @LastEditTime: 2022-06-28 16:46:16
 * @Description: file content
 */
import { uuid } from "@/jv_doc/utils/common";
import { nodeMap } from "../maps/nodeMap";

const defaultObj={
  // 审核类型 会签 或签
  ApproveType: 'JointlySign',
      
  // 审核方式 指定人员 主管之类
  ApproverType: 'Personnel',
  ActivationCondition: '',
  ApproverRole: '',
  ApproveNodeUserDefs: []
}
export function childNodeConstructor(nodeType='approver',mergerObj=defaultObj){
  
  return {
      // 节点名称
      Name:mergerObj.Name||nodeMap[nodeType].name,
      nodeType:nodeType,
      // 节点样式
      nodeStyle:nodeMap[nodeType].style,
      nodeId:'node-'+nodeType+'-'+uuid(5),
      // 审核方式 指定人员 主管之类
      ApproveType: mergerObj.ApproveType,
      // 审核类型 会签 或签
      ApproverType: mergerObj.ApproverType,
      ActivationCondition: '',
      ApproverRole: mergerObj.ApproverRole,
      ApproveNodeUserDefs: mergerObj.ApproveNodeUserDefs
    }
  
}

export function defaultNodeList(){
    return [
      // childNodeConstructor('start'),
      childNodeConstructor('approver'),
      // childNodeConstructor('notifier'),
    ]
}