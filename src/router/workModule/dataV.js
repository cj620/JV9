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
    // 模具机加综合看板
    {
        path: "/MoldMachining",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/MoldMachining"),
        name: "MoldMachining",
    },
    //  品质部门看板
    {
        path: "/QualitySignage",
        component: () => import("@/views/basicModule/KanBan/IntegratedSignage/QualitySignage"),
        name: "QualitySignage",
    }
]
export default dataV
