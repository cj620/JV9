import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

const testTooling = [
  // 试模
  {
    key: "Tt_TestToolingList",
    Parent: null,
    name: "Tt_TestToolingList",
    path: "Tt_TestToolingList",
    component: Layout,
    title: i18n.t("menu.Tt_TestToolingList"),
    icon: "design",
  },
  // 试模任务列表
  {
    key: "Tt_TestToolingTask",
    component: () => import("@/views/workModule/testTooling/testToolingTask/List"),
    Parent: "Tt_TestToolingList",
    name: "TestToolingTask",
    path: "testToolingTask",
    title: i18n.t("menu.Tt_TestToolingTask"),
  },
]

export default testTooling;
