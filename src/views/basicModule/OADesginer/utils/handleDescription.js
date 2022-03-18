/*
 * @Author: C.
 * @Date: 2021-10-13 09:15:34
 * @LastEditTime: 2021-10-15 17:13:37
 * @Description: file content
 */
import { approverMap } from "../maps/approverMap";
import { multiplayer } from "../maps/auditMap";
export function handleDescription(node,nodeMap){
  let desc=''
     let {type,properties}=node 
    //  人员集合 
     let targetStaffList=properties[approverMap[properties.auditWay].renderSet.desc.prop]
    //  描述配置

    // 审核类型
    let auditType=properties.auditType=='0'?'':  multiplayer[properties.auditType].label

    let nodeTypeDesc=approverMap[properties.auditWay].renderSet.desc

if(nodeTypeDesc.prop=='approver'){
  targetStaffList.forEach(item => {
    desc+=(item[nodeTypeDesc.nameProp]+',')
  });
if(auditType){
  desc=targetStaffList.length+'人'
}
}

// 附加审核类型
desc+=auditType


    return desc
}