const dataV = [
    {
        path: "/EquipmentSignage",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage"),
        name: "EquipmentSignage",
        // meta: { title: "设备看板", icon: "dashboard" },
    },
    {
        path: "/DepartmentSignboard",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard"),
        name: "DepartmentSignboard",
    },
]
export default dataV
