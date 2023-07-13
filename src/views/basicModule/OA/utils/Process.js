/*
 * @Author: C.
 * @Date: 2022-06-28 11:11:24
 * @LastEditTime: 2022-06-29 17:09:50
 * @Description: file content
 */

import { defaultNodeList,childNodeConstructor } from "./nodeConstructor";
import { get_audit_flow_by_bill_key,setAudit } from "@/api/basicApi/systemSettings/auditFlowSetup";

class Process{
  ApproveNodes=null
  BillKey=null
  constructor(BillKey){
    // this.ApproveNodes=defaultNodeList()
    this.BillKey=BillKey
  }
  print=()=>{
    console.log(this.ApproveNodes);
  }
  // 创建节点
  createNode=(Id,type)=>{
    let findPos=  this.ApproveNodes.findIndex(item=>item.nodeId==Id)
    if(findPos>=0){
      this.ApproveNodes.splice(findPos+1,0,childNodeConstructor(type))
    }
  }
  // 删除节点
  delNode=(Id)=>{
    if(this.ApproveNodes.length==1)return
    let findPos=  this.ApproveNodes.findIndex(item=>item.nodeId==Id)
    if(findPos>=0){
      this.ApproveNodes.splice(findPos,1)
    }
  }
  // 获取审核流信息
  getProcessData=()=>{
    get_audit_flow_by_bill_key({BillKey:this.BillKey}).then(res=>{

      this.ApproveNodes=res?.map(item=>{
        return childNodeConstructor('approver',item)
      })??defaultNodeList()
    })
  }
  // 保持审核流信息
  saveAuditProcess=()=>{
    return setAudit({
      ApproveNodes:this.ApproveNodes,
      BillKey:this.BillKey
    })
  }
}

export default Process