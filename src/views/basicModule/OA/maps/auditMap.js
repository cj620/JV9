/*
 * @Author: C.
 * @Date: 2021-10-12 11:00:24
 * @LastEditTime: 2022-06-28 17:03:00
 * @Description: file content
 */
 const multiplayer={
  // '0':{
  //   label:'依次审批',
  //   des:'',
  //   value:'0'
  // },
  'JointlySign':{
    label:'会签',
    des:'（须所有审批人同意）',
    value:'JointlySign',
    color:'rgb(255, 148, 62)',
  },
  'OptionallySign':{
    label:'或签',
    des:'（一名审批人同意或拒绝即可）',
    value:'OptionallySign',
    color:'rgb(50, 150, 250)',
  }
}

// 审批类型
 const auditMap={
  'multiplayer':{
    title:'多人审批时采用的审批方式',
    list:multiplayer
  }
}

export{
  multiplayer,
  auditMap
}