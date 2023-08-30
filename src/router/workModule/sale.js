/*
 * @Author: your name
 * @Date: 2021-10-29 17:42:05
 * @LastEditTime: 2022-03-01 11:09:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\router\workModule\sale.js
 */
import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

// 销售模块
const sale = [
  // 销售
  {
    key: "Sa_Sale",
    Parent: null,
    name: "Sale",
    path: "sale",
    component: Layout,
    title: i18n.t("menu.Sa_Sale"),
    icon: 'sales',
  },
  // 销售报价
  {
    key: "Sa_SaleQuote",
    component: () => import("@/views/workModule/sale/saleQuote/List"),
    Parent: "Sa_Sale",
    name: "Sa_SaleQuote",
    path: "sa_SaleQuote",
    title: i18n.t("menu.Sa_SaleQuote"),
  },
  // 新增销售报价
  {
    key: "Sa_SaleQuote_Add",
    component: () => import("@/views/workModule/sale/saleQuote/Add"),
    Parent: "Sa_Sale",
    name: "Sa_SaleQuote_Add",
    path: "sa_SaleQuote_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Sa_SaleQuote"),
    hidden: true,
  },
  // 编辑销售报价
  {
    key: "Sa_SaleQuote_Edit",
    component: () => import("@/views/workModule/sale/saleQuote/Edit"),
    Parent: "Sa_Sale",
    name: "Sa_SaleQuote_Edit",
    path: "sa_SaleQuote_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Sa_SaleQuote"),
    hidden: true,
  },
  // 销售报价详情
  {
    key: "Sa_SaleQuote_Detail",
    component: () => import("@/views/workModule/sale/saleQuote/Detail"),
    Parent: "Sa_Sale",
    name: "Sa_SaleQuote_Detail",
    path: "sa_SaleQuote_Detail",
    title: i18n.t("menu.Sa_SaleQuote") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 销售订单
  {
    key: "Sa_SaleOrder",
    component: () => import("@/views/workModule/sale/saleOrder/List"),
    Parent: "Sa_Sale",
    name: "Sa_SaleOrder",
    path: "sa_SaleOrder",
    title: i18n.t("menu.Sa_SaleOrder"),
  },
  // 新增销售订单
  {
    key: "Sa_SaleOrder_Add",
    component: () => import("@/views/workModule/sale/saleOrder/Add"),
    Parent: "Sa_Sale",
    name: "Sa_SaleOrder_Add",
    path: "sa_SaleOrder_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Sa_SaleOrder"),
    hidden: true,
  },
  // 编辑销售订单
  {
    key: "Sa_SaleOrder_Edit",
    component: () => import("@/views/workModule/sale/saleOrder/Edit"),
    Parent: "Sa_Sale",
    name: "Sa_SaleOrder_Edit",
    path: "sa_SaleOrder_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Sa_SaleOrder"),
    hidden: true,
  },
  // 销售订单详情
  {
    key: "Sa_SaleOrder_Detail",
    component: () => import("@/views/workModule/sale/saleOrder/Details"),
    Parent: "Sa_Sale",
    name: "Sa_SaleOrder_Detail",
    path: "sa_SaleOrder_Detail",
    title: i18n.t("menu.Sa_SaleOrder") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 销售订单明细
  {
    key: "Sa_SaleOrder_Detail_list",
    component: () => import("@/views/workModule/sale/saleOrder/DetailsList"),
    Parent: "Sa_Sale",
    name: "Sa_SaleOrder_Detail_list",
    path: "sa_SaleOrder_Detail_list",
    title: i18n.t("menu.Sa_SaleOrder")+'   '+i18n.t('Generality.Ge_Details1'),
    hidden: true,
  },
  // 销售发货
  {
    key: "Sa_SaleDelivery",
    component: () => import("@/views/workModule/sale/saleDelivery/List"),
    Parent: "Sa_Sale",
    name: "Sa_SaleDelivery",
    path: "sa_SaleDelivery",
    title: i18n.t("menu.Sa_SaleDelivery"),
  },
   // 销售发货明细
   {
    key: "Sa_SaleDelivery_Detail_list",
    component: () => import("@/views/workModule/sale/saleDelivery/DetailsList"),
    Parent: "Sa_Sale",
    name: "Sa_SaleDelivery_Detail_list",
    path: "sa_SaleDelivery_Detail_list",
    title: i18n.t("menu.Sa_SaleDelivery")+'   '+i18n.t('Generality.Ge_Details1'),
    hidden: true,
  },
  // 新增销售发货
  {
    key: "Sa_SaleDelivery_Add",
    component: () => import("@/views/workModule/sale/saleDelivery/Add"),
    Parent: "Sa_Sale",
    name: "Sa_SaleDelivery_Add",
    path: "sa_SaleDelivery_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Sa_SaleDelivery"),
    hidden: true,
  },
  // 编辑销售发货
  {
    key: "Sa_SaleDelivery_Edit",
    component: () => import("@/views/workModule/sale/saleDelivery/Edit"),
    Parent: "Sa_Sale",
    name: "Sa_SaleDelivery_Edit",
    path: "sa_SaleDelivery_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Sa_SaleDelivery"),
    hidden: true,
  },
  // 销售发货详情
  {
    key: "Sa_SaleDelivery_Detail",
    component: () => import("@/views/workModule/sale/saleDelivery/Details"),
    Parent: "Sa_Sale",
    name: "Sa_SaleDelivery_Detail",
    path: "sa_SaleDelivery_Detail",
    title:
      i18n.t("menu.Sa_SaleDelivery") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 销售退货
  {
    key: "Sa_SaleReturn",
    component: () => import("@/views/workModule/sale/saleReturn/List"),
    Parent: "Sa_Sale",
    name: "Sa_SaleReturn",
    path: "sa_SaleReturn",
    title: i18n.t("menu.Sa_SaleReturn"),
  },
  // 销售退货明细
  {
    key: "Sa_SaleReturn_Detail_list",
    component: () => import("@/views/workModule/sale/saleReturn/DetailsList"),
    Parent: "Sa_Sale",
    name: "Sa_SaleReturn_Detail_list",
    path: "sa_SaleReturn_Detail_list",
    title: i18n.t("menu.Sa_SaleReturn")+'   '+i18n.t('Generality.Ge_Details1'),
    hidden: true,
  },
  // 新增销售发货
  {
    key: "Sa_SaleReturn_Add",
    component: () => import("@/views/workModule/sale/saleReturn/Add"),
    Parent: "Sa_Sale",
    name: "Sa_SaleReturn_Add",
    path: "sa_SaleReturn_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Sa_SaleReturn"),
    hidden: true,
  },
  // 编辑销售发货
  {
    key: "Sa_SaleReturn_Edit",
    component: () => import("@/views/workModule/sale/saleReturn/Edit"),
    Parent: "Sa_Sale",
    name: "Sa_SaleReturn_Edit",
    path: "sa_SaleReturn_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Sa_SaleReturn"),
    hidden: true,
  },
  // 销售发货详情
  {
    key: "Sa_SaleReturn_Detail",
    component: () => import("@/views/workModule/sale/saleReturn/Details"),
    Parent: "Sa_Sale",
    name: "Sa_SaleReturn_Detail",
    path: "sa_SaleReturn_Detail",
    title:
      i18n.t("menu.Sa_SaleReturn") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 统计报表
  {
    key: "Sa_Report",
    Parent: "Sa_Sale",
    name: "Sa_Report",
    path: "sa_Report",
    component: () => import("@/views/workModule/sale/report/index"),
    title: i18n.t("menu.Sa_Report"),
  },
  // 销售对账
  {
    key: "Sa_Account",
    component: () => import("@/views/workModule/sale/report/account/List"),
    Parent: "Sa_Report",
    name: "Sa_Account",
    path: "sa_AccountChecking",
    title: i18n.t("menu.Sa_Account"),
  },
  // 新增销售对账
  {
    key: "Sa_AccountChecking_Add",
    component: () => import("@/views/workModule/sale/report/account/Add"),
    Parent: "Sa_Report",
    name: "Sa_AccountChecking_Add",
    path: "sa_AccountChecking_Add",
    title:
      i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Sa_Account"),
    hidden: true,
  },
  // 编辑销售对账
  {
    key: "Sa_AccountChecking_Edit",
    component: () => import("@/views/workModule/sale/report/account/Edit"),
    Parent: "Sa_Report",
    name: "Sa_AccountChecking_Edit",
    path: "sa_AccountChecking_Edit",
    title:
      i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Sa_Account"),
    hidden: true,
  },
  // 销售对账详情
  {
    key: "Sa_AccountChecking_Detail",
    component: () => import("@/views/workModule/sale/report/account/Details"),
    Parent: "Sa_Report",
    name: "Sa_AccountChecking_Detail",
    path: "sa_AccountChecking_Detail",
    title:
      i18n.t("menu.Sa_Account") +
      "  " +
      i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 销售分析
  {
    key: "Sa_SaleAnalysis",
    component: () => import("@/views/workModule/sale/report/saleAnalysis"),
    Parent: "Sa_Report",
    name: "Sa_SaleAnalysis",
    path: "sa_SaleAnalysis",
    title: i18n.t("menu.Sa_SaleAnalysis"),
  },
  // 基础数据
  {
    key: "Sa_BaseData",
    Parent: "Sa_Sale",
    name: "Sa_BaseData",
    path: "sa_BaseData",
    component: () => import("@/views/workModule/sale/baseData"),
    title: i18n.t("menu.Sa_BaseData"),
  },
  // 客户
  {
    key: "Sa_Customer",
    component: () => import("@/views/workModule/sale/baseData/customer/List"),
    Parent: "Sa_BaseData",
    name: "Sa_Customer",
    path: "sa_Customer",
    title: i18n.t("menu.Sa_Customer"),
  },
  // 编辑客户
  {
    key: "Sa_Customer_Edit",
    component: () => import("@/views/workModule/sale/baseData/customer/edit"),
    Parent: "Sa_BaseData",
    name: "Sa_Customer_Edit",
    path: "sa_Customer_Edit",
    title: i18n.t("Generality.Ge_Edit") + " " + i18n.t("menu.Sa_Customer"),
    hidden: true,
  },
  // 新增客户
  {
    key: "Sa_Customer_Add",
    component: () => import("@/views/workModule/sale/baseData/customer/new"),
    Parent: "Sa_BaseData",
    name: "Sa_Customer_Add",
    path: "sa_Customer_Add",
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Sa_Customer"),
    hidden: true,
  },
  // 客户详情
  {
    key: "Sa_Customer_Detail",
    component: () =>
      import("@/views/workModule/sale/baseData/customer/details"),
    Parent: "Sa_BaseData",
    name: "Sa_Customer_Detail",
    path: "sa_Customer_Detail",
    title: i18n.t("menu.Sa_Customer") + " " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },

    // 订单评估
  {
    key: "Sa_OrderEvaluation",
    component: () =>
        import("@/views/workModule/sale/saleQuote/List/components/orderEvaluation.vue"),
    Parent: "Sa_BaseData",
    name: "Sa_OrderEvaluation",
    path: "Sa_OrderEvaluation",
    title: i18n.t("sale.Sa_OrderEvaluation"),
    hidden: true,
  },
];
export default sale;
