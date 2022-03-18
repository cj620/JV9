/*
 * @Author: H.
 * @Date: 2021-11-15 13:03:54
 * @LastEditTime: 2022-01-14 11:39:57
 * @Description:
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
      operationCol: true,
      operationWidth: 110,
    });
  }
}
export const tableConfig = [
  /*文件名称*/
  {
    prop: "FileName",
    label: i18n.t("Generality.Ge_FileName"),
  },
  /*上传人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Submitter"),
  },
  /*上传时间*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_UploadDate"),
    filter: "date",
  },
  /*文件类型*/
  {
    prop: "FileType",
    label: i18n.t("Generality.Ge_Type"),
  },
  /*文件大小*/
  {
    prop: "FileSize",
    label: i18n.t("Generality.Ge_FileSize"),
  },
];
