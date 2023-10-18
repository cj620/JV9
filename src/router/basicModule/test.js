import Layout from "@/layout";
import i18n from "@/i18n/i18n";
console.log(window.global_config.showTestTab, 8585858585);
// 销售模块
const test = window.global_config.showTestTab
  ? [
      {
        path: "/demo",
        component: Layout,
        redirect: "/table",
        meta: { title: "高级组件", icon: "design" },
        children: [
          {
            path: "list",
            component: () => import("@/views/basicModule/demo/Table"),
            name: "list",
            meta: { title: "list", icon: "design" },
          },
          {
            path: "form",
            component: () => import("@/views/basicModule/demo/Form"),
            name: "form",
            meta: { title: "form", icon: "dashboard" },
          },
          {
            path: "detail",
            component: () => import("@/views/basicModule/demo/Detail"),
            name: "detail",
            meta: { title: "detail", icon: "dashboard" },
          },
          {
            path: "editTable",
            component: () => import("@/views/basicModule/demo/EditTable"),
            name: "editTable",
            meta: { title: "editTable", icon: "dashboard" },
          },
          {
            path: "treeTable",
            component: () => import("@/views/basicModule/demo/TreeTable"),
            name: "treeTable",
            meta: { title: "treeTable", icon: "dashboard" },
          },
          {
            path: "ProjectAnalyze",
            component: () => import("@/views/basicModule/demo/ProjectAnalyze"),
            name: "ProjectAnalyze",
            meta: { title: "ProjectAnalyze", icon: "dashboard" },
          },
          {
            path: "test",
            component: () => import("@/views/basicModule/demo/Test"),
            name: "Test",
            meta: { title: "测试数据页面", icon: "dashboard" },
          },
          {
            path: "test1",
            component: () => import("@/views/basicModule/demo/Test1"),
            name: "Test1",
            meta: { title: "测试数据页面1", icon: "dashboard" },
          },
          {
            path: "test2",
            component: () => import("@/views/basicModule/demo/Test2"),
            name: "Test2",
            meta: { title: "websocket", icon: "dashboard" },
          },
          // 报错项
          {
            key: "Se_ErrorPrompt",
            path: "Se_ErrorPrompt",
            name: "Se_ErrorPrompt",
            component: () => import("@/views/basicModule/setup/errorPrompt"),
            meta: { title: "报错提示项", icon: "dashboard" },
          },
          //     {
          //       path: "test3",
          //       component: () => import("@/views/basicModule/demo/Test3"),
          //       name: "Test3",
          //       meta: { title: "dev测试页面3", icon: "dashboard" },
          //     },
          //     {
          //       path: "test12",
          //       component: () => import("@/views/basicModule/demo/Test12"),
          //       name: "Test12",
          //       meta: { title: "仪表盘", icon: "dashboard" },
          //     },

          //     {
          //       path: "test5",
          //       component: () => import("@/views/basicModule/demo/Test5"),
          //       name: "Test5",
          //       meta: { title: "订单明细", icon: "dashboard" },
          //     },
          //     {
          //       path: "test6",
          //       component: () => import("@/views/basicModule/demo/Test6"),
          //       name: "Test6",
          //       meta: { title: "外协管理", icon: "dashboard" },
          //     },
          //     {
          //       path: "test4",
          //       component: () => import("@/views/basicModule/demo/Test4"),
          //       name: "Test4",
          //       meta: { title: "产值报表", icon: "dashboard" },
          //     },
          //    {
          //       path: "test7",
          //       component: () => import("@/views/basicModule/demo/Test7"),
          //       name: "Test7",
          //       meta: { title: "设备负荷", icon: "dashboard" },
          //     },
          //     {
          //       path: "test8",
          //       component: () => import("@/views/basicModule/demo/Test8"),
          //       name: "Test8",
          //       meta: { title: "设计任务", icon: "dashboard" },
          //     },
          //     {
          //       path: "test14",
          //       component: () => import("@/views/basicModule/demo/Test8"),
          //       name: "Test14",
          //       meta: { title: "编程任务", icon: "dashboard" },
          //     },
          //     {
          //       path: "test9",
          //       component: () => import("@/views/basicModule/demo/Test9"),
          //       name: "Test9",
          //       meta: { title: "成本管理", icon: "dashboard" },
          //     },
          //     {
          //       path: "test10",
          //       component: () => import("@/views/basicModule/demo/Test10"),
          //       name: "Test10",
          //       meta: { title: "产能分析", icon: "dashboard" },
          //     },
          //     {
          //       path: "test11",
          //       component: () => import("@/views/basicModule/demo/Test11"),
          //       name: "Test11",
          //       meta: { title: "质量汇总", icon: "dashboard" },
          //     },
          //     {
          //       path: "test13",
          //       component: () => import("@/views/basicModule/demo/Test13"),
          //       name: "Test13",
          //       meta: { title: "设备负荷", icon: "dashboard" },
          //     },
          {
            path: "test14",
            component: () => import("@/views/basicModule/demo/Test14"),
            name: "Test14",
            meta: { title: "测试数据页面14", icon: "dashboard" },
          },
          {
            path: "testcyc",
            component: () => import("@/views/basicModule/demo/TestCyc"),
            name: "TestCyc",
              meta: { title: "测试数据页面cyc", icon: "dashboard" },
          },
        ],
      },
    ]
  : [];

export default test;
