import {EditTable as BaseTable} from "~/class/table";
import {tableConfigWrapper} from "~/utils/system/taxCount";

export class memberTable extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfigWrapper(memberConfig),
            data: [],
            title:'',
            tableHeaderShow:false,
            height:350,
            operationWidth:80,
        });
    }
}
const memberConfig = [
    /*图片*/
    {
        prop: "PhotoUrl",
        label: i18n.t('Generality.Ge_PhotoUrl'),
        width: "75px",
        custom: true,
        editConfig:{
            disabled:true,
        }
    },
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
        editConfig:{
            disabled:true,
        }
    },
]
export class itemTable extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfigWrapper(itemConfig),
            data: [],
            title:'',
            tableHeaderShow:false,
            height:350,
            operationWidth:80,
        });
    }
}
const itemConfig = [
    /*保养内容*/
    {
        prop: "SpotCheckContent",
        label: i18n.t('device.De_SpotCheckContent'),
        formCpn: "FormInput",
        editConfig: {
            rules: {
                required: true,
            },
        },
    },
]
