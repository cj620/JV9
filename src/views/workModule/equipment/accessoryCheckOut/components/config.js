import { enumToList } from "~/utils/system/enumsPlugin";
import { PickingTypeEnum1 } from "@/enum/workModule";
import { EditTable as BaseTable } from "@/jv_doc/class/table";
import { tableConfigWrapper } from "@/jv_doc/utils/system/taxCount";
import {getStockroomList} from "@/api/workApi/stockroom/stockroomInfo";
import {getAllUserData} from "@/api/basicApi/systemSettings/user";

export const formSchema = [
    {
        //设备编号
        prop: "DeviceNo",
        label: i18n.t("production.Pr_DeviceNo"),
        custom: true,
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["change", "blur"],
            },
        ],
    },
    {
        //仓库
        prop: "Stockroom",
        cpn: "SyncSelect",
        label: i18n.t("menu.St_Stockroom"),
        api: getStockroomList,
        apiOptions: {
            immediate: true,
            keyName: "Stockroom",
            valueName: "Stockroom",
        },
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["change", "blur"],
            },
        ],
    },
    {
        //领料类别
        prop: "PickingType",
        label: i18n.t("stockroom.St_PickingType"),
        cpn: "FormSelect",
        options: {
            list: enumToList(PickingTypeEnum1)
        },
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["change", "blur"],
            },
        ],
    },
    {
        //提交人
        prop: "Submitter",
        label: i18n.t("stockroom.St_Submitter"),
        cpn: "SyncSelect",
        api: getAllUserData,
        apiOptions: {
            immediate: true,
            keyName: "UserName",
            valueName: "UserName",
        },
        rules: [
            {
                required: true,
                message: i18n.t("Generality.Ge_PleaseSelect"),
                trigger: ["change", "blur"],
            },
        ],
    }
]

export class EditTable extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfigWrapper(tableConfig),
            data:[],
            title:'',
            tableHeaderShow:false,
            height:350,
            operationWidth:80,
        });
    }
}
export const tableConfig = [
    /*物料编号*/
    {
        prop: "ItemId",
        label:i18n.t("Generality.Ge_ItemId"),
        editConfig:{
            disabled:true,
        }
    },
    /*名称*/
    {
        prop: "ItemName",
        label:i18n.t("Generality.Ge_ItemName"),
        editConfig:{
            disabled:true,
        }
    },
    /*描述*/
    {
        prop: "Description",
        label:i18n.t("Generality.Ge_Describe"),
        editConfig:{
            disabled:true,
        }
    },
    /*单位*/
    {
        prop: "Unit",
        label:i18n.t("Generality.Ge_Unit"),
        width:'70px',
        editConfig:{
            disabled:true,
        }
    },
    /*数量*/
    {
        prop: "Quantity",
        label:i18n.t("Generality.Ge_Quantity"),
        formCpn: "FormInput",
        align:'right',
        width:'100px',
        type:'number',
    },
    /*备注*/
    {
        prop: "Remarks",
        label:i18n.t("Generality.Ge_Remarks"),
        formCpn: "FormInput",
    },
    {
        //     关联编号
        prop: "AssociatedNo",
        label: i18n.t("Generality.Ge_AssociatedNo"),
        editConfig:{
            disabled:true,
        },
        hidden: true,
    }
]
