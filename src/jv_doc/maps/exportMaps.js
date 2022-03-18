/*
 * @Author: C.
 * @Date: 2021-09-23 13:51:15
 * @LastEditTime: 2022-03-08 14:09:05
 * @Description: file content
 */
// ['xlsx', 'csv', 'txt']
import i18n from "@/i18n/i18n";
export const saveTypeMap = {
  xlsx: {
    label: "Excel(*.xlsx)",
    value: "xlsx",
  },
  csv: {
    label: "CSV(*.csv)",
    value: "csv",
  },
  txt: {
    label: "txt(*.txt)",
    value: "txt",
  },
  html: {
    label: "html(*.html)",
    value: "html",
  },
  xml: {
    label: "XML(*.xml)",
    value: "xml",
  },
};

export const exportTypeMap = {
  PAGE: {
    label: i18n.t("setup.CurrentPageData"),
    value: "PAGE",
  },
  SELECTED: {
    label: i18n.t("setup.SelectedDataOfCurrentPage"),
    value: "SELECTED",
  },
  ALL: {
    label:i18n.t("Generality.Ge_All"),
    value: "ALL",
  },
  TEMPLATE: {
    label: i18n.t("setup.ExportTemplate"),
    value: "TEMPLATE",
  },
};
