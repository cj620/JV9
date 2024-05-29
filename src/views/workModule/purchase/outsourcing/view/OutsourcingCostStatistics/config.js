import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfig,
            formSchema: [],
            rowId: "SupplierCode",
            title: i18n.t("menu.Pu_Outsourcing"),
            tableHeaderShow: false,
            operationCol:false,
            chooseCol: false,
            sortCol: true,
        });
    }
}

export const tableConfig = [
    // 外协商编码
    {
      prop: 'SupplierId',
      label: i18n.t("purchase.Pr_SupplierId"),
      width: 100,
    },
    // 外协商名称
    {
      prop: 'SupplierName',
      label: i18n.t("purchase.Pr_SupplierName"),
      width: 150,
    },
    {
        prop: 'JanuaryExpenses',
        label: i18n.t("DataV.Da_January"),
    },
    {
        prop: 'FebruaryExpenses',
        label: i18n.t("DataV.Da_February"),
    },
    {
        prop: 'MarchExpenses',
        label: i18n.t("DataV.Da_March"),
    },
    {
        prop: 'AprilExpenses',
        label: i18n.t("DataV.Da_April"),
    },
    {
        prop: 'MayExpenses',
        label: i18n.t("DataV.Da_May"),
    },
    {
      prop: 'JuneExpenses',
      label: i18n.t("DataV.Da_June"),
    },
    {
      prop: 'JulyExpenses',
      label: i18n.t("DataV.Da_July"),
    },
    {
      prop: 'AugustExpenses',
      label: i18n.t("DataV.Da_August"),
    },
    {
      prop: 'SeptemberExpenses',
      label: i18n.t("DataV.Da_September"),
    },
    {
      prop: 'OctoberExpenses',
      label: i18n.t("DataV.Da_October"),
    },
    {
      prop: 'NovemberExpenses',
      label: i18n.t("DataV.Da_November"),
    },
    {
      prop: 'DecemberExpenses',
      label: i18n.t("DataV.Da_December"),
    },
]
