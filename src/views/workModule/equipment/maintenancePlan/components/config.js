import { EditTable as BaseTable } from "~/class/table";
import {
    tableConfigWrapper
} from "~/utils/system/taxCount";
import { enumToList } from "~/utils/system/enumsPlugin";
import { maintenanceEnum, maintenancePlanEnum } from "@/enum/workModule";

export class EditTable1 extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfigWrapper(tableConfig1),
            data: [],
            title:'',
            tableHeaderShow:false,
            height:350,
            operationWidth:80,
        });
    }
}
const tableConfig1 = [
    /*设备编号*/
    {
        prop: "DeviceNo",
        label: i18n.t('production.Pr_DeviceNo'),
        editConfig:{
            disabled:true,
        }
    },
    /*设备名称*/
    {
        prop: "DeviceName",
        label: i18n.t('production.Pr_DeviceName'),
        editConfig:{
            disabled:true,
        }
    },
    /*规格型号*/
    {
        prop: "SpecModel",
        label: i18n.t('device.De_SpecModel'),
        formCpn: "FormInput",
        // editConfig:{
        //     disabled:true,
        // }
    },
]
export class EditTable2 extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfigWrapper(tableConfig2),
            data: [],
            title:'',
            tableHeaderShow:false,
            height:350,
            operationWidth:80,
        });
    }
}
const tableConfig2 = [
    /*保养内容*/
    {
        prop: "MaintenanceContent",
        label: i18n.t('device.De_MaintenanceContent'),
        formCpn: "FormInput",
    },
]
export const formSchema = [
    {
        //方案名称
        prop: "PlanName",
        label: i18n.t('device.De_PlanName'),
        cpn: "FormInput",
        cpnProps: {
            disabled: false
        },
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["blur"],
            },
        ],
    },
    {
        //方案说明
        prop: "Description",
        label: i18n.t('device.De_Description'),
        cpn: "FormInput",
    },
    {
        //保养方式
        prop: "MaintenanceMode",
        label: i18n.t("device.De_MaintenanceMode"),
        cpn: "FormSelect",
        options: {
            list: enumToList(maintenanceEnum),
        },
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["blur"],
            },
        ],
    },
    {
        //间隔天数
        prop: "IntervalDays",
        label: i18n.t('production.Pr_IntervalDays'),
        cpn: "FormInput",
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["blur"],
            },
        ],
    },
    {
        //     状态
        prop: "State",
        label: i18n.t("Generality.Ge_State"),
        cpn: "FormSelect",
        options: {
            list: enumToList(maintenancePlanEnum),
        },
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["blur"],
            },
        ]
    }
]
