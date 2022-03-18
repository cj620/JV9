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
    key: "Qu_Quality",
    Parent: null,
    name: "Quality",
    path: "quality",
    component: Layout,
    title: i18n.t("menu.Qu_Quality"),
    icon: 'quality',
  },
  // 加工检验
  {
    key: "Qu_ProductionCheck",
    component: () => import("@/views/workModule/quality/productionCheck/List"),
    Parent: "Qu_Quality",
    name: "ProductionCheck",
    path: "productionCheck",
    title: i18n.t("menu.Qu_ProductionCheck"),
  },
  // 品质报表
  {
    key: "Qu_QualityReport",
    component: () => import("@/views/workModule/quality/qualityReport/List"),
    Parent: "Qu_Quality",
    name: "QualityReport",
    path: "qualityReport",
    title: i18n.t("menu.Qu_QualityReport"),
  },
  // 检验记录
  {
    key: "Qu_QualityRecord",
    component: () => import("@/views/workModule/quality/qualityRecord/List"),
    Parent: "Qu_Quality",
    name: "QualityRecord",
    path: "qualityRecord",
    title: i18n.t("menu.Qu_QualityRecord"),
  },
  // 新增检验记录
  {
    key: "Qu_AddQualityRecord",
    component: () => import("@/views/workModule/quality/qualityRecord/add"),
    Parent: "Qu_Quality",
    name: "AddQualityRecord",
    path: "addQualityRecord",
    hidden: true,
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Qu_QualityRecord"),
  },
  //检验记录详情
  {
    key: "Qu_QualityRecordDetails",
    component: () => import("@/views/workModule/quality/qualityRecord/details"),
    Parent: "Qu_Quality",
    name: "QualityRecordDetails",
    path: "qualityRecordDetails",
    hidden: true,
    title:
      i18n.t("menu.Qu_QualityRecord") + " " + i18n.t("Generality.Ge_Details"),
  },
  // 品质异常
  {
    key: "Qu_QualityError",
    component: () => import("@/views/workModule/quality/qualityError/List"),
    Parent: "Qu_Quality",
    name: "QualityError",
    path: "qualityError",
    title: i18n.t("menu.Qu_QualityError"),
  },
  // 新增品质异常
  {
    key: "Qu_AddQualityError",
    component: () => import("@/views/workModule/quality/qualityError/add"),
    Parent: "Qu_Quality",
    name: "AddQualityError",
    path: "addQualityError",
    hidden: true,
    title: i18n.t("Generality.Ge_New") + " " + i18n.t("menu.Qu_QualityError"),
  },
  //品质异常详情
  {
    key: "Qu_QualityErrorDetails",
    component: () => import("@/views/workModule/quality/qualityError/details"),
    Parent: "Qu_Quality",
    name: "QualityErrorDetails",
    path: "qualityErrorDetails",
    hidden: true,
    title:
      i18n.t("menu.Qu_QualityError") + " " + i18n.t("Generality.Ge_Details"),
  },
];
export default quality;
