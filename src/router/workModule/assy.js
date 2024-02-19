import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

// 钳工模块
const assy = [
  // 钳工
  {
    key: "As_Assy",
    Parent: null,
    name: "Assy",
    path: "assy",
    component: Layout,
    title: i18n.t("menu.As_Assy"),
    icon: "production",
  },
  // 装配计划
  {
    key: "As_ProductionAssemblyPlan",
    component: () => import("@/views/workModule/assy/productionAssemblyPlan"),
    Parent: "As_Assy",
    name: "ProductionAssemblyPlan",
    path: "productionAssemblyPlan",
    title: i18n.t("menu.As_ProductionAssemblyPlan"),
  },
  // 钳工收料
  {
    key: "As_ProductionFitterReceive",
    component: () => import("@/views/workModule/assy/productionFitterReceive"),
    Parent: "As_Assy",
    name: "ProductionFitterReceive",
    path: "productionFitterReceive",
    title: i18n.t("menu.As_ProductionFitterReceive"),
  },
  // 钳工收料记录
  {
    key: "As_ProductionFitterReceiveRecord",
    component: () => import("@/views/workModule/assy/productionFitterReceive/productionFitterReceiveRecord.vue"),
    Parent: "As_Assy",
    name: "ProductionFitterReceiveRecord",
    path: "productionFitterReceiveRecord",
    title: i18n.t("menu.As_ProductionFitterReceiveRecord"),
  },
]
export default assy;
