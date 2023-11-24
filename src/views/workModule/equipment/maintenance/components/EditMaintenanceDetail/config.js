import { Table as BaseTable } from "@/jv_doc/class/table";
export class detailTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
      pagination: false,
      height: null,
      operationCol:false,
      chooseCol:false
    });
  }
}
const tableConfig = [
  /*保养内容*/
  {
    prop: "MaintenanceContent",
    label: i18n.t("device.De_MaintenanceContent"),
  },
  /*保养结果*/
  {
    prop: "MaintenanceResults",
    label: i18n.t("device.De_MaintenanceResults"),
    custom: true,
    width: "150px"
    // customFilter:(value,row)=>{
    //   if(value === "Completed"){
    //     return i18n.t("Generality.Ge_Completed")
    //   } else if(value === "Incomplete"){
    //     return i18n.t("Generality.Ge_Incomplete")
    //   } else {
    //     return ""
    //   }
    // },

  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    custom: true,
    width: "700px",
  },
]
