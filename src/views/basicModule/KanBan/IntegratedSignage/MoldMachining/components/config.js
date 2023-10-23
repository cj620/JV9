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
  /*单号*/
  {
    prop: "BillId",
    label: i18n.t('Generality.Ge_OddNumbers'),
  },
  /*产品号*/
  {
    prop: "ToolingNo",
    label: i18n.t('production.Pr_ToolingNo'),
  },
  /*零件号*/
  {
    prop: "PartNo",
    label: i18n.t('design.De_ToolingNo'),
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t('Generality.Ge_PartName'),
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t('Generality.Ge_State'),
  },
]


