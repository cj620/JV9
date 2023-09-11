const dataV = [
    // 设备看板
    {
        path: "/EquipmentSignage",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage"),
        name: "EquipmentSignage",
    },
    // NC部门看板
    {
        path: "/DepartmentSignboard",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard"),
        name: "DepartmentSignboard",
    },
    // 部门综合看板
    {
        path: "/TaskStatusSignage",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/TaskStatusSignage"),
        name: "TaskStatusSignage",
    },
    // 销售大数据看板
    {
        path: "/SaleSignage",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/SaleSignage"),
        name: "SaleSignage",
    },
]
export default dataV
