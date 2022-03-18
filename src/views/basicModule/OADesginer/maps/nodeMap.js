/*
 * @Author: C.
 * @Date: 2021-10-09 10:40:21
 * @LastEditTime: 2022-01-14 10:04:10
 * @Description: file content
 */
import { approverMap } from "./approverMap";
export const nodeMap={
  // 发起人
  'start':{
    // 节点类型
    type:'start',
    // 此节点类型是否可以被创建
    canCreate:false,
    // 此节点的信息是否可以被编辑（节点标题，节点删除等）
    canEdit:false,
    // 卡片类型携带的信息
    card:{
      color:'#576A95',
      icon:'',
      title:'发起人',
    },
    description:{
      
    },
    nodeSet:approverMap
  },
  // 抄送人
  'notifier':{
    type:'notifier',
    canCreate:true,
    canEdit:true,
    card:{
      color:'rgb(50, 150, 250)',
      icon:'el-icon-s-promotion',
      title:'抄送人'
    },
    description:['notifier'],
    nodeSet:approverMap
  },
  // 审核人
  'approver':{
    type:'approver',
    canCreate:true,
    canEdit:true,
    card:{
      color:'rgb(255, 148, 62)',
      icon:'el-icon-s-check',
      title:i18n.t("Generality.Ge_Auditor")
    },
    description:['approver','deptDirector','auditType'],
    nodeSet:approverMap
  },
}