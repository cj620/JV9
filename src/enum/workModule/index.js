/*
 * @Author: your name
 * @Date: 2021-11-03 15:54:14
 * @LastEditTime: 2021-11-24 16:06:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\workModule\index.js
 */
import { stateEnum, demandStatusEnum } from "./Generality";
import { pickingTypeEnum, splitAssembleTypeEnum } from "./Stockroom";
import {
  projectTypeEnum,
  processTypeEnum,
  taskTypeEnum,
  taskStateEnum,
} from "./project/projectTask";
import {
  LevelEnum,
  ProcessState,
  ProductionTaskState,
  WorkRecordsStateEnum,
} from "./production";
import {
  StateEnum,
  ProcessingResult,
  CheckResulteEnum,
  QcType,
  ProcessCheckTypeEnum,
  FinishedProductCheckType,
} from "./quality";
import {
  machineCategoryEnum,
  maintenanceEnum,
  deviceStateEnum,
  repairEnum,
  scrapEnum,
  inventoryStateEnum,
  maintenancePlanEnum,
  maintenanceStateEnum,
  repairStateEnum,
  repairEnum1,
  repairResultEnum,
  repairItemState,
} from "./equipment";
export { enumToList, enumFilter } from "@/jv_doc/utils/system/enumsPlugin";
export {
  // 单据状态枚举
  stateEnum,
  // 物料需求状态枚举
  demandStatusEnum,
  // 领料状态枚举
  pickingTypeEnum,
  // 物料拆装类别枚举
  splitAssembleTypeEnum,
  // 项目类别枚举
  projectTypeEnum,
  // 工序类别枚举
  processTypeEnum,
  // 任务类别枚举
  taskTypeEnum,
  // 任务状态枚举
  taskStateEnum,
  // 生产任务级别状态
  LevelEnum,
  // 生产任务加工单状态
  ProcessState,
  // 工序状态
  ProductionTaskState,
  // 加工记录状态
  WorkRecordsStateEnum,
  // 检测结果枚举
  StateEnum,
  //零件成品检验枚举
  ProcessingResult,
  //检验状态枚举
  CheckResulteEnum,
  //质检类别枚举
  QcType,
  //过程检验类型
  ProcessCheckTypeEnum,
  //零件成品检验类型
  FinishedProductCheckType,
  // 设备类型
  machineCategoryEnum,
  // 设备维护方式
  maintenanceEnum,
  // 设备状态
  deviceStateEnum,
  // 报修类型
  repairEnum,
  // 报废类别
  scrapEnum,
  // 出入库状态枚举
  inventoryStateEnum,
  // 保养方案状态
  maintenancePlanEnum,
  // 保养状态
  maintenanceStateEnum,
  // 维修状态
  repairStateEnum,
  // 维修类型
  repairEnum1,
  // 维修结果
  repairResultEnum,
  // 报修配件状态
  repairItemState
};
