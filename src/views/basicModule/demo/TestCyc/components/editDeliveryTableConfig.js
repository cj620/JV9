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
    prop: "id",
    label:i18n.t("Generality.Ge_ItemId"),

  },
  /*名称*/
  {
    prop: "name",
    label:i18n.t("Generality.Ge_ItemName"),

  },
  /*描述*/
  {
    prop: "category",
    label:i18n.t("Generality.Ge_Describe"),

  },
  /*单位*/
  {
    prop: "desc",
    label:i18n.t("Generality.Ge_Unit"),
    width:'70px',
  },
  /*数量*/
  {
    prop: "address",
    label:i18n.t("Generality.Ge_Quantity"),

  },

]
