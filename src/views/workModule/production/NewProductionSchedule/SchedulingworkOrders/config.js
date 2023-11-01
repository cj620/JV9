import {Table as BaseTable, TableAPI} from "~/class/table";
import {overdue_and_obsolete_list} from "@/api/workApi/production/productionSchedule";

export class api extends TableAPI {
    // 获取列表
    getData = overdue_and_obsolete_list;
}

export class Table extends BaseTable {
    constructor() {
        super({
            // 表格配置
            tableSchema: tableConfig,
            formSchema,
            // 行标识
            rowId: "BillId",
            // 表格标题
            title: i18n.t("menu.Pr_PendingWorkOrders"),
            // 接口类
            api,
            // 操作列宽度
            operationCol: false,
            // 打印模块标识
            printBar: false,
        });
    }
}
//  表格配置
export const tableConfig = [
    /*图片*/
    {
        prop: "PhotoUrl",
        label: i18n.t("Generality.Ge_PhotoUrl"),
        cpn: "Image",
    },
    /*加工单号*/
    {
        prop: "BillId",
        label: i18n.t("production.Pr_WorkSheetNo"),
    },
    /*模具编号*/
    {
        prop: "ToolingNo",
        label: i18n.t("Generality.Ge_ToolingNo"),
    },
    /*零件名称*/
    {
        prop: "PartName",
        label: i18n.t("Generality.Ge_PartName"),
    },
    /*零件编号*/
    {
        prop: "PartNo",
        label: i18n.t("Generality.Ge_PartNo"),
    },

    /*任务级别*/
    {
        prop: "Level",
        label: i18n.t("Generality.Ge_Level"),
        custom: true
    },
    /*工序*/
    // {
    //     prop: "ProcessName",
    //     label: i18n.t("Generality.Ge_Process"),
    //     width: 100,
    // },

    /*预计工时*/
    // {
    //     prop: "PlanTime",
    //     label: i18n.t("Generality.Ge_PlanTime"),
    //     align: "right",
    //     width: 100,
    // },
    /*预定资源*/
    // {
    //     prop: "PlanDevice",
    //     label: i18n.t("Generality.Ge_Resource"),
    //     width: 120,
    // },
    /*计划开始*/
    {
        prop: "PlanStart",
        label: i18n.t("Generality.Ge_PlanStart"),
        filter: "time",
        width: 140,
    },
    /*计划结束*/
    {
        prop: "PlanEnd",
        label: i18n.t("Generality.Ge_PlanEnd"),
        filter: "time",
        width: 140,
    },
];

// 表单配置
export const formSchema = [
    // 单号搜索
    {
        prop: "BillId",
        label: i18n.t("Generality.Ge_BillId"),
        cpn: "FormInput",
    },
    //模具编号
    {
        prop: "ToolingNo",
        label: i18n.t("Generality.Ge_ToolingNo"),
        cpn: "FormInput",
    },
    // 零件
    {
        prop: "PartNo",
        label: i18n.t("Generality.Ge_PartNo"),
        cpn: "FormInput",
    },
];
