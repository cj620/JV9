/*
 * @Author: C. cj6209577@sina.com
 * @Date: 2022-05-30 11:03:10
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-06-03 17:49:21
 * @FilePath: \jvmmsv9-1front\src\enum\workModule\equipment\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 设备类别：
// 设备（Machine），
// 模具(Tooling)，
// 量具(MeasuringTool)，
// 夹具(Fixture)
export const machineCategoryEnum = {
    // 设备
    Machine: {
      name: '设备',
      value: "Machine",
    },
    // 模具
    Tooling: {
        name: '模具',
        value: "Tooling",
      },
      // 量具
    MeasuringTool: {
        name: '量具',
        value: "MeasuringTool",
      },
      // 夹具
      Fixture: {
        name: '夹具',
        value: "Fixture",
      },
  };

//   保养方式：
//   定时保养(FixedDate)，
//   定量保养(FixedUsedTime)

export const maintenanceEnum = {
    // 定时保养
    FixedDate: {
      name: '定时保养',
      value: "FixedDate",
    },
    // 定量保养
    FixedUsedTime: {
        name: '定量保养',
        value: "FixedUsedTime",
      },
  };
  // 设备状态
  export const deviceStateEnum = {
    // 正常
    Normal: {
      name: '正常',
      value: "Normal",
    },
    // 报废
    Scrap: {
        name: '报废',
        value: "Scrap",
      },
  };
// 1． 故障维修（FaultRepair)
// 2． 精度校准(PrecisionRepair)

export const repairEnum = {
  // 故障维修
  FaultRepair: {
    name: '故障维修',
    value: "FaultRepair",
  },
  // 精度校准
  PrecisionRepair: {
      name: '精度校准',
      value: "PrecisionRepair",
    },
};


export const scrapEnum = {
  // 故障维修
  scrap1: {
    name: '类别一',
    value: "scrap1",
  },
  // 精度校准
  scrap2: {
      name: '类别二',
      value: "scrap2",
    },
};


//   出入库状态：
//   入库(InPut)，
//   出库(OutPut)
export const inventoryStateEnum = {
  // 入库
  InPut: {
    name: '入库',
    value: "InPut",
  },
  // 出库
  OutPut: {
    name: '出库',
    value: "OutPut",
  },
};
