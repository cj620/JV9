/*
 * @Author: your name
 * @Date: 2021-12-06 11:02:03
 * @LastEditTime: 2022-01-18 16:03:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\production\report\capacityAnalyse\config.js
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { timeFormat } from "@/jv_doc/utils/time";
// 获取列表接口
import {
  capacity_analysis,
  capacity_analysis_items,
} from "@/api/workApi/production/dataReport";

export class api extends TableAPI {
  // 获取列表
  getData = capacity_analysis;
}
function get_Cur_Mon_Days() {
  let cur_date = new Date();
  //  当月天数
  let count = new Date(
    cur_date.getFullYear(),
    cur_date.getMonth() + 1,
    0
  ).getDate();
  let fields = [];
  for (let i = 1; i <= count; i++) {
    fields.push({
      prop: "Day" + i,
      label: String(i),
      cpn: "ColProgress",
      width: 46,
      align: "center",
    });
  }
  return fields;
}

export const tableSchema = [
  {
    prop: "Resource",
    label: i18n.t("Generality.Ge_ItemName"),
    width: 200,
    fixed: "left",
    custom: true,
  },
  ...get_Cur_Mon_Days(),
];

const formSchema = [
  {
    prop: "Month",
    label: "日期范围",
    cpn: "SingleTime",
    default: timeFormat(new Date()),
    cpnProps: {
      type: "month",
    },
  },
];
export const tableConfig = {
  tableSchema: tableSchema,
  formSchema,
  rowId: "Id",
  title: i18n.t("menu.Pr_CapacityAnalyse"),
  importBar: true,
  printMod: "sales",
  fullScreenBar: true,
  // 序号列
  sortCol: false,
  // 选择列
  chooseCol: false,
  operationCol: false,
  searchBar: false,
  api,
  lazy: true,
  // load:(tree, treeNode, resolve)=>{
  //       capacity_analysis_items({Month:'2021-12-06T02:56:31.942Z',
  //       ProcessName:tree.Resource
  //     }).then(res=>{
  //         resolve(res.Items)
  //       })}
};
export class Table extends BaseTable {
  constructor() {
    super(tableConfig);
  }
}

