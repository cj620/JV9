/*
 * @Author: C.
 * @Date: 2023-02-06 16:03:34
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
export const detailConfig = [
  {
    prop: "BillId",
    label: "任务单号",
    custom: true,
  },
  {
    prop: "ToolingNo",
    label: "零件号",
  },
  {
    prop: "ProductVersion",
    label: "零件版本",
  },
  {
    prop: "ItemRemarks",
    label: "备注",
  },
];
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: [
        {
          prop: "FileName",
          label: i18n.t("Generality.Ge_FileName"),
        },
      ],
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "附件",
      // tableHeaderShow: false,
      operationCol: true,
      freshBar: false,
      searchBar: false,
      printBar: false,
      // 导出按钮
      exportBar: false,
      // 导入按钮
      importBar: false,
      settingBar: false,
      colBar: false,
      densityBar: false,
      height: 250,
    });
  }
}
