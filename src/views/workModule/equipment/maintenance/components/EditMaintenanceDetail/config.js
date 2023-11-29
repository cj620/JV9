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
  /*保养内容*/
  {
    prop: "MaintenanceContent",
    label: i18n.t("device.De_MaintenanceContent"),
    formCpn: "FormInput",
    editConfig: {
      rules: {
        required: true,
      },
    },
  },
  /*保养结果*/
  {
    prop: "MaintenanceResults",
    label: i18n.t("device.De_MaintenanceResults"),
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
    label: i18n.t("Generality.Ge_Remarks"),
    formCpn: "FormInput",
    width: "700px",
  },
]



