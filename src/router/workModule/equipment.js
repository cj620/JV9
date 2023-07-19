import Layout from "@/layout";

const equipment = [
  {
    key: "As_AssetsManage",
    Parent: null,
    name: "AssetsManage",
    path: "assetsManage",
    component: Layout,
    title:'资产管理',
    icon: 'sales',
  },
  // 设备
  // {
  //   id: "24",
  //   parentid: null
  // },
  // // 设备资源
  // {
  //   id: "25",
  //   component: () =>
  //     import("@/views/workModule/equipment/equipmentResource/List/index.vue"),
  //   parentid: "24"
  // },
  // 设备管理
  {
    key: "As_DeviceList",
    component: () =>
      import("@/views/workModule/equipment/equipmentResource/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceList",
    path: "as_DeviceList",
    title: '设备管理',
  },
  // 设备保养
  {
    key: "As_DeviceMaintain",
    component: () =>
      import("@/views/workModule/equipment/maintenance/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceMaintain",
    path: "as_DeviceMaintain",
    title: '设备保养',
  },
  // 设备报废
  {
    key: "As_DeviceScrap",
    component: () =>
      import("@/views/workModule/equipment/scrap/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceScrap",
    path: "as_DeviceScrap",
    title: '设备报废',
  },
  // 设备报修
  {
    key: "As_DeviceRepair",
    component: () =>
      import("@/views/workModule/equipment/repair/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceRepair",
    path: "as_DeviceRepair",
    title: '设备报修',
  },
  // 新增设备
  {
    key: "As_DeviceAdd",
    component: () =>
      import("@/views/workModule/equipment/equipmentResource/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceAdd",
    path: "as_DeviceAdd",
    title: '新增设备',
  },
  // 保养模板
  {
    key: "As_MaintenanceTPL",
    component: () =>
      import("@/views/workModule/equipment/maintenanceTPL/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_MaintenanceTPL",
    path: "as_MaintenanceTPL",
    title: '保养模板',
  },
  // 设备详情
  {
    key: "As_DeviceDetail",
    component: () =>
      import("@/views/workModule/equipment/equipmentResource/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceDetail",
    path: "as_DeviceDetail",
    title: '设备详情',
  },
];

export default equipment;
