/*
 * @Author: C.
 * @Date: 2023-02-06 16:03:34
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
export const detailConfig = [
  {
    // 任务单号
    prop: "BillId",
    label: i18n.t('project.Pro_TaskSheetNo'),
    custom: true,
  },
  {
    // 零件号
    prop: "ToolingNo",
    label: i18n.t('design.De_ToolingNo'),
  },
  {
    // 零件版本
    prop: "ProductVersion",
    label: i18n.t('design.De_ProductVersion'),
  },
  {
    prop: "ItemRemarks",
    label: i18n.t('Generality.Ge_Remarks'),
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
      title: i18n.t('Generality.Ge_Annex'),
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
