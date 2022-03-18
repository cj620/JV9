/*
 * @Author: H.
 * @Date: 2021-11-09 13:05:07
 * @LastEditTime: 2021-12-01 15:51:50
 * @Description:仓库模块
 */

import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

// 仓库模块
const stockroom = [
  // 仓库
  {
    key: "St_Stockroom",
    Parent: null,
    name: "Stockroom",
    path: "stockroom",
    component: Layout,
    title: i18n.t("menu.St_Stockroom"),
    icon: 'storehouse',
  },
  // 其它出库
  {
    key: "St_OtherOut",
    component: () => import("@/views/workModule/stockroom/otherOut/List"),
    Parent: "St_Stockroom",
    name: "OtherOut",
    path: "otherOut",
    title: i18n.t("menu.St_OtherOut"),
  },
  // 新增其它出库
  {
    key: "St_OtherOut_Add",
    component: () => import("@/views/workModule/stockroom/otherOut/Add"),
    Parent: "St_Stockroom",
    name: "St_OtherOut_Add",
    path: "St_OtherOut_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_OtherOut"),
    hidden: true,
  },
  // 编辑其它出库
  {
    key: "St_OtherOut_Edit",
    component: () => import("@/views/workModule/stockroom/otherOut/Edit"),
    Parent: "St_Stockroom",
    name: "St_OtherOut_Edit",
    path: "St_OtherOut_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_OtherOut"),
    hidden: true,
  },
  // 其它出库详情
  {
    key: "St_OtherOut_Details",
    component: () => import("@/views/workModule/stockroom/otherOut/Details"),
    Parent: "St_Stockroom",
    name: "St_OtherOut_Details",
    path: "St_OtherOut_Details",
    title: i18n.t("menu.St_OtherOut") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 其它出库明细
  {
    key: "St_OtherOut_Detail_list",
    component: () => import("@/views/workModule/stockroom/otherOut/DetailsList"),
    Parent: "St_Stockroom",
    name: "St_OtherOut_Detail_list",
    path: "St_OtherOut_Detail_list",
    title:
      i18n.t("menu.St_OtherOut") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 其它入库
  {
    key: "St_OtherIn",
    component: () => import("@/views/workModule/stockroom/otherIn/List"),
    Parent: "St_Stockroom",
    name: "OtherIn",
    path: "otherIn",
    title: i18n.t("menu.St_OtherIn"),
  },
  // 新增其它入库
  {
    key: "St_OtherIn_Add",
    component: () => import("@/views/workModule/stockroom/otherIn/Add"),
    Parent: "St_Stockroom",
    name: "St_OtherIn_Add",
    path: "St_OtherIn_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_OtherIn"),
    hidden: true,
  },
  // 编辑其它入库
  {
    key: "St_OtherIn_Edit",
    component: () => import("@/views/workModule/stockroom/otherIn/Edit"),
    Parent: "St_Stockroom",
    name: "St_OtherIn_Edit",
    path: "St_OtherIn_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_OtherIn"),
    hidden: true,
  },
  // 其它入库详情
  {
    key: "St_OtherIn_Details",
    component: () => import("@/views/workModule/stockroom/otherIn/Details"),
    Parent: "St_Stockroom",
    name: "St_OtherIn_Details",
    path: "St_OtherIn_Details",
    title: i18n.t("menu.St_OtherIn") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 其它入库明细
  {
    key: "St_OtherIn_Detail_list",
    component: () => import("@/views/workModule/stockroom/otherIn/DetailsList"),
    Parent: "St_Stockroom",
    name: "St_OtherIn_Detail_list",
    path: "St_OtherIn_Detail_list",
    title:
      i18n.t("menu.St_OtherIn") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 生产领料
  {
    key: "St_Picking",
    component: () => import("@/views/workModule/stockroom/picking/List"),
    Parent: "St_Stockroom",
    name: "Picking",
    path: "picking",
    title: i18n.t("menu.St_Picking"),
  },
  // 新增生产领料
  {
    key: "St_Picking_Add",
    component: () => import("@/views/workModule/stockroom/picking/Add"),
    Parent: "St_Stockroom",
    name: "St_Picking_Add",
    path: "St_Picking_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_Picking"),
    hidden: true,
  },
  // 编辑生产领料
  {
    key: "St_Picking_Edit",
    component: () => import("@/views/workModule/stockroom/picking/Edit"),
    Parent: "St_Stockroom",
    name: "St_Picking_Edit",
    path: "St_Picking_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_Picking"),
    hidden: true,
  },
  // 生产领料详情
  {
    key: "St_Picking_Details",
    component: () => import("@/views/workModule/stockroom/picking/Details"),
    Parent: "St_Stockroom",
    name: "St_Picking_Details",
    path: "St_Picking_Details",
    title: i18n.t("menu.St_Picking") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },

  // 生产退料
  {
    key: "St_ReturnPicking",
    component: () => import("@/views/workModule/stockroom/returnPicking/List"),
    Parent: "St_Stockroom",
    name: "ReturnPicking",
    path: "returnPicking",
    title: i18n.t("menu.St_ReturnPicking"),
  },
  // 新增生产退料
  {
    key: "St_ReturnPicking_Add",
    component: () => import("@/views/workModule/stockroom/returnPicking/Add"),
    Parent: "St_Stockroom",
    name: "St_ReturnPicking_Add",
    path: "St_ReturnPicking_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_ReturnPicking"),
    hidden: true,
  },
  // 编辑生产退料
  {
    key: "St_ReturnPicking_Edit",
    component: () => import("@/views/workModule/stockroom/returnPicking/Edit"),
    Parent: "St_Stockroom",
    name: "St_ReturnPicking_Edit",
    path: "St_ReturnPicking_Edit",
    title:
      i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_ReturnPicking"),
    hidden: true,
  },
  // 生产退料详情
  {
    key: "St_ReturnPicking_Details",
    component: () =>
      import("@/views/workModule/stockroom/returnPicking/Details"),
    Parent: "St_Stockroom",
    name: "St_ReturnPicking_Details",
    path: "St_ReturnPicking_Details",
    title:
      i18n.t("menu.St_ReturnPicking") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 生产入库
  {
    key: "St_ProduceIn",
    component: () => import("@/views/workModule/stockroom/produceIn/List"),
    Parent: "St_Stockroom",
    name: "ProduceIn",
    path: "produceIn",
    title: i18n.t("menu.St_ProduceIn"),
  },
  // 新增生产入库
  {
    key: "St_ProduceIn_Add",
    component: () => import("@/views/workModule/stockroom/produceIn/Add"),
    Parent: "St_Stockroom",
    name: "St_ProduceIn_Add",
    path: "St_ProduceIn_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_ProduceIn"),
    hidden: true,
  },
  // 编辑生产入库
  {
    key: "St_ProduceIn_Edit",
    component: () => import("@/views/workModule/stockroom/produceIn/Edit"),
    Parent: "St_Stockroom",
    name: "St_ProduceIn_Edit",
    path: "St_ProduceIn_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_ProduceIn"),
    hidden: true,
  },
  // 生产入库详情
  {
    key: "St_ProduceIn_Details",
    component: () => import("@/views/workModule/stockroom/produceIn/Details"),
    Parent: "St_Stockroom",
    name: "St_ProduceIn_Details",
    path: "St_ProduceIn_Details",
    title: i18n.t("menu.St_ProduceIn") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 库存期初
  {
    key: "St_StockInit",
    component: () => import("@/views/workModule/stockroom/stockInit/List"),
    Parent: "St_Stockroom",
    name: "StockInit",
    path: "stockInit",
    title: i18n.t("menu.St_StockInit"),
  },
  // 新增库存期初
  {
    key: "St_StockInit_Add",
    component: () => import("@/views/workModule/stockroom/stockInit/Add"),
    Parent: "St_Stockroom",
    name: "St_StockInit_Add",
    path: "St_StockInit_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_StockInit"),
    hidden: true,
  },
  // 编辑库存期初
  {
    key: "St_StockInit_Edit",
    component: () => import("@/views/workModule/stockroom/stockInit/Edit"),
    Parent: "St_Stockroom",
    name: "St_StockInit_Edit",
    path: "St_StockInit_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_StockInit"),
    hidden: true,
  },
  // 库存期初详情
  {
    key: "St_StockInit_Details",
    component: () => import("@/views/workModule/stockroom/stockInit/Details"),
    Parent: "St_Stockroom",
    name: "St_StockInit_Details",
    path: "St_StockInit_Details",
    title: i18n.t("menu.St_StockInit") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 库存盘点
  {
    key: "St_StockCheck",
    component: () => import("@/views/workModule/stockroom/stockCheck/List"),
    Parent: "St_Stockroom",
    name: "StockCheck",
    path: "stockCheck",
    title: i18n.t("menu.St_StockCheck"),
  },
  // 新增库存盘点
  {
    key: "St_StockCheck_Add",
    component: () => import("@/views/workModule/stockroom/stockCheck/Add"),
    Parent: "St_Stockroom",
    name: "St_StockCheck_Add",
    path: "St_StockCheck_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_StockCheck"),
    hidden: true,
  },
  // 编辑库存盘点
  {
    key: "St_StockCheck_Edit",
    component: () => import("@/views/workModule/stockroom/stockCheck/Edit"),
    Parent: "St_Stockroom",
    name: "St_StockCheck_Edit",
    path: "St_StockCheck_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_StockCheck"),
    hidden: true,
  },
  // 库存盘点详情
  {
    key: "St_StockCheck_Details",
    component: () => import("@/views/workModule/stockroom/stockCheck/Details"),
    Parent: "St_Stockroom",
    name: "St_StockCheck_Details",
    path: "St_StockCheck_Details",
    title:
      i18n.t("menu.St_StockCheck") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 成本调整
  {
    key: "St_CostChange",
    component: () => import("@/views/workModule/stockroom/costChange/List"),
    Parent: "St_Stockroom",
    name: "CostChange",
    path: "costChange",
    title: i18n.t("menu.St_CostChange"),
  },
  // 新增成本调整
  {
    key: "St_CostChange_Add",
    component: () => import("@/views/workModule/stockroom/costChange/Add"),
    Parent: "St_Stockroom",
    name: "St_CostChange_Add",
    path: "St_CostChange_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_CostChange"),
    hidden: true,
  },
  // 编辑成本调整
  {
    key: "St_CostChange_Edit",
    component: () => import("@/views/workModule/stockroom/costChange/Edit"),
    Parent: "St_Stockroom",
    name: "St_CostChange_Edit",
    path: "St_CostChange_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_CostChange"),
    hidden: true,
  },
  // 成本调整详情
  {
    key: "St_CostChange_Details",
    component: () => import("@/views/workModule/stockroom/costChange/Details"),
    Parent: "St_Stockroom",
    name: "St_CostChange_Details",
    path: "St_CostChange_Details",
    title:
      i18n.t("menu.St_CostChange") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 成本调整明细
  {
    key: "St_CostChange_Detail_list",
    component: () => import("@/views/workModule/stockroom/costChange/DetailsList"),
    Parent: "St_Stockroom",
    name: "St_CostChange_Detail_list",
    path: "St_CostChange_Detail_list",
    title:
      i18n.t("menu.St_CostChange") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 物料拆装
  {
    key: "St_SplitAssemble",
    component: () => import("@/views/workModule/stockroom/splitAssemble/List"),
    Parent: "St_Stockroom",
    name: "SplitAssemble",
    path: "splitAssemble",
    title: i18n.t("menu.St_SplitAssemble"),
  },
  // 新增物料拆装
  {
    key: "St_SplitAssemble_Add",
    component: () => import("@/views/workModule/stockroom/splitAssemble/Add"),
    Parent: "St_Stockroom",
    name: "St_SplitAssemble_Add",
    path: "St_SplitAssemble_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_SplitAssemble"),
    hidden: true,
  },
  // 编辑物料拆装
  {
    key: "St_SplitAssemble_Edit",
    component: () => import("@/views/workModule/stockroom/splitAssemble/Edit"),
    Parent: "St_Stockroom",
    name: "St_SplitAssemble_Edit",
    path: "St_SplitAssemble_Edit",
    title:
      i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_SplitAssemble"),
    hidden: true,
  },
  // 物料拆装详情
  {
    key: "St_SplitAssemble_Details",
    component: () =>
      import("@/views/workModule/stockroom/splitAssemble/Details"),
    Parent: "St_Stockroom",
    name: "St_SplitAssemble_Details",
    path: "St_SplitAssemble_Details",
    title:
      i18n.t("menu.St_SplitAssemble") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 调拨
  {
    key: "St_Dispatch",
    component: () => import("@/views/workModule/stockroom/dispatch/List"),
    Parent: "St_Stockroom",
    name: "Dispatch",
    path: "dispatch",
    title: i18n.t("menu.St_Dispatch"),
  },
  // 新增调拨单
  {
    key: "St_Dispatch_Add",
    component: () => import("@/views/workModule/stockroom/dispatch/Add"),
    Parent: "St_Stockroom",
    name: "St_Dispatch_Add",
    path: "St_Dispatch_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_Dispatch"),
    hidden: true,
  },
  // 编辑调拨单
  {
    key: "St_Dispatch_Edit",
    component: () => import("@/views/workModule/stockroom/dispatch/Edit"),
    Parent: "St_Stockroom",
    name: "St_Dispatch_Edit",
    path: "St_Dispatch_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_Dispatch"),
    hidden: true,
  },
  // 调拨单详情
  {
    key: "St_Dispatch_Details",
    component: () => import("@/views/workModule/stockroom/dispatch/Details"),
    Parent: "St_Stockroom",
    name: "St_Dispatch_Details",
    path: "St_Dispatch_Details",
    title: i18n.t("menu.St_Dispatch") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 报损
  {
    key: "St_WasteOut",
    component: () => import("@/views/workModule/stockroom/wasteOut/List"),
    Parent: "St_Stockroom",
    name: "WasteOut",
    path: "wasteOut",
    title: i18n.t("menu.St_WasteOut"),
  },
  // 新增报损单
  {
    key: "St_WasteOut_Add",
    component: () => import("@/views/workModule/stockroom/wasteOut/Add"),
    Parent: "St_Stockroom",
    name: "St_WasteOut_Add",
    path: "St_WasteOut_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_WasteOut"),
    hidden: true,
  },
  // 编辑报损单
  {
    key: "St_WasteOut_Edit",
    component: () => import("@/views/workModule/stockroom/wasteOut/Edit"),
    Parent: "St_Stockroom",
    name: "St_WasteOut_Edit",
    path: "St_WasteOut_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_WasteOut"),
    hidden: true,
  },
  // 报损单详情
  {
    key: "St_WasteOut_Details",
    component: () => import("@/views/workModule/stockroom/wasteOut/Details"),
    Parent: "St_Stockroom",
    name: "St_WasteOut_Details",
    path: "St_WasteOut_Details",
    title: i18n.t("menu.St_WasteOut") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 报损单明细
  {
    key: "St_WasteOut_Detail_list",
    component: () => import("@/views/workModule/stockroom/wasteOut/DetailsList"),
    Parent: "St_Stockroom",
    name: "St_WasteOut_Detail_list",
    path: "St_WasteOut_Detail_list",
    title:
      i18n.t("menu.St_WasteOut") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 报溢
  {
    key: "St_SurplusIn",
    component: () => import("@/views/workModule/stockroom/surplusIn/List"),
    Parent: "St_Stockroom",
    name: "SurplusIn",
    path: "surplusIn",
    title: i18n.t("menu.St_SurplusIn"),
  },
  // 新增报溢单
  {
    key: "St_SurplusIn_Add",
    component: () => import("@/views/workModule/stockroom/surplusIn/Add"),
    Parent: "St_Stockroom",
    name: "St_SurplusIn_Add",
    path: "St_SurplusIn_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.St_SurplusIn"),
    hidden: true,
  },
  // 编辑报溢单
  {
    key: "St_SurplusIn_Edit",
    component: () => import("@/views/workModule/stockroom/surplusIn/Edit"),
    Parent: "St_Stockroom",
    name: "St_SurplusIn_Edit",
    path: "St_SurplusIn_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.St_SurplusIn"),
    hidden: true,
  },
  // 报溢单详情
  {
    key: "St_SurplusIn_Details",
    component: () => import("@/views/workModule/stockroom/surplusIn/Details"),
    Parent: "St_Stockroom",
    name: "St_SurplusIn_Details",
    path: "St_SurplusIn_Details",
    title: i18n.t("menu.St_SurplusIn") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 报损单明细
  {
    key: "St_WasteOut_Detail_list",
    component: () => import("@/views/workModule/stockroom/surplusIn/DetailsList"),
    Parent: "St_Stockroom",
    name: "St_SurplusIn_Detail_list",
    path: "St_SurplusIn_Detail_list",
    title:
      i18n.t("menu.St_SurplusIn") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 统计报表
  {
    key: "St_Report",
    component: () => import("@/views/workModule/stockroom/report/"),
    Parent: "St_Stockroom",
    name: "Report",
    path: "report",
    title: i18n.t("menu.St_Report"),
  },
  // 结存汇总
  {
    key: "St_StockSummary",
    component: () =>
      import("@/views/workModule/stockroom/report/stockSummary/List"),
    Parent: "St_Report",
    name: "StockSummary",
    path: "stockSummary",
    title: i18n.t("menu.St_StockSummary"),
  },
  // 基础数据
  {
    key: "St_BaseData",
    Parent: "St_Stockroom",
    name: "stBaseData",
    path: "stBaseData",
    component: () => import("@/views/workModule/stockroom/baseData"),
    title: i18n.t("menu.Sa_BaseData"),
  },
  // 仓库
  {
    key: "St_StockroomInfo",
    component: () =>
      import("@/views/workModule/stockroom/baseData/stockroomInfo/List"),
    Parent: "St_BaseData",
    name: "StockroomInfo",
    path: "stockroomInfo",
    title: i18n.t("menu.StockroomInfo"),
  },
];

export default stockroom;
