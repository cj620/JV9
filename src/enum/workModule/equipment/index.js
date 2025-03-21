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
import i18n from "@/i18n/i18n";
import {exp} from "qrcode/lib/core/galois-field";

export const machineCategoryEnum = {
    // 设备
    Machine: {
      name: i18n.t("production.Pr_Equipment"),
      value: "Machine",
    },
    // 模具
    Tooling: {
        name: i18n.t("Generality.Ge_Tooling"),
        value: "Tooling",
      },
      // 量具
    MeasuringTool: {
        name: i18n.t("Generality.Ge_MeasuringTool"),
        value: "MeasuringTool",
      },
      // 夹具
      Fixture: {
        name: i18n.t("Generality.Ge_Fixture"),
        value: "Fixture",
      },
  };

//   保养方式：
//   定时保养(FixedDate)，
//   定量保养(FixedUsedTime)

export const maintenanceEnum = {
    // 定时保养
    FixedDate: {
      name: i18n.t("device.De_RegularMaintenance"),
      value: "FixedDate",
    },
    // 定量保养
    FixedUsedTime: {
      name: i18n.t("device.De_QuantitativeMaintenance"),
      value: "FixedUsedTime",
    },
    // 临时保养
    Temporary: {
      name: i18n.t("device.De_TemporaryMaintenance"),
      value: "Temporary",
    }
  };
  // 设备状态
  export const deviceStateEnum = {
    // 正常
    Normal: {
      name: "正常",
      value: "Normal",
    },
    // 报废
    Scrap: {
      name: "报废",
      value: "Scrap",
    },
    // 维修中
    Repairing: {
      name: "维修中",
      value: "Repairing",
    },
    // 保养中
    Maintenanceing: {
      name: "保养中",
      value: "Maintenanceing",
    },
  };
// 1． 故障维修（FaultRepair)
// 2． 精度校准(PrecisionRepair)

export const repairEnum = {
  // 故障维修
  FaultRepair: {
    name: i18n.t("device.De_FaultRepair"),
    value: "FaultRepair",
  },
  // 精度校准
  PrecisionRepair: {
      name: i18n.t("device.De_PrecisionRepair"),
      value: "PrecisionRepair",
    },
};


export const scrapEnum = {
  // 故障维修
  scrap1: {
    name: i18n.t("device.De_Type1"),
    value: "scrap1",
  },
  // 精度校准
  scrap2: {
      name: i18n.t("device.De_Type2"),
      value: "scrap2",
    },
};


//   出入库状态：
//   入库(InPut)，
//   出库(OutPut)
export const inventoryStateEnum = {
  // 入库
  InPut: {
    name: i18n.t("purchase.Pu_EnterStorage"),
    value: "InPut",
  },
  // 出库
  OutPut: {
    name: i18n.t("purchase.Pu_OutStorage"),
    value: "OutPut",
  },
};

// 保养方案状态
export const maintenancePlanEnum = {
    // 启用
    Using: {
        name: i18n.t("Generality.Ge_Enable"),
        value: "Using",
    },
    // 停用
    Disable: {
        name: i18n.t("production.Pr_StopUse"),
        value: "Disable",
    }
}

//保养状态
export const maintenanceStateEnum ={
    //待保养
    ToBeMaintenance: {
        name: i18n.t("device.De_ToBeMaintained"),
        value: "ToBeMaintenance",
        color: "#909399",
        fcolor: "#fff",
    },
    //保养中
    Maintenanceing: {
        name: i18n.t("device.De_Maintaining"),
        value: "Maintenanceing",
        color: "#faad14",
        fcolor: "#fff",
    },
    //已保养
    Maintenanceed: {
        name: i18n.t("device.De_Maintained"),
        value: "Maintenanceed",
        color: "#FE222D",
        fcolor: "#fff",
    }
}

// 维修状态
export const repairStateEnum = {
  // 待维修
  ToBeRepair: {
    name: i18n.t("device.De_ToBeRepair"),
    value: "ToBeRepair",
    color: "#A8B6EF",
    fcolor: "#fff",
  },
  // 维修中
  Repairing: {
    name: i18n.t("device.De_Repairing"),
    value: "Repairing",
    color: "#FFCC66",
    fcolor: "#fff",
  },
  // 已打回
  BackTo: {
    name: i18n.t("device.De_BackTo"),
    value: "BackTo",
    color: "#7A7D84",
    fcolor: "#fff",
  },
  // 已验收
  Accepted: {
    name: i18n.t("device.De_Accepted"),
    value: "Accepted",
    color: "#96DE6C",
    fcolor: "#fff",
  },
  // 已维修
  Repaired: {
    name: i18n.t("device.De_Repaired"),
    value: "Repaired",
    color: "#FF6666",
    fcolor: "#fff",
  },
};

// 维修类型
export const repairEnum1 = {
  //自修
  FaultRepair: {
    name: i18n.t("device.De_SelfRepair"),
    value: "FaultRepair",
    color: "#FAAD14",
    fcolor: "#fff",
  },
  //委外维修
  PrecisionRepair: {
    name: i18n.t("device.De_OutsourcedRepair"),
    value: "PrecisionRepair",
    color: "#CCCCFF",
    fcolor: "#fff",
  },
};

// 维修结果
export const repairResultEnum = {
  //完成
  Complete: {
    name: i18n.t("Generality.Ge_Completed"),
    value: "Complete",
  },
  //无法修复
  BeyondRepair: {
    name: i18n.t("device.De_BeyondRepair"),
    value: "BeyondRepair",
  },
};

// 报修配件状态
export const repairItemState = {
  //   待领用
  ToBeCollected: {
    name: i18n.t("device.De_ToBeCollected"),
    value: "ToBeCollected",
  },
  // 部分领用
  PartialRequisition: {
    name: i18n.t("device.De_PartialRequisition"),
    value: "PartialRequisition",
  },
  //   已领用
  Collected: {
    name: i18n.t("device.De_Collected"),
    value: "Collected",
  }
}

// 修理等级枚举
export const repairLevelEnum = {
    /// 普通
    'Ordinary': {
        name: i18n.t("Generality.Ge_Ordinary"),
        value: 'Ordinary',
        color: '#4bc0ac',
        fcolor: "#fff",
    },
    /// 紧急
    'Urgent': {
        name: i18n.t("Generality.Ge_Urgent"),
        value: 'Urgent',
        color: '#f48b56',
        fcolor: "#fff",
    },
    /// 特急
    'ExtraUrgent': {
        name: i18n.t("Generality.Ge_ExtraUrgent"),
        value: 'ExtraUrgent',
        color: '#f76368',
        fcolor: "#fff",
    },
}

// 报废类型枚举
export const ScrapCategoryEnum = {
    // 损坏报废
    'DamageScrap': {
        name: i18n.t("device.De_DamageScrap"),
        value: "DamageScrap",
    },
    // 到期报废
    'DueScrap': {
        name: i18n.t("device.De_DueScrap"),
        value: "DueScrap",
    },
}

// 领料类别
export const PickingTypeEnum1 = {
    // 保养
    'Maintenance': {
        name: i18n.t("device.De_Maintenance"),
        value: "Maintenance",
    },
    // 维修
    'Repair': {
        name: i18n.t("device.De_Repair"),
        value: "Repair",
    }
}
