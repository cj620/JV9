/*
 * @Author: C.
 * @Date: 2021-10-11 16:25:27
 * @LastEditTime: 2021-10-15 16:13:15
 * @Description: file content
 */
// 主管级数
const directorLevel=(count=10)=>{
  let result=[]
  for(let i=1;i<=count;i++){
    result.push({
      label:'第'+i+'级主管',
      value:i
    })
  }
  return result
}
export const approverMap={
  // 指定成员
  '0':{
    label:'指定成员',
    value:'0',
    renderSet:{
      addStaff:true,
      // 人数可能为多人
      multiplayer:false,
      desc:{
        prop:'approver',
        nameProp:'userCode',
        nameLabel:'userName'
      }
    }
  },
  '1':{
    label:'发起人自选',
    value:'1',
    renderSet:{}
  },
  '2':{
    label:'连续多级主管',
    value:'2',
    renderSet:{
      desc:{
        prop:'',
        nameProp:'userCode',
        nameLabel:'userName'
      }
    }
  },
  '3':{
    label:'部门主管',
    value:'3',
    renderSet:{
      // 选择主管
      directorSelect:true,
      // 主管级数
      directorList:directorLevel(20),
      multiplayer:true,
      desc:{
        prop:'',
        nameProp:'userCode',
        nameLabel:'userName'
      }
    }
  },
  '4':{
    label:'直属主管',
    value:'4',
    renderSet:{
      desc:{
        prop:'',
        nameProp:'userCode',
        nameLabel:'userName'
      }
    }
  },
  '5':{
    label:'角色',
    value:'5',
    renderSet:{
      addRole:true,
      desc:{
        prop:'',
        nameProp:'userCode',
        nameLabel:'userName'
      }
    }
  },
  '6':{
    label:'发起人自己',
    value:'6',
    renderSet:{
      desc:{
        prop:'',
        nameProp:'userCode',
        nameLabel:'userName'
      }
    }
  },
}
