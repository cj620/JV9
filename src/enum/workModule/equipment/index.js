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
  };
  // 设备状态
  export const deviceStateEnum = {
    // 正常
    Normal: {
      name: i18n.t("production.Pr_Normal"),
      value: "Normal",
    },
    // 报废
    Scrap: {
        name: i18n.t("quality.Qc_Scrapped"),
        value: "Scrap",
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
