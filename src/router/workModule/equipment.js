import Layout from "@/layout";
import i18n from "@/i18n/i18n";

const equipment = [
  {
    key: "As_AssetsManage",
    Parent: null,
    name: "AssetsManage",
    path: "assetsManage",
    component: Layout,
    title: i18n.t("menu.As_AssetsManage"),
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
  //     import("@/views/workModule/equipment/equipmentResource/List/c-menu.vue"),
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
    title: i18n.t("menu.As_DeviceList"),
  },
  // 保养方案
  {
    key: "As_MaintenancePlan",
    component: ()=>
      import("@/views/workModule/equipment/maintenancePlan/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_MaintenancePlan",
    path: "as_MaintenancePlan",
    title: i18n.t("menu.As_MaintenancePlan"),
  },
  // 新增保养方案
  {
    key: "As_MaintenancePlanAdd",
    component: () => import("@/views/workModule/equipment/maintenancePlan/Add/index1.vue"),
    Parent: "As_AssetsManage",
    name: "As_MaintenancePlan_Add",
    path: "as_MaintenancePlan_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.As_MaintenancePlan"),
    hidden: true,
  },
  // 编辑保养方案
  {
    key: "As_MaintenancePlanEdit",
    component: () => import("@/views/workModule/equipment/maintenancePlan/Edit/index1.vue"),
    Parent: "As_AssetsManage",
    name: "As_MaintenancePlan_Edit",
    path: "as_MaintenancePlan_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.As_MaintenancePlan"),
    hidden: true,
  },
  // 保养方案详情
  {
    key: "As_MaintenancePlanDetail",
    component: () =>
        import("@/views/workModule/equipment/maintenancePlan/Detail/index.vue"),
    Parent: "As_AssetsManage",
    name: "As_MaintenancePlanDetail",
    path: "as_MaintenancePlanDetail",
    title: i18n.t("menu.As_MaintenancePlan") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 设备保养
  {
    key: "As_DeviceMaintain",
    component: () =>
      import("@/views/workModule/equipment/maintenance/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceMaintain",
    path: "as_DeviceMaintain",
    title: i18n.t("menu.As_DeviceMaintain"),
  },
  // 设备报废
  {
    key: "As_DeviceScrap",
    component: () =>
      import("@/views/workModule/equipment/scrap/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceScrap",
    path: "as_DeviceScrap",
    title: i18n.t("menu.As_DeviceScrap"),
  },
  // 设备报修
  {
    key: "As_DeviceRepair",
    component: () =>
      import("@/views/workModule/equipment/repair/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceRepair",
    path: "as_DeviceRepair",
    title: i18n.t("menu.As_DeviceRepair"),
  },
  // 新增设备
  {
    key: "As_DeviceAdd",
    component: () =>
      import("@/views/workModule/equipment/equipmentResource/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceAdd",
    path: "as_DeviceAdd",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.As_DeviceList"),
  },
  // 保养模板
  {
    key: "As_MaintenanceTPL",
    component: () =>
      import("@/views/workModule/equipment/maintenanceTPL/List/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_MaintenanceTPL",
    path: "as_MaintenanceTPL",
    title: i18n.t("menu.As_MaintenanceTPL"),
  },
  // 设备详情
  {
    key: "As_DeviceDetail",
    component: () =>
      import("@/views/workModule/equipment/equipmentResource/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceDetail",
    path: "as_DeviceDetail",
    title: i18n.t("menu.As_DeviceList") + "  " + i18n.t("Generality.Ge_Details"),
  },
  // 编辑设备
  {
    key: "As_DeviceEdit",
    component: () =>
      import("@/views/workModule/equipment/equipmentResource/Edit/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceEdit",
    path: "as_DeviceEdit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.As_DeviceList"),
  },
  // 新增保养模板
  {
    key: "As_MaintenanceTPLAdd",
    component: () =>
      import("@/views/workModule/equipment/maintenanceTPL/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_MaintenanceTPLAdd",
    path: "as_MaintenanceTPLAdd",
    title:  i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.As_MaintenanceTPL"),
  },
  // 编辑保养模板
  {
    key: "As_MaintenanceTPLEdit",
    component: () =>
      import("@/views/workModule/equipment/maintenanceTPL/Edit/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_MaintenanceTPLEdit",
    path: "as_MaintenanceTPLEdit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.As_MaintenanceTPL"),
  },
  // 保养模板详情
  {
    key: "As_MaintenanceTPLDetail",
    component: () =>
      import("@/views/workModule/equipment/maintenanceTPL/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_MaintenanceTPLDetail",
    path: "as_MaintenanceTPLDetail",
    title: i18n.t("menu.As_MaintenanceTPL") + "  " + i18n.t("Generality.Ge_Details"),
  },
  // 保养类别，报废类别
  {
    key: "As_DeviceMaintenanceType",
    component: () =>
      import("@/views/workModule/equipment/maintenance/Type/index.vue"),
    Parent: "As_AssetsManage",
    name: "As_DeviceMaintenanceType",
    path: "As_DeviceMaintenanceType",
    title: i18n.t("Generality.Ge_Category"),
  },
  // 新增保养信息
  {
    key: "As_DeviceMaintainAdd",
    component: () =>
      import("@/views/workModule/equipment/maintenance/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceMaintainAdd",
    path: "as_DeviceMaintenanceAdd",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.As_DeviceMaintain"),
  },
  // 保养信息详情
  {
    key: "As_DeviceMaintenanceDetail",
    component: () =>
      import("@/views/workModule/equipment/maintenance/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceMaintenanceDetail",
    path: "as_DeviceMaintenanceDetail",
    title: i18n.t("menu.As_DeviceMaintain") + "  " + i18n.t("Generality.Ge_Details"),
  },
  // 新增报修信息
  {
    key: "As_DeviceRepairAdd",
    component: () =>
      import("@/views/workModule/equipment/repair/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceRepairAdd",
    path: "as_DeviceRepairAdd",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.As_DeviceRepair"),
  },
  // 报修信息详情
  {
    key: "As_DeviceRepairDetail",
    component: () =>
      import("@/views/workModule/equipment/repair/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceRepairDetail",
    path: "as_DeviceRepairDetail",
    title: i18n.t("menu.As_DeviceRepair") + "  " + i18n.t("Generality.Ge_Details"),
  },
  // 新增报废信息
  {
    key: "As_DeviceScrapAdd",
    component: () =>
      import("@/views/workModule/equipment/scrap/Add/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceScrapAdd",
    path: "as_DeviceScrapAdd",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.As_DeviceScrap"),
  },
  // 报废信息详情
  {
    key: "As_DeviceScrapDetail",
    component: () =>
      import("@/views/workModule/equipment/scrap/Detail/index.vue"),
      Parent: "As_AssetsManage",
    name: "As_DeviceScrapDetail",
    path: "as_DeviceScrapDetail",
    title: i18n.t("menu.As_DeviceScrap") + "  " + i18n.t("Generality.Ge_Details"),
  },
  // 设备点检
  {
    key: "As_DeviceSpotCheck",
    component: ()=>
      import("@/views/workModule/equipment/deviceSpotCheck/List/index.vue"),
    Parent: "As_AssetsManage",
    name: "As_DeviceSpotCheck",
    path: "as_DeviceSpotCheck",
    title: i18n.t("menu.As_DeviceSpotCheck"),
  },
  // 设备点检详情
  {
    key: "As_DeviceSpotCheckDetail",
    component: ()=>
      import("@/views/workModule/equipment/deviceSpotCheck/Detail/index.vue"),
    Parent: "As_AssetsManage",
    name: "As_DeviceSpotCheckDetail",
    path: "as_DeviceSpotCheckDetail",
    title: i18n.t("menu.As_DeviceSpotCheck")+ "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 备件领用
  {
    key: "As_AccessoryCheckOut",
    component: ()=>
      import("@/views/workModule/equipment/accessoryCheckOut/List/index.vue"),
    Parent: "As_AssetsManage",
    name: "As_AccessoryCheckOut",
    path: "as_AccessoryCheckOut",
    title: i18n.t("menu.As_AccessoryCheckOut"),
  },
];

export default equipment;
