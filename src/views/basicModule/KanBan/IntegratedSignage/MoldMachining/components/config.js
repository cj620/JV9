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
    label:'单号',
  },
  /*产品号*/
  {
    prop: "ToolingNo",
    label:'产品号',
  },
  /*零件号*/
  {
    prop: "PartNo",
    label:'零件号',
  },
  /*零件名称*/
  {
    prop: "PartName",
    label:'零件名称',
  },
  /*状态*/
  {
    prop: "State",
    label:'状态',
  },
]


