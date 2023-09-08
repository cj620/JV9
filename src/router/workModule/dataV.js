const dataV = [
    {
        path: "/EquipmentSignage",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage"),
        name: "EquipmentSignage",
        // meta: { title: "设备看板", icon: "dashboard" },
    },
    {
        path: "/TaskStatusSignage",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/TaskStatusSignage"),
        name: "TaskStatusSignage",
    },
  {
        path: "/SaleSignage",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/SaleSignage"),
        name: "SaleSignage",
    },
]
export default dataV
