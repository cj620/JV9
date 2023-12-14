import { EditTable as BaseTable } from "@/jv_doc/class/table";
import {
    tableConfigWrapper
} from "@/jv_doc/utils/system/taxCount";
export class EditTable extends BaseTable {
    constructor() {
        super({
            tableSchema: tableConfigWrapper(eTableConfig),
            data:[],
            title: "",
            tableHeaderShow:false,
            sortCol:false,
            chooseCol:false,
            height:350,
            operationCol: false,
        });
    }
}

const eTableConfig = [
    /*点检内容*/
    {
        prop: "SpotCheckContent",
        label: i18n.t("device.De_SpotCheckContent"),
        formCpn: "FormInput",
        editConfig: {
            rules: {
                required: true,
            },
            disabled: true,
        },
    },
    /*点检结果*/
    {
        prop: "SpotCheckResult",
        label: i18n.t("device.De_SpotCheckResult"),
        formCpn: "customFormSelect",
        options: {},
        width: "150px",
        custom: true,
        editConfig: {
            rules: {
                required: true,
            },
        },
    },
    /*备注*/
    {
        prop: "Remarks",
        label: i18n.t('Generality.Ge_Remarks'),
        formCpn: "FormInput",
    },
]
