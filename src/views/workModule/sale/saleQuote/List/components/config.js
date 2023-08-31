/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-12-28 08:51:43
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 获取用户接口
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";

// 引入模块API接口
import { API } from "@/api/workApi/sale/quotation";
let { api_list, api_delete } = API;
export class api extends TableAPI {
    // 获取列表
    getData = api_list;
    // 删除单据
    del = api_delete;
}
//  表格配置
export const tableConfig = [
    {
        prop: "BillId",
        label: i18n.t("Generality.Ge_BillId"),
        align: "center",
        cpn: "Link",
        innerSearch: {
            prop: "BillId",
            cpn: "FormInput",
            label: i18n.t("Generality.Ge_BillId"),
        },
        cpnProps: {
            // 路由名称
            routeName: "Sa_SaleQuote_Detail",
            // 路由路径（名称和路径二选一）
            // routePath:'/dashboard',
            // 路由传参方式 默认query
            // 传参的键名，值为当前数据
            parameterKey: "BillId",
        },
    },
    /*状态*/
    {
        prop: "State",
        label: i18n.t("Generality.Ge_State"),
        cpn: "BillStateTags",
        width: "115px",
    },
    /*客户*/
    {
        prop: "CustomerName",
        label: i18n.t("menu.Sa_Customer"),
    },
    /*项目*/
    {
        prop: "Project",
        label: i18n.t("menu.Pm_Project"),
    },
    /*模具名称*/
    {
        prop: "ToolingName",
        label: i18n.t("Generality.Ge_ToolingName"),
    },
    /*制单人*/
    {
        prop: "Creator",
        label: i18n.t("Generality.Ge_Creator"),
        width: "95px",
    },
    /*制单日期*/
    {
        prop: "CreationDate",
        label: i18n.t("Generality.Ge_CreationDate"),
        filter: "time",
        width: "150px",
    },
];
export const tableConfig1 = [
    // 任务工序
    {
        prop: "Process",
        label: i18n.t("production.Pr_TaskProcess"),
    },
    // 工序代号
    {
        prop: "ProcessCode",
        label: i18n.t("production.Pr_ProcessCode"),
    },
    // 资源组
    {
        prop: "Resource",
        label: i18n.t("menu.Pr_Resources"),
    },
    // 报价时间
    {
        prop: "QuotationTime",
        label: i18n.t("sale.Sa_QuotationTime"),
    },
    // 占用时间
    {
        prop: "HoldingTime",
        label: i18n.t("sale.Sa_HoldingTime"),
    },
    // 停机时间
    {
        prop: "DownTime",
        label: i18n.t("sale.Sa_DownTime"),
    },
    // 可用时间
    {
        prop: "TotalAvailableTime",
        label: i18n.t("sale.Sa_TotalAvailableTime"),
        setStyle(col, row){
            if(row.QuotationTime + row.HoldingTime > row.TotalAvailableTime - row.DownTime) {
                return {
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: '18px'
                }
            }
        },
        customFilter(col, row) {
            if(row.QuotationTime + row.HoldingTime > row.TotalAvailableTime - row.DownTime) {
                return col + '  (可用时间不足)'
            } else {
                return col
            }
        }
    },
    // 计划负荷
    {
        prop: "PlannedLoad",
        label: i18n.t("sale.Sa_PlannedLoad"),
        customFilter(col) {
            return col + '%'
        }
    },
]
// 表单配置
export const formSchema = [
    //单号搜索
    {
        prop: "BillId",
        label: i18n.t("Generality.Ge_BillId"),
        cpn: "FormInput",
    },
    //客户搜索
    {
        prop: "CustomerName",
        label: i18n.t("sale.Sa_CustomerName"),
        cpn: "SyncSelect",
        api: getAllSalesCustomer,
        apiOptions: {
            keyName: "ShortName",
            valueName: "ShortName",
        },
    },
];

export const tableProps = {
    // 表格配置
    tableSchema: tableConfig,
    // 表单配置
    formSchema,
    // 行标识
    rowId: "BillId",
    // 表格标题
    title: i18n.t("menu.Sa_SaleQuote"),
    // 接口类
    api,
    // 隐藏操作列
    operationCol: false,
    tableHeaderShow: false,
    // 打印模块标识
    printMod: "Sa_SaleQuote1",
    height: '46vh',
};

export const tableProps1 = {
    // 表格配置
    tableSchema: tableConfig1,
    // 行标识
    rowId: "BillId",
    // 表格标题
    title: i18n.t("sale.Sa_OrderEvaluation"),
    // 隐藏操作列
    operationCol: false,
    tableHeaderShow: false,
    chooseCol: false,
    // 打印模块标识
    printMod: "Sa_OrderEvaluation",
};

export class Table extends BaseTable {
    constructor() {
        super(tableProps);
    }
}

export class Table1 extends BaseTable {
    constructor() {
        super(tableProps1);
    }
}
