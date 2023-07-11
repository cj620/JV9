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
  //成品检验枚举
  ProcessingResult,
  //检验状态枚举
  CheckResulteEnum,
  //质检类别枚举
  QcType,
  //过程检验类型
  ProcessCheckTypeEnum,
  //成品检验类型
  FinishedProductCheckType,
};
