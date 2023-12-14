import { TableAPI, Table as BaseTable } from "~/class/table";
import { assets_device_list } from "@/api/workApi/equipment/device";
import {inventoryStateEnum} from "@/enum/workModule";
export class api extends TableAPI {
    // 获取列表
    getData = assets_device_list;
}export class deviceTable extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfig,
            formSchema:[],
            rowId: "DeviceNo",
            api,
            tableHeaderShow: false,
            height: 430,
            operationCol: false,
            // pagination: false,
            // 打印模块标识
            printMod: "As_DeviceTable",
        });
    }
}
export const tableConfig = [
    {
        prop: "DeviceNo",
        label: i18n.t("production.Pr_DeviceNo"),
        align: "center"
    },
    {
        prop: "DeviceName",
        label: i18n.t("production.Pr_DeviceName"),
        align: "center"
    },
    {
        prop: "Manufacture",
        label: i18n.t("production.Pr_Manufacture"),
        align: "center",
    },
    {
        prop: "InventoryState",
        label: i18n.t("device.De_StorageStatus"),
        align: "center",
        customFilter: (value) => {
            if (!value) return "";
            return inventoryStateEnum[value].name;
        },
    },
    {
        prop: "SpecModel",
        label: i18n.t("device.De_SpecModel"),
        align: "center",
    },
]
