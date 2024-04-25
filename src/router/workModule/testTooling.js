import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

const testTooling = [
  // 试模
  {
    key: "Tt_TestToolingList",
    Parent: null,
    name: "TestToolingList",
    path: "testToolingList",
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
  // 试模单列表
  {
    key: "Tt_TestTooling",
    component: () => import("@/views/workModule/testTooling/testToolingList/List"),
    Parent: "Tt_TestToolingList",
    name: "TestTooling",
    path: "testTooling",
    title: i18n.t("menu.Tt_TestTooling"),
  },
]

export default testTooling;
