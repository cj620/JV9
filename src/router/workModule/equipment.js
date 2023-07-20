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
  // 编辑设备
  {
    key: "As_DeviceEdit",
    component: () =>
      import("@/views/workModule/equipment/equipmentResource/Edit/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceEdit",
    path: "as_DeviceEdit",
    title: '编辑设备',
  },
  // 新增报修信息
  {
    key: "As_MaintenanceTPLAdd",
    component: () =>
      import("@/views/workModule/equipment/maintenanceTPL/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_MaintenanceTPLAdd",
    path: "as_MaintenanceTPLAdd",
    title: '新增保养模板',
  },
  // 编辑报修信息
  {
    key: "As_MaintenanceTPLEdit",
    component: () =>
      import("@/views/workModule/equipment/maintenanceTPL/Edit/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_MaintenanceTPLEdit",
    path: "as_MaintenanceTPLEdit",
    title: '编辑保养模板',
  },
  // 保养模板详情
  {
    key: "As_MaintenanceTPLDetail",
    component: () =>
      import("@/views/workModule/equipment/maintenanceTPL/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_MaintenanceTPLDetail",
    path: "as_MaintenanceTPLDetail",
    title: '保养模板详情',
  },
  // 保养类别，报废类别
  {
    key: "As_DeviceMaintenanceType",
    component: () =>
      import("@/views/workModule/equipment/maintenance/Type/index.vue"),
    Parent: "As_AssetsManage",
    name: "As_DeviceMaintenanceType",
    path: "As_DeviceMaintenanceType",
    title: '类别',
  },
  // 新增保养信息
  {
    key: "As_DeviceMaintainAdd",
    component: () =>
      import("@/views/workModule/equipment/maintenance/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceMaintainAdd",
    path: "as_DeviceMaintenanceAdd",
    title: '新增保养信息',
  },
  // 保养信息详情
  {
    key: "As_DeviceMaintenanceDetail",
    component: () =>
      import("@/views/workModule/equipment/maintenance/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceMaintenanceDetail",
    path: "as_DeviceMaintenanceDetail",
    title: '设备保养详情',
  },
  // 新增报修信息
  {
    key: "As_DeviceRepairAdd",
    component: () =>
      import("@/views/workModule/equipment/repair/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceRepairAdd",
    path: "as_DeviceRepairAdd",
    title: '新增报修信息',
  },
  // 报修信息详情
  {
    key: "As_DeviceRepairDetail",
    component: () =>
      import("@/views/workModule/equipment/repair/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceRepairDetail",
    path: "as_DeviceRepairDetail",
    title: '设备报修详情',
  },
  // 新增报废信息
  {
    key: "As_DeviceScrapAdd",
    component: () =>
      import("@/views/workModule/equipment/scrap/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceScrapAdd",
    path: "as_DeviceScrapAdd",
    title: '新增报废信息',
  },
  // 报废信息详情
  {
    key: "As_DeviceScrapDetail",
    component: () =>
      import("@/views/workModule/equipment/scrap/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceScrapDetail",
    path: "as_DeviceScrapDetail",
    title: '设备报废详情',
  },
];

export default equipment;
