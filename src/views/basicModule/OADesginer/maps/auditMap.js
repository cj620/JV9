/*
 * @Author: C.
 * @Date: 2021-10-12 11:00:24
 * @LastEditTime: 2021-10-14 13:58:19
 * @Description: file content
 */
 const multiplayer={
  '0':{
    label:'依次审批',
    des:'',
    value:'0'
  },
  '1':{
    label: i18n.t('setup.JointlySign'),
    des: i18n.t('setup.JointlySignDes'),
    value:'1'
  },
  '2':{
    label: i18n.t('setup.OptionallySign'),
    des: i18n.t('setup.OptionallySignDes'),
    value:'2'
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
