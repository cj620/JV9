/*
 * @Author: H.
 * @Date: 2021-11-30 17:33:45
 * @LastEditTime: 2021-12-14 15:48:08
 * @Description:
 */
import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";
import production from "./production";

// 品质模块
const quality = [
  // 品质
  {
    key: "Qc_Quality",
    Parent: null,
    name: "Quality",
    path: "quality",
    component: Layout,
    title: i18n.t("menu.Qc_Quality"),
    icon: "quality",
  },
  // 成品检验
  {
    key: "Qc_FinishedProduct",
    component: () =>
      import("@/views/workModule/quality/finishedProductCheck/List"),
    Parent: "Qc_Quality",
    name: "Qc_FinishedProduct",
    path: "qc_FinishedProduct",
    title: i18n.t("menu.Qc_FinishedProduct"),
  },

  // 新增成品检验
  {
    key: "Qc_FinishedProduct_Add",
    component: () =>
      import("@/views/workModule/quality/finishedProductCheck/Add"),
    Parent: "Qc_Quality",
    name: "Qc_FinishedProduct_Add",
    path: "qc_FinishedProduct_Add",
    title:
      i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Qc_FinishedProduct"),
    hidden: true,
  },
  // 成品检验详情
  {
    key: "Qc_FinishedProduct_Detail",
    component: () =>
      import("@/views/workModule/quality/finishedProductCheck/Details"),
    Parent: "Qc_Quality",
    name: "Qc_FinishedProduct_Detail",
    path: "qc_FinishedProduct_Detail",
    title:
      i18n.t("menu.Qc_FinishedProduct") +
      "  " +
      i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 成品检验明细
  {
    key: "Qc_FinishedProduct_Item",
    component: () =>
      import("@/views/workModule/quality/finishedProductCheck/Item"),
    Parent: "Qc_Quality",
    name: "Qc_FinishedProductItem",
    path: "qc_FinishedProductItem",
    title:
      i18n.t("menu.Qc_FinishedProduct") +
      "   " +
      i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 过程检验
  {
    key: "Qc_ProcessCheck",
    component: () => import("@/views/workModule/quality/processCheck/List"),
    Parent: "Qc_Quality",
    name: "Qc_ProcessCheck",
    path: "qc_ProcessCheck",
    title: i18n.t("menu.Qc_ProcessCheck"),
  },
  // 新增过程检验
  {
    key: "Qc_ProcessCheck_Add",
    component: () => import("@/views/workModule/quality/processCheck/Add"),
    Parent: "Qc_Quality",
    name: "Qc_ProcessCheck_Add",
    path: "qc_ProcessCheck_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Qc_ProcessCheck"),
    hidden: true,
  },
  // 过程检验详情
  {
    key: "Qc_ProcessCheck_Detail",
    component: () => import("@/views/workModule/quality/processCheck/Details"),
    Parent: "Qc_Quality",
    name: "Qc_ProcessCheck_Detail",
    path: "qc_ProcessCheck_Detail",
    title:
      i18n.t("menu.Qc_ProcessCheck") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 过程检验明细
  {
    key: "Qc_ProcessCheck_Item",
    component: () => import("@/views/workModule/quality/processCheck/Item"),
    Parent: "Qc_Quality",
    name: "Qc_ProcessCheckItem",
    path: "Qc_ProcessCheckItem",
    title:
      // 需修改
      i18n.t("menu.Qc_ProcessCheck") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 加工检验
  {
    key: "Qc_ProductionCheck",
    component: () => import("@/views/workModule/quality/productionCheck/List"),
    Parent: "Qc_Quality",
    name: "ProductionCheck",
    path: "productionCheck",
    title: i18n.t("menu.Qc_ProductionCheck"),
  },
  // 品质报表
  {
    key: "Qc_QualityReport",
    component: () => import("@/views/workModule/quality/qualityReport/List"),
    Parent: "Qc_Quality",
    name: "QualityReport",
    path: "qualityReport",
    title: i18n.t("menu.Qc_QualityReport"),
  },
  // 检验记录
  {
    key: "Qc_QualityRecord",
    component: () => import("@/views/workModule/quality/qualityRecord/List"),
    Parent: "Qc_Quality",
    name: "QualityRecord",
    path: "qualityRecord",
    title: i18n.t("menu.Qc_QualityRecord"),
  },
  // 新增检验记录
  {
    key: "Qc_AddQualityRecord",
    component: () => import("@/views/workModule/quality/qualityRecord/add"),
    Parent: "Qc_Quality",
    name: "AddQualityRecord",
    path: "addQualityRecord",
    hidden: true,
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Qc_QualityRecord"),
  },
  //检验记录详情
  {
    key: "Qc_QualityRecordDetails",
    component: () => import("@/views/workModule/quality/qualityRecord/details"),
    Parent: "Qc_Quality",
    name: "QualityRecordDetails",
    path: "qualityRecordDetails",
    hidden: true,
    title:
      i18n.t("menu.Qc_QualityRecord") + " " + i18n.t("Generality.Ge_Details"),
  },
  // 品质异常
  {
    key: "Qc_QualityError",
    component: () => import("@/views/workModule/quality/qualityError/List"),
    Parent: "Qc_Quality",
    name: "QualityError",
    path: "qualityError",
    title: i18n.t("menu.Qc_QualityError"),
  },
  // 新增品质异常
  {
    key: "Qc_AddQualityError",
    component: () => import("@/views/workModule/quality/qualityError/add"),
    Parent: "Qc_Quality",
    name: "AddQualityError",
    path: "addQualityError",
    hidden: true,
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Qc_QualityError"),
  },
  //品质异常详情
  {
    key: "Qc_QualityErrorDetails",
    component: () => import("@/views/workModule/quality/qualityError/details"),
    Parent: "Qc_Quality",
    name: "QualityErrorDetails",
    path: "qualityErrorDetails",
    hidden: true,
    title:
      i18n.t("menu.Qc_QualityError") + " " + i18n.t("Generality.Ge_Details"),
  },
];
export default quality;
