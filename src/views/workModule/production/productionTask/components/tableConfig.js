
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-02 15:50:53
 * @Description: file content
 */
import { Table as BaseTable } from "@/jv_doc/class/table";


export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data:[],
      title:'',
      tableHeaderShow:false,
      pagination:false,
      operationCol:false,
      height:200,
      operationWidth:80,
    });
  }
}

export const tableConfig = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label:i18n.t("Generality.Ge_ToolingNo"),

  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),

  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),

  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),


  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width:'100px',
  },


];

