/*
 * @Author: C.
 * @Date: 2021-10-13 09:15:34
 * @LastEditTime: 2022-06-28 17:07:51
 * @Description: file content
 */
import { approverMap } from "../maps/approverMap";
import { multiplayer } from "../maps/auditMap";
export function handleDescription(nodeItem){
  const type=nodeItem.ApproverType
  let desc=''
  // console.log(nodeItem,1111111111111111111111);
  if(type=="Personnel"){
    desc=handleUserDes(nodeItem.ApproveType,nodeItem.ApproveNodeUserDefs)
  }else if(type=='Role'){
    
    desc=nodeItem.ApproverRole 
    // console.log(nodeItem,1111111111111111111111);
  }


    return desc==''?'--':desc
}


function handleUserDes(type,userList=[],len=userList?.length??0){
  if(len==0) return '--'
  let desc=''

  if(len==1){
    desc=userList[0].UserName
  }else if(len<=5){
    desc=userList.map(item=>item.UserName).join(',')
  }else if(len>5){
    // desc+=`${len}人【${multiplayer[type].label}】`
    desc=`${userList.slice(0,5).map(item=>item.UserName).join(',')}等${len}人`
  }
  return desc
}