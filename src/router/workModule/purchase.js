/*
 * @Author: H.
 * @Date: 2021-11-09 09:08:00
 * @LastEditTime: 2022-01-13 14:34:54
 * @Description:采购模块
 */

import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

// 采购模块
const purchase = [
  // 采购
  {
    key: "Pu_Purchase",
    Parent: null,
    name: "Purchase",
    path: "purchase",
    component: Layout,
    title: i18n.t("menu.Pu_Purchase"),
    icon: "purchase",
  },
  // 采购申请
  {
    key: "Pu_Requisition",
    component: () => import("@/views/workModule/purchase/requisition/List"),
    Parent: "Pu_Purchase",
    name: "Pu_Requisition",
    path: "pu_Requisition",
    title: i18n.t("menu.Pu_Requisition"),
  },
  // 新增采购申请
  {
    key: "Pu_Requisition_Add",
    component: () => import("@/views/workModule/purchase/requisition/add"),
    Parent: "Pu_Purchase",
    name: "Pu_Requisition_Add",
    path: "pu_Requisition_Add",
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Pu_Requisition"),
    hidden: true,
  },
  // 编辑采购申请
  {
    key: "Pu_Requisition_Edit",
    component: () => import("@/views/workModule/purchase/requisition/edit"),
    Parent: "Pu_Purchase",
    name: "Pu_Requisition_Edit",
    path: "pu_Requisition_Edit",
    title: i18n.t("Generality.Ge_Edit") + " " + i18n.t("menu.Pu_Requisition"),
    hidden: true,
  },
  // 采购申请详情
  {
    key: "Pu_Requisition_Detail",
    component: () => import("@/views/workModule/purchase/requisition/details"),
    Parent: "Pu_Purchase",
    name: "Pu_Requisition_Detail",
    path: "pu_Requisition_Detail",
    title:
      i18n.t("menu.Pu_Requisition") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },

  // 采购申请明细
  {
    key: "Pu_Requisition_Detail_list",
    component: () => import("@/views/workModule/purchase/requisition/DetailsList"),
    Parent: "Pu_Purchase",
    name: "Pu_Requisition_Detail_list",
    path: "pu_Requisition_Detail_list",
    title:
      i18n.t("menu.Pu_Requisition") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 采购订单
  {
    key: "Pu_Order",
    component: () => import("@/views/workModule/purchase/order/List"),
    Parent: "Pu_Purchase",
    name: "Pu_Order",
    path: "pu_Order",
    title: i18n.t("menu.Pu_Order"),
  },
  // 新增订单
  {
    key: "Pu_Order_Add",
    component: () => import("@/views/workModule/purchase/order/add"),
    Parent: "Pu_Purchase",
    name: "Pu_Order_Add",
    path: "pu_Order_Add",
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Pu_Order"),
    hidden: true,
  },
  // 编辑订单
  {
    key: "Pu_Order_Edit",
    component: () => import("@/views/workModule/purchase/order/edit"),
    Parent: "Pu_Purchase",
    name: "Pu_Order_Edit",
    path: "pu_Order_Edit",
    title: i18n.t("Generality.Ge_Edit") + " " + i18n.t("menu.Pu_Order"),
    hidden: true,
  },
  // 采购订单详情
  {
    key: "Pu_Order_Detail",
    component: () => import("@/views/workModule/purchase/order/details"),
    Parent: "Pu_Purchase",
    name: "Pu_Order_Detail",
    path: "pu_Order_Detail",
    title: i18n.t("menu.Pu_Order") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 采购订单明细
  {
    key: "Pu_Order_Detail_list",
    component: () => import("@/views/workModule/purchase/order/DetailsList"),
    Parent: "Pu_Purchase",
    name: "Pu_Order_Detail_list",
    path: "pu_Order_Detail_list",
    title:
      i18n.t("menu.Pu_Order") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 采购入库
  {
    key: "Pu_StockIn",
    component: () => import("@/views/workModule/purchase/stockIn/List"),
    Parent: "Pu_Purchase",
    name: "Pu_StockIn",
    path: "pu_StockIn",
    title: i18n.t("menu.Pu_StockIn"),
  },
  // 新增采购入库
  {
    key: "Pu_StockIn_Add",
    component: () => import("@/views/workModule/purchase/stockIn/add"),
    Parent: "Pu_Purchase",
    name: "Pu_StockIn_Add",
    path: "pu_StockIn_Add",
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Pu_StockIn"),
    hidden: true,
  },
  // 编辑采购入库
  {
    key: "Pu_StockIn_Edit",
    component: () => import("@/views/workModule/purchase/stockIn/edit"),
    Parent: "Pu_Purchase",
    name: "Pu_StockIn_Edit",
    path: "pu_StockIn_Edit",
    title: i18n.t("Generality.Ge_Edit") + " " + i18n.t("menu.Pu_StockIn"),
    hidden: true,
  },
  // 采购入库详情
  {
    key: "Pu_StockIn_Detail",
    component: () => import("@/views/workModule/purchase/stockIn/details"),
    Parent: "Pu_Purchase",
    name: "Pu_StockIn_Detail",
    path: "pu_StockIn_Detail",
    title: i18n.t("menu.Pu_StockIn") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 采购入库明细
  {
    key: "Pu_StockIn_Detail_list",
    component: () => import("@/views/workModule/purchase/stockIn/DetailsList"),
    Parent: "Pu_Purchase",
    name: "Pu_StockIn_Detail_list",
    path: "pu_StockIn_Detail_list",
    title:
      i18n.t("menu.Pu_StockIn") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 采购退货
  {
    key: "Pu_Return",
    component: () => import("@/views/workModule/purchase/return/List"),
    Parent: "Pu_Purchase",
    name: "Pu_Return",
    path: "pu_Return",
    title: i18n.t("menu.Pu_Return"),
  },
  // 新增采购退货单
  {
    key: "Pu_Return_Add",
    component: () => import("@/views/workModule/purchase/return/Add"),
    Parent: "Pu_Purchase",
    name: "Pu_Return_Add",
    path: "pu_Return_Add",
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Pu_Return"),
    hidden: true,
  },
  // 编辑采购退货单
  {
    key: "Pu_Return_Edit",
    component: () => import("@/views/workModule/purchase/return/Edit"),
    Parent: "Pu_Purchase",
    name: "Pu_Return_Edit",
    path: "pu_Return_Edit",
    title: i18n.t("Generality.Ge_Edit") + " " + i18n.t("menu.Pu_Return"),
    hidden: true,
  },
  // 采购退货单详情
  {
    key: "Pu_Return_Detail",
    component: () => import("@/views/workModule/purchase/return/Details"),
    Parent: "Pu_Purchase",
    name: "Pu_Return_Detail",
    path: "pu_Return_Detail",
    title: i18n.t("menu.Pu_Return") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 采购退货明细
  {
    key: "Pu_Return_Detail_list",
    component: () => import("@/views/workModule/purchase/return/DetailsList"),
    Parent: "Pu_Purchase",
    name: "Pu_Return_Detail_list",
    path: "pu_Return_Detail_list",
    title:
      i18n.t("menu.Pu_Return") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 采购对账
  {
    key: "Pu_Account",
    component: () => import("@/views/workModule/purchase/account/List"),
    Parent: "Pu_Purchase",
    name: "Pu_Account",
    path: "pu_Account",
    title: i18n.t("menu.Pu_Account"),
  },
  // 新增采购对账
  {
    key: "Pu_Account_Add",
    component: () => import("@/views/workModule/purchase/account/add"),
    Parent: "Pu_Purchase",
    name: "Pu_Account_Add",
    path: "pu_Account_Add",
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Pu_Account"),
    hidden: true,
  },
  // 编辑采购对账
  {
    key: "Pu_Account_Edit",
    component: () => import("@/views/workModule/purchase/account/edit"),
    Parent: "Pu_Purchase",
    name: "Pu_Account_Edit",
    path: "pu_Account_Edit",
    title: i18n.t("Generality.Ge_Edit") + " " + i18n.t("menu.Pu_Account"),
    hidden: true,
  },
  // 采购对账详情
  {
    key: "Pu_Account_Detail",
    component: () => import("@/views/workModule/purchase/account/details"),
    Parent: "Pu_Purchase",
    name: "Pu_Account_Detail",
    path: "pu_Account_Detail",
    title: i18n.t("menu.Pu_Account") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },

  // 委外加工
  {
    key: "Pu_Outsourcing",
    component: () => import("@/views/workModule/purchase/outsourcing/List"),
    Parent: "Pu_Purchase",
    name: "Pu_Outsourcing",
    path: "pu_Outsourcing",
    title: i18n.t("menu.Pu_Outsourcing"),
  },
  // 新增委外加工
  {
    key: "Pu_Outsourcing_Add",
    component: () => import("@/views/workModule/purchase/outsourcing/add"),
    Parent: "Pu_Purchase",
    name: "Pu_Outsourcing_Add",
    path: "pu_Outsourcing_Add",
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Pu_Outsourcing"),
    hidden: true,
  },
  // 编辑委外加工
  {
    key: "Pu_Outsourcing_Edit",
    component: () => import("@/views/workModule/purchase/outsourcing/edit"),
    Parent: "Pu_Purchase",
    name: "Pu_Outsourcing_Edit",
    path: "pu_Outsourcing_Edit",
    title: i18n.t("Generality.Ge_Edit") + " " + i18n.t("menu.Pu_Outsourcing"),
    hidden: true,
  },
  // 委外加工详情
  {
    key: "Pu_Outsourcing_Detail",
    component: () => import("@/views/workModule/purchase/outsourcing/details"),
    Parent: "Pu_Purchase",
    name: "Pu_Outsourcing_Detail",
    path: "pu_Outsourcing_Detail",
    title:
      i18n.t("menu.Pu_Outsourcing") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 委外加工明细
  {
    key: "Pu_Outsourcing_Detail_list",
    component: () => import("@/views/workModule/purchase/outsourcing/DetailsList"),
    Parent: "Pu_Purchase",
    name: "Pu_Outsourcing_Detail_list",
    path: "pu_Outsourcing_Detail_list",
    title:
      i18n.t("menu.Pu_Outsourcing") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 供应商评估
  {
    key: "Pu_SupplierEvaluation",
    component: () => import("@/views/workModule/purchase/outsourcing/view/SupplierEvaluation"),
    Parent: "Pu_Purchase",
    name: "Pu_SupplierEvaluation",
    path: "Pu_SupplierEvaluation",
    title:i18n.t("purchase.Pu_SupplierEvaluation"),
    hidden: true,
  },
  // 委外对账
  {
    key: "Pu_OutsourcingAccount",
    component: () =>
      import("@/views/workModule/purchase/outsourcingAccount/List"),
    Parent: "Pu_Purchase",
    name: "Pu_OutsourcingAccount",
    path: "pu_OutsourcingAccount",
    title: i18n.t("menu.Pu_OutsourcingAccount"),
  },
  // 新增委外对账
  {
    key: "Pu_OutsourcingAccount_Add",
    component: () =>
      import("@/views/workModule/purchase/outsourcingAccount/add"),
    Parent: "Pu_Purchase",
    name: "Pu_OutsourcingAccount_Add",
    path: "pu_OutsourcingAccount_Add",
    title:
      i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Pu_OutsourcingAccount"),
    hidden: true,
  },
  // 编辑委外对账
  {
    key: "Pu_OutsourcingAccount_Edit",
    component: () =>
      import("@/views/workModule/purchase/outsourcingAccount/edit"),
    Parent: "Pu_Purchase",
    name: "Pu_OutsourcingAccount_Edit",
    path: "pu_OutsourcingAccount_Edit",
    title:
      i18n.t("Generality.Ge_Edit") + " " + i18n.t("menu.Pu_OutsourcingAccount"),
    hidden: true,
  },
  // 委外对账详情
  {
    key: "Pu_OutsourcingAccount_Detail",
    component: () =>
      import("@/views/workModule/purchase/outsourcingAccount/details"),
    Parent: "Pu_Purchase",
    name: "Pu_OutsourcingAccount_Detail",
    path: "pu_OutsourcingAccount_Detail",
    title:
      i18n.t("menu.Pu_OutsourcingAccount") +
      "  " +
      i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 基础数据
  {
    key: "Pu_BaseData",
    component: () => import("@/views/workModule/purchase/baseData"),
    Parent: "Pu_Purchase",
    name: "Pu_BaseData",
    path: "Pu_BaseData",
    title: i18n.t("menu.Sa_BaseData"),
  },
  // 供应商
  {
    key: "Pu_Supplier",
    component: () =>
      import("@/views/workModule/purchase/baseData/supplier/List"),
    Parent: "Pu_BaseData",
    name: "Pu_Supplier",
    path: "Pu_Supplier",
    title: i18n.t("purchase.Pu_Supplier"),
  },
  // 编辑供应商
  {
    key: "Pu_Supplier_Edit",
    component: () =>
      import("@/views/workModule/purchase/baseData/supplier/edit"),
    Parent: "Pu_Purchase",
    name: "Pu_Supplier_Edit",
    path: "pu_Supplier_Edit",
    title: i18n.t("Generality.Ge_Edit") + " " + i18n.t("purchase.Pu_Supplier"),
    hidden: true,
  },
  // 新增供应商
  {
    key: "Pu_Supplier_Add",
    component: () =>
      import("@/views/workModule/purchase/baseData/supplier/new"),
    Parent: "Pu_Purchase",
    name: "Pu_Supplier_Add",
    path: "pu_Supplier_Add",
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("purchase.Pu_Supplier"),
    hidden: true,
  },
  // 供应商详情
  {
    key: "Pu_Supplier_Detail",
    component: () =>
      import("@/views/workModule/purchase/baseData/supplier/details"),
    Parent: "Pu_Purchase",
    name: "Pu_Supplier_Detail",
    path: "pu_Supplier_Detail",
    title:
      i18n.t("purchase.Pu_Supplier") + " " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 委外需求
  {
    key: "Pu_OutsourcingRequirement",
    component: () =>
      import("@/views/workModule/purchase/outsourcingRequirement/List"),
    Parent: "Pu_Purchase",
    name: "Pu_OutsourcingRequirement",
    path: "pu_OutsourcingRequirement",
    title: i18n.t("menu.Pu_OutsourcingRequirement"),
  },
];

export default purchase;
