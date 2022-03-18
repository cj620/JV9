import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow:false,
    });
  }
}
export const tableConfig = [
  /*物料编号*/
  {
    prop: "ItemId",
    label:i18n.t("Generality.Ge_ItemId"),

  },
  /*名称*/
  {
    prop: "ItemName",
    label:i18n.t("Generality.Ge_ItemName"),

  },
  /*描述*/
  {
    prop: "Description",
    label:i18n.t("Generality.Ge_Describe"),

  },
  /*单位*/
  {
    prop: "Unit",
    label:i18n.t("Generality.Ge_Unit"),
    width:'70px',

  },
  /*数量*/
  {
    prop: "Quantity",
    label:i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align:'right',
    type:'number',
    filter: "amount",
    width:'100px',
  },

  /*备注*/
  {
    prop: "Remarks",
    label:i18n.t("Generality.Ge_Remarks"),
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label:i18n.t("Generality.Ge_ToolingNo"),
  },
]
export const detailConfig=[

  {
    //  仓库-出
    prop:'StockroomOut',
    label: i18n.t("stockroom.St_StockroomOut"),

  },
  {
    // 仓库-入
    prop:'StockroomIn',
    label: i18n.t("stockroom.St_StockroomIn"),

  },
  {
    // 制单人
    prop:'Creator',
    label: i18n.t("Generality.Ge_Creator"),
  },
  {
    // 制单日期
    prop:'CreationDate',
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  }
]
