import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import {enumToList, maintenanceEnum, maintenancePlanEnum} from "@/enum/workModule";
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
        label: i18n.t('device.De_PlanName'),
    },
    {
        prop: "State",
        label: i18n.t("Generality.Ge_State"),
        customFilter: (value) => {
            if (!value) return "";
            return maintenancePlanEnum[value].name;
        },
        width: "120px",
    },
    {
        prop: "Description",
        label: i18n.t('device.De_Description'),
    },
    {
        prop: "MaintenanceMode",
        label: i18n.t("device.De_MaintenanceMode"),
        customFilter: (value) => {
            if (!value) return "";
            return maintenanceEnum[value].name;
        },
    },
    {
        prop: "IntervalDays",
        label: i18n.t('production.Pr_IntervalDays'),
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
    {
        prop: "States",
        label: i18n.t("Generality.Ge_State"),
        cpn: "FormSelect",
        type: "multiple",
        options: {
            list: enumToList(maintenancePlanEnum),
        },
    },
    {
        prop: "MaintenanceMode",
        label: i18n.t("device.De_MaintenanceMode"),
        cpn: "FormSelect",
        options: {
            list: enumToList(maintenanceEnum),
        },
    }
]
