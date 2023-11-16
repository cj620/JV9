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
        label: "设备编号",
        editConfig:{
            disabled:true,
        }
    },
    /*设备名称*/
    {
        prop: "DeviceName",
        label: "设备名称",
        editConfig:{
            disabled:true,
        }
    },
    /*规格型号*/
    {
        prop: "SpecModel",
        label: "规格型号",
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
        label: "保养内容",
        formCpn: "FormInput",
    },
]
export const formSchema = [
    {
        //方案名称
        prop: "PlanName",
        label: "方案名称",
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
        label: "方案说明",
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
        label: "间隔天数",
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
        label: "状态",
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
