/*
 * @Author: C.
 * @Date: 2021-10-09 10:54:39
 * @LastEditTime: 2021-10-11 16:07:11
 * @Description: file content
 */
import { defaultNodeList,childNodeConstructor } from "./nodeConstructor";
 class Process{
  nodeConfig=null
  constructor(){
    this.nodeConfig=defaultNodeList()
  }
  print=()=>{
    console.log(this.nodeConfig);
  }
  // 创建节点
  createNode=(Id,type)=>{
    let findPos=  this.nodeConfig.findIndex(item=>item.nodeId==Id)
    if(findPos>=0){
      this.nodeConfig.splice(findPos+1,0,childNodeConstructor(type))
    }
  }
  // 删除节点
  delNode=(Id)=>{
    let findPos=  this.nodeConfig.findIndex(item=>item.nodeId==Id)
    if(findPos>=0){
      this.nodeConfig.splice(findPos,1)
    }
  }
}

export default Process