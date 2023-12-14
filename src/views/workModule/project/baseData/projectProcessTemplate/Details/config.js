/*
 * @Author: H.
 * @Date: 2021-12-02 09:09:23
 * @LastEditTime: 2022-01-14 10:32:46
 * @Description:
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { enumFilter } from '~/utils/system/enumsPlugin'
import { processTypeEnum } from "@/enum/workModule/project/projectTask"
export class Table extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfig,
            tableHeaderShow: false,
        });
    }
}
export const tableConfig = [
    /*工序*/
    {
        prop: "Process",
        label: i18n.t("Generality.Ge_Process"),
    },
    /*标准费率*/
    {
        prop: "CostRate",
        label: i18n.t("production.Pr_CostRate"),
    },
    /*开始比例*/
    {
        prop: "StartScale",
        label: i18n.t("production.Pr_StartScale"),
    },
    /*结束比例*/
    {
        prop: "EndScale",
        label: i18n.t("production.Pr_EndScale"),
    },
    /*部门*/
    {
        prop: "BelongingDepartment",
        label: i18n.t("menu.Se_Department"),
    },
    /*工序类别*/
    {
        prop: "ProcessType",
        label: i18n.t("production.Pr_ProcessType"),
        customFilter: (value) => enumFilter(value, processTypeEnum),
    },
];
export const detailConfig = [
    {
        // 模板名称
        prop: "Template",
        label: i18n.t("Generality.Ge_TemplateName"),
    },
    /*制单人*/
    {
        prop: "Creator",
        label: i18n.t("Generality.Ge_Creator"),
    },
    /*制单日期*/
    {
        prop: "CreationDate",
        label: i18n.t("Generality.Ge_CreationDate"),
        filter: "time",
    },
];
