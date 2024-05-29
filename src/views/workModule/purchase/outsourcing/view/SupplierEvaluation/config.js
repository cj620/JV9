import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfig,
            formSchema: [],
            rowId: "SupplierCode",
            title: i18n.t("menu.Pu_Outsourcing"),
            tableHeaderShow: false,
            operationCol:false
        });
    }
}

export const tableConfig = [
    // 外协商编码
    {
        prop: 'SupplierCode',
        label: i18n.t("purchase.Pr_SupplierId"),
    },
    // 外协商名称
    {
        prop: 'SupplierName',
        label: i18n.t("purchase.Pr_SupplierName"),
    },
    // 外协次数（次）
    {
        prop: 'OutsourcingCount',
        label: i18n.t("purchase.Pu_OutsourcingCount"),
    },
    // 及时交货次数（次）
    {
        prop: 'OnTimeDeliveryCount',
        label: i18n.t("purchase.Pu_OnTimeDeliveryCount"),
    },
    // 交期达成率（%）
    {
        prop: 'DeliveryAchievementRate',
        label: i18n.t("purchase.Pu_DeliveryAchievementRate"),
        customFilter(val) {
            return val + '%'
        }
    },
]
