import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import {
    assets_device_maintenance_plan_list,
    assets_device_maintenance_plan_delete,
} from "@/api/workApi/equipment/maintenancePlan";

export class api extends TableAPI {
    getData = assets_device_maintenance_plan_list;
    del = assets_device_maintenance_plan_delete;
}
export class Table extends BaseTable {
    constructor() {
        super( {
            // 表格配置
            tableSchema: tableConfig,
            // 表单配置
            formSchema,
            // 行标识
            rowId: 'BillId',
            // 表格标题
            title: i18n.t("menu.As_MaintenancePlan"),
            // 接口类
            api,
            // 操作列宽度
            operationWidth:180,
            // 打印模块标识
            printMod:'As_MaintenancePlan',
        })
    }
}
export const tableConfig = [
    {
        prop: "BillId",
        label: i18n.t("Generality.Ge_BillId"),
        cpn: "Link",
        cpnProps: {
            // 路由名称
            routeName: "As_MaintenancePlanDetail",
            // 路由路径（名称和路径二选一）
            // routePath:'/dashboard',
            // 路由传参方式 默认query
            methods: "query",
            // 传参的键名，值为当前数据
            parameterKey: "BillId",
        }
    },
    {
        prop: "PlanName",
        label: "方案名称",
    },
    {
        prop: "State",
        label: i18n.t("Generality.Ge_State"),
        custom: true,
        width: "120px",
    },
    {
        prop: "Description",
        label: "方案说明",
    },
    {
        prop: "MaintenanceMode",
        label: "保养方式",
        custom: true,
    },
    {
        prop: "IntervalDays",
        label: "间隔天数",
    },
    {
        prop: "Creator",
        label: i18n.t("Generality.Ge_Creator"),
    },
    {
        prop: "CreationDate",
        label: i18n.t("Generality.Ge_CreationDate"),
        filter: "time",
        width: "150px",
    },
]
export const formSchema = [
    {
        prop: "Keyword",
        label: i18n.t("Generality.Ge_KeyWords"),
        cpn: "FormInput",
    },
]
