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
    label: i18n.t('setup.JointlySign'),
    des: i18n.t('setup.JointlySignDes'),
    value:'JointlySign',
    color:'rgb(255, 148, 62)',
  },
  'OptionallySign':{
    label: i18n.t('setup.OptionallySign'),
    des: i18n.t('setup.OptionallySignDes'),
    value:'OptionallySign',
    color:'rgb(50, 150, 250)',
  }
}

// 审批类型
 const auditMap={
  'multiplayer':{
    title: i18n.t('setup.multiplayerMode'),
    list:multiplayer
  }
}

export{
  multiplayer,
  auditMap
}
